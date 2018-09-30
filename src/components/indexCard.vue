<template>
  <div>
    <scroll-view class="index-view-box" scroll-x>
      <ul class="middle-card clearfix" :style="{width:width}">
        <li class="middle-card-li pull-left clearfix" v-for="(item,index) in indexCardData" :key="index" @click="toDetailPage(item.goods_id)">
          <div class="card-image pull-left">
            <img :src="item.pic_cover_mid" alt="">
          </div>
          <div class="pull-left">
            <p class="goods-name">{{item.goods_name}}</p>
            <mp-priceCart size="26" yuanjia="true" :redPrice="item.price" :yuanjiaPrice="item.market_price" :goodsId="item.goods_id"></mp-priceCart>
          </div>
        </li>
      </ul>
    </scroll-view>
  </div>
</template>

<script>
import priceCart from '@/components/priceCart'
export default {
  props: ['indexCardData'],
  computed:{
    width(){
      return (this.indexCardData.length)*560 + 30 +'rpx'
    }
  },
  components:{
    'mp-priceCart': priceCart
  },
  methods:{
    toDetailPage(goodsId){
      wx.navigateTo({
        url: '/pages/goods/main?id='+goodsId
      })
    }
  }
}
</script>

<style>
.index-view-box{
  width: 750rpx;
  margin-bottom: 20rpx;
}
.middle-card{
  background-color: #fff;
  padding: 20rpx 30rpx;
  /* box-sizing: border-box; */
  overflow: visible;
  height: 238rpx;
}
.middle-card-li{
  width: 554rpx;
  box-sizing: border-box;
  padding: 10rpx;
  box-shadow:  0 0 12rpx rgba(0, 0, 0, 0.1);
  margin-right: 40rpx;
}
.middle-card-li:nth-last-child(1){
  margin-right: 0;
}
.card-image{
  width: 218rpx;
  height: 218rpx;
  border-radius: 4rpx;
  overflow: hidden;
  margin-right: 15rpx;
}
.card-image image{
  width: 218rpx;
  height: 218rpx;
}
.goods-name{
  width: 300rpx;
  margin-top: 20rpx;
  font-size: 26rpx;
  color: #333;
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  margin-bottom: 80rpx;
}
</style>
