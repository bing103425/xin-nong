require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([4],{"1sCP":function(e,i){e.exports={value:[{label:"飞机票",value:0,children:[{label:"经济舱",value:1},{label:"商务舱",value:2}]},{label:"火车票",value:1,children:[{label:"卧铺",value:1,disabled:!0},{label:"坐票",value:2},{label:"站票",value:3}]},{label:"汽车票",value:3,children:[{label:"快班",value:1},{label:"普通",value:2}]}]}},Ai1K:function(e,i){},"C34/":function(e,i,l){"use strict";var a=l("PA+/"),t=l("oQLk");var c=function(e){l("Ai1K")},r=l("wTlV")(a.a,t.a,c,null,null);i.a=r.exports},"PA+/":function(e,i,l){"use strict";var a=l("1sCP"),t=l.n(a);i.a={data:function(){return{pickerShow:!1,isShowMask:!1,pickerValue:[0,1],mulLinkAgeArray:t.a.value,columuOne:[],columnTwo:[]}},mounted:function(){this._initPicker()},methods:{pickerChange:function(e){var i=e.mp.detail.value;if(i[0]!==this.pickerValue[0]){var l=this.mulLinkAgeArray[i[0]].children;this.columnTwo=[];for(var a=0;a<l.length;a++)this.columnTwo.push(l[a].label);this.pickerValue=i,this.pickerValue[1]=0}i[1]!==this.pickerValue[1]&&(this.pickerValue[1]=e.mp.detail.value[1]),console.log("选中的值为："+this.mulLinkAgeArray[i[0]].label+"-"+this.mulLinkAgeArray[i[0]].children[i[1]].label),console.log("pickerValue："+this.pickerValue)},pickerConfirm:function(){console.log("选中的值为："+this.mulLinkAgeArray[this.pickerValue[0]].label+"-"+this.mulLinkAgeArray[this.pickerValue[0]].children[this.pickerValue[1]].label),console.log("pickerValue："+this.pickerValue),this.isShowMask=!1,this.pickerShow=!1},pickerCancel:function(){this.isShowMask=!1,this.pickerShow=!1},showPickerView:function(){this.isShowMask=!0,this.pickerShow=!0},maskClick:function(){this.pickerCancel()},_initPicker:function(){for(var e=this.mulLinkAgeArray,i=0;i<e.length;i++)this.columuOne.push(e[i].label);for(var l=e[this.pickerValue[0]].children,a=0;a<l.length;a++)this.columnTwo.push(l[a].label)}}}},YU8Q:function(e,i,l){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=l("5nAL"),t=l.n(a),c=l("C34/");new t.a(c.a).$mount()},oQLk:function(e,i,l){"use strict";var a={render:function(){var e=this,i=e.$createElement,l=e._self._c||i;return l("div",{staticClass:"page"},[l("div",{class:{pickerMask:e.isShowMask},attrs:{catchtouchmove:"true",eventid:"0"},on:{click:e.maskClick}}),e._v(" "),l("button",{attrs:{type:"default",eventid:"1"},on:{click:e.showPickerView}},[e._v("多级联动选择")]),e._v(" "),l("div",{staticClass:"weui-picker",class:{weui_picker_view_show:e.pickerShow}},[l("div",{staticClass:"weui-picker__hd"},[l("div",{staticClass:"weui-picker__action",attrs:{href:"javascript:;",eventid:"2"},on:{click:e.pickerCancel}},[e._v("取消")]),e._v(" "),l("div",{staticClass:"weui-picker__action",attrs:{href:"javascript:;",eventid:"3"},on:{click:e.pickerConfirm}},[e._v("确定")])]),e._v(" "),l("picker-view",{staticClass:"weui_picker_view",attrs:{"indicator-style":"height: 40px;",value:e.pickerValue,eventid:"4"},on:{change:e.pickerChange}},[l("picker-view-column",{attrs:{mpcomid:"0"}},e._l(e.columuOne,function(i,a){return l("div",{key:a,staticClass:"picker-item"},[e._v(e._s(i))])})),e._v(" "),l("picker-view-column",{attrs:{mpcomid:"1"}},e._l(e.columnTwo,function(i,a){return l("div",{key:a,staticClass:"picker-item"},[e._v(e._s(i))])}))],1)],1)],1)},staticRenderFns:[]};i.a=a}},["YU8Q"]);