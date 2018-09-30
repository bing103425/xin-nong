<template>
  <div>
    <div v-for="(item,index) in fenxiangData" :key="index">
      <div class="flex-space-between fenxiao-list-info">
        <p>{{item.creat_time}}</p>
        <p class="daifenxiao">{{item.is_fx_status}}</p>
      </div>
      <div class="flex-flex-start fenxiao-content-card" v-for="(innerItem,innerIndex) in item.order_goods" :key="innerIndex">
        <img :src="'http://xcx_cx_cx_shop.idc.gcsci.net/'+innerItem.pic.pic_cover_small" class="fenxiao-img">
        <p class="fenxiao-goods-name">{{innerItem.goods_name}}</p>
      </div>
      <div class="flex-space-between fenxiao-list-btn">
        <mp-priceCart size="30" :redPrice="item.order_money"></mp-priceCart>
      </div>
    </div>
  </div>
</template>

<script>
import priceCart from '@/components/priceCart'
export default {
  props: ['fenxiangData'],
  components: {
    'mp-priceCart': priceCart
  }
}
</script>

<style>
.fenxiao-list-info{
  width: 750rpx;
  padding: 0 30rpx;
  height: 94rpx;
  font-size: 24rpx;
  color: #999;
  border-bottom: 1px solid #f5f5f5;
}
.daifenxiao{
  font-size: 28rpx;
  color: #333;
}
.fenxiao-content-card{
  padding: 20rpx 30rpx;
  border-bottom: 1px solid #f5f5f5;
}
.fenxiao-img{
  width: 120rpx;
  height: 120rpx;
  margin-right: 34rpx;
}
.fenxiao-goods-name{
  text-align: left;
  width: 530rpx;
  color: #333;
  font-size: 28rpx;
  overflow: hidden;
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
}
.fenxiao-list-btn{
  width: 750rpx;
  padding: 0 30rpx;
  height: 98rpx;
  font-size: 28rpx;
  color: #ff0101;
  border-bottom: 4px solid #f5f5f5;
}
.quxiaodingdan-btn{
  box-sizing: border-box;
  height: 64rpx;
  line-height: 60rpx;
  width: 170rpx;
  border: 1px solid #999;
  border-radius: 8rpx;
  text-align: center;
  color: #999;
  margin-right: 14rpx;
}
.fenxiao-btn{
  box-sizing: border-box;
  height: 64rpx;
  line-height: 60rpx;
  width: 170rpx;
  border: 1px solid #ff0101;
  border-radius: 8rpx;
  text-align: center;
}
</style>
