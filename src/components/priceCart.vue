<template>
  <div>
    <div class="box" v-if="size == '24'">
      <p class="red-text price pull-left"><span> ￥ </span> <span class="big-text26"> {{newPrice[0]}} </span> <span>.{{newPrice[1]}} </span></p>
    </div>
    <div class="box" v-if="size == '26' && yuanjia == 'true'">
      <div class="name-text-box">
        <p class="red-text price pull-left">￥<span class="big-text26"> {{newPrice[0]}} </span>.{{newPrice[1]}} </p>
        <p class="yuanjia pull-left">{{yuanjiaPrice}}</p>
      </div>
      <img src="../assets/image/shopping_00@2x.png" class="cart-icon" alt="" @click.stop="indexOrderList(goodsId)">
    </div>
    <div class="box" v-if="size == '28'">
      <p class="red-text price">￥<span class="big-text28"> {{newPrice[0]}} </span>.{{newPrice[1]}} </p>
      <div class="cart-icon-box" @click.stop="indexOrderList(goodsId)">
        <img src="../assets/image/shopping_00@2x.png" class="cart-icon pull-right">
      </div>
    </div>
    <div class="box" v-if="size == '30'">
      <p class="red-text price">￥<span class="big-text30"> {{newPrice[0]}} </span>.{{newPrice[1]}} </p>
    </div>
    <div class="box" v-if="size == '38'">
      <p class="red-text price">￥<span class="big-text38"> {{newPrice[0]}} </span>.{{newPrice[1]}} </p>
      <button open-type="share" class="pc-share-btn">
        <img src="../assets/image/share@2x.png" class="camera-icon pull-left">
        <span class="fenxiang pull-left">分享</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  props:['size','yuanjia','redPrice','goodsId','yuanjiaPrice'],
  computed:{
    newPrice(){
      var str = Number(this.redPrice).toFixed(2).toString()
      return str.split('.')
    }
  },
  methods:{
    indexOrderList(goodsId){
      var that = this
      that.$http.post({
          url:"/wx/member/addCart",
          dataType:'json',
          data:{
            goods_id: goodsId,
            num: 1
          }
      })
      .then(res =>{
          if(res.code == 0 && res.info == 'success'){
            wx.showToast({
              title: '添加至购物车',
              icon: 'success',
              duration: 2000
            })
          }
      })
    }
  }
}
</script>

<style>
.pc-share-btn{
  background: none;
  border: none;
  padding: 0;
  position: static;
  border-radius: 0;
  margin: 0;
}
.box{
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-flow: nowrap row;
    justify-content: space-between;
    align-items: center;
}
.price{
  font-size: 22rpx;
  font-weight: bold;
  margin-right: 12rpx;
}
.big-text26{
  font-size: 26rpx;
}
.big-text28{
  font-size: 30rpx;
}
.big-text30{
  font-size: 30rpx;
}
.big-text38{
  font-size: 38rpx;
}
.cart-icon{
  width: 40rpx;
  height: 40rpx;
}
.fenxiang{
  font-size: 24rpx;
  color: #ccc;
  line-height: 28rpx;
  margin-left: 12rpx;
}
.yuanjia{
  font-size: 20rpx;
  color: #aaa;
  text-decoration: line-through;
  line-height: 44rpx;
}
.name-text-box{
  width: 70%;
  height: 40rpx;
  line-height: 40rpx;
}
.camera-icon{
  width: 38rpx;
  height: 28rpx;
}
.cart-icon-box{
  height: 48rpx;
  width: 60rpx;
}
</style>
