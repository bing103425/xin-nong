require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([9],{"08Yg":function(t,s,i){"use strict";s.a={data:function(){return{}},methods:{openToast:function(){wx.showToast({title:"已完成",icon:"success",duration:3e3})},openLoading:function(){wx.showToast({title:"数据加载中",icon:"loading",duration:3e3})}}}},NmAz:function(t,s,i){"use strict";var a=i("08Yg"),e=i("qHNU");var n=function(t){i("apZ6")},o=i("wTlV")(a.a,e.a,n,null,null);s.a=o.exports},apZ6:function(t,s){},bbA4:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=i("5nAL"),e=i.n(a),n=i("NmAz");new e.a(n.a).$mount()},qHNU:function(t,s,i){"use strict";var a={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"page"},[this._m(0),this._v(" "),s("div",{staticClass:"page__bd"},[s("div",{staticClass:"weui-btn-area"},[s("button",{staticClass:"weui-btn",attrs:{type:"default",eventid:"0"},on:{click:this.openToast}},[this._v("成功提示")]),this._v(" "),s("button",{staticClass:"weui-btn",attrs:{type:"default",eventid:"1"},on:{click:this.openLoading}},[this._v("加载中提示")])],1)])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"page__hd"},[s("div",{staticClass:"page__title"},[this._v("Toast")]),this._v(" "),s("div",{staticClass:"page__desc"},[this._v("弹出式提示，采用小程序原生的toast")])])}]};s.a=a}},["bbA4"]);