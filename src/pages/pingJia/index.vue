<template>
  <div class="con-tainer">
    <div v-for="(item,index) in pingLunData" :key="index" class="pj-box">
      
      <div class="dpj-top flex-flex-start">
        <img :src="'http://xcx_cx_cx_shop.idc.gcsci.net/'+item.picture_info.pic_cover_small" class="dpj-img">
        <p class="dpj-name overhidden2">{{item.goods_name}}</p>
      </div>
      <textarea cols="30" rows="10" class="dpj-textarea" placeholder="宝贝满足你的期待吗？" v-model="postData[index].content"></textarea>
      <div class="weui-uploader__bd backwhite">
        <div class="weui-uploader__files" id="uploaderFiles">
          <block v-for="(item,index1) in postData[index].files" :key="index1">
            <div class="weui-uploader__file posi-rela" @click="predivImage" :id="item">
              <icon type="cancel" size="20" class="dpj-icon-cancel" @click.stop="deletImg(index,index1)"/>
              <image class="weui-uploader__img" :src="item" mode="aspectFill" />
            </div>
          </block>
        </div>
        <div class="weui-uploader__input-box">
          <div class="weui-uploader__input" @click="chooseImage(index,$event)"></div>
        </div>
      </div>
      <div class="dpj-nm-box flex-space-between">
        <checkbox-group @change="checkboxChange(index,$event)">
          <label class="weui-cell dpj-weui-cell weui-check__label" v-for="(item,index2) in postData[index].checkboxItems" :key="index2">
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
    </div>

    <div class="dpj-fb-btn" @click="submit()">发布</div>
    <div class="zhanwei"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      order_id:'',
      pingLunData:[],
      postData: [{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
        },{
          content: '',
          files: [],
          checkboxItems: [
            { name: '匿名', value: '1', checked: false }
          ],
          is_anonymous: 0,     //是否默认
          imgs:[]
      }]
    }
  },
  mounted(){
    var that = this
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length-1] //获取当前页面的对象
    this.order_id = currentPage.options.orderId
    that.pingLunData = []
    
    wx.request({
      url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/order/orderDetail',
      method:'post',
      data:{
        token: that.$store.state.token,
        order_id: that.order_id
      },
      dataType:'json',
      success: function(res) {
        let alldata = res.data.data.order_goods
        alldata.forEach(element => {
          if(element.refund_status<=0){
            that.pingLunData.push(element)
          }
        })
        
        that.postData.splice(that.pingLunData.length,that.postData.length-that.pingLunData.length)
      }
    })
  },
  methods: {
    chooseImage(index,e) {
      var _this = this;
      wx.chooseImage({
        count: 1, // 默认9，微信暂时未做支持。。。那你丫文档里写它干嘛
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.postData[index].files =  _this.postData[index].files.concat(res.tempFilePaths)
          
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
              _this.postData[index].imgs = _this.postData[index].imgs.concat(JSON.parse(res.data).data)
            }
          })
          
        },
        fail: function () {
          console.log('fail');
        },
        complete: function () {
          // console.log('commplete');
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
    deletImg(index,index1){
      this.postData[index].files.splice(index1,1)
      this.postData[index].imgs.splice(index1,1)
      console.log(this.postData[index].imgs)
    },
    
    checkboxChange(index,e) {
      var checkboxItems = this.postData[index].checkboxItems
      var values = e.mp.detail.value
      if(e.mp.detail.value.length){
        this.postData[index].is_anonymous = '1'
      }else{
        this.postData[index].is_anonymous = '0'
      }
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].checked = false

        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (checkboxItems[i].value == values[j]) {
            checkboxItems[i].checked = true
            break;
          }
        }
      }
      this.postData[index].checkboxItems = checkboxItems
    },
    submit(){
      console.log(this.postData)
      //发布
      var that = this
      var pinLunDetail = []
      for(let i =0;i<this.postData.length;i++){
        var obj = {}
        obj.imgs = this.postData[i].imgs.toString()
        obj.order_goods_id = this.pingLunData[i].order_goods_id
        obj.content = this.postData[i].content
        obj.is_anonymous = this.postData[i].is_anonymous

        pinLunDetail.push(obj)
      }
      
      wx.request({
        url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/order/submitOrderComment',
        method:'post', 
        data:{
          token: that.$store.state.token,
          order_id: that.order_id,
          goodsEvaluate: JSON.stringify(pinLunDetail)
        },
        dataType:'json',
        success: function(res) {
          if(res.data.code == 0){
            wx.showToast({
              title: '评价成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/quanBuDingDan/main'
              })
            }, 2000)
          }
        }
      })
      
    }
  }
}
</script>

<style scoped>
.pj-box{
  border-bottom: 20rpx solid #eee;
}
.pj-box:nth-child(1){
  border-top:1rpx solid #d7d7d7;
}
.pj-box:nth-last-child(1){
  border-bottom: none;
  margin-bottom: 100rpx;
}
.dpj-top{
  background-color: #fff;
  width: 750rpx;
  height: 160rpx;
  padding: 0 30rpx;
  color: #666;
  font-size: 26rpx;
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
}
.dpj-weui-cell{
  padding: 0;
}
icon{
  margin-left: 0;
}
.dpj-fb-btn{
  width: 690rpx;
  margin: 90rpx auto;
  margin-bottom: 60rpx;
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
  height: 1rpx;
}
</style>
