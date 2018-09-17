<template>
  <div class="copage">
    <ul>
        <li class="flex-space-between co-item" v-for="(item,index) in goodsInfo" :key="index" @click="toDetail(item.goods_id)">
            {{goodsInfo.goods_name}}
            <img :src="item.picture_info.pic_cover_small" alt="" class="co-img">
            <p class="co-des-text overhidden2">{{item.goods_name}}</p>
            <div class="co-price-box">
                <p>￥{{item.goods_money}}</p>
                <p>x{{item.num}}</p>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:['goodsInfo'],
  methods: {
    toDetail(goodsId){
        console.log(goodsId)
      wx.redirectTo({
        url: '/pages/goods/main?id='+goodsId
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
    height: 220rpx;
    padding: 30rpx 30rpx;
    box-sizing: border-box;
    border-bottom: 2rpx dashed #eee;
    background-color: #fff;
	align-items: flex-start;
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
</style>
