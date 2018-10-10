<template>
  <div>
    <div class="zhanwei"></div>
    <ul class="bottom-cart-box">
      <li class="goods-num" @click="toCart()">
          <div class="goods-num-box">
            <img src="../assets/image/shopping@2x.png" alt="">
            <span class="weui-badge weui-badge_dot item-num">{{goodsNum}}</span>
          </div>
      </li>
      <li class="add-in-cart" @click="showModal('cart')">加入购物车</li>
      <li class="buy-now" @click="showModal('buyNow')">立即购买</li>
    </ul>
    <div class="chooseNumModal" :style="{'opacity':opacity,'display':display,'transition':transition}" @click="closeModal()">
      <div class="chooseNumCard" @click.stop="theNum()">
        <div class="gibc-close" @click="closeModal()">X</div>
        <div class="gibc-goods-box flex-flex-start">
          <img :src="goodsInfo.album_pictures[0]" class="gibc-img">
          <div>
            <p class="overhidden2 gibc-goodsName">{{goodsInfo.goods_name}}</p>
            <p class="gibc-text-danjia">单价：￥{{goodsInfo.price}}</p>
          </div>
        </div>
        <div class="flex-space-between">
          <p class="gibc-text-num">购买数量：</p>
          <div class="gibc-num-box flex-space-between">
            <div class="gibc-reduce-btn" @click="reduce()">-</div>
            <div class="gibc-num">{{num}}</div>
            <div class="gibc-add-btn" @click="add()">+</div>
          </div>
        </div>
        <p class="gibc-text">合计：{{finallyPrice}}</p>
        
        <div class="gibc-submit" @click.stop="submitGoods()">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      display: 'none',
      opacity: 0,
      transition: '.2s',
      num: 1,          //购买商品数量
      goodsNum: '',          //购物车商品数量
      goodsInfo:{album_pictures:[]},     //商品信息
      type: 'cart'      //判断是加入购物车还是立即购买
    }
  },
  props:['goodsId'],
  computed:{
    finallyPrice(){
      var totalPrice = (this.num * Number(this.goodsInfo.price)).toFixed(2)
      return totalPrice
    }
  },
  watch:{
    goodsId(){
      var that = this
      that.$http.post({
          url:"/wx/index/getGoodsDetail",
          dataType:'json',
          data:{
            gid: that.goodsId.id
          }
      })
      .then(res =>{
          that.goodsInfo = res.data
      })
    }
  },
  mounted(){
    this.getCartNum()
  },
  methods: {
    getCartNum(){
      var that =this
      //获取购物车内的商品数量
      that.$http.post({
          url:"/wx/member/getCartInfo",
          dataType:'json',
          data:{}
      })
      .then(res =>{
          that.goodsNum = 0
          for(let i=0;i<res.data.length;i++){
            that.goodsNum += res.data[i].num
          }
      })
    },
    submitGoods(){
      var that = this
      if(this.type == 'cart'){
        that.$http.post({
            url:"/wx/member/addCart",
            dataType:'json',
            data:{
              goods_id: that.goodsInfo.goods_id,
              num: that.num
            }
        })
        .then(res =>{
          if(res.info == 'success' && res.code == 0){
            wx.showToast({
              title: '添加至购物车',
              icon: 'success',
              duration: 2000
            })
            setTimeout(() => {
              that.closeModal()
              that.getCartNum()
            }, 2000)
          }
        })
      }else if(this.type == 'buyNow'){
        var theAllNum = this.num
        
        wx.navigateTo({
          url: '/pages/queRenDingDan/main?theAllNum='+theAllNum+'&&goodsIds='+(that.goodsInfo.goods_id).toString()+'&&numArr='+theAllNum
        })
      }
    },
    add(){
      this.num++
    },
    reduce(){
      if(this.num==1){
        return false
      }else{
        this.num--
      }
    },
    theNum(){
      //取消事件冒泡
    },
    toCart(){
      wx.switchTab({
        url: '/pages/cart/main'
      })
    },
    closeModal(){
      this.opacity = 0
      setTimeout(()=>{
        this.display = 'none'
      },200)
      this.$emit('pageDown')
    },
    showModal(type){
      this.type = type
      this.transition = 0
      this.display = 'block'
      setTimeout(()=>{
        this.transition = '.3s'
        this.opacity = 1
      },70)
      this.$emit('noDown')
    }
  }
}
</script>

