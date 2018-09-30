<template>
  <div>
    <mp-mineCard></mp-mineCard>
    <ul class="list">
      <a href="/pages/quanBuDingDan/main" class="mine-dingdan-a">
        <li class="text-box">
          <img src="../../assets/image/order@2x.png" class="icon-order">
          <span>我的订单</span>
        </li>
      </a>
      <a href="/pages/quanBuDingDan/main" class="mine-dingdan-a">
        <li class="text-box2 pull-right">
          <span class="all-text">全部订单</span>
          <img src="../../assets/image/more@2x.png" class="icon-all">
        </li>
      </a>
    </ul>
    <ul class="icon-list">
      <a class="mine-a" v-for="(item,index) in iconList" :key="index" :href="item.href">
        <li class="icon-item">
          <div>
            <img :src="item.bgImg" :style="{ width: item.width, height: item.height }" class="icon-img">
          </div>
          <p>{{item.text}}</p>
        </li>
      </a>
    </ul>
    <ul class="bottom-list">
      <a class="bottom-item-a" v-for="(item,index) in bottomList" :key="index" :href="item.href">
        <li class="bottom-item">
          <div>
            <img :src="item.bgImg" :style="{ width: item.width, height: item.height }" class="bottom-icon-img">
            <p>{{item.text}}</p>
          </div>
          <img src="../../assets/image/more@2x.png" class="icon-all icon-youjiantou">
        </li>
      </a>
    </ul>
  </div>
</template>

<script>
import mineCard from '@/components/mineCard'

export default {
  data () {
    return {
      iconList:[{
          width:'52rpx',
          height:'42rpx',
          bgImg:'../../assets/image/dfk@2x.png',
          text:'待付款',
          href:'/pages/daiFuKuan/main'
        },{
          width:'44rpx',
          height:'42rpx',
          bgImg:'../../assets/image/dfh@2x.png',
          text:'待发货',
          href:'/pages/daiFaHuo/main'
        },{
          width:'44rpx',
          height:'42rpx',
          bgImg:'../../assets/image/dsh@2x.png',
          text:'待收货',
          href:'/pages/daiShouHuo/main'
        },{
          width:'42rpx',
          height:'42rpx',
          bgImg:'../../assets/image/dpl@2x.png',
          text:'待评价',
          href:'/pages/daiPingJia/main'
        },{
          width:'40rpx',
          height:'44rpx',
          bgImg:'../../assets/image/thz@2x.png',
          text:'退货中',
          href:'/pages/daiTuiHuo/main'
        }],

        bottomList:[{
          width:'32rpx',
          height:'32rpx',
          bgImg:'../../assets/image/dz@2x.png',
          text:'收货地址',
          href:'/pages/shouHuoDiZhi/main'
        },{
          width:'32rpx',
          height:'32rpx',
          bgImg:'../../assets/image/number@2x.png',
          text:'账号绑定',
          href:'/pages/zhangHaoBangDing/main'
        },{
          width:'30rpx',
          height:'28rpx',
          bgImg:'../../assets/image/service@2x.png',
          text:'在线客服',
          href:'/pages/zaiXianKeFu/main'
        },{
          width:'32rpx',
          height:'28rpx',
          bgImg:'../../assets/image/fxzx.png',
          text:'分销中心',
          href:'/pages/fenxiaozhongxin/main'
        },{
          width:'30rpx',
          height:'30rpx',
          bgImg:'../../assets/image/share2@2x.png',
          text:'分享',
          href:'/pages/fenXiang/main'
      }]
    }
  },
  mounted(){
    //这个接口我也不知道请求了干嘛，后端让的。  （一个耿直的微笑）
    //好像是后端要处理订单状态？？？
    wx.request({
      url: 'http://xcx_shop.idc.gcsci.net/index.php?s=wx/task/load_task',
      method:'post',
      dataType:'json',
      success: function(res) {
      }
    })
  },
  components: {
    'mp-mineCard':mineCard
  }
}
</script>

<style scoped>
.list{
  background-color: #fff;
  width: 750rpx;
  overflow: hidden;
  padding: 16rpx 30rpx 30rpx 30rpx;
  box-sizing: border-box;
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-between;
  align-items: center;
  font-size: 30rpx;
  color: #333;
  border-bottom: 1px solid #eee;
}
.list li{
  width: 50%;
}
.icon-order{
  width: 28rpx;
  height: 32rpx;
  margin-right: 12rpx;
}
.icon-all{
  width: 18rpx;
  height: 32rpx;
  margin-left: 12rpx;
}
.text-box{
  display: flex;
  flex-flow: nowrap row;
  justify-content: flex-start;
  align-items: center;
}
.text-box2{
  display: flex;
  flex-flow: nowrap row;
  justify-content: flex-end;
  align-items: center;
}
.icon-list{
  background-color: #fff;
  border-bottom: 12rpx solid #f5f5f5;
  width: 750rpx;
  padding: 26rpx 20rpx;
  box-sizing: border-box;
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
.icon-list li{
  font-size: 25rpx;
  color: #666;
  display: flex;
  flex-flow: wrap row;
  align-items: center;
}
.icon-list li div,.icon-list li p{
  width: 100%;
}
.bottom-item{
  width: 750rpx;
  padding: 36rpx 30rpx;
  box-sizing: border-box;
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1rpx solid #f5f5f5;
  font-size: 30rpx;
  color: #333;
}
.bottom-item-a{
  width: 750rpx;
}
.bottom-item>div{
  width: 300rpx;
  display: flex;
  flex-flow: nowrap row;
  justify-content: flex-start;
  align-items: center;
}
.bottom-icon-img{
  margin-right: 20rpx;
}
.icon-img{
  margin: 0 auto;
  margin-bottom: 12rpx;
}
.mine-a{
  width: 30%;
}
.mine-dingdan-a{
  width: 50%;
}
</style>
