<template>
  <div class="">
    
    <ul class="th-list">
      <li class="th-item" v-for="(item,index) in thData" :key="index">
        <p class="th-title">{{item.title}}<span class="red-text" v-if="item.isBiTian">*</span></p>
        <div class="th-input-box">
          <textarea class="th-textarea-mobile" cols="30" rows="10" v-if="item.inputType=='textarea' && item.mobile == true" :placeholder="item.placeholder" v-model="item.value"></textarea>
          <input type="text" class="th-input" disabled="disabled" v-else-if="item.inputType=='text' && item.disabled" :value="item.value" :placeholder="item.placeholder" @click="open(item.click)">
          <input type="text" class="th-input" v-else-if="item.inputType=='text' && !item.disabled" :value="item.value" :placeholder="item.placeholder" @click="open(item.click)">
          <textarea class="th-textarea" cols="30" rows="10" v-else-if="item.inputType=='textarea'" :placeholder="item.placeholder" v-model="item.value"></textarea>
          <img src="../../assets/image/down.png" class="th-icon-more" v-if="item.jianjiao">
        </div>
      </li>
    </ul>
    <p class="th-last-title">添加凭证</p>
    <div class="weui-uploader__bd th-backwhite clearfix">
      <div class="weui-uploader__files" id="uploaderFiles">
        <block v-for="(item,index) in files" :key="index">
          <div class="weui-uploader__file posi-rela" @click="predivImage" :id="item">
            <icon type="cancel" size="20" class="th-icon-cancel" @click.stop="deletImg(index)"/>
            <image class="weui-uploader__img" :src="item" mode="aspectFill" />
          </div>
        </block>
      </div>
      <div class="weui-uploader__input-box">
        <div class="weui-uploader__input" @click="chooseImage"></div>
      </div>
    </div>
    <div class="th-submit-btn" @click="submit()">提交</div>
    <div class="zhanwei"></div>
  </div>
</template>

<script>

import tuiHuoInput from '@/components/tuiHuoInput'
export default {
  data () {
    return {
      files: [],           //本地的图片地址
      isGetGoodsList:['',''],       //请选择退货方式
      reasonList:['',''],          //请选择退货理由
      filesOnline:[],           //线上的图片地址
      orderGoodsId:'',         //订单商品ID
      refund_type:'',       //选中的退货方式（退货退款？只退款）
      refund_reason:'',     //选中的退货理由
      thData:[{
          title:'退货方式',
          jianjiao: false,
          isBiTian:true,
          inputType:'text',
          placeholder:'我要退款，自行邮寄退货',
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
          title:'最多退款金额',
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
          inputType:'textarea',
          value:'',
          mobile: true,
          placeholder:'请输入联系电话',
          disabled:''
      }]
    }
  },
  computed: {
  },

  components: {
    'mp-tuiHuoInput': tuiHuoInput
  },

  methods: {
    submit(){
      var that = this
      if(this.refund_reason == ''){
        wx.showToast({
          title: '请选择退货原因',
          icon: 'none',
          duration: 2000
        })
      }else if(this.thData[4].value == ''){
        wx.showToast({
          title: '请输入手机号',
          icon: 'none',
          duration: 2000
        })
      }else{
        wx.request({
          url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/order/orderRefundAskfor',
          method:'post',
          dataType:'json',
          data: {
            token: that.$store.state.token,
            order_goods_id: that.orderGoodsId,
            refund_type: 1,
            refund_reason: that.refund_reason,
            refund_description: that.thData[3].value,
            refund_user_mobile: that.thData[4].value,
            refund_img: that.filesOnline.toString()
          },
          success: function(res) {
            if(res.data.code == 0){
              wx.showToast({
                title: '申请退货成功',
                icon: 'success',
                duration: 2000
              })
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/quanBuDingDan/main'
                })
              }, 2000)
            }else{
              wx.showToast({
                title: res.data.info,
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }
    },
    open(type) {
      let _this = this
      if(type=='isGetGoods'){
        return false
      }else if(type=='reason'){
        wx.showActionSheet({
          itemList: _this.reasonList,
          success: function (res) {
            console.log("index：" + res.tapIndex, "用户选的值为：" + _this.reasonList[res.tapIndex])
            _this.refund_reason = _this.reasonList[res.tapIndex]
            _this.thData[1].value = _this.reasonList[res.tapIndex]
          }
        })
      }
    },
    chooseImage(e) {
      var _this = this;
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.files = _this.files.concat(res.tempFilePaths)
          
          var tempFilePaths = res.tempFilePaths
          // console.log(tempFilePaths)
          wx.uploadFile({
            url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/order/upload ', 
            filePath: tempFilePaths[0],
            name: 'file',
            header: {  
              "Content-Type": "multipart/form-data"  
            },  
            success: function(res){
              _this.filesOnline = _this.filesOnline.concat(JSON.parse(res.data).data)
            }
          })
        },
        fail: function () {
          console.log('fail');
        },
        complete: function () {
          console.log('commplete');
        }
      })
    },
    predivImage(e) {
      console.log(e);
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      })
    },
    deletImg(index){
      this.files.splice(index,1)
      this.filesOnline.splice(index,1)
    }
  },

  mounted(){
    var that = this;
    var pages = getCurrentPages(); //获取加载的页面
    var currentPage = pages[pages.length - 1]; //获取当前页面的对象
    this.orderGoodsId = currentPage.options.order_goods_id
    
    wx.request({
      url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/order/goRefundAskfor',
      method:'post',
      dataType:'json',
      data: {
        token: that.$store.state.token,
        order_goods_id: that.orderGoodsId
      },
      success: function(res) {
        that.isGetGoodsList = res.data.data.refund_type
        that.reasonList = res.data.data.refund_reason
        that.thData[2].value = Number(res.data.data.return_money).toFixed(2)
        that.mobile = res.data.data.mobile
        that.thData[4].value = that.mobile
      }
    })
  }
}
</script>

<style scoped>
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
.th-last-title{
  margin-top: 30rpx;
  font-size: 30rpx;
  color: #333;
  width: 750rpx;
  box-sizing: border-box;
  padding-left: 30rpx;
}
.th-icon-cancel{
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
  right: -14rpx;
  top: -14rpx;
}
.weui-uploader__input-box{
  margin-right: 0;
}
.weui-uploader__bd{
  margin-bottom: 0;
}
.posi-rela{
  position: relative;
  overflow: visible;
}
.weui-uploader__file:nth-child(4n){
  margin-right: 0;
}
.th-backwhite{
  width: 750rpx;
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom:4rpx solid #f5f5f5;
}
.th-submit-btn{
  width: 690rpx;
  height: 90rpx;
  line-height: 90rpx;
  background-color: #18c136;
  margin: 50rpx auto;
  color: #fff;
  font-size: 34rpx;
  text-align: center;
  border-radius: 6rpx;
}
.zhanwei{
  width: 750rpx;
  height: 20rpx;
}
.th-textarea-mobile{
  width: 100%;
  height: 74rpx;
  border-radius: 8rpx;
  box-sizing: border-box;
  padding: 20rpx 0 0 20rpx;
  background-color: #f5f5f5;
  font-size: 26rpx;
  color: #666;
  box-sizing: border-box;
}
</style>
