<template>
  <div class="con-tainer">
    <div class="tx-top-box flex-space-between">
      <div>
        <p>可提现佣金（元）</p>
        <p class="red-text tx-money">￥{{data.user_surplus_withdraw}}</p>
      </div>
    </div>
    <div class="tx-item flex-flex-start">
      <div class="tx-title">提现佣金</div>
      <input type="text" name="" id="" placeholder="输入要提现佣金" class="tx-input" v-model="withdrawMoney">
    </div>
    <div class="tx-item flex-flex-start">
      <div class="tx-title">提现到</div>
      <checkbox-group @change="checkboxChange">
        <label class="weui-cell nopadding weui-check__label" v-for="(item,index) in checkboxItems" :key="index">
          <checkbox class="weui-check" :value="item.value" :checked="item.checked" />
          <div class="weui-cell__hd weui-check__hd_in-checkbox">
            <icon class="weui-icon-checkbox_circle nomargin" type="circle" size="23" v-if="!item.checked"></icon>
            <icon class="weui-icon-checkbox_success nomargin" type="success" size="23" v-if="item.checked"></icon>
          </div>
          <div class="weui-cell__bd">{{item.name}}</div>
        </label>
      </checkbox-group>
    </div>
    <div class="tx-item flex-flex-start tx-tip">
      <span class="red-text">提示：最低提现金额为{{data.withdraw_cash_min}}元，必须为{{data.withdraw_multiple}}的整数倍</span>
    </div>
    <div class="tx-item tx-tipa">
      注：{{data.withdraw_message}}
    </div>
    <div class="tx-tjsq-btn" @click="submit()">提交申请</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkboxItems: [
        { name: '微信', value: '0', checked: true }
      ],
      data:{},
      withdrawMoney:''
    }
  },
  computed: {
  },

  components: {
  },

  methods: {
    submit(){
      var that = this
      if(that.withdrawMoney<that.data.withdraw_cash_min){
        wx.showToast({
          title: '最低提现'+that.data.withdraw_cash_min+'元哦',
          icon: 'none',
          duration: 2000
        })
      }else{
        if(that.isXiaoShu(that.withdrawMoney)){
          wx.request({
            url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/distribution/submitWithDraw',
            method:'post',
            dataType:'json',
            data: {
              token: that.$store.state.token,
              withdraw_money: Number(that.withdrawMoney)
            },
            success: function(res) {
              if(res.data.code == 0){
                wx.showToast({
                  title: res.data.info,
                  icon: 'none',
                  duration: 2000
                })
                
                setTimeout(() => {
                  wx.redirectTo({
                    url: '/pages/fenxiaozhongxin/main'
                  })
                }, 2000)
              }else if(res.data.code == 1){
                wx.showToast({
                  title: res.data.info,
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        }else{
          wx.showToast({
            title: '只能提现整数哦',
            icon: 'none',
            duration: 2000
          })
        }
      }
    },
    isXiaoShu(num){
      //判断数字是否是整数
      var y = String(num).indexOf(".") + 1;//获取小数点的位置
      var count = String(num).length - y;//获取小数点后的个数
      if(y > 0) {
        //不是整数
        return false
      } else {
        //是整数
        return true
      }

    },
    checkboxChange(e) {
      console.log('checkbox发生change事件，携带value值为：' + e.mp.detail.value);
      var checkboxItems = this.checkboxItems, values = e.mp.detail.value;
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].checked = false;

        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (checkboxItems[i].value == values[j]) {
            checkboxItems[i].checked = true;
            break;
          }
        }
      }
      this.checkboxItems = checkboxItems
    }
  },

  mounted(){
    var that = this
    wx.request({
      url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/distribution/goWithdraw',
      method:'post',
      dataType:'json',
      data: {
        token: that.$store.state.token
      },
      success: function(res) {
        that.data = res.data.data
      }
    })
  }
}
</script>

<style scoped>
.con-tainer{
  width: 750rpx;
  height: 100vh;
  background-color: #f5f5f5;
}
.tx-top-box{
  background-color: #fff;
  font-size: 28rpx;
  color: #333;
  width: 750rpx;
  height: 156rpx;
  padding: 0 30rpx;
  border-bottom: 1rpx solid #f5f5f5;
}
.tx-money{
  font-size: 50rpx;
}
.tx-btn{
  width: 110rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  background-color: #18c136;
  color: #fff;
  font-size: 22rpx;
  border-radius: 6rpx;
}
.tx-item{
  height: 100rpx;
  padding: 0 30rpx;
  font-size: 28rpx;
  color: #333;
  border-bottom: 1rpx solid #f5f5f5;
  background-color: #fff;
}
.tx-title{
  width: 150rpx;
}
.tx-input{
  height: 100rpx;
}
.nopadding{
  padding: 0;
}
.nomargin{
  margin-left: 0;
}
.tx-tjsq-btn{
  width: 690rpx;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  background-color: #18c136;
  color: #fff;
  font-size: 34rpx;
  border-radius: 6rpx;
  margin: 140rpx auto;
}
.tx-tip{
  font-size: 28rpx;
}
.tx-tipa{
  font-size: 28rpx;
  line-height: 100rpx;
}
</style>
