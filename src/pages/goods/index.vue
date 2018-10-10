<template>
  <div class="container" :style="{width:'100%',height:height,overflow:overflow}">
      <div class="swiper-banner-box">
        <swiper :indicator-dots="indicator" :autoplay="autoplay" @change="swiperChange" class="swiper-banner-box">
          <block v-for="(item,index) in goodsInfo.album_pictures" :key="index">
            <swiper-item>
              <image :src="item" class="slide-image swiper-banner-box"/>
            </swiper-item>
          </block>
        </swiper>
        <div class="num">{{index}} / {{length}}</div>
      </div>

      <div class="goods-info-box">
        <p class="goods-name">{{goodsInfo.goods_name}}</p>
        <mp-priceCart size="38" :redPrice="360.00"></mp-priceCart>
      </div>
      <mp-threeTips></mp-threeTips>
      <div class="bottom-box-div">
        <div class="background-white"></div>
        <div class="weui-tab">
          <div class="weui-navbar">
            <block v-for="(item,index) in tabs" :key="index">
              <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
                <div class="weui-navbar__title">{{item}}</div>
              </div>
            </block>
            <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
          </div>
          <div class="weui-tab__panel">
            <div class="weui-tab__content" :hidden="activeIndex != 0">
              <div class="content1">
                <div class="rich-text">
                  <mp-wxParse :content="goodsInfo.description" />
                </div>
              </div>
            </div>

            <div class="weui-tab__content" :hidden="activeIndex != 1">
              <mp-pingLunList :pingLunData="pingLunData"></mp-pingLunList>
            </div>
          </div>
        </div>
      </div>

    <mp-goodsIndexbottomCart :goodsId="goodsId" @pageDown="pageDown()" @noDown="noDown(aa)"></mp-goodsIndexbottomCart>
  </div>
</template>

<script>
import wxParse from 'mpvue-wxparse'
import goodsIndexbottomCart from '@/components/goodsIndexbottomCart'
import threeTips from '@/components/threeTips'
import pingLunList from '@/components/pingLunList'
import priceCart from '@/components/priceCart'
export default {
  data () {
    return {
      length:'',
      page: 1,
      goodsInfo:{album_pictures:[]},
      indicator:false,
      autoplay:false,
      index:'1',
      tabs: ["商品详情", "商品评论"],
      activeIndex: 0,
      goodsId: '',    //url参数
      pingLunData:[],
      isNextPage:'',       //评论列表是否还有下一页
      height:'',       //限制高度
      overflow:''       //禁止页面下拉
    }
  },
  components:{
    'mp-goodsIndexbottomCart': goodsIndexbottomCart,
    'mp-threeTips': threeTips,
    'mp-pingLunList': pingLunList,
    'mp-priceCart': priceCart,
    'mp-wxParse': wxParse
  },
  mounted(){
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length-1] //获取当前页面的对象
    this.goodsId = currentPage.options
    var that = this
    that.goodsInfo = []
    that.activeIndex = 0
    that.pingLunData = []
    var regExp = /\/upload.*?\jpg/g

    that.$http.post({
        url:"/wx/index/getGoodsDetail",
        dataType:'json',
        data:{
          gid: that.goodsId.id
        }
    })
    .then(res =>{
      if(regExp.exec( res.data.description)){
        res.data.description = res.data.description.replace(regExp ,'http://xcx_cx_cx_shop.idc.gcsci.net'+regExp.exec( res.data.description)[0])
      }
      that.goodsInfo = res.data
      that.length = res.data.album_pictures.length
    })


  },
  computed: {
    navbarSliderClass() {
      if (this.activeIndex == 0) {
        return 'weui-navbar__slider_0'
      }
      if (this.activeIndex == 1) {
        return 'weui-navbar__slider_1'
      }
    }
  },
  //上拉加载更多
  onReachBottom() {
    var that = this 
    if(that.isNextPage && that.activeIndex == 1){
      // 显示加载图标
      console.log(that.page)
      wx.showLoading({
        title: '玩命加载中'
      })
      // 页数+1
      that.$http.post({
          url:"/wx/index/getGoodsEvaluate",
          dataType:'json',
          data:{
            p: that.page
          }
      })
      .then(res =>{
        wx.hideLoading()
        that.pingLunData = that.pingLunData.concat(res.data.list)
        if(res.data.list_page == that.page){
          that.isNextPage = false
        }
        that.page++
      })
    }
  },
  //分享给好友
  onShareAppMessage: function () {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const url = currentPage.route
    const options = currentPage.options
    let urlWithArgs = `/${url}?`
    for (let key in options) {
      const value = options[key]
      urlWithArgs += `${key}=${value}&`
    }
    //页面路由及参数
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
    
    return {
      title: '分享页面',
      desc: '描述描述',
      path: urlWithArgs
    }
  },

  methods: {
    noDown(){
      this.height = '100vh'
      this.overflow = 'hidden'
      console.log('pageOpen')
    },
    pageDown(){
      console.log('pageDown')
      this.height = ''
      this.overflow = ''
    },
    swiperChange(e) {
      this.index = e.mp.detail.current + 1
    },
    tabClick(e) {
      this.activeIndex = e.currentTarget.id
      var that = this
      if(e.currentTarget.id == 1&&that.pingLunData == ''){
        that.$http.post({
            url:"/wx/index/getGoodsEvaluate",
            dataType:'json',
            data:{
              gid: that.goodsId.id
            }
        })
        .then(res =>{
          that.pingLunData = res.data.list
          if(res.data.list_page == that.page){
            that.isNextPage = false
          }
          that.page++
        })
      }
    }
  }
}
</script>

<style scoped>
.swiper-banner-box{
  width: 750rpx;
  height: 750rpx;
  position: relative;
}
.num{
  width: 74rpx;
  height: 38rpx;
  text-align: center;
  line-height: 38rpx;
  background-color: #b5b6b7;
  color: #fff;
  border-radius: 30rpx;
  position: absolute;
  right: 26rpx;
  bottom: 12rpx;
  font-size: 20rpx;
}
.goods-info-box{
  width: 100%;
  padding: 36rpx 36rpx 10rpx 36rpx;
  box-sizing: border-box;
  background-color: #fff;
}
.goods-name{
  color: #333;
  font-size: 32rpx;
  margin-bottom: 60rpx;
}
page,.page,.page__bd {
  height: 100%;
}
.page__bd {
  padding-bottom: 0;
}
.weui-tab__content {
  padding-top: 20rpx;
  text-align: center;
}
.weui-navbar__slider_0 {
  left: 116rpx;
  transform: translateX(0);
}
.weui-navbar__slider_1 {
  left: 116rpx;
  transform: translateX(376rpx);
}
.content1{
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  font-size: 30rpx;
  color: #999;
  line-height: 50rpx;
  background-color: #fff;
}
.list-paddingleft-2{
  width: 100%;
  box-sizing: border-box;
  padding-left: 30rpx;
}
.bottom-box-div{
  width: 750rpx;
  position: relative;
}
.background-white{
  width: 750rpx;
  height: 120rpx;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
}
img{
  height: 300rpx;
}
</style>
