<template>
  <div class="container">
    <div class="banner-box">
      <swiper indicator-dots="true" autoplay="true" class="banner-picture">
        <block v-for="(item,index) in imgUrls" :key="index">
          <swiper-item>
            <image :src="item.adv_image" class="slide-image banner-picture"/>
          </swiper-item>
        </block>
      </swiper>
      <img src="../../assets/image/banner_1@2x.png" alt="" class="banner-bottom-bolang">
    </div>
    <mp-threeTips></mp-threeTips>
    <mp-title>每日时令</mp-title>
    <mp-indexCard :indexCardData="indexCardData"></mp-indexCard>
    <div class="bottom-box">
      <mp-title>热卖商品</mp-title>
      <ul class="goods-list">
        <li v-for="(item,index) in goodsList" :key="index" class="goods-item clearfix" @click="toDetailPage(item.goods_id)">
          <img :src="item.pic_cover_mid" class="goods-list-img" alt="">
          <p class="goods-list-text">{{item.goods_name}}</p>
          <mp-priceCart size="28" :redPrice="item.price" :goodsId="item.goods_id"></mp-priceCart>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import priceCart from '@/components/priceCart'
import indexCard from '@/components/indexCard'
import title from '@/components/title'
import threeTips from '@/components/threeTips'

export default {
  data () {
    return {
      goodsList:[],
      imgUrls: [],
      indexCardData:[]
    }
  },
  computed: {
    token () {
      return this.$store.state.token
    }
  },

  components: {
    'mp-priceCart': priceCart,
    'mp-indexCard': indexCard,
    'mp-title': title,
    'mp-threeTips': threeTips
  },

  methods: {
    toDetailPage(goodsId){
      wx.redirectTo({
        url: '/pages/goods/main?id='+goodsId
      })
    }
  },

  mounted(){
    var that = this
    //获取Banner图
    wx.request({
      url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/index/getIndexAdv',
      method:'post',
      dataType:'json',
      success: function(res) {
        that.imgUrls = res.data.data.adv_list
        // var str = res.data.data
        // str.forEach(item => {
        //   //时间戳转换正常日期
        //   item.description = item.description.replace(regExp ,'http://xcx_cx_cx_shop.idc.gcsci.net'+regExp.exec( item.description)[0])
        // })
        // that.goodsRichText = str
      }
    })
    
    //获取热销商品列表
    wx.request({
      url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/index/getHotGoods',
      method:'post',
      dataType:'json',
      success: function(res) {
        that.goodsList = res.data.data
      }
    })
    //获取推荐商品列表
    wx.request({
      url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/index/getRecommendedGoods',
      method:'post',
      dataType:'json',
      success: function(res) {
        that.indexCardData = res.data.data
      }
    })
  }
}
</script>

<style scoped>
.banner-box{
  width: 750rpx;
  height: 415rpx;
  position: relative;
}
.banner-picture{
  width: 750rpx;
  height: 415rpx;
  position: absolute;
  top: 0;
  left: 0;
}
.banner-bottom-bolang{
  width: 750rpx;
  height: 50rpx;
  position: absolute;
  bottom: 0;
  left: 0;
}
.goods-list{
  background-color: #fff;
  padding: 0 30rpx 10rpx 30rpx;
  box-sizing: border-box;
}
.goods-list-img{
  height: 690rpx;
  margin-bottom: 24rpx;
}
.goods-list-text{
  color: #333;
  font-size: 32rpx;
  overflow: hidden;
  margin-bottom: 22rpx;
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
}
.goods-item{
  margin-bottom: 34rpx;
}
.goods-item:nth-last-child(1){
  margin-bottom: none;
}
</style>
