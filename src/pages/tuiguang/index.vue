<template>
  <div class="">
    <p @click="qrcode">我要推广</p>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
  },

  components: {
  },

  methods: {
    qrcode(){
      wx.scanCode({
        success: (res) => {
          console.log(res)
        }
      })
    }
  },

  created () {
  },
  mounted(){
  }
}
</script>

<style scoped>
</style>
