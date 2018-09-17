<template>
  <div>
    <div v-for="(item,index) in fenxiangData" :key="index">
      <div class="flex-space-between fenxiao-list-info">
        <p>{{item.time}}</p>
        <p class="daifenxiao">{{item.title}}</p>
      </div>
      <div class="flex-flex-start fenxiao-content-card">
        <img :src="item.src" class="fenxiao-img">
        <p class="fenxiao-goods-name">{{item.name}}</p>
      </div>
      <div class="flex-space-between fenxiao-list-btn">
        <mp-priceCart size="30" :redPrice="item.redPrice"></mp-priceCart>
        <div class="flex-flex-start">
          <div class="quxiaodingdan-btn" @click="open">取消订单</div>
          <div class="fenxiao-btn">再次购买</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import priceCart from '@/components/priceCart'
export default {
  data(){
    return{
      itemList:['我不想买了', '信息填写错误，重新拍', '同城见面交易','其他原因'],
      fenxiangData:[{
        time:'2010-11-10 16:18:23',
        title:'待分成',
        src:'http://wx1.sinaimg.cn/mw690/0060lm7Tly1fug5qtnh96j309t09tjuk.jpg',
        name:'临安天目山小香薯5斤 新鲜小红薯板栗小番薯农家自种山芋地瓜紫薯',
        redPrice:25
      },{
        time:'2010-11-10 16:18:23',
        title:'待分成',
        src:'http://wx1.sinaimg.cn/mw690/0060lm7Tly1fug5qtnh96j309t09tjuk.jpg',
        name:'临安天目山小香薯5斤 新鲜小红薯板栗小番薯农家自种山芋地瓜紫薯',
        redPrice:24
      },{
        time:'2010-11-10 16:18:23',
        title:'待分成',
        src:'http://wx1.sinaimg.cn/mw690/0060lm7Tly1fug5qtnh96j309t09tjuk.jpg',
        name:'临安天目山小香薯5斤 新鲜小红薯板栗小番薯农家自种山芋地瓜紫薯',
        redPrice:16
      }]
    }
  },
  props: ['text'],
  components: {
    'mp-priceCart': priceCart
  },
  methods:{
    open() {
      let _this = this;
      wx.showActionSheet({
        itemList: this.itemList,
        success: function (res) {
          console.log("index：" + res.tapIndex, "用户选的值为：" + _this.itemList[res.tapIndex]);
        }
      });
    }
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
