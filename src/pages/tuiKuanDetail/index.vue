<template>
  <div class="counter-warp">
    <div class="tkd-top-box">
      <p>{{orderInfo.refund_status_name}}</p>
      <p class="tkd-time">{{orderInfo.refund_time}}</p>
    </div>
    <ul class="tkd-list">
      <li class="tkd-item flex-space-between">
        <p>申请退款</p>
        <mp-priceCart size="30" :redPrice="orderInfo.refund_require_money"></mp-priceCart>
      </li>
      <li class="tkd-item flex-space-between">
        <p>实际退款金额</p>
        <mp-priceCart size="30" :redPrice="orderInfo.refund_real_money"></mp-priceCart>
      </li>
      <li class="tkd-item flex-space-between">
        <p>退款原因</p>
        <p class="tkd-reason">{{orderInfo.refund_reason}}</p>
      </li>
    </ul>
    <div class="tkd-title flex-space-between">退款信息</div>
    <div class="tkd-goods-box flex-space-between">
      <img :src="goodsInfo.album_pictures[0]" class="tkd-img">
      <div>
        <p class="tkd-goods-name overhidden2">{{goodsInfo.goods_name}}</p>
        <p class="tkd-num-info">￥{{goodsInfo.price}} &nbsp;&nbsp;&nbsp;&nbsp;x{{num}}  </p>
      </div>
    </div>
    <div class="tkd-title flex-space-between">退款原因</div>
    <div class="tkd-text">{{orderInfo.refund_description}}</div>
    
    <div class="image-box">
      <block v-for="(item,index) in files" :key="index">
        <div class="weui-uploader__file pll-nomar" @click="predivImage" :id="item">
          <img alt="" class="content-img" mode="aspectFill" :src="item">
        </div>
      </block>
    </div>
  </div>
</template>

<script>

import priceCart from '@/components/priceCart'
import { timestampToTime } from '@/utils/index'
export default {
  data(){
    return {
      num: '',
      orderInfo: {
        refund_status_name: '',
        refund_require_money:'',
        refund_real_money: '',
        refund_time: '',
        refund_reason: ''
      },
      goodsInfo:{
        album_pictures:[],
        goodsInfo:''
      },
      files: []
    }
  },
  components: {
    'mp-priceCart':priceCart
  },
  methods: {
    predivImage(e) {
      console.log(e);
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      })
    }
  },
  mounted(){
    var that = this
    that.orderInfo = {
      refund_status_name: '',
      refund_require_money:'',
      refund_real_money: '',
      refund_time: '',
      refund_reason: ''
    }
    that.goodsInfo = {
      album_pictures:[],
      goodsInfo:''
    }
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length-1] //获取当前页面的对象
    var urlCanShu = currentPage.options
    that.num = urlCanShu.num
    that.$http.post({
      url:"/wx/order/getRefundOrderGoodsDetail",
      dataType:'json',
      data: {
        ogid: urlCanShu.orderGoodsId
      }
    })
    .then(res =>{
        that.orderInfo = res.data
        that.orderInfo.refund_time = timestampToTime(that.orderInfo.refund_time)
        that.files = that.orderInfo.refund_img.split(',')
    })
    that.$http.post({
      url:"/wx/index/getGoodsDetail",
      dataType:'json',
      data: {
        gid: urlCanShu.goodsId
      }
    })
    .then(res =>{
        that.goodsInfo = res.data
    })
  }
}
</script>

<style>
.content-img{
  width: 226rpx;
  height: 226rpx;
  margin-right: 6rpx;
  margin-bottom: 6rpx;
}
.image-box{
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0 30rpx;
  padding-bottom: 30rpx;
}
.pll-nomar{
  margin: 0;
}
.tkd-top-box{
  width: 100%;
  padding: 60rpx 30rpx;
  box-sizing: border-box;
  background-color: #18c136;
  color: #fff;
  font-size: 34rpx;
  margin-bottom: 20rpx;
}
.tkd-item{
  width: 100%;
  height: 100rpx;
  font-size: 28rpx;
  padding: 0 30rpx;
  border-bottom: 1px solid #eee;
}
.tkd-title{
  width: 100%;
  box-sizing: border-box;
  margin-top: 40rpx;
  line-height: 50rpx;
  font-size: 28rpx;
  padding: 0 30rpx;
}
.tkd-img{
  width: 120rpx;
  height: 120rpx;
  background-color: #eee;
}
.tkd-goods-box{
  margin-top: 20rpx;
  width: 100%;
  box-sizing: border-box;
  font-size: 28rpx;
  padding: 0 30rpx;
}
.tkd-goods-name{
  width: 530rpx;
}
.tkd-num-info{
  font-size: 26rpx;
  color: #999;
}
.tkd-time{
  font-size: 26rpx;
}
.tkd-reason{
  font-size: 28rpx;
  color: #999;
}
.tkd-text{
  width: 100%;
  padding: 10rpx 30rpx;
  box-sizing: border-box;
  color: #999;
  font-size: 28rpx;
}
</style>
