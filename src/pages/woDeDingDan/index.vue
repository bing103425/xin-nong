<template>
  <div>
    我的订单
  </div>
</template>

<script>
import mineCard from '@/components/mineCard'

export default {
  data () {
    return {
    }
  },

  components: {
    'mp-mineCard':mineCard
  },

  methods: {
  },

  mounted () {
    var that = this
    wx.request({
      url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/order/myOrderList',
      method:'post',
      dataType:'json',
      data: {
        token: that.$store.state.token
      },
      success: function(res) {
        console.log('res',res.data)
      },
      fail(err){
        console.log(err)
      }
    })
  }
}
</script>

<style scoped>
</style>
