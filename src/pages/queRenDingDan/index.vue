<template>
  <div class="container">
    <div class="qrdd-top-userinfo-box">
      <div class="qrdd-userinfo-name flex-space-between">
        <p> 收货人信息：{{userAddInfo.consigner}}</p>
        <p>{{userAddInfo.mobile}}</p>
      </div>
      <p>收货地址：{{userAddInfo.province}}-{{userAddInfo.city}}-{{userAddInfo.district}}-{{userAddInfo.address}}</p>
    </div>
    <img src="../../assets/image/bj2@2x.png" class="bg-img-bg">

    <mp-confirmOrderCard :goodsInfo="goodsInfo"></mp-confirmOrderCard>

    <div class="co-input-box flex-space-between">
        <span class="co-input-title">买家留言</span>
        <input type="text" placeholder="给卖家留言">
    </div>

    <div class="co-bottom-box">
        <p>结算信息</p>
        <div class="flex-space-between">
            <p>共 <span class="red-text">{{theAllNum}}</span> 件商品 总计</p>
            <p>￥{{finallyPrice}}</p>
        </div>
        <div class="flex-space-between">
            <p>运费</p>
            <p>￥0.00</p>
        </div>
    </div>
    <div class="qrdd-zhanwei"></div>
    <div class="co-pay-btn" @click="submitOrder()">微信支付 &nbsp;(￥{{finallyPrice}})</div>

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
      orderData: "" //提交订单发送的数据
    };
  },

  components: {
    "mp-confirmOrderCard": confirmOrderCard
  },

  methods: {
    submitOrder() {
      var that = this;
      console.log(that.goodsInfo);
      wx.request({
        url: "http://xcx_shop.idc.gcsci.net/index.php?s=/wx/order/submitOrder",
        method: "post",
        dataType: "json",
        data: {
          token: that.$store.state.token,
          address_id: 14,
          cat_ids: that.orderData.slice(0, that.orderData.length - 1),
          message: "留言"
        },
        success: function(res) {


          wx.getStorage({
            key: "openid",
            success: function(res) {
              wx.request({
                //这里是后台的处理方法，url是自定义的，直接换成你自己的后台处理方法即可，Wx_Pay这个方法在下面写的有
                //后台用的php做处理，java的可以参考方法，道理都是一样的
                url: url + "Wx_Pay",
                data: {
                  //用户的openid
                  openid: res.data,
                  fee: that.data.totalPrice, //支付金额
                  details: that.data.goodsList[0].goods_name //支付商品的名称
                },
                success: function(result) {
                  if (result.data) {
                    //out_trade_no=res.data['out_trade_no']
                    wx.requestPayment({
                      timeStamp: result.data["timeStamp"],
                      nonceStr: result.data["nonceStr"],
                      package: result.data["package"],
                      signType: "MD5",
                      paySign: result.data["paySign"],
                      success: function(successret) {
                        console.log("支付成功")
                        //获取支付用户的信息
                        wx.getStorage({
                          key: "userInfo",
                          success: function(getuser) {
                            //加入订单表做记录
                            wx.request({
                              url: url + "Wx_AddOrder",
                              data: {
                                uname: getuser.data.nickName,
                                goods: that.data.goodsList[0].goods_name,
                                price: that.data.totalPrice,
                                openid: res.data
                              },
                              success: function(lastreturn) {
                                console.log("存取成功")
                              }
                            })
                          }
                        })
                      },
                      fail: function(res) {}
                    })
                  }
                }
              })
            }
          })

        
        },
        fail(err) {
          console.log(err)
        }
      })
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
    },
    //微信支付
    payMoney() {
      wx.requestPayment({
        timeStamp: "",
        nonceStr: "",
        package: "",
        signType: "MD5",
        paySign: "",
        success: function(res) {},
        fail: function(res) {}
      });
    }
  },

  mounted() {
    var that = this;
    var pages = getCurrentPages(); //获取加载的页面
    var currentPage = pages[pages.length - 1]; //获取当前页面的对象
    var urlCanShu = currentPage.options;
    var postId = pages[pages.length - 1].options.goodsIds;

    //将商品ID和数量组合成json，配套的将数量放到页面里
    var goodsIdAndNumArr = []; //json结果
    urlCanShu.goodsIds = urlCanShu.goodsIds.split(",");
    urlCanShu.numArr = urlCanShu.numArr.split(",");
    for (let m = 0; m < urlCanShu.goodsIds.length; m++) {
      var goodsIdAndNumObj = {};
      goodsIdAndNumObj.id = urlCanShu.goodsIds[m];
      goodsIdAndNumObj.num = urlCanShu.numArr[m];
      goodsIdAndNumArr[m] = goodsIdAndNumObj;
    }

    that.theAllNum = urlCanShu.theAllNum; //总数量
    that.finallyPrice = urlCanShu.finallyPrice; //总价格
    // console.log('urlCanShu',urlCanShu)
    wx.request({
      url: "http://xcx_shop.idc.gcsci.net/index.php?s=/wx/member/memberAddress",
      method: "post",
      dataType: "json",
      data: {
        token: that.$store.state.token
      },
      success: function(res) {
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].is_default == 1) {
            that.userAddInfo = res.data.data[i];
          } else {
            that.userAddInfo = res.data.data[0];
          }
        }

        //开始循环，根据地址转换后的数据查询到对应id
        let addStr = that.idToAddStr(
          that.userAddInfo.province,
          that.userAddInfo.city,
          that.userAddInfo.district
        );
        console.log(addStr);
        //时间戳转换正常日期
        that.userAddInfo.province = addStr[0];
        that.userAddInfo.city = addStr[1];
        that.userAddInfo.district = addStr[2];
      },
      fail(err) {
        console.log(err);
      }
    });

    //根据上个页面发过来的商品ID，获取订单内的商品
    wx.request({
      url:"http://xcx_shop.idc.gcsci.net/index.php?s=/wx/index/getGoodsDetailById",
      method: "post",
      dataType: "json",
      data: {
        gid: postId
      },
      success: function(res) {
        that.goodsInfo = res.data.data;
        // console.log('goodsIdAndNumArrasdasdas ',res.data.data)
        for (let i = 0; i < that.goodsInfo.length; i++) {
          for (let j = 0; j < goodsIdAndNumArr.length; j++) {
            if (that.goodsInfo[i].goods_id == goodsIdAndNumArr[j].id) {
              console.log("返回的i", that.goodsInfo[i]);
              console.log("数据数据", goodsIdAndNumArr);
              that.orderData +=
                goodsIdAndNumArr[j].id + ":" + goodsIdAndNumArr[j].num + ",";
              that.goodsInfo[i].num = goodsIdAndNumArr[j].num;
            }
          }
        }
        console.log("数据数据 ", that.orderData);
      },
      fail(err) {
        console.log(err);
      }
    });
  }
};
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
</style>
