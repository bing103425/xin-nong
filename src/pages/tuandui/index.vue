<template>
  <div class="con-tainer">
    <ul class="td-list-ul">
      <li class="flex-flex-start td-list" v-for="(item,index) in userList" :key="index" @click="toXiaJi(item.pid_count,item.uid)">
        <img :src="item.user_headimg" class="td-headimg">
        <div class="td-text-box">
          <p class="td-name">{{item.user_name}}</p>
          <div class="td-info-box flex-space-between">
            <p>订单数：{{item.order_count}}</p>
            <p>总金额：<span class="red-text">{{item.order_sum_money}}</span></p>
          </div>
        </div>
      </li>
    </ul>
    <div class="td-back-btn" @click="back()" v-if="uidIndex > 0">返回上级</div>
    <div class="dth-tip" v-if="hasData == false">还没有团队哦~</div>
  </div>
</template>

<script>
import fenXiaoCard from '@/components/fenXiaoCard'
export default {
  data () {
    return {
      userList:[],
      uid:[],
      uidIndex: 0,
      hasData: true
    }
  },
  computed: {
  },

  components: {
  },

  methods: {
    back(){
      this.uidIndex--
      if(this.uidIndex <= 0){
        this.getXiaJiList()     //获取我的团队
      }else{
        this.getXiaJiList(this.uid[this.uidIndex-1])     //获取我的团队
      }
    },
    getXiaJiList(uid){
      var that = this
      wx.request({
        url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/distribution/getUserTeam',
        method:'post',
        dataType:'json',
        data: {
          token: that.$store.state.token,
          uid: uid
        },
        success: function(res) {
          if(!res.data.data.user_info.length){
            that.hasData = false
          }
          that.userList = res.data.data.user_info
        }
      })
    },
    toXiaJi(isHasXiaJi,uid){
      if(isHasXiaJi){
        this.uid[this.uidIndex] = uid
        this.uidIndex++
        this.getXiaJiList(uid)
      }
    }
  },
  
  mounted(){
    this.getXiaJiList()
  }
}
</script>

<style scoped>
.dth-tip{
  width: 100%;
  margin-top: 50rpx;
  text-align: center;
  font-size: 28rpx;
  color: #999;
}
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
  margin-top: 36rpx;
  padding-right: 30rpx;
  font-size: 26rpx;
  color: #666;
  width: 100%;
  height: 58rpx;
  border-top: 1px solid #f5f5f5;
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
.td-back-btn{
  width: 750rpx;
  height: 90rpx;
  line-height: 90rpx;
  background-color: #18c136;
  color: #fff;
  font-size: 34rpx;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
