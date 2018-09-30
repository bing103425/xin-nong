<template>
  <div class="con-tainer">
    <img :src="qrcode" class="fx-qrcode">
  </div>
</template>

<script>
export default {
  data(){
    return {
      qrcode:''
    }
  },
  mounted(){
    var that = this
    wx.request({
      url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/wx/createQrcodeC',
      method:'post',
      dataType:'json',
      data: {
        token: that.$store.state.token
      },
      success: function(res) {
        that.qrcode = res.data.data.qrcode
      },
      fail(err){
        console.log(err)
      }
    })
  }
}
</script>

<style scoped>
.fx-qrcode{
  width: 470rpx;
  height: 535rpx;
  position: absolute;
  top: 34%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>
