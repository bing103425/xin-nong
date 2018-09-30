<template>
  <div class="">
    <div class="weui-tab">
      <div class="weui-navbar bottom-line">
        <block v-for="(item,index) in tabs" :key="index">
          <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
            <div class="weui-navbar__title">{{item}}</div>
          </div>
        </block>
        <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
      </div>
      <div class="weui-tab__panel">
        <div class="dth-tip" v-if="hasData == false">还没有分销订单哦~</div>
        <div class="weui-tab__content" :hidden="activeIndex != 0">
          <mp-fenXiaoCard :fenxiangData="fenxiangData"></mp-fenXiaoCard>
        </div>
        <div class="weui-tab__content" :hidden="activeIndex != 1">
          <mp-fenXiaoCard :fenxiangData="daiFenXiao"></mp-fenXiaoCard>
        </div>
        <div class="weui-tab__content" :hidden="activeIndex != 2">
          <mp-fenXiaoCard :fenxiangData="yiFenXiao"></mp-fenXiaoCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fenXiaoCard from '@/components/fenXiaoCard'
import { timestampToTime } from '@/utils/index'
export default {
  data () {
    return {
      tabs: ["全部", "待分销", "已分销"],
      activeIndex: 0,
      fontSize: 30,
      fenxiangData: [],
      hasData: true
    }
  },
  computed: {
    daiFenXiao(){
      var arr = []
      this.fenxiangData.forEach(element => {
        if(element.is_fx == 0){
          arr.push(element)
        }
      })
      return arr
    },
    yiFenXiao(){
      var arr1 = []
      this.fenxiangData.forEach(element => {
        if(element.is_fx == 1){
          arr1.push(element)
        }
      })
      return arr1
    },
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
    }
  },

  components: {
    'mp-fenXiaoCard': fenXiaoCard
  },

  methods: {
    tabClick(e) {
      console.log(e);
      this.activeIndex = e.currentTarget.id;
    }
  },
  
  mounted(){
    var that = this
    wx.request({
      url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/distribution/disOrderList',
      method:'post',
      dataType:'json',
      data: {
        token: that.$store.state.token
      },
      success: function(res) {
        if(!res.data.data.length){
          that.hasData = false
        }
        that.fenxiangData = res.data.data
        that.fenxiangData.forEach(element => {
          element.creat_time = timestampToTime(element.creat_time*1000,'day')
        });
      }
    })
  }
}
</script>

<style scoped>
.page {
  width: 750rpx;
}
page,
.page,
.page__bd {
  height: 100%;
}
.page__bd {
  padding-bottom: 0;
}
.weui-tab__content {
  text-align: center;
}
.weui-navbar__slider_0 {
  left: 52rpx;
  transform: translateX(0);
}
.weui-navbar__slider_1 {
  left: 22rpx;
  transform: translateX(280rpx);
}
.weui-navbar__slider_2 {
  left: 22rpx;
  transform: translateX(530rpx);
}
.bottom-line {
  border-bottom: 1rpx solid #f5f5f5;
}
</style>
