<template>
  <div>
    <div v-for="(item,index) in fenxiangData" v-if="orderType=='全部'" :key="index" @click="toDingDanDetial(item.order_id)">
      <div class="flex-space-between ddc-fenxiao-list-info">
        <p>{{item.create_time}}</p>
        <p class="ddc-daifenxiao">{{item.status_name}}</p>
      </div>
      <div class="flex-flex-start ddc-fenxiao-content-card" v-for="(innerItem,innerIndex) in item.order_goods" :key="innerIndex">
        <img :src="innerItem.pic.pic_cover_small" class="ddc-fenxiao-img">
        <div class="ddc-text-box">
          <p class="ddc-fenxiao-goods-name overhidden2">{{innerItem.goods_name}}</p>
          <p class="ddc-lineheight">
            ￥{{innerItem.price}} &nbsp;&nbsp;&nbsp;&nbsp;
            x{{innerItem.num}} 
            <span class="pull-right ddc-wuliu" @click.stop="goToExp(innerItem.order_goods_id)" v-if="item.order_status == 2&&innerItem.refund_status<=0">查看物流</span> 
            <span class="pull-right ddc-wuliu-status" v-if="item.order_status == -1 && innerItem.refund_status !== 0">{{innerItem.status_name}}</span> 
          </p>
        </div>
      </div>
      <div class="flex-space-between ddc-fenxiao-list-btn">
        <mp-priceCart size="30" :redPrice="item.pay_money"></mp-priceCart>
        <div class="flex-flex-start" v-if="item.status_name == '待付款'">
          <div class="ddc-quxiaodingdan-btn" @click.stop="open(item.order_id)">取消订单</div>
          <div class="ddc-fenxiao-btn" @click.stop="toPayMoney(item.out_trade_no)">去付款</div>
        </div>
        <div class="flex-flex-start" v-if="item.status_name == '待发货'">
          <div class="ddc-fenxiao-btn">我要退款</div>
        </div>
        <div class="flex-flex-start" v-if="item.status_name == '待评论'">
          <div class="ddc-fenxiao-btn" @click.stop="buyAgain(item.order_id)">再次购买</div>
          <div class="ddc-fenxiao-btn" @click.stop="toPingLun(item.order_id)">去评价</div>
        </div>
        <div class="flex-flex-start" v-if="item.status_name == '已关闭'">
          <div class="ddc-fenxiao-btn" @click.stop="buyAgain(item.order_id)">再次购买</div>
          <div class="ddc-fenxiao-delet-btn" @click.stop="deletOrder(item.order_id)">删除订单</div>
        </div>
        <div class="flex-flex-start" v-if="item.status_name == '待收货'"> 
          <div class="ddc-fenxiao-btn" @click.stop="confirmShouHuo(item.order_id)">确认收货</div>
        </div>
        <div class="flex-flex-start" v-if="item.status_name == '已完成'">
          <div class="ddc-fenxiao-btn" @click.stop="buyAgain(item.order_id)">再次购买</div>
          <div class="ddc-fenxiao-delet-btn" @click.stop="deletOrder(item.order_id)">删除订单</div>
        </div>
        <div class="flex-flex-start" v-if="item.status_name == '退款中'">
          <!-- <div class="ddc-quxiaodingdan-btn" @click.stop="open(item.order_id)">取消退款</div> -->
        </div>
      </div>
    </div>

    
    <div v-for="(item,index1) in fenxiangData" v-if="orderType==item.order_status" :key="index1" @click="toDingDanDetial(item.order_id)">
      <div class="flex-space-between ddc-fenxiao-list-info">
        <p>{{item.create_time}}</p>
        <p class="ddc-daifenxiao">{{item.status_name}}</p>
      </div>
      <div class="flex-flex-start ddc-fenxiao-content-card" v-for="(innerItem,innerIndex1) in item.order_goods" :key="innerIndex1">
        <img :src="innerItem.pic.pic_cover_small" class="ddc-fenxiao-img">
        <div class="ddc-text-box">
          <p class="ddc-fenxiao-goods-name overhidden2">{{innerItem.goods_name}}</p>
          <p class="ddc-lineheight">￥{{innerItem.price}} &nbsp;&nbsp;&nbsp;&nbsp;x{{innerItem.num}} <span class="pull-right ddc-wuliu" @click.stop="goToExp(innerItem.order_goods_id)" v-if="item.order_status == 2&&innerItem.refund_status<=0">查看物流</span> </p>
        </div>
      </div>
      <div class="flex-space-between ddc-fenxiao-list-btn">
        <mp-priceCart size="30" :redPrice="item.pay_money"></mp-priceCart>
        <div class="flex-flex-start" v-if="item.status_name == '待付款'">
          <div class="ddc-quxiaodingdan-btn" @click.stop="open(item.order_id)">取消订单</div>
          <div class="ddc-fenxiao-btn" @click.stop="toPayMoney(item.out_trade_no)">去付款</div>
        </div>
        <div class="flex-flex-start" v-if="item.status_name == '待发货'">
          <div class="ddc-fenxiao-btn">我要退款</div>
        </div>
        <div class="flex-flex-start" v-if="item.status_name == '待收货'">
          <div class="ddc-fenxiao-btn" @click.stop="confirmShouHuo(item.order_id)">确认收货</div>
        </div>
        <div class="flex-flex-start" v-if="item.status_name == '待评论'">
          <div class="ddc-fenxiao-btn" @click.stop="buyAgain(item.order_id)">再次购买</div>
          <div class="ddc-fenxiao-btn" @click.stop="toPingLun(item.order_id)">去评价</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import priceCart from '@/components/priceCart'
