<template>
  <div class="container">
    
    <scroll-view class="scroll-view_H " :scroll-x="sdf" style="height:94rpx">
      <ul class="top-tab-box" :style="'width:'+tabWidth+'rpx'">
        <li v-for="(item,index) in tabData" :key="index" :class="{ 'active' : active == index}" @click="changeTabIndex(item.cid,index)">{{item.cname}}</li>
        <div class="all-active" :style="'left:'+activeLineLeft+'rpx'"></div>
      </ul>
    </scroll-view>
    <div class="all-zhanwei"></div>
    <ul class="content-box">
      <li class="goods-list" v-if="goodsList" v-for="(item,index) in goodsList" :key="index" @click="toDetailPage(item.goods_id)">
        <img :src="item.pic_cover_mid" alt="" class="goods-item-img">
        <div class="textbox">
          <p class="text">{{item.goods_name}}</p>
          <mp-priceCart size="28" :redPrice="item.price" :goodsId="item.goods_id"></mp-priceCart>
        </div>
      </li>
      <div v-if="goodsList.length" class="all100">
        <p v-if="isNextPage" class="all-more">上拉加载更多</p>
        <p v-else class="all-nomore">我是有底线的</p>
      </div>
      <li v-if="isHasContent" class="all-no-content">啊呀，暂无内容~</li>
    </ul>
  </div>
</template>

<script>
import priceCart from '@/components/priceCart'

export default {
  data () {
    return {
      tabWidth: 750,
      activeLineLeft: 0,
      sdf:true,
      goodsList:[],
      active:0,
      tabData:[],
      page: 1,      //分页
      isNextPage: true,      //是否还有下一页
      isHasContent: false
    }
  },

  components: {
    'mp-priceCart': priceCart
  },

  methods: {
    //跳转商品详情页
    toDetailPage(goodsId){
      wx.navigateTo({
        url: '/pages/goods/main?id='+goodsId
      })
    },
    //请求全部商品列表
    initGoodsList(){
      var that = this
      that.isHasContent = false
      if(that.isNextPage){
        wx.request({
          url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/index/getGoodsList',
          method:'post',
          dataType:'json',
          data:{
            token: that.$store.state.token,
            p: that.page
          },
          success: function(res) {
            that.tabWidth = (res.data.data.category_list.length + 1) * 200
            if(res.data.data.goods_list_page == that.page){
              that.isNextPage = false
            }
            if(!res.data.data.goods_list.length){
              that.isHasContent = true
            }
            
            var obj = {cid:'',cname:'全部商品'}
            var tabList = res.data.data.category_list
            tabList.unshift(obj)
            that.tabData = tabList
            that.goodsList = res.data.data.goods_list
            that.page++
          }
        })
      }
    },
    //切换tab
    changeTabIndex(cid,index){
      var that = this
      that.isNextPage = true
      that.isHasContent = false
      this.active = index
      this.page = 1
      this.goodsList = []
      this.activeLineLeft = index*200
      if(cid == ''){
        this.initGoodsList()
      }else{
        wx.request({
          url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/index/getGoodsList',
          method:'post',
          dataType:'json',
          data:{
            token: that.$store.state.token,
            p: that.page,
            cid: cid
          },
          success: function(res) {
            console.log(res.data)
            if(res.data.data.goods_list_page == that.page){
              that.isNextPage = false
            }
            if(!res.data.data.goods_list.length){
              that.isHasContent = true
            }
            that.goodsList = that.goodsList.concat(res.data.data.goods_list)
            that.page++
          }
        })
      }
    }
  },
  //上拉加载更多
  onReachBottom() {
    var that = this 
    if(that.isNextPage){
      // 显示加载图标
      wx.showLoading({
        title: '玩命加载中'
      })    // 页数+1
      wx.request({
        url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/index/getGoodsList',
        method:'post',
        dataType:'json',
        data:{
          token: that.$store.state.token,
          p: that.page
        },
        success: function(res) {
          wx.hideLoading()
          that.goodsList = that.goodsList.concat(res.data.data.goods_list)
          if(res.data.data.goods_list_page == that.page){
            that.isNextPage = false
          }
          that.page++
        }
      })
    }
  },

  mounted () {
    //请求全部商品列表
    this.initGoodsList()
  },
  //分享给好友
  onShareAppMessage: function () {
    return {
      title: '啦啦啦啦',
      desc: '描述描述',
      path: '/page/user?id=123'
    }
  }

}
</script>

<style scoped>
.all-active{
  position: absolute;
  transition: .3s;
  bottom: 0;
  width: 200rpx;
  height: 6rpx;
  background-color: #18c136;
}
.scroll-view_H{
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 4rpx solid #eee;
}
.top-tab-box{
  position: relative;
  height: 94rpx;
  background-color: #fff;
}
.all-zhanwei{
  height: 100rpx;
}
.top-tab-box li{
  width: 200rpx;
  height: 94rpx;
  float: left;
  text-align: center;
  line-height: 94rpx;
  font-size: 32rpx;
  color: #999;
}
.top-tab-box .active{
  color: #18c136;
}
.content-box{
  background-color: #fff;
  width: 750rpx;
  box-sizing: border-box;
  padding: 0 10rpx 0 20rpx;
  display: flex;
  flex-flow: wrap row;
  justify-content: flex-start;
  align-items: center;
}
.goods-list{
  width: 350rpx;
  margin: 0 10rpx 10rpx 0;
  background-color: #fff;
}
.goods-item-img{
  width: 350rpx;
  height: 350rpx;
}
.textbox{
  width: 100%;
  padding: 16rpx;
  box-sizing: border-box;
  color: #333;
  font-size: 26rpx;
}
.text{
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  margin-bottom: 26rpx;
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
.all-no-content{
  width: 100%;
  margin: 40rpx;
  text-align: center;
  position: relative;
  left: -10rpx;
  font-size: 24rpx;
  color: #999;
}
</style>
