<template>
  <div class="con-tainer">
    <ul class="td-list-ul">
      <li class="flex-flex-start td-list" v-for="(item,index) in 2" :key="index">
        <img src="https://via.placeholder.com/170x170" class="td-headimg">
        <div class="td-text-box">
          <p class="td-name">神笔马里奥</p>
          <p class="td-user">账号：18365489752</p>
          <div class="td-info-box flex-space-between">
            <p>订单数：20</p>
            <p>总金额：<span class="red-text">500</span></p>
            <p>试吃：<span class="green-text">2</span></p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import fenXiaoCard from '@/components/fenXiaoCard'
export default {
  data () {
    return {
      fxIconList:[{
        src:'../../assets/image/team@2x.png',
        width:'78rpx',
        height:'64rpx',
        title:'我的团队',
        info:'0人',
        href:'/pages/tuandui/main'
      }]
    }
  },
  computed: {
  },

  components: {
  },

  methods: {
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
.td-list-ul{
  border-top: 1px solid #d7d7d7;
}
.td-list{
  background-color: #fff;
  width: 750rpx;
  height: 200rpx;
  padding-left: 30rpx;
  border-bottom: 4rpx solid #f5f5f5;
}
.td-headimg{
  width: 170rpx;
  height: 170rpx;
  border-radius: 100rpx;
  margin-right: 30rpx;
}
.td-name{
  font-size: 32rpx;
  color: #000;
}
.td-user{
  font-size: 26rpx;
  color: #666;
  margin-bottom: 20rpx;
}
.td-info-box{
  padding-right: 30rpx;
  font-size: 26rpx;
  color: #666;
  width: 100%;
  height: 58rpx;
  border-top: 1px solid #f5f5f5;
}
.td-info-box p{
  width: 40%;
}
.td-info-box p:nth-child(2){
  text-align: center;
}
.td-info-box p:nth-child(3){
  text-align: right;
}
.td-text-box{
  width: calc(100% - 200rpx);
}
</style>
