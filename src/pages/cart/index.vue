<template>
  <div class="container">
    <div class="list">
      <checkbox-group @change="checkboxChange">
        <div v-if="checkboxItems" v-for="(item,index) in checkboxItems" class="cart-item" :key="index" @touchstart="touchStart($event,index)" @touchmove="touchMove($event,index)" @touchend="touchEnd($event,index)">
          <div class="long-box" :style="{'left':scrollLeft[index],'transition':transition}">
            <div class="check-box">
              <label class="weui-cell weui-check__label">
                <checkbox class="weui-check" :value="item.goods_id" :checked="item.checked" />
                <div class="weui-cell__hd weui-check__hd_in-checkbox">
                  <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked"></icon>
                  <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="item.checked"></icon>
                </div>
              </label>
              <div class="weui-cell__bd flex-box">
                <img :src="item.picture_info.pic_cover_mid" class="img">
                <div class="goods-info-box">
                  <p class="overhidden2 bottom">{{item.goods_name}}</p>
                  <ul class="mist-list">
                    <mp-priceCart size="24" :redPrice="totalPrice[index]"></mp-priceCart>
                    <div class="btn-group">
                      <div @click.stop="decrement(index)" class="decrement">-</div>
                      {{ item.num }}
                      <div @click.stop="increment(index)" class="increment">+</div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>


            <div class="delet-btn" @click="delet(item.cart_id,index)">删除</div>
          </div>
        </div>
      </checkbox-group>
      <div class="grey100"></div>
      
      <div class="bottom-price-jiesuan-box">
          <div class="jiesuan-check-box">
            
            <checkbox-group @change="jiesuan">
              <div class="jiesuan-flex">
                <label class="weui-cell jiesuan-weui-cell weui-check__label">
                  <checkbox class="weui-check" :checked="jiesuanCheck.checked" />
                  <div class="weui-cell__hd weui-check__hd_in-checkbox">
                    <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!jiesuanCheck.checked"></icon>
                    <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="jiesuanCheck.checked"></icon>
                  </div>
                  <span>全选</span>
                </label>
                <div class="weui-cell__bd quanxuan-flex">
                  <div class="jiesuan-btn-box">
                    <div class="whole-price">
                      <div class="shifu-text">
                        <p>实付：</p>
                        <mp-priceCart size="24" :redPrice="finallyPrice"></mp-priceCart>
                      </div>
                      <p class="youfei">免邮费</p>
                    </div>
                    <div class="jiesuan-btn" @click="toQueRenOrder(theAllNum,finallyPrice)">结算({{theAllNum}})</div>
                  </div>
                </div>
              </div>
            </checkbox-group>
          </div>
      </div>

    </div>
  </div>
</template>

