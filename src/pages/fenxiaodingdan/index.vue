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
        <div class="weui-tab__content" :hidden="activeIndex != 0">
          <mp-fenXiaoCard></mp-fenXiaoCard>
        </div>
        <div class="weui-tab__content" :hidden="activeIndex != 1">待分成</div>
        <div class="weui-tab__content" :hidden="activeIndex != 2">已分成</div>
        <div class="weui-tab__content" :hidden="activeIndex != 3">试吃</div>
      </div>
    </div>
  </div>
</template>

<script>
import fenXiaoCard from '@/components/fenXiaoCard'
export default {
  data () {
    return {
      tabs: ["全部(0)", "待分成(0)", "已分成(0)", "试吃(0)"],
      activeIndex: 0,
      fontSize: 30
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

  created () {
  },
  mounted(){
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
</style>
