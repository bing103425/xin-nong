import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default { 
  config: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#455A73',
    navigationBarTitleText: '购物车',
    navigationBarTextStyle: '#fff'
  }
}