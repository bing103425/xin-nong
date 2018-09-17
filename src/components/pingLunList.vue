<template>
  <div>
    <ul>
      <li class="bottom-box" v-for="(item,index1) in newPingLunData" :key="index1">
        <div class="clearfix">
          <div class="headimage-box pull-left">
            <img :src="item.user_headimg" alt="">
          </div>
          <p class="tel pull-left">{{item.user_name}}</p>
        </div>
        <p class="date">{{item.addtime}}</p>
        <p class="content">{{item.content}}</p>
        <div class="image-box">
          <img alt="" class="content-img" v-for="(item,index2) in item.image" :key="index2" :src="item">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{}
  },
  props: ['pingLunData'],
  methods:{
    tampToTime(timestamp) {
      var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() + ' ';
      return Y + M + D 
    }
  },
  computed:{
    newPingLunData(){
      this.pingLunData.forEach(item => {
        //时间戳转换正常日期
        item.addtime = this.tampToTime(item.addtime);
      })
      return this.pingLunData
    }
  }
}
</script>

<style>
.bottom-box{
   width: 750rpx;
   padding: 40rpx 24rpx 0 30rpx;
   margin-bottom: 6rpx;
   box-sizing: border-box;
   background-color: #fff;
}
.headimage-box{
  width: 58rpx;
  height: 58rpx;
  border-radius: 30rpx;
  border: 2rpx solid #ddd;
  overflow: hidden;
  margin-right: 12rpx;
  margin-bottom: 18rpx;
}
.headimage-box img{
  width: 58rpx;
  height: 58rpx;
}
.tel{
  color: #333;
  font-size: 24rpx;
  line-height: 58rpx;
}
.date{
  text-align: left;
  color: #999;
  font-size: 24rpx;
  margin-bottom: 18rpx;
}
.content{
  text-align: left;
  color: #333;
  font-size: 30rpx;
  margin-bottom: 30rpx;
  padding-right: 6rpx;
  box-sizing: border-box;
}
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
  padding-bottom: 14rpx;
}
</style>
