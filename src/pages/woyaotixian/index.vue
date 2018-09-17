<template>
  <div class="con-tainer">
    <div class="tx-top-box flex-space-between">
      <div>
        <p>可提现佣金（元）</p>
        <p class="red-text tx-money">￥0</p>
      </div>
      <div class="tx-btn">提现所有</div>
    </div>
    <div class="tx-item flex-flex-start">
      <div class="tx-title">提现佣金</div>
      <input type="text" name="" id="" placeholder="输入要提现佣金" class="tx-input">
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
    <div class="tx-tjsq-btn">提交申请</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkboxItems: [
        { name: '微信', value: '0', checked: false }
      ]
    }
  },
  computed: {
  },

  components: {
  },

  methods: {
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
      this.checkboxItems = checkboxItems;
    }
  },

  created () {
  },
  mounted(){
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
</style>