export default {
  data(){
    return{
      itemList:['我不想买了', '信息填写错误，重新拍', '同城见面交易','其他原因']
    }
  },
  props: ['fenxiangData','orderType'],
  components: {
    'mp-priceCart': priceCart
  },
  methods:{
    toPayMoney(out_trade_no){
      var that = this
      that.$http.post({
          url:"/wx/pay/getPayValue",
          dataType:'json',
          data:{
            out_trade_no: out_trade_no
          }
      }).then(res =>{
        if(res.code == 0){
          wx.requestPayment({
            timeStamp: res.data["timeStamp"],
            nonceStr: res.data["nonceStr"],
            package: res.data["package"],
            signType: "MD5",
            paySign: res.data["paySign"],
            success: function(successret) {

            //向父组件提交数据，使页面不会在刷新时回到个人中心
            that.$emit('isGoBack',false)

              //支付成功回调
              wx.navigateTo({
                url: '/pages/quanBuDingDan/main'
              })
            },
            fail: function(res) {}
          })
        }
      })
    },
    goToExp(orderGoodsId){
      wx.navigateTo({
        url: '/pages/expressInfo/main?orderGoodsId='+orderGoodsId
      })
    },
    confirmShouHuo(orderId){
      var that = this
      that.$http.post({
          url:"/wx/order/orderDelivery",
          dataType:'json',
          data:{
            order_id: orderId
          }
      }).then(res =>{
        if(res.code == 0){
          wx.showToast({
            title: res.info,
            icon: 'success',
            duration: 2000
          })
          that.$emit('isGoBack',false)
          setTimeout(()=>{
            wx.redirectTo({
              url: '/pages/quanBuDingDan/main'
            })
          },2000)
        }
      })
    },
    toPingLun(orderId){
      wx.navigateTo({
        url: '/pages/pingJia/main?orderId='+orderId
      })
    },
    toDingDanDetial(orderId){
      wx.navigateTo({
        url: '/pages/dingDanXiangQing/main?orderId='+orderId
      })
    },
    deletOrder(orderId){
      let that = this
      wx.showModal({
        title: '确认删除？',
        content: '删除后无法恢复，请谨慎操作',
        success: function(res) {
          if (res.confirm) {
            that.$http.post({
                url:"/wx/order/delOrderInfo",
                dataType:'json',
                data:{
                  order_id: orderId
                }
            }).then(res =>{
              if(res.code == 0){
                wx.showToast({
                  title: res.info,
                  icon: 'success',
                  duration: 2000
                })

                //找到删除的订单，在data列表里移除
                that.fenxiangData.forEach((element,index) => {
                  if(orderId == element.order_id){
                    that.fenxiangData.splice(index,1)
                  }
                })
              }
            })

          }
        }
      })
    },
    buyAgain(orderId){
      //再次购买，进去确认订单页面
      var theAllNum = 0
      var finallyPrice
      var goodsArr = []
      var numArr = []

      this.fenxiangData.forEach(item => {
        if(item.order_id == orderId){
          item.order_goods.forEach(innerItem => {
            theAllNum += Number(innerItem.num)
            goodsArr.push(innerItem.goods_id)
            numArr.push(innerItem.num)
          })
          finallyPrice = Number(item.order_money)
        }
      })
      var postGoodsArr = goodsArr.toString()
      var postNumArr = numArr.toString()
      
      wx.navigateTo({
        url: '/pages/queRenDingDan/main?theAllNum='+theAllNum+'&&goodsIds='+postGoodsArr+'&&numArr='+postNumArr
      })
    },
    open(orderId) {
      let that = this;
      wx.showActionSheet({
        itemList: this.itemList,
        success: function (res) {
          console.log("index：" + res.tapIndex, "用户选的值为：" + that.itemList[res.tapIndex]);
          //取消订单
          that.$http.post({
              url:"/wx/order/orderClose",
              dataType:'json',
              data:{
              order_id: orderId,
              close_info: that.itemList[res.tapIndex]
              }
          })
          .then(res =>{
            if(res.code == 0){
              wx.showToast({
                title: res.data.info,
                icon: 'success',
                duration: 2000
              })
              
              that.$emit('isGoBack',false)
              setTimeout(()=>{
                wx.redirectTo({
                  url: '/pages/quanBuDingDan/main'
                })
              },2000)
            }
          })
          
        }
      })
    }
  }
}
</script>

