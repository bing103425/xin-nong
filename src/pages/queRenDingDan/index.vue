<template>
  <div class="container">
    <div class="qrdd-top-userinfo-box" @click="toDingDanAdd()">
      <div class="qrdd-userinfo-name flex-space-between">
        <p> 收货人信息：{{userAddInfo.consigner}}</p>
        <p>{{userAddInfo.mobile}}</p>
      </div>
      <p>收货地址：{{userAddInfo.province}}-{{userAddInfo.city}}-{{userAddInfo.district}}-{{userAddInfo.address}}</p>
    </div>
    <img src="../../assets/image/bj2@2x.png" class="bg-img-bg">
    <div v-if="isHasGoods">
      <mp-confirmOrderCard :goodsInfo="goodsInfo"></mp-confirmOrderCard>

      <div class="co-input-box flex-space-between">
          <span class="co-input-title">买家留言</span>
          <input type="text" placeholder="给卖家留言" v-model="message">
      </div>

      <div class="co-bottom-box">
          <p>结算信息</p>
          <div class="flex-space-between">
              <p>共 <span class="red-text">{{theAllNum}}</span> 件商品 总计</p>
              <p>￥{{finallyPrice}}</p>
          </div>
          <div class="flex-space-between">
              <p>运费</p>
              <p>免运费</p>
          </div>
      </div>
      <div class="qrdd-zhanwei"></div>
      <div class="co-pay-btn" @click="submitOrder()">微信支付 &nbsp;(￥{{finallyPrice}})</div>
    </div>
    <div v-else class="qrdd-no-goods">
      暂时没有商品哦~
    </div>

  </div>
</template>

<script>
import confirmOrderCard from "@/components/confirmOrderCard"
import add from "@/add.json";

