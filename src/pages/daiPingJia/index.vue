<template>
  <div class="con-tainer">
    <div class="dpj-top flex-flex-start">
      <img src="http://wx1.sinaimg.cn/mw690/0060lm7Tly1fug5qtnh96j309t09tjuk.jpg" class="dpj-img">
      <p class="dpj-name overhidden2">临安天目山小香薯5斤 新鲜小红薯板栗小番薯农家自种山芋地瓜紫薯</p>
    </div>
    <textarea name="" id="" cols="30" rows="10" class="dpj-textarea" placeholder="宝贝满足你的期待吗？"></textarea>
    {{msg}}
    <div class="weui-uploader__bd backwhite">
      <div class="weui-uploader__files" id="uploaderFiles">
        <block v-for="(item,index) in files" :key="index">
          <div class="weui-uploader__file posi-rela" @click="predivImage" :id="item">
            <icon type="cancel" size="20" class="dpj-icon-cancel" @click.stop="deletImg(index)"/>
            <image class="weui-uploader__img" :src="item" mode="aspectFill" />
          </div>
        </block>
      </div>
      <div class="weui-uploader__input-box">
        <div class="weui-uploader__input" @click="chooseImage"></div>
      </div>
    </div>
    <div class="dpj-nm-box flex-space-between">
      <checkbox-group @change="checkboxChange">
        <label class="weui-cell dpj-weui-cell weui-check__label" v-for="(item,index) in checkboxItems" :key="index">
          <checkbox class="weui-check" :value="item.value" :checked="item.checked" />
          <div class="weui-cell__hd weui-check__hd_in-checkbox">
            <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked"></icon>
            <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="item.checked"></icon>
          </div>
          <div class="weui-cell__bd">{{item.name}}</div>
        </label>
      </checkbox-group>
      <p>你的评价能帮助其他小伙伴呦</p>
    </div>
    <div class="dpj-fb-btn" @click="release()">发布</div>
    <div class="zhanwei"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg:'',
      files: [],
      checkboxItems: [
        { name: '匿名', value: '1', checked: false }
      ]
    }
  },
  methods: {
    chooseImage(e) {
      var _this = this;
      wx.chooseImage({
        count: 1, // 默认9，微信暂时未做支持。。。那你丫文档里写它干嘛
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.files = _this.files.concat(res.tempFilePaths)
          
          var tempFilePaths = res.tempFilePaths
          console.log(tempFilePaths[0])
          _this.msg = tempFilePaths[0]
          wx.uploadFile({
            url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/order/upload ', 
            filePath: tempFilePaths[0],
            name: 'file',
            header: {  
              "Content-Type": "multipart/form-data"  
            },  
            success: function(res){
              var data = res.data
              //do something
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
      console.log(e.currentTarget.id);
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      })
    },
    deletImg(index){
      this.files.splice(index,1)
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
      this.checkboxItems = checkboxItems;
    },
    release(){
      //发布
    }
  }
}
</script>

<style scoped>
.con-tainer{
  width: 750rpx;
  height: 100vh;
  /* background-color: #f5f5f5; */
}
.dpj-top{
  background-color: #fff;
  width: 750rpx;
  height: 160rpx;
  padding: 0 30rpx;
  color: #666;
  font-size: 26rpx;
  border-top:1rpx solid #d7d7d7;
  border-bottom:4rpx solid #f5f5f5;
}
.dpj-img{
  width: 120rpx;
  height: 120rpx;
  margin-right: 30rpx;
}
.dpj-name{
  width: 536rpx;
}
.dpj-textarea{
  width: 750rpx;
  height: 300rpx;
  font-size: 28rpx;
  color: #999;
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  background-color: #fff;
}
.weui-uploader__bd{
  margin-bottom: 0;
}
.backwhite{
  width: 750rpx;
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom:4rpx solid #f5f5f5;
}
.weui-uploader__input-box{
  margin-right: 0;
}
.dpj-nm-box{
  background-color: #fff;
  height: 100rpx;
  width: 750rpx;
  padding: 0 30rpx;
  color: #999;
  font-size: 28rpx;
  margin-bottom: 90rpx;
  border-bottom:4rpx solid #f5f5f5;
}
.dpj-weui-cell{
  padding: 0;
}
icon{
  margin-left: 0;
}
.dpj-fb-btn{
  width: 690rpx;
  margin: 0 auto;
  background-color: #18c136;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  color: #fff;
  font-size: 34rpx;
  border-radius: 8rpx;
}
.weui-uploader__file:nth-child(4n){
  margin-right: 0;
}
.posi-rela{
  position: relative;
  overflow: visible;
}
.dpj-icon-cancel{
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
  right: -14rpx;
  top: -14rpx;
}
.zhanwei{
  width: 750rpx;
  height: 70rpx;
}
</style>
