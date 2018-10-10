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
    that.$http.post({
      url:"/wx/wx/createQrcodeC",
      dataType:'json'
    })
    .then(res =>{
      that.qrcode = res.data.qrcode
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
