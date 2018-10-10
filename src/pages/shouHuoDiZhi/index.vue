<template>
  <div class="con-tainer">
    <ul class="sh-list">
      <li class="sh-item flex-flex-start" v-for="(item,index) in addList" :key="index" @click="editAdd(item)">
        <div class="sh-text-box">
          <span class="bold">{{item.consigner}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span>{{item.mobile}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="sh-alias" v-if="item.alias == 1">公司</span><span class="sh-alias" v-else-if="item.alias == 2">自己</span><span class="sh-alias" v-else-if="item.alias == 3">亲戚</span><span class="sh-alias" v-else-if="item.alias == 4">其他</span>
          <span class="sh-alias sh-default" v-if="item.is_default == 1">默认</span>
          <div class="sh-add">{{item.province}}{{item.city}}{{item.district}}{{item.address}}</div>
        </div>
        <div class="sh-deletAdd-btn red-text" @click.stop="deletAdd(index,item.id)">删除</div>
      </li>
    </ul>
    <a href="/pages/addShouHuoDiZhi/main">
      <div class="sh-btn">新增收货信息</div>
    </a>
  </div>
</template>

<script>
import add from '@/add.json'
export default {
  data () {
    return {
      addList:''
    }
  },
  methods: {
    editAdd(item){
      wx.navigateTo({
        url: '/pages/addShouHuoDiZhi/main?mobile='+item.mobile+'&&consigner='+item.consigner+'&&province='+item.province+'&&city='+item.city+'&&district='+item.district+'&&address='+item.address+'&&alias='+item.alias+'&&id='+item.id+'&&isDefault='+item.is_default
      })
    },
    deletAdd(index,id){
      var that = this
      wx.showModal({
        title:'提示',
        content:'是否确认删除？',
        success:function(res){
          if(res.confirm){
            //用户点击确认删除后
            that.$http.post({
              url:"/wx/member/delMemberAddress",
              dataType:'json',
              data: {
                aid: id
              }
            })
            .then(res =>{
              that.addList.splice(index,1)
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
            })
          }
        }
      })
    },
    idToAddStr(province,city,district){
      var resultProvince
      var resultCity
      var resultDistrict
      var pro
      for(let i=0;i<add.length;i++){
        if(province==add[i].value){
          //省份的id
          resultProvince = add[i].text

          for(let j=0;j<add[i].children.length;j++){
            if(city==add[i].children[j].value){
              //市的id
              resultCity = add[i].children[j].text

              for(let k=0;k<add[i].children[j].children.length;k++){
                if(district==add[i].children[j].children[k].value){
                  //区的id
                  resultDistrict = add[i].children[j].children[k].text
                }
              }
            }
          }
        }
      }
      var arr=[]
      arr.push(resultProvince,resultCity,resultDistrict)
      return arr
    }
  },
  mounted(){
    var that = this
    that.$http.post({
      url:"/wx/member/memberAddress",
      dataType:'json'
    })
    .then(res =>{
      that.addList = res.data
      
      //开始循环，根据地址转换后的数据查询到对应id
      that.addList.forEach(item => {
        let addStr = that.idToAddStr(item.province,item.city,item.district)
        //时间戳转换正常日期
        item.province = addStr[0]
        item.city = addStr[1]
        item.district = addStr[2]
      })
    })
  }
}
</script>

<style scoped>
.bold{
  font-weight: bold;
}
.sh-list{
  border-top: 1px solid #d7d7d7;
}
.sh-item{
  height: 140rpx;
  padding: 30rpx;
  font-size: 26rpx;
  color: #333;
  border-bottom: 1rpx solid #f5f5f5;
}
.sh-btn{
  width: 690rpx;
  margin: 40rpx auto;
  border-radius: 4rpx;
  height: 90rpx;
  background-color: #18c136;
  line-height: 90rpx;
  text-align: center;
  color: #fff;
  font-size: 34rpx;
}
.sh-add{
  margin-top: 10rpx;
  color: #999;
}
.sh-text-box{
  padding-right: 20rpx;
  box-sizing: border-box;
  width: 590rpx;
}
.sh-deletAdd-btn{
  border: 1rpx solid #ff5000;
  border-radius: 4rpx;
  height: 20rpx;
  line-height: 20rpx;
  padding: 20rpx;
}
.sh-alias{
  position: relative;
  top: -2rpx;
  left: 0;
  font-size: 20rpx;
  padding:0 10rpx;
  color: #eaba00;
  border: 1px solid #eaba00;
  border-radius: 4rpx;
}
.sh-default{
  margin-left: 10rpx;
}
</style>
