<template>
  <div class="container">
    <div class="pyz-box">
      <input type="text" class="pyz-num" placeholder="请填写手机号" v-model="mobile">
    </div>
    <div class="pyz-box">
      <input type="text" class="pyz-num" placeholder="验证码">
      <div class="phone-yzm">获取验证码</div>
    </div>
    <div class="pyz-phone" @click="submitMobileNum()">绑定</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mobile: ''
    }
  },
  methods: {
    submitMobileNum(){
      var that = this
      wx.request({
        url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/member/bindMobile',
        method:'post',
        dataType:'json',
        data: {
          token: that.$store.state.token,
          mobile: that.mobile
        },
        success: function(res) {
          console.log('res',res.data)
        },
        fail(err){
          console.log(err)
        }
      })
    }
  },
  created () {
  }
}
</script>

<style scoped>
.pyz-num{
  position: absolute;
  width: 690rpx;
  margin: 0 auto;
  top: 0;
  height: 98rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
  box-sizing: border-box;
}
.pyz-box{
  position: relative;
  width: 750rpx;
  box-sizing: border-box;
  padding: 0 30rpx;
  height: 100rpx;
  font-size: 28rpx;
  background-color: #fff;
}
.phone-yzm{
  width: 180rpx;
  height: 70rpx;
  line-height: 70rpx;
  position: absolute;
  top: 12rpx;
  right: 30rpx;
  text-align: center;
  z-index: 999999;
  border-radius: 8rpx;
  border: 1rpx solid #ddd;
  color: #999;
}
.pyz-phone{
  position: absolute;
  top: 50%;
  left: 50%;
  width: 690rpx;
  height: 90rpx;
  line-height: 90rpx;
  background-color: #18c136;
  transform: translate(-50%,-50%);
  color: #fff;
  font-size: 34rpx;
  text-align: center;
  border-radius: 6rpx;
}
</style>
