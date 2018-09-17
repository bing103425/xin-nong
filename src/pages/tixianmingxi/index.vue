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
            <li class="txmx-item flex-space-between" v-for="(item,index) in txmxData" :key="index">
              <div>
                <p class="txmx-title">{{item.title}}</p>
                <p class="txmx-time">{{item.time}}</p>
              </div>
              <p class="txmx-money" :class="{'blace-text' : item.type==1,'green-text' : item.type==2,'grey-text' : item.type==0,}">{{item.money}}</p>
            </li>
          </ul>
        </div>
        <div class="weui-tab__content" :hidden="activeIndex != 1">待打款</div>
        <div class="weui-tab__content" :hidden="activeIndex != 2">已打款</div>
        <div class="weui-tab__content" :hidden="activeIndex != 3">无效</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabs: ["全部", "待打款", "已打款", "无效"],
      activeIndex: 0,
      txmxData:[{
        title:'待打款',
        time:'2018-06-20',
        money:'-2.25',
        type: 2
      },{
        title:'已打款',
        time:'2018-06-20',
        money:'-2.25',
        type: 1
      },{
        title:'无效',
        time:'2018-06-20',
        money:'-2.25',
        type: 0
      }]
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
