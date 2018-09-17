// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    openId: wx.getStorageSync('openId'),
    token: wx.getStorageSync('token'),
    userInfo:  wx.getStorageSync('userInfo') || {},
  },
  mutations: {
    updateOpenIdAndToken(state, info) {
      wx.setStorageSync("openId", info.openId)
      wx.setStorageSync("token", info.token)
      state.openId = info.openId
      state.token = info.token
    },
    updateUserInfo(state, info) {
      wx.setStorageSync("userInfo", info)
      state.userInfo = info
    }
  },
  actions: {
    async updateOpenIdAndToken(context, data) {
      context.commit("updateOpenIdAndToken", data);
    },
    async updateUserInfo(context, data) {
      context.commit("updateUserInfo", data);
    }
  }
})

export default store
