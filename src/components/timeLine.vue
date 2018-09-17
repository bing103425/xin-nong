<template>
  <div>
    <p class="dsh-wl-title">物流信息：</p>
    <ul>
      <li class="dsh-time-line flex-flex-start" v-for="(item,index) in expressData" :key="index">
        <div class="dsh-circle-box">
          <div class="dsh-circle"></div>
          <div class="dsh-line"></div>
        </div>
        <div class="dsh-rela">
          <p class="dsh-kd-text">{{item.text}}</p>
          <p class="dsh-kd-time">{{item.time}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      expressData:[{
        text:'快递从杭州发出',
        time:'2018-08-02  15:42:02'
      },{
        text:'已发货',
        time:'2018-08-01  20:30:18'
      },{
        text:'快递已出库',
        time:'2018-08-01  13:01:21'
      }]
    }
  }
}
</script>

<style>
.dsh-wl-title{
  width: 750rpx;
  box-sizing: border-box;
  padding: 30rpx;
  padding-bottom: 0;
  font-size: 30rpx;
  color: #000;
}
.dsh-time-line{
  width: 750rpx;
  box-sizing: border-box;
  padding: 0 30rpx;
  margin-bottom: 80rpx;
  color: #999;
  font-size: 30rpx;
}
.dsh-circle-box{
  width: 18rpx;
  height: 18rpx;
  position: relative;
  margin-right: 20rpx;
}
.dsh-time-line:nth-child(1) .dsh-circle{
  border: 2rpx solid #18c136;
}
.dsh-time-line:nth-child(1) .dsh-kd-text{
  color: #333;
}
.dsh-time-line:nth-last-child(1) .dsh-line{
  display: none;
}
.dsh-circle{
  width: 18rpx;
  height: 18rpx;
  box-sizing: border-box;
  border-radius: 10rpx;
  border: 2rpx solid #c9c9c9;
}
.dsh-line{
  width: 2rpx;
  height: 150rpx;
  background-color: #e2e2e2;
  position: absolute;
  top: 18rpx;
  left: 8rpx;
}
.dsh-kd-time{
  font-size: 26rpx;
}
.dsh-rela{
  position: relative;
  top: 20rpx;
}
</style>