<script>
import priceCart from "@/components/priceCart";
export default {
  data() {
    return {
      theAllNum: 0,
      valueArray: [],
      transition: "0.2s",
      scrollLeft: [],
      startX: "",
      endX: "",
      finallyPrice: 0,
      jiesuanCheck: {
        checked: false
      },
      checkboxItems: [], //加入购物车内的全部商品
      jieSuanGoods: [], //要结算的商品
      indexArray: [] //要结算的商品索引
    };
  },
  onShow: function() {
    var that = this
    this.valueArray = this.scrollLeft = this.jieSuanGoods = this.indexArray = []
    this.jiesuanCheck = {
      checked: false
    }
    this.finallyPrice = this.theAllNum = 0
    that.$http.post({
      url:"/wx/member/getCartInfo",
      data:{}
    })
    .then(res =>{
      res.data.forEach(item => {
        item.checked = false
        item.goods_id = item.goods_id.toString()
        item.price = Number(item.price)
      })
      that.checkboxItems = res.data
    })
  },
  mounted() {
    var that = this
    that.$http.post({
      url:"/wx/member/getCartInfo",
      data:{}
    })
    .then(res =>{
      res.data.forEach(item => {
        item.checked = false
        item.goods_id = item.goods_id.toString()
        item.price = Number(item.price)
      })
      that.checkboxItems = res.data
    })
  },
  computed: {
    goodsIdArr() {
      //要结算的商品Id数组
      var idArr = [];
      for (var i = 0; i < this.checkboxItems.length; i++) {
        var result = this.checkboxItems[i].goods_id;
        idArr.push(result);
      }
      return idArr;
    },
    allNum() {
      //要结算的商品数量的数组
      var theNumArr = [];
      for (var i = 0; i < this.checkboxItems.length; i++) {
        var result = this.checkboxItems[i].num;
        theNumArr.push(result);
      }
      return theNumArr;
    },
    totalPrice() {
      var arr = [];
      for (var i = 0; i < this.checkboxItems.length; i++) {
        var result =
          Number(this.checkboxItems[i].price) * this.checkboxItems[i].num;
        arr.push(result);
      }
      return arr;
    }
  },
  methods: {
    toQueRenOrder(theAllNum, finallyPrice) {
      var that = this;
      var goodsArr = [];
      var numArr = [];
      for (let i = 0; i < this.indexArray.length; i++) {
        goodsArr.push(this.checkboxItems[this.indexArray[i]].goods_id);
        numArr.push(this.checkboxItems[this.indexArray[i]].num);
      }
      var postGoodsArr = goodsArr.toString();
      var postNumArr = numArr.toString();
      wx.navigateTo({
        url: "/pages/queRenDingDan/main?theAllNum=" + theAllNum + "&&finallyPrice=" + finallyPrice.toFixed(2) + "&&goodsIds=" + postGoodsArr + "&&numArr=" + postNumArr
      })
    },
    // 滑动开始
    touchStart(e, index) {
      // 获取移动距离
      this.startX = e.mp.changedTouches[0].clientX;
      this.transition = "0.2s";
    },
    touchMove(e, index) {
      var theScrollLeft = e.mp.changedTouches[0].clientX - this.startX;
      this.scrollLeft[index] = theScrollLeft + "rpx";
    },
    touchEnd(e, index) {
      // 获取移动距离
      this.endX = e.mp.changedTouches[0].clientX;
      if (parseInt(this.scrollLeft[index]) <= -10) {
        this.scrollLeft[index] = -130 + "rpx";
      } else if (parseInt(this.scrollLeft[index]) >= 0) {
        this.scrollLeft[index] = 0;
      }
    },
    delet(goodsId, index) {
      //删除某一条数据
      var that = this
      
      that.$http.post({
        url:"/wx/member/delCartGoods",
        dataType: "json",
        data:{
          cid: Number(goodsId)
        }
      })
      .then(res =>{
        that.scrollLeft[index] = "-880rpx"
        setTimeout(() => {
          that.transition = 0
          that.checkboxItems.splice(index, 1)
          that.scrollLeft = []
          that.theAllNum = 0
          that.finallyPrice = 0
          for (var i = 0; i < that.checkboxItems.length; i++) {
            if (that.checkboxItems[i].checked) {
              that.theAllNum += that.checkboxItems[i].num
              that.finallyPrice += that.totalPrice[i]
            }
          }
        }, 230)
      })
    },
    checkboxChange(e) {
      //多选框切换选中状态
      this.theAllNum = 0;
      this.finallyPrice = 0;
      this.indexArray = [];
      console.log(
        "checkbox发生change事件，携带value值为：" + e.mp.detail.value
      );
      var checkboxItems = this.checkboxItems;
      this.valueArray = e.mp.detail.value;
      for (var i = 0; i < checkboxItems.length; ++i) {
        checkboxItems[i].checked = false;

        for (var j = 0, lenJ = this.valueArray.length; j < lenJ; ++j) {
          if (checkboxItems[i].goods_id == this.valueArray[j]) {
            checkboxItems[i].checked = true;
            this.indexArray.push(i);
            this.theAllNum += this.allNum[i];
            this.finallyPrice += this.totalPrice[i];
            break;
          }
        }
      }
      this.checkboxItems = checkboxItems;
      //当商品的checkBox全选后，全选按钮选中
      if (this.valueArray.length == checkboxItems.length) {
        this.jiesuanCheck.checked = true;
      } else {
        this.jiesuanCheck.checked = false;
      }
    },
    jiesuan(e) {
      //全选按钮结算金额和总数
      this.theAllNum = 0;
      this.finallyPrice = 0;
      //切换全选checkBox的选中状态
      this.jiesuanCheck.checked = !this.jiesuanCheck.checked;
      var checkboxItems = this.checkboxItems;
      this.valueArray = e.mp.detail.value;
      for (let k = 0; k < this.checkboxItems.length; k++) {
        this.theAllNum += this.checkboxItems[k].num;
        this.finallyPrice += this.totalPrice[k];
      }
      //全选按钮切换状态时，商品的checkBox进行相应的状态改变
      if (this.jiesuanCheck.checked) {
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
          checkboxItems[i].checked = true
        }
      } else {
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
          checkboxItems[i].checked = false
          this.theAllNum = 0
          this.finallyPrice = 0
        }
      }
    },
    increment(index) {
      //加号按钮
      this.theAllNum = 0
      this.finallyPrice = 0
      var that = this
      that.$http.post({
        url:"/wx/member/addCart",
        dataType: "json",
        data:{
          goods_id: that.checkboxItems[index].goods_id,
          num: 1
        }
      })
      .then(res =>{
        if(res.info == 'success' && res.code == 0){
          that.checkboxItems[index].num++
        }
      })
      for (var i = 0, lenI = this.checkboxItems.length; i < lenI; ++i) {
        if (this.checkboxItems[i].checked) {
          this.theAllNum += this.checkboxItems[i].num;
          this.finallyPrice += this.totalPrice[i];
        }
      }
    },
    decrement(index) {
      //减号按钮
      if (this.checkboxItems[index].num == 1) {
        return false
      } else {
        //重置金额，每次重新计算
        this.theAllNum = 0
        this.finallyPrice = 0
        var that = this
        that.$http.post({
          url:"/wx/member/addCart",
          dataType: "json",
          data:{
            goods_id: that.checkboxItems[index].goods_id,
            num: -1
          }
        })
        .then(res =>{
          if(res.info == 'success' && res.code == 0){
            that.checkboxItems[index].num--
          }
        })
        for (var i = 0, lenI = this.checkboxItems.length; i < lenI; ++i) {
          if (this.checkboxItems[i].checked) {
            this.theAllNum += this.checkboxItems[i].num
            this.finallyPrice += this.totalPrice[i]
          }
        }
      }
    }
  },
  components: {
    "mp-priceCart": priceCart
  }
};
</script>

