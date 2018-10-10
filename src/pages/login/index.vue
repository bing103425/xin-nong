<template>
  <div class="container">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <button open-type="getUserInfo" lang="zh_CN" @click="onGotUserInfo()">获取用户信息</button>
    <button open-type="getUserInfo" lang="zh_CN" @click="getUserInfo()">授权登录</button>

  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      userInfo: {}
    }
  },

  components: {
    card
  },

  methods: {
    onGotUserInfo(){
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    getUserInfo () {
      var that = this
      wx.login({
        success: function(data) {
          var code = data.code
          wx.getUserInfo({
            success: (res) => {
              that.userInfo = res.userInfo
              that.$store.dispatch("updateUserInfo",res.userInfo)   //将返回的个人信息存贮到vuex
              var rawData = res.rawData
              var signature = res.signature
              var encryptedData = res.encryptedData
              var iv = res.iv
              //发起网络请求
              that.$http.post({
                  url:"/wx/Login/wxLogin",
                  data:{
                    code: data.code,
                    rawData: rawData,
                    signature: signature,
                    encryptedData: encryptedData,
                    iv: iv,
                    uid: 1
                  }
              }).then(res =>{
                  that.$store.dispatch("updateOpenIdAndToken",res.data.info)   //将返回的token信息存贮到vuex
                  wx.switchTab({
                    url: '/pages/index/main'
                  })
              })
            }
          })
        }
      })
    }
  },

  created () {
    wx.redirectTo({
      url: '/pages/index/main'
    })
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
