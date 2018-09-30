<template>
  <div>
    <ul>
      <li class="bottom-box" v-for="(item,index1) in newPingLunData" :key="index1">
        <div class="clearfix">
          <div class="headimage-box pull-left">
            <img :src="item.user_headimg" alt="">
          </div>
          <p class="tel pull-left">{{item.user_name}}</p>
        </div>
        <p class="date">{{item.addtime}}</p>
        <p class="content">{{item.content}}</p>
        
        <div class="image-box">
          <block v-for="(innerItem,innerIndex) in item.image" :key="innerIndex">
            <div class="weui-uploader__file pll-nomar" @click="predivImage" :id="innerItem">
              <img alt="" class="content-img" :src="innerItem">
            </div>
          </block>
        </div>
      </li>
      <div v-if="hasPingLunData == false" class="goods-no-content">啊呀，暂无内容~</div>
    </ul>
  </div>
</template>

<script>
import { timestampToTime } from '@/utils/index'
export default {
  data(){
    return{
      hasPingLunData: true    //是否有评论列表
    }
  },
  props: ['pingLunData'],
  methods:{
    predivImage(e) {
      console.log(e);
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      })
    },
  },
  watch:{
    pingLunData(){
      if(this.pingLunData.length){
        this.hasPingLunData = true
      }else{
        this.hasPingLunData = false
      }
    }
  },
  computed:{
    files(){
      let arr = []
      this.pingLunData.forEach(element => {
        if(element.image){
          element.image.forEach(item => {
            arr.push(item)
          })
        }
      })
      return arr
    },
    newPingLunData(){
      console.log('this.pingLunData',this.pingLunData)
      this.pingLunData.forEach(item => {
        //时间戳转换正常日期
        item.addtime = timestampToTime(item.addtime,'day')
      })
      return this.pingLunData
    }
  }
}
</script>

<style>
.goods-no-content{
  width: 100%;
  margin: 240rpx 0;
  text-align: center;
  box-sizing: border-box;
  font-size: 24rpx;
  color: #999;
}
.bottom-box{
   width: 750rpx;
   padding: 40rpx 24rpx 0 30rpx;
   margin-bottom: 6rpx;
   box-sizing: border-box;
   background-color: #fff;
}
.headimage-box{
  width: 58rpx;
  height: 58rpx;
  border-radius: 30rpx;
  border: 2rpx solid #ddd;
  overflow: hidden;
  margin-right: 12rpx;
  margin-bottom: 18rpx;
}
.headimage-box img{
  width: 58rpx;
  height: 58rpx;
}
.tel{
  color: #333;
  font-size: 24rpx;
  line-height: 58rpx;
}
.date{
  text-align: left;
  color: #999;
  font-size: 24rpx;
  margin-bottom: 18rpx;
}
.content{
  text-align: left;
  color: #333;
  font-size: 30rpx;
  margin-bottom: 30rpx;
  padding-right: 6rpx;
  box-sizing: border-box;
}
.content-img{
  width: 226rpx;
  height: 226rpx;
  margin-right: 6rpx;
  margin-bottom: 6rpx;
}
.image-box{
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 14rpx;
}
.pll-nomar{
  margin: 0;
}
</style>
