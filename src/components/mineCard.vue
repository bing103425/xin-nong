<template>
  <div>
    <div class="view-box">
      <div class="circle-view-box">
        <div class="img-box">
          <img :src="userInfo.avatarUrl" class="head-img-ng">
        </div>
        <div class="img-box-position">
          <img :src="userInfo.avatarUrl" alt="" class="head-img">
          <div class="circle-small"></div>
          <div class="circle-big"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props: ['text'],
  data(){
    return{
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  }
}
</script>

<style>
.view-box{
  width: 750rpx;
  height: 388rpx;
  position: relative;
  background-color: #fff;
  overflow: hidden;
}
.circle-view-box{
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%,-212rpx);
  width: 1200rpx;
  height: 600rpx;
  border-radius: 50% / 50%;
  background-color: #eee;
  overflow: hidden;
}
.img-box{
  position: absolute;
  width: 750rpx;
  height: 388rpx;
  bottom: 0;
  left: 225rpx;
  -webkit-filter: blur(3px); 
  -moz-filter: blur(3px);
  -ms-filter: blur(3px);    
  filter: blur(3px);
}
.head-img-ng{
  width: 750rpx;
  height: 750rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.img-box-position{
  position: absolute;
  width: 750rpx;
  height: 388rpx;
  bottom: 0;
  left: 225rpx;
}
.head-img{
  width: 200rpx;
  height: 200rpx;
  border-radius: 120rpx;
  border: 6rpx solid #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%); 
}
.circle-small{
  width: 260rpx;
  height: 260rpx;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%); 
  box-shadow: 0 0 0 12rpx rgba(255, 255, 255, 0.2) ;
}
.circle-big{
  width: 390rpx;
  height: 390rpx;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%); 
  box-shadow: 0 0 0 12rpx rgba(255, 255, 255, 0.2) ;
}
</style>
