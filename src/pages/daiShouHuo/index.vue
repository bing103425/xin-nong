<template>
  <div>
    <div class="dsh-goods-info flex-flex-start">
      <img src="http://wx1.sinaimg.cn/mw690/0060lm7Tly1fug5qtnh96j309t09tjuk.jpg" class="dsh-goods-img">
      <div class="dsh-goods-info-text">
        <p>物流公司：顺丰快递</p>
        <p>物流单号：2018065045831454474</p>
        <p>官方电话：<span class="green-text">400-8220-5990</span></p>
      </div>
    </div>
    <mp-timeLine></mp-timeLine>
  </div>
</template>

<script>
import timeLine from "@/components/timeLine"
export default {
  data () {
    return {

    }
  },
  computed: {
  },

  components: {
    'mp-timeLine': timeLine
  },

  methods: {
  },

  created () {
  },
  mounted(){
    //更改navigation文字
    wx.setNavigationBarTitle({
      title: '物流信息'
    })
  }
}
</script>

<style scoped>
.dsh-goods-info{
  border-top: 1px solid #d7d7d7;
  border-bottom: 1px solid #f5f5f5;
  box-sizing: border-box;
  width: 750rpx;
  padding: 30rpx;
}
.dsh-goods-img{
  width: 140rpx;
  height: 140rpx;
  margin-right: 20rpx;
}
.dsh-goods-info-text{
  width: 524rpx;
  font-size: 28rpx;
  color: #000;
}
</style>
