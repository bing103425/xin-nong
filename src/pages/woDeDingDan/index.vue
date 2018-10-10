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
    that.$http.post({
      url:"/wx/order/myOrderList",
      dataType:'json'
    })
    .then(res =>{
    })
  }
}
</script>

<style scoped>
</style>