<style>
.gibc-close{
  width: 50rpx;
  height: 50rpx;
  border-radius: 30rpx;
  color: #000;
  border: 1px solid #000;
  line-height: 50rpx;
  text-align: center;
  position: absolute;
  right: 30rpx;
  top: 20rpx;
  opacity: 0.3;
}
.chooseNumModal{
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  transition: .2s;
  z-index: 1000;
  display: none;
}
.chooseNumCard{
  width: 100vw;
  height: 70vh;
  box-sizing: border-box;
  border-radius: 20rpx 20rpx 0 0;
  background-color: #fff;
  padding: 30rpx;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1001;
}
.gibc-goods-box{
  margin: 40rpx 0;
  width: 100%;
  box-sizing: border-box;
  font-size: 30rpx;
  color: #333;
  margin-bottom: 60rpx;
}
.gibc-img{
  width: 200rpx;
  height: 200rpx;
}
.gibc-goodsName{
  margin-top: 16rpx;
  width: 440rpx;
  margin-left: 30rpx;
}
.gibc-num-box{
  width: 300rpx;
  font-size: 30rpx;
  color: #333;
}
.gibc-reduce-btn{
  width: 44rpx;
  height: 44rpx;
  border: 2rpx solid #999;
  border-radius: 30rpx;
  line-height: 38rpx;
  text-align: center;
  color: #18c136;
  font-weight: bold;
  font-size: 40rpx;
}
.gibc-add-btn{
  width: 48rpx;
  height: 48rpx;
  border-radius: 30rpx;
  line-height: 42rpx;
  text-align: center;
  background-color: #18c136;
  color: #fff;
  font-weight: bold;
  font-size: 40rpx;
}
.gibc-submit{
  width: 750rpx;
  height: 90rpx;
  line-height: 90rpx;
  background-color: #18c136;
  color: #fff;
  font-size: 34rpx;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
}
.bottom-cart-box{
  position: fixed;
  left: 0;
  background-color: #fff;
  bottom: 0;
  width: 750rpx;
  display: flex;
  height: 98rpx;
  flex-flow: nowrap row;
  justify-content: flex-start;
  align-items: center;
  font-size: 36rpx;
  text-align: center;
  line-height: 98rpx;
  z-index: 999;
}
.goods-num{
  position: relative;
  width: 230rpx;
  height: 98rpx;
}
.add-in-cart{
  width: 260rpx;
  height: 98rpx;
  background-color: #ffddd4;
  color: #fd5933;
}
.buy-now{
  width: 260rpx;
  height: 98rpx;
  background-color: #fd5933;
  color: #fff;
}
.goods-num-box{
  width: 45rpx;
  height: 43rpx;
  position: absolute;
  left: 50%;
  top: 28rpx;
  transform: translate(-50%);
}
.goods-num-box img{
  width: 45rpx;
  height: 43rpx;
  position: absolute;
  left: 0;
  top: 0;
}
.item-num{
  width: 16rpx;
  height: 16rpx;
  border-radius: 50rpx;
  position: absolute;
  right: -20rpx;
  top:  -16rpx;
  line-height: 16rpx;
}
.zhanwei{
    width: 750rpx;
    height: 98rpx;
}
.gibc-text{
  margin: 40rpx 0;
}
.gibc-text-num{
  font-size: 28rpx;
}
.gibc-text-danjia{
  font-size: 28rpx;
  text-align: right;
  margin-top: 40rpx;
}
</style>
