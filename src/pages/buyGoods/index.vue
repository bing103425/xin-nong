<template>
  <div class="con-tainer">
    <div class="bg-top-box flex-space-between">
      <div class="bg-top-first-box">
        <div class="bg-top-text-box flex-flex-start">
          <p class="bg-name">神笔马里奥</p>
          <p class="bg-tel">13968455475</p>
        </div>
        <div class="bg-top-second-box flex-flex-start">
          <div class="bg-dizhi-btn">自己</div>
          <p>浙江省杭州市</p>
        </div>
      </div>
      <img src="../../assets/image/more@2x.png" class="bg-icon-all">
    </div>
    <img src="../../assets/image/bj2@2x.png" class="bg-img-bg">
    <div class="bg-border-bottom"></div>
    <div class="spxq-title">商品详情</div>
    <div class="spxq-info flex-flex-start">
      <img src="http://wx1.sinaimg.cn/mw690/0060lm7Tly1fug5qtnh96j309t09tjuk.jpg" class="spxq-info-img">
      <div class="spxq-info-div">
        <p class="spxq-info-goodname">临安天目山小香薯5斤 新鲜小红薯板栗小番薯农家自种山芋地瓜紫薯</p>
        <mp-priceCart size="24" redPrice="30"></mp-priceCart>
      </div>
    </div>
    <div class="spxq-title">订单信息</div>
    <div class="spxq-dingdan-info">
      <p>订单编号：201809036588411225814</p>
      <p>创建时间：2018-08-06 09:45:06</p>
    </div>

    <div class="spxq-title flex-space-between">
      <p>商品总价</p>
      <p>￥33</p>
    </div>
    <div class="spxq-title flex-space-between">
      <p>运费</p>
      <p>免邮</p>
    </div>
    <div class="spxq-title flex-space-between">
      <p></p>
      <p class="red-text">合计  ￥33</p>
    </div>
    <div class="zf-btn">支付</div>
  </div>
</template>

<script>
import priceCart from '@/components/priceCart'
export default {
  data() {
    return {
    }
  },
  computed:{
  },
  methods: {
  },
  components:{
    'mp-priceCart': priceCart
  }
}
</script>

<style>
.bg-top-box{
  width: 750rpx;
  height: 170rpx;
  padding: 0 30rpx;
}
.bg-img-bg{
  width: 750rpx;
  height: 8rpx;
}
.bg-border-bottom{
  width: 750rpx;
  height: 12rpx;
  border-bottom: 16rpx solid #f5f5f5;
}
.bg-icon-all{
  width: 18rpx;
  height: 33rpx;
}
.bg-top-text-box{
  font-size: 32rpx;
  color: #333;
}
.bg-name{
  margin-right: 34rpx;
}
.bg-dizhi-btn{
  width: 84rpx;
  height: 44rpx;
  line-height: 44rpx;
  text-align: center;
  border-radius: 6rpx;
  margin-right: 20rpx;
  border: 1rpx solid #eaba00;
  color: #eaba00;
}
.bg-top-second-box{
  margin-top: 20rpx;
  color: #999;
  font-size: 28rpx;
}
.spxq-title{
  width: 750rpx;
  height: 94rpx;
  line-height: 94rpx;
  box-sizing: border-box;
  padding: 0 30rpx;
  font-size: 28rpx;
  color: #000;
  border-bottom: 2rpx solid #f5f5f5;
}
.spxq-info{
  width: 750rpx;
  padding: 30rpx;
  border-bottom: 14rpx solid #f5f5f5;
}
.spxq-info-img{
  width: 120rpx;
  height: 120rpx;
  margin-right: 40rpx;
}
.spxq-info-div{
  width: 530rpx;
}
.spxq-info-goodname{
  font-size: 26rpx;
  color: #333;
  overflow: hidden;
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
}
.spxq-dingdan-info{
  width: 750rpx;
  box-sizing: border-box;
  padding: 22rpx 30rpx;
  font-size: 24rpx;
  color: #999;
  line-height: 60rpx;
  border-bottom: 14rpx solid #f5f5f5;
}
.zf-btn{
  width: 540rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  color: #fff;
  font-size: 36rpx;
  margin: 0 auto;
  margin-top: 60rpx;
  border-radius: 6rpx;
  background-color: #fe5933;
}
</style>