<style>
.ddc-fenxiao-list-info{
  width: 750rpx;
  padding: 0 30rpx;
  height: 94rpx;
  font-size: 24rpx;
  color: #999;
  border-bottom: 1px solid #f5f5f5;
}
.ddc-daifenxiao{
  font-size: 28rpx;
  color: #333;
}
.ddc-fenxiao-content-card{
  padding: 20rpx 30rpx;
  border-bottom: 1px solid #f5f5f5;
}
.ddc-fenxiao-img{
  width: 120rpx;
  height: 120rpx;
  margin-right: 34rpx;
}
.ddc-fenxiao-goods-name{
  text-align: left;
  width: 530rpx;
  color: #333;
  font-size: 28rpx;
  -webkit-line-clamp:1;
  margin-bottom: 10rpx;
}
.ddc-fenxiao-list-btn{
  width: 750rpx;
  padding: 0 30rpx;
  height: 98rpx;
  font-size: 28rpx;
  color: #ff0101;
  border-bottom: 4px solid #f5f5f5;
}
.ddc-quxiaodingdan-btn{
  box-sizing: border-box;
  height: 64rpx;
  line-height: 60rpx;
  width: 170rpx;
  border: 1px solid #999;
  border-radius: 8rpx;
  text-align: center;
  color: #999;
}
.ddc-fenxiao-btn{
  box-sizing: border-box;
  height: 64rpx;
  line-height: 60rpx;
  width: 170rpx;
  border: 1px solid #ff0101;
  border-radius: 8rpx;
  text-align: center;
  margin-left: 14rpx;
}
.ddc-fenxiao-delet-btn{
  box-sizing: border-box;
  height: 64rpx;
  line-height: 60rpx;
  width: 170rpx;
  border: 1px solid #999;
  color: #999;
  border-radius: 8rpx;
  text-align: center;
  margin-left: 14rpx;
}
.ddc-text-box{
  font-size: 26rpx;
  color: #666;
}
.ddc-wuliu{
  font-size: 30rpx;
  color: #0095e0;
  text-decoration: underline;
}
.ddc-wuliu-status{
  font-size: 30rpx;
  color: #999;
}
.ddc-lineheight{
  line-height: 60rpx;
}
</style>
