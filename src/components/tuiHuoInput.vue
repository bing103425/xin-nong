<template>
  <div>
    <ul class="th-list">
      <li class="th-item" v-for="(item,index) in thData" :key="index">
        <p class="th-title">{{item.title}}<span class="red-text" v-if="item.isBiTian">*</span></p>
        <div class="th-input-box">
          <input type="text" class="th-input" disabled="disabled" v-if="item.inputType=='text' && item.disabled" :value="item.value" :placeholder="item.placeholder" @click="open(item.click)">
          <input type="text" class="th-input" v-else-if="item.inputType=='text' && !item.disabled" :value="item.value" :placeholder="item.placeholder" @click="open(item.click)">
          <textarea class="th-textarea" cols="30" rows="10" v-else-if="item.inputType=='textarea'" :placeholder="item.placeholder"></textarea>
          <img src="../assets/image/down.png" class="th-icon-more" v-if="item.jianjiao">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isGetGoodsList:['已收到货','未收到货'],
      reasonList:['无理由退货','质量不好', '宝贝损坏'],
      thData:[{
        title:'货物状态',
        jianjiao: true,
        isBiTian:true,
        inputType:'text',
        placeholder:'请选择是否收到货',
        click:'isGetGoods',
        value:'',
        disabled:true,
      },{
        title:'退货退款原因',
        jianjiao: true,
        isBiTian:true,
        inputType:'text',
        placeholder:'请选择退货退款原因',
        click:'reason',
        value:'',
        disabled:true,
      },{
        title:'退款金额',
        jianjiao: false,
        isBiTian:true,
        inputType:'text',
        value:'',
        disabled:true,
      },{
        title:'退货退款说明',
        jianjiao: false,
        isBiTian:false,
        inputType:'textarea',
        placeholder:'请说明原因',
        disabled:false,
      },{
        title:'联系电话',
        jianjiao: false,
        isBiTian:true,
        inputType:'text',
        value:'',
        disabled:''
      }],
      mobile:''
    }
  },
  props:['goodsInfo'],
  watch:{
    mobile() {
      this.mobile = this.thData[4].value
    }
  },
  computed:{
    data(){
      this.thData[2].value = Number(this.goodsInfo.return_money).toFixed(2)
      console.log(this.mobile)
    //   var mobile = this.thData[4].value
    //   if(mobile){
    //     this.thData[4].value = mobile
    //   }else{
    //     this.thData[4].value = this.goodsInfo.mobile
    //   }
    //   return
    }
  },
  methods:{
    open(type) {
      let _this = this
      if(type=='isGetGoods'){
        wx.showActionSheet({
          itemList: this.goodsInfo.refund_type,
          success: function (res) {
            console.log("index：" + res.tapIndex, "用户选的值为：" + _this.goodsInfo.refund_type[res.tapIndex])
            _this.thData[0].value = _this.goodsInfo.refund_type[res.tapIndex]
          }
        })
      }else if(type=='reason'){
        wx.showActionSheet({
          itemList: this.goodsInfo.refund_reason,
          success: function (res) {
            console.log("index：" + res.tapIndex, "用户选的值为：" + _this.goodsInfo.refund_reason[res.tapIndex])
            _this.thData[1].value = _this.goodsInfo.refund_reason[res.tapIndex]
          }
        })
      }
    }
  }
}
</script>

<style>
.th-item{
  width: 750rpx;
  box-sizing: border-box;
  padding: 20rpx 30rpx 0 30rpx;
  border-bottom: 2rpx solid #f5f5f5;
}
.th-title{
  font-size: 30rpx;
  color: #333;
}
.th-input-box{
  padding: 20rpx 0 30rpx 0;
  position: relative;
}
.th-textarea{
  width: 100%;
  height: 180rpx;
  border-radius: 8rpx;
  box-sizing: border-box;
  padding: 4rpx 0 20rpx 20rpx;
  background-color: #f5f5f5;
  font-size: 26rpx;
  color: #666;
}
.th-input{
  width: 100%;
  height: 74rpx;
  border-radius: 8rpx;
  box-sizing: border-box;
  padding-left: 20rpx;
  background-color: #f5f5f5;
  font-size: 26rpx;
  color: #666;
}
.th-icon-more{
  width: 32rpx;
  height: 32rpx;
  position: absolute;
  right: 20rpx;
  top: 34rpx;
  z-index: 99999;
}
</style>
