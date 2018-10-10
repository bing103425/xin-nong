<template>
  <div>
    
    <div v-for="(item,index1) in fenxiangData" :key="index1">
      <div class="flex-space-between ddc-fenxiao-list-info">
        <p>{{item.create_time}}</p>
        <p class="ddc-daifenxiao">{{item.status_name}}</p>
      </div>
      <div class="flex-flex-start ddc-fenxiao-content-card">
        <img :src="item.order_goods.pic.pic_cover_small" class="ddc-fenxiao-img">
        <div class="ddc-text-box">
          <p class="ddc-fenxiao-goods-name overhidden2">{{item.order_goods.goods_name}}</p>
          <p class="ddc-lineheight">￥{{item.order_goods.price}} &nbsp;&nbsp;&nbsp;&nbsp;x{{item.order_goods.num}} <span class="pull-right ddc-wuliu" @click.stop="goToExp()" v-if="item.order_status == 2">查看物流</span> </p>
        </div>
      </div>
      <div class="flex-space-between ddc-fenxiao-list-btn">
        <mp-priceCart size="30" :redPrice="item.order_goods.cost_price"></mp-priceCart>
        <span></span>
        <div class="flex-flex-start">
          <div class="ddc-fenxiao-btn" @click.stop="toDetail(item.order_goods)">查看详情</div>
        </div>
      </div>
    </div>
    <div class="dth-tip" v-if="hasData == false">还没有退货订单哦~</div>

  </div>
</template>

<script>
import priceCart from '@/components/priceCart'
import { timestampToTime } from '@/utils/index'

export default {
  data () {
    return {
      fenxiangData:[],       //退货的订单列表
      hasData: true
    }
  },

  components: {
    'mp-priceCart':priceCart
  },

  mounted(){
    var that = this
    that.fenxiangData = []
    //这个请求没用
    that.$http.post({
      url:"/wx/task/load_task",
      dataType: "json",
      data:{}
    })
    .then(res =>{
        
      //这个才有用，获取订单列表
      that.$http.post({
        url:"/wx/order/myOrderList",
        dataType: "json",
        data:{}
      })
      .then(res =>{

        if(res.code == 0){
          res.data.forEach(item => {
            //格式化时间格式
            item.create_time = timestampToTime(item.create_time*1000,'sec')

            //格式化状态的名称
            if(item.status_name == '已收货'){
              item.status_name = '待评论'
            }else if(item.status_name == '已发货'){
              item.status_name = '待收货'
            }

            //把图片加上域名
            item.order_goods.forEach(innerItem => {
              innerItem.pic.pic_cover_small ='http://xcx_cx_cx_shop.idc.gcsci.net/'+ innerItem.pic.pic_cover_small
            })
          })
          let beforeData = res.data
          //请求到的是所有的订单列表，格式化一下，将退货的商品放在数组里
          for(let i=0;i<beforeData.length;i++){
            if(beforeData[i].order_status==-1 || beforeData.order_status==-2){
              for(let j=0;j<beforeData[i].order_goods.length;j++){
                  // console.log('次数',j)
                if(beforeData[i].order_goods[j].refund_status!==0){
                  let obj = {}
                  obj=that.copy(beforeData[i],obj)
                  obj.order_goods=beforeData[i].order_goods[j]

                  switch(beforeData[i].order_goods[j].refund_status)
                  {
                  case 1:
                    obj.status_name = '买家申请退款'
                    break
                  case 2:
                    obj.status_name = '等待买家退货'
                    break
                  case 3:
                    obj.status_name = '等待卖家确认收货'
                    break
                  case 4:
                    obj.status_name = '等待卖家确认退款'
                    break
                  case 5:
                    obj.status_name = '退款已成功'
                    break
                  case -1:
                    obj.status_name = '退款已拒绝'
                    break
                  case -2:
                    obj.status_name = '退款已关闭'
                    break
                  case -3:
                    obj.status_name = '退款申请不通过'
                    break
                  }
                  that.fenxiangData.push(obj)
                }
              }
            }
          }
          if(that.fenxiangData.length == 0){
            that.hasData = false
          }
        }
      })
    })
  },

  methods: {
    toDetail(orderGoods){
      //再次购买，进去确认订单页面
      
      wx.navigateTo({
        url: '/pages/tuiKuanDetail/main?goodsId='+orderGoods.goods_id+'&&num='+orderGoods.num+'&&orderGoodsId='+orderGoods.order_goods_id
      })
    },
    //深拷贝
     copy(obj1,obj2){
      var obj2=obj2||{}; //最初的时候给它一个初始值=它自己或者是一个json
      for(var name in obj1){
        if(typeof obj1[name] === "object"){ //先判断一下obj[name]是不是一个对象
          obj2[name]= (obj1[name].constructor===Array)?[]:{}; //我们让要复制的对象的name项=数组或者是json
          this.copy(obj1[name],obj2[name]); //然后来无限调用函数自己 递归思想
        }else{
          obj2[name]=obj1[name];  //如果不是对象，直接等于即可，不会发生引用。
        }
      }
      return obj2; //然后在把复制好的对象给return出去
    }
  }
}
</script>

<style scoped>
.top-tab-box{
  width: 750rpx;
  height: 94rpx;
  display: flex;
  background-color: #fff;
  flex-flow: nowrap row;
  justify-content:flex-start;
  align-items: center;
  border-bottom: 1rpx solid #f5f5f5;
}
.top-tab-box li{
  width: 40%;
  height: 94rpx;
  text-align: center;
  line-height: 94rpx;
  font-size: 28rpx;
  color: #999;
}
.top-tab-box .active{
  color: #18c136;
}
.content-box{
  width: 750rpx;
  box-sizing: border-box;
  display: flex;
  flex-flow: wrap row;
  justify-content: flex-start;
  align-items: center;
}
</style>
