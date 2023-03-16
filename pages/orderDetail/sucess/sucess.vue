<template>
  <!-- 支付总额 -->
  <view class="totalmoneybox">
    <text
      >￥<text class="totalmoney">{{ tatalmoney }}</text></text
    >
    <text>剩余支付时间 14:59</text>
  </view>
  <!-- 钱包 -->
  <view class="pursebox">
    <radio-group @change="radioChange">
      <view class="pursebox-child">
        <view>
          <text class="iconfont icon-yue"></text>
          <text class="yuebox"
            >余额支付 <text class="yue">(余额:366.0元)</text></text
          >
        </view>
        <radio
          color="orange"
          style="transform: scale(0.5)"
          value="余额支付"
          checked="checked"
        >
        </radio>
      </view>
      <view class="pursebox-child">
        <view>
          <text class="iconfont icon-weixinzhifu"></text>
          <text class="yuebox">微信支付</text>
        </view>
        <radio color="orange" style="transform: scale(0.5)" value="微信支付">
        </radio>
      </view>
    </radio-group>
  </view>
  <!-- 支付按钮 -->
  <view class="paysucessbox">
    <button @click="sucessbtn()">确认支付</button>
  </view>
</template>
<script setup>
import http from "@/utils/http.js";
import { ref, computed } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const tatalmoney = ref("0");
const paytype = ref("余额支付");
const orderNumber=ref('')


// 确认支付
const sucessbtn = () => {
  uni.navigateTo({
  url:"../paysuccess/paysuccess"
  })
  http({
    url: "/order/alipay/customer/pay",
    method: "get",
    params: {
      orderNumber: orderNumber.value,
      payment: paytype.value,
      paymentAmount: tatalmoney.value,
    },
  }).then((res) => {
    console.log(res);
  });
  var timestamp = new Date();
  console.log(timestamp);
};
onLoad(() => {
  let value4=uni.getStorageSync('list2')
  orderNumber.value=value4.orderNumber
  tatalmoney.value=value4.finalPrice
});
const radioChange = (evt) => {
  paytype.value = evt.detail.value;
};
</script>

<style lang="less" scoped>
page {
  background-color: #f5f7f6;
}
@import url("../../../static/iconfont/font_0qivch445ot/iconfont.css");
// 钱包
.paysucessbox {
  background-color: white;
  height: 162rpx;
  margin-top: 416rpx;
  button {
    background-color: #f77214;
    color: white;
    width: 682rpx;
    border-radius: 50rpx;
    border: none;
  }
}
// 支付总额
.totalmoneybox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 108rpx 250rpx;
  .totalmoney {
    font-size: 60rpx;
  }
  text:nth-child(2) {
    font-size: 30rpx;
    color: gray;
  }
}
// 钱包
.pursebox {
  width: 682rpx;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border: 1px solid #f4f4f4;
  border-radius: 20rpx;
  box-shadow: 0px 0px 5px 0px #d4d1d0;
  .pursebox-child {
    background-color: white;
    font-size: 32rpx;
    display: flex;
    justify-content: space-between;
    padding: 38rpx 32rpx;
    border-bottom: 1px solid #f4f4f4;
    .icon-yue {
      color: #f77010;
    }
    .yuebox {
      margin-left: 10rpx;
    }
    .yue {
      color: gray;
    }
    .icon-weixinzhifu {
      color: #41b035;
    }
  }
}
</style>
