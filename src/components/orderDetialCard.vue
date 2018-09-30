<template>
  <div class="copage">
    <ul>
        <li class="co-item" v-for="(item,index) in goodsInfo" :key="index" @click="toDetail(item.goods_id)">
          <div class="flex-space-between co-item-div">
            <img :src="item.picture_info.pic_cover_small" alt="" class="co-img">
            <p class="co-des-text overhidden2">{{item.goods_name}}</p>
            <div class="co-price-box">
                <p>￥{{item.goods_money}}</p>
                <p>x{{item.num}}</p>
                <p v-if="(status == 1 ||status == 2 ||status == 3 )&& item.refund_status == 0" class="odc-tuihuo" @click.stop="toBackMoneyPage(item.order_goods_id)">我要退款</p>
                <p v-else-if="item.refund_status !== 0" class="odc-tuihuo-disable">{{item.refund_status_name}}</p>
            </div>
          </div>
          <p v-if="item.refund_status == 5" class="co-real_money">实际退款金额：{{item.refund_real_money}}</p>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:['goodsInfo','status'],
  methods: {
    toDetail(goodsId){
      wx.redirectTo({
        url: '/pages/goods/main?id='+goodsId
      })
    },
    toBackMoneyPage(orderGoodsId){
      wx.redirectTo({
        url: '/pages/tuiHuoZhong/main?order_goods_id='+orderGoodsId
      })
    }
  }
}
</script>

<style>
.copage{
    background-color: #fff;
}
.co-item{
  width: 750rpx;
  border-bottom: 2rpx dashed #eee;
  background-color: #fff;
}
.co-item-div{
  width: 750rpx;
  height: 210rpx;
  padding: 30rpx 30rpx 0 30rpx;
  box-sizing: border-box;
	align-items: flex-start;
}
.co-real_money{
  position: relative;
  top: -10rpx;
  font-size: 28rpx;
  color:#ff0000;
  width: 750rpx;
  padding: 0 30rpx;
  box-sizing: border-box;
  text-align: right;
}
.co-img{
    width: 150rpx;
    height: 150rpx;
}
.co-des-text{
    font-size: 30rpx;
    color: #666;
    width: 340rpx;
	-webkit-line-clamp:3;
}
.co-price-box{
    font-size: 30rpx;
    color: #333;
    text-align: right;
    font-weight: bold;
}
.odc-tuihuo{
  font-size: 30rpx;
  color: #0095e0;
  text-decoration: underline;
  font-weight: 500;
}
.odc-tuihuo-disable{
  font-size: 30rpx;
  color: #999;
  font-weight: 500;
}
</style>
