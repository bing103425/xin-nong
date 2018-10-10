<template>
  <div>
    <div class="dsh-goods-info flex-flex-start">
      <img :src="data.order_goods_pic[0]" class="dsh-goods-img">
      <div class="dsh-goods-info-text">
        <p>物流公司：{{data.express_name}}快递</p>
        <p>物流单号：{{data.express_no}}</p>
        <p>官方电话：<span class="green-text">{{data.express_mobile}}</span></p>
      </div>
    </div>
    <mp-timeLine :expressData="data.retval"></mp-timeLine>
  </div>
</template>

<script>
import timeLine from "@/components/timeLine"
export default {
  data () {
    return {
      data: {order_goods_pic:[]}
    }
  },
  components: {
    'mp-timeLine': timeLine
  },
  mounted(){
    var that = this
    that.data = {order_goods_pic:[]}
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length-1] //获取当前页面的对象
    var orderGoodsId = currentPage.options.orderGoodsId
    that.$http.post({
        url:"/wx/order/getExpressInfo",
        dataType:'json',
        data:{
          order_goods_id: orderGoodsId
        }
    })
    .then(res =>{
      that.data = res.data
      //将数组逆序
      that.data.retval.reverse()
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
