<template>
  <div>
    <ul class="white-box">
      <li v-for="(item,index) in text" :key="index">
        <img src="../assets/image/serve@2x.png" alt="" class="icon">
        <span>{{item}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: ['免费试吃','原产地直供','赔付保障']
    }
  }
}
</script>

<style>
.white-box{
  width: 750rpx;
  height: 54rpx;
  background-color: #fff;
  text-align: center;
  font-size: 22rpx;
  color: #b5b3b3;
  display: flex;
  flex-flow: nowrap row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 26rpx;
}
.white-box li{
  width: 40%;
  display: flex;
  flex-flow: nowrap row;
  justify-content: center;
  align-items: center;
}
.icon{
  width: 22rpx;
  height: 22rpx;
  margin-right: 12rpx;
}
</style>
