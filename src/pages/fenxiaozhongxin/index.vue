<template>
  <div class="con-tainer">
    <div class="fx-mine-info-box">
      <img src="../../assets/image/bj@2x.png" class="fx-img">
      <div class="fx-mine-info flex-flex-start">
        <img :src="userInfo.avatarUrl" class="fx-mine-headimg" alt="">
        <div>
          <p class="fx-name">{{userInfo.nickName}}</p>
          <p class="fx-tjr">推荐人：{{data.pid_name}}</p>
        </div>
      </div>
    </div>
    
    <div class="fx-tx-box flex-flex-start">
      <div>
        <p>成功提现佣金（元）</p>
        <p class="fx-tx-money">￥{{data.dis_withdraw}}</p>
      </div>
      <div>
        <p class="ketixian">可提现余额<span class="green-text"> ￥{{data.dis_withdraw_surplus}} </span> </p>
      </div>
    </div>
    <ul class="fx-icon-list">
      <li v-for="(item,index) in fxIconList" :key="index" class="fx-icon-item">
        <a class="fx-a flex-flex-start" :href="item.href">
          <img :src="item.src" class="fx-icon1" alt="" :style="{width:item.width, height:item.height}">
          <div>
            <p class="fx-icon-list-title">{{item.title}}</p>
            <p class="fx-icon-list-num">{{item.info}}</p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
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
        },{
          src:'../../assets/image/order2@2x.png',
          width:'70rpx',
          height:'82rpx',
          title:'分销订单',
          info:'0笔',
          href:'/pages/fenxiaodingdan/main'
        },{
          src:'../../assets/image/money@2x.png',
          width:'74rpx',
          height:'74rpx',
          title:'佣金明细',
          info:'0笔',
          href:'/pages/yongjin/main'
        },{
          src:'../../assets/image/tx@2x.png',
          width:'78rpx',
          height:'70rpx',
          title:'提现明细',
          info:'0笔',
          href:'/pages/tixianmingxi/main'
        },{
          src:'../../assets/image/tg@2x.png',
          width:'80rpx',
          height:'80rpx',
          title:'我要推广',
          info:'点击推广',
          href:'/pages/tuiguang/main'
        },{
          src:'../../assets/image/tx_1@2x.png',
          width:'72rpx',
          height:'72rpx',
          title:'我要提现',
          info:'可提',
          href:'/pages/woyaotixian/main'
      }],
      data:{}
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },

  components: {
  },

  methods: {
  },

  mounted(){
    var that = this
    wx.request({
      url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/distribution/index',
      method:'post',
      dataType:'json',
      data: {
        token: that.$store.state.token
      },
      success: function(res) {
        that.data = res.data.data
        that.fxIconList[1].info = res.data.data.dis_order_count+'笔'
        that.fxIconList[0].info = res.data.data.team_count+'人'
      }
    })
  }
}
</script>

<style scoped>
.con-tainer{
  width: 750rpx;
  height: 100vh;
  background-color: #f5f5f5;
}
.fx-mine-info-box{
  width: 750rpx;
  height: 218rpx;
  position: relative;
}
.fx-img{
  width: 750rpx;
  height: 218rpx;
}
.fx-mine-info{
  height: 218rpx;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 30rpx;
}
.fx-mine-headimg{
  width: 130rpx;
  height: 130rpx;
  border-radius: 100rpx;
  border: 4rpx solid #fff;
  margin-right: 20rpx;
}
.fx-name{
  font-size: 34rpx;
  color: #fff;
  margin-bottom: 10rpx;
}
.fx-tjr{
  font-size: 26rpx;
  color: #fff;
}
.fx-tx-box{
  background-color: #fff;
  width: 750rpx;
  padding: 30rpx;
  font-size: 28rpx;
  color: #333;
  margin-bottom: 24rpx;
}
.fx-tx-box div{
  width: 50%;
}
.fx-tx-money{
  font-size: 60rpx;
  color: #ff0000;
}
.fx-icon-list{
  width: 750rpx;
  background-color: #fff;
  padding: 0 40rpx;
	display: flex;
	flex-flow: row wrap;
	justify-content: flex-start;
	align-items: center;
	box-sizing: border-box;
}
.fx-icon-item{
  width: 50%;
  box-sizing: border-box;
  height: 170rpx;
  border-bottom: 1rpx solid #f5f5f5;
}
.fx-icon-item img{
  margin-right: 30rpx;
}
.fx-a{
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
.fx-icon-item:nth-child(even) {
  padding-left: 40rpx;
}
.fx-icon-item:nth-child(odd) {
  border-right: 1rpx solid #f5f5f5;
}
.fx-icon-list-title{
  font-size: 28rpx;
  color: #666;
}
.fx-icon-list-num{
  font-size: 24rpx;
  color: #666;
}
.fx-icon1{
  width: 78rpx;
  height: 64rpx;
}
.ketixian{
  text-align: center;
}
</style>
