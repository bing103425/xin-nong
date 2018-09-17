<template>
  <div>
    <ul class="top-tab-box">
      <li v-for="(item,index) in tabData" :key="index" :class="{ 'active' : active == index}" @click="changeTabIndex(index)">{{item}}</li>
    </ul>
    <ul class="content-box">
      <mp-dingDanCard :fenxiangData="fenxiangData" :orderType="orderType"></mp-dingDanCard>
    </ul>
  </div>
</template>

<script>
import dingDanCard from '@/components/dingDanCard'

export default {
  data () {
    return {
      active:0,
      tabData:['全部','待付款','待收货','待发货','待评论'],
      fenxiangData:[],
      orderType:'全部'
    }
  },

  components: {
    'mp-dingDanCard':dingDanCard
  },

  mounted(){
    
    var that = this
    wx.request({
      url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/order/myOrderList',
      method:'post',
      dataType:'json',
      data:{
        token: that.$store.state.token
      },
      success: function(res) {
        res.data.data.forEach(item => {
          item.create_time = that.timestampToTime(item.create_time*1000,'sec')
          item.order_goods.forEach(innerItem => {
            innerItem.pic.pic_cover_small ='http://xcx_cx_cx_shop.idc.gcsci.net/'+ innerItem.pic.pic_cover_small
          })
        })

        that.fenxiangData = res.data.data
      }
    })
  },

  methods: {
    changeTabIndex(index){
      this.active = index
      this.orderType = this.tabData[index]
    },
    
    timestampToTime(timestamp,type) {
        var date = new Date(timestamp)    //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear()
        var M = '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
        var D = '-' + ( date.getDate() < 10 ? '0' + date.getDate() : date.getDate() )
        var h = '  ' + ( date.getHours() < 10 ? '0' + date.getHours() : date.getHours() )
        var m = ':' + ( date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() )
        var s = ':' + ( date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() )
      var dateType = type || 'sec'
        if(dateType =='month'){
            return Y + M    //年月
        }else if(dateType =='day'){
            return Y + M + D    //年月日
        }else if(dateType =='min'){
            return Y + M + D + h + m    //年月日时分
        }else if(dateType =='sec' || type == ''){
            return Y + M + D + h + m + s    //年月日时分秒
        }
    }

  }
}
</script>

<style scoped>
.top-tab-box{
  width: 750rpx;
  height: 94rpx;
  display: flex;
  background-color: #fff;
  flex-flow: nowrap row;
  justify-content:flex-start;
  align-items: center;
  border-bottom: 1rpx solid #f5f5f5;
}
.top-tab-box li{
  width: 40%;
  height: 94rpx;
  text-align: center;
  line-height: 94rpx;
  font-size: 28rpx;
  color: #999;
}
.top-tab-box .active{
  color: #18c136;
}
.content-box{
  width: 750rpx;
  box-sizing: border-box;
  display: flex;
  flex-flow: wrap row;
  justify-content: flex-start;
  align-items: center;
}
</style>
