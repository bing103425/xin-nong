<template>
  <div>
    <ul class="top-tab-box">
      <li v-for="(item,index) in tabData" :key="index" :class="{ 'active' : active == index}" @click="changeTabIndex(index)">{{item}}</li>
    </ul>
    <ul class="content-box">
      <mp-dingDanCard :fenxiangData="fenxiangData" :orderType="orderType" v-on:isGoBack="isGoBack"></mp-dingDanCard>
    </ul>
  </div>
</template>

<script>
import dingDanCard from '@/components/dingDanCard'
import { timestampToTime } from '@/utils/index'

export default {
  data () {
    return {
      active:0,
      tabData:['全部','待付款','待发货','待收货','待评论'],
      fenxiangData:[],
      orderType:'全部',
      isBack: true   //用来判断是本页面刷新还是需要返回至个人中心
    }
  },

  components: {
    'mp-dingDanCard':dingDanCard
  },
  onUnload: function () {
    if(this.isBack){
      wx.reLaunch({
        url: '/pages/mine/main'
      })
    }
  },

  mounted(){
    var that = this
    that.isBack = true   //用来判断是本页面刷新还是需要返回至个人中心
    //这个请求没用！！
    that.$http.post({
      url:"/wx/task/load_task",
      dataType:'json'
    })
    .then(res =>{
      
        //这个请求才有用，获取订单列表
      that.$http.post({
        url:"/wx/order/myOrderList",
        dataType:'json',
      })
      .then(res =>{
        res.data.forEach(item => {
          item.create_time = timestampToTime(item.create_time*1000,'sec')
          if(item.status_name == '已收货'){
            item.status_name = '待评论'
          }else if(item.status_name == '已发货'){
            item.status_name = '待收货'
          }
          item.order_goods.forEach(innerItem => {
            innerItem.pic.pic_cover_small ='http://xcx_cx_cx_shop.idc.gcsci.net/'+ innerItem.pic.pic_cover_small
          })
        })

        that.fenxiangData = res.data
      })
    })
  },

  methods: {
    isGoBack(val){
      console.log(val)
      if(!val){
        this.isBack = false
      }
    },
    changeTabIndex(index){
      this.active = index
      switch(index)
      {
      case 1:
        this.orderType = 0
        break;
      case 2:
        this.orderType = 1
        break;
      case 3:
        this.orderType = 2
        break;
      case 4:
        this.orderType = 3
        break;
      default:
        this.orderType = '全部'
      }
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
