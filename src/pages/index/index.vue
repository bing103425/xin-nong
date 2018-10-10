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
        <li class="all100">
          <p v-if="isNextPage" class="all-more">上拉加载更多</p>
          <p v-else class="all-nomore">我是有底线的</p>
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
      goodsList:[],    //【热卖商品】列表
      imgUrls: [],
      indexCardData:[],       //横向滚动的【每日时令】数据列表
      page: 1,      //分页
      isNextPage: true      //是否还有下一页
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

  //上拉加载更多
  onReachBottom() {
    var that = this 
    if(that.isNextPage){
      // 显示加载图标
      wx.showLoading({
        title: '玩命加载中'
      })
      // 页数+1
      that.$http.post({
          url:"/wx/index/getHotGoods",
          dataType:'json',
          data:{
            p: that.page
          }
      })
      .then(res =>{
        wx.hideLoading()
        that.goodsList = that.goodsList.concat(res.data.hot_list)
        if(res.data.list_page == that.page){
          that.isNextPage = false
        }
        that.page++
      })
    }
  },
  methods: {
    toDetailPage(goodsId){
      wx.navigateTo({
        url: '/pages/goods/main?id='+goodsId
      })
    }
  },

  mounted(){
    var that = this
    
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length-1] //获取当前页面的对象
    var options = currentPage.options
    console.log('二维码获取',decodeURIComponent(options.uid))
    
    //获取Banner图
    that.$http.post({
      url:"/wx/index/getIndexAdv",
      dataType:'json'
    })
    .then(res =>{
      that.imgUrls = res.data.adv_list
    })
    //获取热销商品列表
    that.$http.post({
      url:"/wx/index/getHotGoods",
      dataType:'json'
    })
    .then(res =>{
      that.goodsList = res.data.hot_list
      if(res.data.list_page == that.page){
        that.isNextPage = false
      }
      that.page++
    })
    //获取推荐商品列表
    that.$http.post({
      url:"/wx/index/getRecommendedGoods",
      dataType:'json'
    })
    .then(res =>{
      that.indexCardData = res.data
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
.all-more{
  margin: 40rpx;
  text-align: center;
  position: relative;
  left: -10rpx;
  font-size: 24rpx;
  color: #0095e0;
  text-decoration: underline;
}
.all-nomore{
  margin: 40rpx;
  text-align: center;
  position: relative;
  left: -10rpx;
  font-size: 24rpx;
  color: #999;
}
.all100{
  width: 100%;
}
</style>