export default {
  data() {
    return {
      userAddInfo: {}, //收货地址
      goodsInfo: {}, //组件内商品信息
      theAllNum: "", //结算价格的信息
      finallyPrice: "", //结算价格的信息
      orderData: "", //提交订单发送的数据
      urlCanShu: "", //页面参数
      message: "", //买家留言
      isHasGoods: true
    };
  },

  components: {
    "mp-confirmOrderCard": confirmOrderCard
  },

  methods: {
    toDingDanAdd(){
      wx.navigateTo({
        url: '/pages/dingDanAdd/main?theAllNum='+this.theAllNum+"&goodsIds="+this.urlCanShu.goodsIds+"&numArr="+this.urlCanShu.numArr
      })
    },
    submitOrder() {
      var that = this
      console.log('打印cat_ids',that.addId)
      if(!that.userAddInfo.district){
        wx.showToast({
          title: '请选择地址',
          icon: 'none',
          duration: 2000
        })
      }else{

        that.$http.post({
          url:"/wx/order/submitOrder",
          dataType:'json',
          data: {
            address_id: that.addId,
            cat_ids: that.orderData.slice(0, that.orderData.length - 1),
            message: that.message
          },
        })
        .then(res =>{
          that.$http.post({
            url:"/wx/pay/getPayValue",
            dataType:'json',
            data: {
              out_trade_no: res.data.out_trade_no
            },
          })
          .then(res =>{
            
            if(res.code == 0){
              //微信支付
              wx.requestPayment({
                timeStamp: res.data["timeStamp"],
                nonceStr: res.data["nonceStr"],
                package: res.data["package"],
                signType: "MD5",
                paySign: res.data["paySign"],
                success: function(successret) {
                  //支付成功回调
                  wx.navigateTo({
                    url: '/pages/quanBuDingDan/main'
                  })
                },
                fail: function(res) {
                  wx.redirectTo({
                    url: '/pages/quanBuDingDan/main'
                  })
                }
              })
            }
          })
          
        })

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
                  resultDistrict = add[i].children[j].children[k].text
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

  mounted() {
    var that = this;
    var pages = getCurrentPages(); //获取加载的页面
    var currentPage = pages[pages.length - 1]; //获取当前页面的对象
    this.urlCanShu = currentPage.options
    if(this.urlCanShu.addId){
      this.addId = this.urlCanShu.addId
      console.log('地址',this.urlCanShu.addId)
      //获取收货地址
      that.$http.post({
        url:"/wx/member/memberAddress",
        dataType:'json',
      })
      .then(res =>{
        for (let i = 0; i < res.data.length; i++) {
          if(res.data[i].id == that.urlCanShu.addId){
            that.userAddInfo = res.data[i]
          }
        }

        //开始循环，根据地址转换后的数据查询到对应id
        let addStr = that.idToAddStr(
          that.userAddInfo.province,
          that.userAddInfo.city,
          that.userAddInfo.district
        )
        console.log(addStr);
        //时间戳转换正常日期
        that.userAddInfo.province = addStr[0]
        that.userAddInfo.city = addStr[1]
        that.userAddInfo.district = addStr[2]
      })
    }else{
      //获取收货地址
      that.$http.post({
        url:"/wx/member/memberAddress",
        dataType:'json',
      })
      .then(res =>{
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].is_default == 1) {
            that.userAddInfo = res.data[i]
            that.addId = res.data[i].id
          } else {
            that.userAddInfo = res.data[0]
            that.addId = res.data[0].id
          }
        }

        //开始循环，根据地址转换后的数据查询到对应id
        let addStr = that.idToAddStr(
          that.userAddInfo.province,
          that.userAddInfo.city,
          that.userAddInfo.district
        )
        console.log(addStr);
        //时间戳转换正常日期
        that.userAddInfo.province = addStr[0]
        that.userAddInfo.city = addStr[1]
        that.userAddInfo.district = addStr[2]
      })
    }


    if(this.urlCanShu.goodsIds){
      var postId = pages[pages.length - 1].options.goodsIds

      console.log('postId',postId)
      //将商品ID和数量组合成json，配套的将数量放到页面里
      var goodsIdAndNumArr = [] //json结果
      this.urlCanShu.goodsIds = this.urlCanShu.goodsIds.split(",")
      this.urlCanShu.numArr = this.urlCanShu.numArr.split(",")
      for (let m = 0; m < this.urlCanShu.goodsIds.length; m++) {
        var goodsIdAndNumObj = {}
        goodsIdAndNumObj.id = this.urlCanShu.goodsIds[m]
        goodsIdAndNumObj.num = this.urlCanShu.numArr[m]
        goodsIdAndNumArr[m] = goodsIdAndNumObj
      }
        console.log('lalalalal',goodsIdAndNumObj)

      that.theAllNum = this.urlCanShu.theAllNum     //总数量

      //根据上个页面发过来的商品ID，获取订单内的商品
      that.$http.post({
        url:"/wx/index/getGoodsDetailById",
        dataType:'json',
        data: {
          gid: postId
        },
      })
      .then(res =>{
        that.isHasGoods = true
        that.goodsInfo = res.data
        that.orderData = []
        let priceNumber = 0
        for (let i = 0; i < that.goodsInfo.length; i++) {
          for (let j = 0; j < goodsIdAndNumArr.length; j++) {
            if (that.goodsInfo[i].goods_id == goodsIdAndNumArr[j].id) {
              that.orderData += goodsIdAndNumArr[j].id + ":" + goodsIdAndNumArr[j].num + ","
              that.goodsInfo[i].num = goodsIdAndNumArr[j].num
              priceNumber += Number((Number(that.goodsInfo[i].price) * goodsIdAndNumArr[j].num).toFixed(2))
            }
          }
        }
        
        //总价格
        that.finallyPrice = priceNumber.toFixed(2)
      })
    }else{
      this.isHasGoods = false
    }
  }
}
</script>

<style scoped>
.container {
  background-color: #fff;
}
.qrdd-top-userinfo-box {
  background-color: #fff;
  font-size: 26rpx;
  color: #666;
  padding: 0 30rpx 30rpx 30rpx;
  box-sizing: border-box;
  width: 100%;
}
.qrdd-userinfo-name {
  width: 100%;
  font-size: 30rpx;
  color: #333;
  margin-bottom: 10rpx;
}
.bg-img-bg {
  width: 750rpx;
  height: 8rpx;
}
.co-input-box {
  width: 750rpx;
  padding: 30rpx 30rpx 10rpx 30rpx;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 26rpx;
  color: #666;
  border-bottom: 1px solid #eee;
  margin-bottom: 40rpx;
}
.co-input-box input {
  width: 530rpx;
}
.co-bottom-box {
  width: 750rpx;
  box-sizing: border-box;
  font-size: 30rpx;
  color: #333;
  padding: 40rpx 30rpx 30rpx 30rpx;
  line-height: 60rpx;
  background-color: #fff;
}
.co-input-title {
  font-size: 30rpx;
  color: #333;
}
.co-pay-btn {
  width: 750rpx;
  height: 90rpx;
  line-height: 90rpx;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #18c136;
  color: #fff;
  font-size: 34rpx;
  text-align: center;
}
.qrdd-zhanwei {
  height: 110rpx;
}
.qrdd-no-goods{
  padding-top: 60rpx;
  text-align: center;
  width: 100%;
  font-size: 30rpx;
  color: #666;
}
.qrdd-a{
  width: 100%;
}
</style>
