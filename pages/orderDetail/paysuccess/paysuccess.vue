<template>
  <view class="paysuccessbox">
    <text class="iconfont icon-zhifuchenggong"></text>
    <text>支付成功</text>
    <text
      >订单金额: <text>￥{{ paytotal }}</text></text
    >
  </view>
  <button @click="successto">查看订单</button>
</template>

<script setup>
import { ref,onMounted } from "vue";
import { onLoad } from "@dcloudio/uni-app";
const paytotal = ref("");
onLoad(() => {
	let value4=uni.getStorageSync('list2')
	paytotal.value=value4.finalPrice
});
const successto=()=>{
	uni.redirectTo({
		url:"../../order/order"
	})
}
</script>

<style lang="less" scoped>
@import url("../../../static/iconfont/font_0qivch445ot/iconfont.css");
.paysuccessbox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 132rpx;
  .icon-zhifuchenggong {
    font-size: 122rpx;
    color: #28d094;
  }
  > text:nth-child(2) {
    font-size: 44rpx;
    margin-top: 30rpx;
  }
  > text:nth-child(3) {
    font-size: 30rpx;
    margin-top: 30rpx;
  }
}
button {
  border: 1px solid #f77214;
  color: #f77214;
  background-color: white;
  width: 682rpx;
  height: 100rpx;
  line-height: 100rpx;
  border-radius: 50rpx;
  margin-top: 82rpx;
}
</style>
