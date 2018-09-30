<template>
  <div class="con-tainer">
    <ul class="add-sh-list">
      <li class="add-sh-item flex-flex-start">
        <div class="add-sh-title">收货人</div>
        <input type="text" name="" id="" placeholder="收货人姓名" class="add-sh-input" v-model="name">
      </li>
      <li class="add-sh-item flex-flex-start">
        <div class="add-sh-title">手机号码</div>
        <input type="text" name="" id="" placeholder="配送员联系您的电话" class="add-sh-input" v-model="mobile">
      </li>
      <li class="add-sh-item flex-flex-start">
        <div class="add-sh-title">所在城市</div>
        <picker mode="region" :value="region" @change="CityChange">
          <input type="text" name="" id="" disabled :placeholder="region" class="add-sh-input">
        </picker>
      </li>
      <li class="add-sh-item flex-flex-start">
        <div class="add-sh-title">收货地址</div>
        <input type="text" name="" id="" placeholder="地址" class="add-sh-input" v-model="address">
      </li>
      <li class="add-sh-item flex-flex-start">
        <div class="add-sh-title">地址类型</div>
        <div class="add-sh-dizhi-type flex-flex-start">
          <div class="dz-type-btn" :class="{'dz-active' : dzActive== index}" v-for="(item,index) in dzData" :key="index" @click="changeDz(index)">{{item}}</div>
        </div>
      </li>
      <li class="add-sh-item add-sh-last-item flex-space-between">
        <span> 是否设为默认地址？</span><switch @change="switchChange" :checked="checked"/>
      </li>
    </ul>
    <div class="add-sh-btn" @click="submitAdd()">保存收货信息</div>
  </div>
</template>

