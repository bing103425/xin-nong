<template>
  <div>
    <div class="bg">
      <div class="title-box clearfix">
        <img src="../assets/image/logo@2x.png" class="shiling-icon pull-left" alt="">
        <span class="title pull-left"><slot></slot></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.bg{
  width: 750rpx;
  background-color: #fff;
}
.title-box{
  padding: 20rpx 0 20rpx 30rpx;
}
.shiling-icon{
  width: 55rpx;
  height: 37rpx;
  margin-right: 12rpx;
  margin-top: 4rpx;
}
.title{
  font-size: 30rpx;
  font-weight: bold;
  color: #4a4a4a;
}
</style>
