<template>
  <div class="">
    <div class="page">
      <div class="weui-navbar bottom-line">
        <block v-for="(item,index) in tabs" :key="index">
          <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
            <div class="weui-navbar__title">{{item}}</div>
          </div>
        </block>
        <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
      </div>
      <div class="weui-tab__panel">
        <div class="weui-tab__content" :hidden="activeIndex != 0">
          <ul class="txmx-list">
            <li class="txmx-item flex-space-between" v-for="(item,index) in wholeData" :key="index">
              <div>
                <p class="txmx-title">{{item.status_name}}</p>
                <p class="txmx-time">{{item.ask_for_date}}</p>
              </div>
              <p class="txmx-money" :class="{'blace-text' : item.status==0,'green-text' : item.status==1,'grey-text' : item.status==-1,}">+{{item.cash}}</p>
            </li>
          </ul>
        </div>

        <!-- 待打款 -->
        <div class="weui-tab__content" :hidden="activeIndex != 1">
          <ul class="txmx-list">
            <li class="txmx-item flex-space-between" v-for="(item,index) in daiDaKuanData" :key="index">
              <div>
                <p class="txmx-title">{{item.status_name}}</p>
                <p class="txmx-time">{{item.ask_for_date}}</p>
              </div>
              <p class="txmx-money" :class="{'blace-text' : item.status==0,'green-text' : item.status==1,'grey-text' : item.status==-1}">+{{item.cash}}</p>
            </li>
          </ul>
        </div>

        <!-- 已打款 -->
        <div class="weui-tab__content" :hidden="activeIndex != 2">
          <ul class="txmx-list">
            <li class="txmx-item flex-space-between" v-for="(item,index) in yiDaKuanData" :key="index">
              <div>
                <p class="txmx-title">{{item.status_name}}</p>
                <p class="txmx-time">{{item.ask_for_date}}</p>
              </div>
              <p class="txmx-money" :class="{'blace-text' : item.status==0,'green-text' : item.status==1,'grey-text' : item.status==-1}">+{{item.cash}}</p>
            </li>
          </ul>
        </div>


        <!-- 无效 -->
        <div class="weui-tab__content" :hidden="activeIndex != 3">
          <ul class="txmx-list">
            <li class="txmx-item flex-space-between" v-for="(item,index) in wuXiaoData" :key="index">
              <div>
                <p class="txmx-title">{{item.status_name}}</p>
                <p class="txmx-time">{{item.ask_for_date}}</p>
              </div>
              <p class="txmx-money" :class="{'blace-text' : item.status==0,'green-text' : item.status==1,'grey-text' : item.status==-1}">+{{item.cash}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="dth-tip" v-if="hasData == false">还没有提现明细哦~</div>
    </div>
  </div>
</template>

<script>
import { timestampToTime } from '@/utils/index'
export default {
  data () {
    return {
      tabs: ["全部", "未打款", "已打款", "无效"],
      activeIndex: 0,
      wholeData:[],
      hasData: true
    }
  },
  computed: {
    navbarSliderClass() {
      if (this.activeIndex == 0) {
        return 'weui-navbar__slider_0'
      }
      if (this.activeIndex == 1) {
        return 'weui-navbar__slider_1'
      }
      if (this.activeIndex == 2) {
        return 'weui-navbar__slider_2'
      }
      if (this.activeIndex == 3) {
        return 'weui-navbar__slider_3'
      }
    },
    daiDaKuanData(){
      let arr1 = []
      for(let i=0;i<this.wholeData.length;i++){
        if(this.wholeData[i].status == 0){
          arr1.push(this.wholeData[i])
        }
      }
      return arr1
    },
    yiDaKuanData(){
      let arr2 = []
      for(let i=0;i<this.wholeData.length;i++){
        if(this.wholeData[i].status == 1){
          arr2.push(this.wholeData[i])
        }
      }
      return arr2
    },
    wuXiaoData(){
      let arr3 = []
      for(let i=0;i<this.wholeData.length;i++){
        if(this.wholeData[i].status == -1){
          arr3.push(this.wholeData[i])
        }
      }
      return arr3
    },
  },

  methods: {
    tabClick(e) {
      console.log(e.currentTarget.id)
      this.activeIndex = e.currentTarget.id
    }
  },

  mounted(){
    var that = this
    wx.request({
      url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/distribution/memberWithDrawList',
      method:'post',
      dataType:'json',
      data: {
        token: that.$store.state.token
      },
      success: function(res) {
        if(res.data.code == 0){
          if(!res.data.data.length){
            that.hasData = false
          }
          that.wholeData = res.data.data
          that.wholeData.forEach(element => {
            element.ask_for_date = timestampToTime((element.ask_for_date)*1000,'day')
          })
        }
      }
    })
  }
}
</script>

<style scoped>
.page{
  width: 750rpx;
}
page,.page,.page__bd {
  height: 100%;
}
.page__bd {
  padding-bottom: 0;
}
.weui-tab__content {
  text-align: center;
}
.weui-navbar__slider_0 {
  left: 22rpx;
  transform: translateX(0);
}
.weui-navbar__slider_1 {
  left: 22rpx;
  transform: translateX(186rpx);
}
.weui-navbar__slider_2 {
  left:22rpx;
  transform: translateX(374rpx);
}
.weui-navbar__slider_3 {
  left:22rpx;
  transform: translateX(566rpx);
}
.bottom-line{
  border-bottom: 1rpx solid #f5f5f5;
}
.txmx-item{
  padding: 0 30rpx;
  text-align: left;
  height: 140rpx;
  border-bottom: 1rpx solid #f5f5f5;
}
.txmx-money{
  font-size: 40rpx;
}
.txmx-title{
  font-size: 32rpx;
  color: #333;
}
.txmx-time{
  font-size: 24rpx;
  color: #999;
}
.blace-text{
  color: #333;
}
.grey-text{
  color: #999;
}
</style>
