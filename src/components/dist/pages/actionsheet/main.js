require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([38],{IM2i:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("5nAL"),n=s.n(i),a=s("aR02");new n.a(a.a).$mount()},YUQF:function(t,e,s){"use strict";e.a={data:function(){return{}},methods:{open:function(){wx.showActionSheet({itemList:["A","B","C"],success:function(t){console.log(t.tapIndex)}})}}}},aR02:function(t,e,s){"use strict";var i=s("YUQF"),n=s("f/pJ");var a=function(t){s("tABy")},c=s("wTlV")(i.a,n.a,a,null,null);e.a=c.exports},"f/pJ":function(t,e,s){"use strict";var i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"page"},[this._m(0),this._v(" "),e("div",{staticClass:"page__bd"},[e("div",{staticClass:"weui-btn-area"},[e("button",{attrs:{type:"default",eventid:"0"},on:{click:this.open}},[this._v("ActionSheet")])],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"page__hd"},[e("div",{staticClass:"page__title"},[this._v("ActionSheet")]),this._v(" "),e("div",{staticClass:"page__desc"},[this._v("弹出式菜单，采用小程序原生的actionsheet")])])}]};e.a=i},tABy:function(t,e){}},["IM2i"]);