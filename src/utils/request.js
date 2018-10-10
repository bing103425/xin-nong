import store from '../vuex/store'  //Vuex
const host = 'http://xcx_shop.idc.gcsci.net/index.php?s=';
function request(url, method, data, header = {}) {
  const token = wx.getStorageSync('token')
  return new Promise((resolve, reject) => {
      wx.request({
        url: host + url,
        method: method,
        data: {...data,token},
        headers: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          resolve(res.data)
          if(res.data.code == 10){
            //token失效，重新请求
            console.log('code为10，登录失效')
            var that = this
            wx.login({
              success: function(data) {
                var code = data.code
                console.log('失效重新请求的code',code)
                wx.getUserInfo({
                  success: (res) => {
                    store.dispatch("updateUserInfo",res.userInfo)   //将返回的个人信息存贮到vuex
                    var rawData = res.rawData
                    var signature = res.signature
                    var encryptedData = res.encryptedData
                    var iv = res.iv
                    //发起网络请求 
                    wx.request({
                      url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/Login/wxLogin',
                      method: 'POST',
                      data:{
                        code: data.code,
                        rawData: rawData,
                        signature: signature,
                        encryptedData: encryptedData,
                        iv: iv
                      },
                      success: function (res) {
                        store.dispatch("updateOpenIdAndToken",res.data.data.info)   //将返回的token信息存贮到vuex
                        wx.switchTab({
                          url: '/pages/index/main'
                        })
                      }

                    })
                  }
                })
              }
            })
          }
        },
        fail: function (error) {
          wx.hideLoading();
          reject(false)
        },
        complete: function () {
          wx.hideLoading();
        }
      })
  })
}
function get(obj) {
  return request(obj.url, 'GET', obj.data)
}
function post(obj) {
  return request(obj.url, 'POST', obj.data)
}

export default {
  request,
  get,
  post,
  host
}