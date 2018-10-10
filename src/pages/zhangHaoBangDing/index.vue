<template>
  <div class="con-tainer">
    <div class="bd-middle" v-if="noMobileNum">
      <img src="../../assets/image/bangding.png" class="bd-icon">
      <p class="bd-text">您的账号还没有绑定手机</p>
    </div>
    <div v-if="hasMobileNum" class="phone-num-box flex-space-between">
      <p class="phone-num">手机号</p>
      <p>{{mobile}}</p>
    </div>
    <a href="/pages/phoneYanZheng/main">
      <div class="bd-phone">{{text}}</div>
    </a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      noMobileNum:false,
      hasMobileNum:false,
      mobile:'',
      text:'手机验证绑定'
    }
  },
  methods: {
  },
  mounted(){
    var that = this
    that.$http.post({
      url:"/wx/member/getBindMobile",
      dataType:'json'
    })
    .then(res =>{
      if(res.data.mobile.length == 0){
        that.noMobileNum = true
        that.hasMobileNum = false
      }else{
        that.hasMobileNum = true
        that.noMobileNum = false
        that.mobile = res.data.mobile
        that.text = '更换手机号码'
      }
    })
  }
}
</script>

<style scoped>
.con-tainer{
  border-top: 1rpx solid #d7d7d7;
  width: 750rpx;
  height: 100vh;
  background-color: #f5f5f5;
  overflow: hidden;
  box-sizing: border-box;
}
.bd-icon{
  width: 116rpx;
  height: 150rpx;
  margin: 0 auto;
}
.bd-middle{
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%,-50%)
}
.bd-text{
  margin-top: 70rpx;
  font-size: 23rpx;
  color: #999;
}
.bd-phone{
  position: absolute;
  bottom: 80rpx;
  left: 30rpx;
  width: 690rpx;
  height: 90rpx;
  line-height: 90rpx;
  background-color: #18c136;
  color: #fff;
  font-size: 34rpx;
  text-align: center;
  border-radius: 6rpx;
}
.phone-num-box{
  height: 110rpx;
  line-height: 110rpx;
  background-color: #fff;
  width: 750rpx;
  padding: 0 30rpx;
  color: #999;
  font-size: 28rpx;
  border-bottom: 1rpx solid #eee;
}
.phone-num{
  color: #666;
}
</style>
