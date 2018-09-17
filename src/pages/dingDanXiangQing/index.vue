<template>
  <div>
    <ul class="ddxq-list">
      <li class="big-text">{{data.shipping_status_name}}</li>
      <li>订单号：{{data.order_no}}</li>
      <li>订单状态：{{data.shipping_status_name}}</li>
      <li>下单时间：{{data.create_time}}</li>
      <li>付款状态：{{data.pay_status_name}}</li>
      <li>配送方式：{{data.shipping_type_name}}</li>
    </ul>
    <div class="ddxq-add-box">收货地址：{{data.receiver_name}}-{{data.receiver_province}}-{{data.receiver_city}}-{{data.receiver_district}}-{{data.receiver_address}}</div>
    <div class="ddxq-add-last-box"> <div> 买家留言：</div> <div>{{data.buyer_message}}</div></div>
    <div class="ddxq-zhanwei"></div>
    <mp-orderDetialCard :goodsInfo="data.order_goods"></mp-orderDetialCard>
    <ul>
      <li class="flex-space-between ddxq-item"> <p>商品总金额：</p> <p>{{data.goods_money}}</p> </li>
      <li class="flex-space-between ddxq-item"> <p>运费：</p> <p>0</p></li>
    </ul>
    <div class="ddxq-bottom-zw"></div>
  </div>
</template>

<script>
import add from '@/add.json'
import orderDetialCard from "@/components/orderDetialCard"

export default {
  data () {
    return {
      data: {}
    }
  },

  components: {
    'mp-orderDetialCard': orderDetialCard
  },
  methods:{
    timestampToTime(timestamp,type) {
      var date = new Date(timestamp)    //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear()
      var M = '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      var D = '-' + ( date.getDate() < 10 ? '0' + date.getDate() : date.getDate() )
      var h = '  ' + ( date.getHours() < 10 ? '0' + date.getHours() : date.getHours() )
      var m = ':' + ( date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() )
      var s = ':' + ( date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() )
      var dateType = type || 'sec'
      if(dateType =='month'){
          return Y + M    //年月
      }else if(dateType =='day'){
          return Y + M + D    //年月日
      }else if(dateType =='min'){
          return Y + M + D + h + m    //年月日时分
      }else if(dateType =='sec' || type == ''){
          return Y + M + D + h + m + s    //年月日时分秒
      }
    },
    idToAddStr(province, city, district) {
      var resultProvince
      var resultCity
      var resultDistrict
      for (let i = 0; i < add.length; i++) {
        if (province == add[i].value) {
          //省份的id
          resultProvince = add[i].text

          for (let j = 0; j < add[i].children.length; j++) {
            if (city == add[i].children[j].value) {
              //市的id
              resultCity = add[i].children[j].text;

              for (let k = 0; k < add[i].children[j].children.length; k++) {
                if (district == add[i].children[j].children[k].value) {
                  //区的id
                  resultDistrict = add[i].children[j].children[k].text;
                }
              }
            }
          }
        }
      }
      var arr = [];
      arr.push(resultProvince, resultCity, resultDistrict);
      return arr;
    }
  },

  mounted(){
    var that = this
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length-1] //获取当前页面的对象
    var order_id = currentPage.options.orderId
    wx.request({
      url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/order/orderDetail',
      method:'post',
      dataType:'json',
      data:{
        token: that.$store.state.token,
        order_id: order_id 
      },
      success: function(res) {
        that.data = res.data.data
        that.data.order_goods.forEach(element => {
          element.picture_info.pic_cover_small = 'http://xcx_cx_cx_shop.idc.gcsci.net/'+element.picture_info.pic_cover_small
        });
        var time = Number(that.data.create_time) * 1000
        var addArr = that.idToAddStr(that.data.receiver_province,that.data.receiver_city,that.data.receiver_district)
        if(!that.data.buyer_message){
          that.data.buyer_message = '此订单没有留言'
        }
        that.data.receiver_province = addArr[0]
        that.data.receiver_city = addArr[1]
        that.data.receiver_district = addArr[2]
        that.data.create_time = that.timestampToTime(1536976733000,'sec')
      }
    })
  }
}
</script>

<style scoped>
.ddxq-list{
  width: 100%;
  padding: 30rpx;
  background-color: #18c136;
  color: #fff;
  font-size: 28rpx;
  line-height: 56rpx;
}
.big-text{
  font-size: 32rpx;
  margin-bottom: 10rpx;
}
.ddxq-add-box{
  width: 690rpx;
  margin: 0 auto;
  padding: 30rpx 0;
  font-size: 26rpx;
  color: #333;
  border-bottom: 1px solid #eee;
}
.ddxq-add-last-box{
  width: 690rpx;
  margin: 0 auto;
  padding: 30rpx 0;
  font-size: 26rpx;
  color: #333;
}
.ddxq-zhanwei{
  width: 100%;
  height: 20rpx;
  background-color: #eee;
}
.ddxq-item{
  width: 100%;
  padding: 30rpx;
  padding-bottom: 0;
  font-size: 28rpx;
}
.ddxq-bottom-zw{
  height: 60rpx;
}
</style>