<style>
.container {
  height: 100vh;
  overflow-y: scroll;
  background-color: #f5f5f5;
}
.list {
  background-color: #fff;
  width: 750rpx;
  border-top: 1px solid #d7d7d7;
}
.cart-item {
  width: 750rpx;
  overflow: hidden;
  display: flex;
  flex-flow: nowrap row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  height: 246rpx;
}
.long-box {
  width: 880rpx;
  position: absolute;
  top: 0;
  left: 0;
  height: 246rpx;
  display: flex;
  flex-flow: nowrap row;
  justify-content: flex-start;
  align-items: center;
}
.delet-btn {
  height: 240rpx;
  line-height: 240rpx;
  text-align: center;
  width: 130rpx;
  background-color: #fe5933;
  color: #fff;
  border-bottom: 6rpx solid #f5f5f5;
}
.weui-cell {
  height: 200rpx;
}
.radio-box {
  width: 80rpx;
}
.img {
  width: 200rpx;
  height: 200rpx;
  margin-right: 30rpx;
}
.flex-box {
  display: flex;
  flex-flow: nowrap row;
  justify-content: flex-start;
  align-items: center;
}
.goods-info-box {
  width: 380rpx;
  height: 200rpx;
  box-sizing: border-box;
  padding: 10rpx 0;
  font-size: 28rpx;
  color: #333;
}
.bottom {
  margin-bottom: 36rpx;
}
.mist-list {
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-between;
  align-items: center;
}
.btn-group {
  width: 160rpx;
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-between;
  align-items: center;
}
.increment {
  width: 44rpx;
  height: 44rpx;
  border: 2rpx solid #999;
  border-radius: 30rpx;
  line-height: 38rpx;
  text-align: center;
  color: #18c136;
  font-weight: bold;
  font-size: 40rpx;
}
.decrement {
  width: 48rpx;
  height: 48rpx;
  border-radius: 30rpx;
  line-height: 42rpx;
  text-align: center;
  background-color: #18c136;
  color: #fff;
  font-weight: bold;
  font-size: 40rpx;
}
.check-box {
  width: 750rpx;
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 6rpx solid #f5f5f5;
}
.bottom-price-jiesuan-box {
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 750rpx;
  height: 96rpx;
  box-sizing: border-box;
  font-size: 30rpx;
  color: #333;
}
.jiesuan-weui-cell {
  height: 96rpx;
  box-sizing: border-box;
}
.jiesuan-flex {
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-between;
  align-items: center;
}
.jiesuan-flex .weui-check__hd_in-checkbox {
  height: 96rpx;
  padding-top: 20rpx;
  box-sizing: border-box;
}
.quanxuan-flex {
  display: flex;
  flex-flow: nowrap row;
  justify-content: flex-end;
  align-items: center;
}
.whole-price {
  font-size: 30rpx;
  color: #999;
}
.shifu-text {
  display: flex;
  flex-flow: nowrap row;
  justify-content: flex-start;
  align-items: center;
}
.youfei {
  font-size: 22rpx;
  text-align: right;
}
.jiesuan-btn {
  margin-left: 24rpx;
  width: 234rpx;
  height: 96rpx;
  background-color: #fe5933;
  color: #fff;
  text-align: center;
  line-height: 96rpx;
}
.jiesuan-btn-box {
  display: flex;
  flex-flow: nowrap row;
  justify-content: flex-end;
  align-items: center;
}
</style>