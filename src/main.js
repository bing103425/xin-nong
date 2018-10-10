import Vue from 'vue'
import App from './App'
import './assets/css/global.css'    //全局css样式
import './assets/css/weui.css'    //组件库css样式
import store from './vuex/store'  //Vuex
import request from './utils/request'


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
Vue.prototype.$store = store
Vue.prototype.$http = request
app.$mount()
export default {
    // 这个字段走 app.json
    config: {
        // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
        pages: ['^pages/login/main'],
        window: {
            onReachBottomDistance: 10
        }
    }
}