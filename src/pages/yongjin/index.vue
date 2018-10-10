<template>
  <div class="">
    <ul>
      <li v-for="(item,index) in data" :key="index" class="yj-item flex-space-between">
        <div class="yj-money-box">
          <p class="yj-money red-text">+{{item.dis_money}}</p>
          <p class="yj-out-trade-no">订单编号：{{item.out_trade_no}}</p>
        </div>
        <div class="yj-date-box">
          <p class="yj-status" v-if="item.is_fx == 0">待分销</p>
          <p class="yj-status" v-else-if="item.is_fx == 1">已分销</p>
          <p class="yj-date">{{item.creat_time}}</p>
        </div>
      </li>
    </ul>
    <div class="dth-tip" v-if="hasData == false">还没有佣金哦~</div>

  </div>
</template>

<script>
import { timestampToTime } from '@/utils/index'
export default {
  data () {
    return {
      data:[],
      hasData: true
    }
  },
  mounted(){
    var that = this
    that.$http.post({
      url:"/wx/distribution/getCommissionInfo",
      dataType:'json'
    })
    .then(res =>{
      if(!res.data.length){
        that.hasData = false
      }
      that.data = res.data
      console.log(that.data)
      that.data.forEach(element => {
        element.creat_time = timestampToTime(element.creat_time,'min')
      })
    })
  }
}
</script>

<style scoped>
.yj-item{
  line-height: 60rpx;
  width: 100%;
  padding: 20rpx 30rpx;
  border-bottom: 10rpx solid #eee;
  background-color: #fff;
}
.yj-money{
  font-size: 34rpx;
}
.yj-money-box{
  width: 70%;
}
.yj-out-trade-no{
  font-size: 26rpx;
  color: #333;
}
.yj-date-box{
  height: 100%;
  text-align: right;
  width: 30%;
}
.yj-status{
  font-size: 26rpx;
  color: #666;
}
.yj-date{
  font-size: 24rpx;
  color: #999;
}
</style>