<script>
import add from '@/add.json'
export default {
  data () {
    return {
      region: ['北京市', '北京市', '东城区'],
      dzData:['公司','自己','亲戚','其他'],
      dzActive:0,   //切换地址标签的索引
      name:'',      //名字
      mobile:'',    //手机号
      province:1,  //省
      city:1,      //市
      district:1,  //区
      address:'',   //具体地址
      isSupportCity:false,          //是否支持市
      isSupportdistrict:false,      //是否支持区
      isAllowRequest:true,           //是否允许发送请求（信息填写完整，地址支持）
      isAddOrUpdate :'add',           //是添加还是更新
      checked : false,           //是否设为默认地址的开关
      urlCanShu : '',           //url带的参数
      mad_id :''           //更新时的地址ID
    }
  },
  mounted(){
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length-1] //获取当前页面的对象
    this.urlCanShu = currentPage.options
    this.name = this.mobile = this.address = ''
    this.province = this.city = this.district = 1
    this.dzActive = 0
    this.region = ['北京市', '北京市', '东城区']
  },
  computed:{
    default(){
      if(this.checked){
        return 1
      }else{
        return 0
      }
    }
  },
  methods: {
    switchChange(e){
      this.checked = !this.checked
    },
    addStrToId(province,city,district){
      var resultProvince
      var resultCity
      var resultDistrict
      
      for(let i=0;i<add.length;i++){
        if(province==add[i].text){
          //省份的id
          resultProvince = add[i].value

          for(let j=0;j<add[i].children.length;j++){
            if(city==add[i].children[j].text){
              //市的id
              resultCity = add[i].children[j].value

              for(let k=0;k<add[i].children[j].children.length;k++){
                if(district==add[i].children[j].children[k].text){
                  //区的id
                  resultDistrict = add[i].children[j].children[k].value
                }
              }
            }
          }
        }
      }
      var arr=[]
      arr.push(resultProvince,resultCity,resultDistrict)
      return arr
    },
    submitAdd(){
      //判断必填信息是否完整
      if(this.name&&this.mobile&&this.address){

        //判断选择的地址是否支持
        if(this.isAllowRequest){
          var that = this
          wx.request({
            url: 'http://xcx_shop.idc.gcsci.net/index.php?s=/wx/member/upAddress',
            method:'post',
            dataType:'json',
            data: {
              mad_id:that.mad_id,
              token: that.$store.state.token,
              type: this.isAddOrUpdate,
              name: that.name,
              mobile: that.mobile,
              province: that.province,
              city: that.city,
              district: that.district,
              address: that.address,
              alias: that.dzActive+1,
              default: that.default
            },
            success: function(res) {
              wx.showToast({
                title: res.data.info,
                icon: 'none',
                duration: 2000
              })
              if(res.data.code == 0){
                setTimeout(()=>{
                  wx.redirectTo({
                    url: '/pages/dingDanAdd/main?theAllNum='+that.urlCanShu.theAllNum+"&finallyPrice="+that.urlCanShu.finallyPrice+"&goodsIds="+that.urlCanShu.goodsIds+"&numArr="+that.urlCanShu.numArr
                  })
                },2000)
              }
            },
            fail(err){
              console.log(err)
            }
          })
        }else{
        //判断选择的地址并不支持
          wx.showToast({
            title: '该地区暂未支持',
            icon: 'none',
            duration: 2000
          })
        }
      }else{
        //必填信息并不完整
        wx.showToast({
          title: '请将信息填写完整',
          icon: 'none',
          duration: 2000
        })
      }
    },
    CityChange(e) {
      //地址选择器是微信小程序默认的组件，和本地链的地址json并不太相同。选定地址后，根据地址的字符串去自己本地链接的就json里查询对应的省市区id
      console.log('选中的城市为：' + e.mp.detail.value)

      //选中省市区后，改变input的placeholder值
      this.region=e.mp.detail.value

      //将选中的省市区变成字符串(其实本身就是字符串，再转换一下只是为了保准)
      var str = (e.mp.detail.value).toString()

      //将字符串转换为数组
      var addArray=str.split(",")

      //开始循环，根据地址转换后的数据查询到对应id
      for(let i=0;i<add.length;i++){
        if(addArray[0]==add[i].text){
          //省份的id
          console.log('省id：',add[i].value)
          this.province = add[i].value

          for(let j=0;j<add[i].children.length;j++){
            if(addArray[1]==add[i].children[j].text){
              //市的id
              console.log('市id：',add[i].children[j].value)
              this.isSupportCity=true
              this.city = add[i].children[j].value

              for(let k=0;k<add[i].children[j].children.length;k++){
                if(addArray[2]==add[i].children[j].children[k].text){
                  //区的id
                  console.log('区id：',add[i].children[j].children[k].value)
                  this.district = add[i].children[j].children[k].value
                  this.isSupportdistrict=true
                }
              }
            }
          }
        }
      }
      // console.log(this.province,this.city,this.district)
      if(this.isSupportCity&&this.isSupportdistrict){
        //选中的地址是支持的
        this.isSupportCity = this.isSupportdistrict = false
        this.isAllowRequest = true
      }else{
        //选中的地址不支持
        console.log(this.isSupportCity,this.isSupportdistrict)
        wx.showToast({
          title: '该地区暂未支持',
          icon: 'none',
          duration: 2000
        })
        this.isAllowRequest = false

        //恢复初始状态
        this.isSupportCity = this.isSupportdistrict = false
      }
    },

    //更改选中的地址标签
    changeDz(index){
      this.dzActive = index
    }
  }
}
</script>

<style scoped>
.add-sh-list{
  border-top: 1px solid #d7d7d7;
}
.add-sh-item{
  height: 100rpx;
  padding: 0 30rpx;
  font-size: 26rpx;
  color: #333;
  border-bottom: 1rpx solid #f5f5f5;
}
.add-sh-last-item{
  padding-top: 20rpx;
}
.add-sh-title{
  width: 150rpx;
}
.add-sh-input{
  width: 500rpx;
  height: 100rpx;
}
.dz-type-btn{
  width: 120rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  border: 1rpx solid #bfbfbf;
  border-radius: 6rpx;
  color: #bfbfbf;
  margin-right: 10rpx;
}
.dz-active{
  border: 1rpx solid #eaba00;
  color: #eaba00;
}
.add-sh-btn{
  width: 690rpx;
  margin: 40rpx auto;
  margin-bottom: 40rpx;
  border-radius: 4rpx;
  height: 90rpx;
  background-color: #18c136;
  line-height: 90rpx;
  text-align: center;
  color: #fff;
  font-size: 34rpx;
}
</style>
