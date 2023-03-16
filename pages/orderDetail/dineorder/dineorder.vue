<template>
	<!-- 顶部地址 -->
	<view class="addressbox">
		<view>桌号 A3 用餐人数 3人</view>
		<view>联系电话 15677900009</view>
	</view>
    <!-- 用餐列表 -->
	<view class="foodlistbox">
		<text>用餐列表</text>
		<view class="foodlistbox-foods" v-for="(v,i) in orderlist" :key="i">
		  <view>
		    <image :src="v.image"></image>
		    <view class="foodlist-food">
		      <text>{{v.goodsName}}</text>
		      <text class="foodlist-num">{{v.goodsDetails}}</text>
		    </view>
		  </view>
		  <view>
		    <text>￥{{v.goodsPrice}}</text>
		    <text>×{{v.goodsCount}}</text>
		  </view>
		</view>
		<view class="goonbox">
			<view class="goon" @click="goto">
				+继续加菜
			</view>
		</view>
	</view>
	<!-- 优惠券 -->
	<view class="couponsbox">
		<view>
			<text>优惠券</text>
			<text  @click="open"><text class="coupons">2张可用</text> ></text>
		</view>
		<view>
			<text>折扣金额</text>
			<text>-￥{{tatalmoney1-tatalmoney}}</text>
		</view>
		<view>
			<text>小计</text>
			<text class="coupons-totalmoney">￥{{tatalmoney1}}</text>
		</view>
	</view>
	<!-- 备注 -->
	<view class="tablewarebox">
		<view>备注</view>
		<textarea  v-model="text" class="tableware-textarea"  placeholder="请输入订单备注...." placeholder-style="color:#eaeaea;font-size:36rpx"/>
	</view>
	<div class="kong"></div>
	<!-- 提交支付 -->
	<view class="paybox">
		<text>合计 ￥{{ tatalmoney }}</text>
		<text @click="sucessbtn">提交支付</text>
	</view>
	<!-- 优惠券弹框 -->
	<view>
		<uni-popup ref="popupCoupon" type="bottom">
			<view class="coupons-popup">
				<view>
					<text>选择优惠</text>
					<text  @click="close">×</text>
				</view>
				<radio-group>
				<view class="coupons-popup-bottom">
					<view class="coupons-popup-alltext">
						<view class="kk">
							<text style="color: orange;">￥
								<text class="coupons-popupmoney">10</text>
							</text>
							<view class="hhh">
								<text>新用户注册优惠券</text>
								<text>满200可用</text>
							</view>
						</view>
						<radio color='orange' style="transform:scale(0.5);" checked="checked" value="1"/>
					</view>
					<view class="coupons-popup-overtime">
						<text>有效期至2019.08.06</text>
						<text>外卖可用</text>
					</view>
				</view>
				<view class="coupons-popup-bottom">
					<view class="coupons-popup-alltext">
						<view class="kk">
							<text style="color: orange;">￥
								<text class="coupons-popupmoney">10</text>
							</text>
							<view class="hhh">
								<text>新用户注册优惠券</text>
								<text>满200可用</text>
							</view>
						</view>
						<radio color='orange' style="transform:scale(0.5);" value="2"/>
					</view>
					<view class="coupons-popup-overtime">
						<text>有效期至2019.08.06</text>
						<text>外卖可用</text>
					</view>
				</view>
				<view class="coupons-popup-bottom">
					<view class="coupons-popup-alltext">
						<view class="kk">
							<text style="color: orange;">￥
								<text class="coupons-popupmoney">10</text>
							</text>
							<view class="hhh">
								<text>新用户注册优惠券</text>
								<text>满200可用</text>
							</view>
						</view> 
						<radio color='orange' style="transform:scale(0.5);" value="3"/>
					</view>
					<view class="coupons-popup-overtime">
						<text>有效期至2019.08.06</text>
						<text>外卖可用</text>
					</view>
				</view>
			    </radio-group>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {ref,onMounted} from 'vue';
	import http from "@/utils/http.js";
	import uniPopup  from '../../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue';
	const popupCoupon  = ref(null)
	 const tatalmoney1 = ref(0);
	 const tatalmoney = ref(0);
	 const orderNumber=ref('');
	 const orderlist=ref('');
	 const text = ref("");
	const open=()=>{
		 popupCoupon.value.open('bottom')
	}
	const close=()=>{
		 popupCoupon.value.close()
	}
	const goto=()=>{
		uni.switchTab({
			url:"../../../pages/goods/goods"
		})
	}
	//获取点餐方式
	onMounted(()=>{	
		  //获取购物车数据
		   let value2=uni.getStorageSync('trolley')
		   let value1=uni.getStorageSync('priceList')
		    orderlist.value=value2
		    tatalmoney1.value=value1.priceAll
		  //获取订单编号
		  let value4=uni.getStorageSync('list2')
		  orderNumber.value=value4.orderNumber
		  tatalmoney.value=value4.finalPrice
	})
	// 提交支付跳转
	const sucessbtn = () => {
	  let v=tatalmoney.value
	  uni.navigateTo({
	  	url:"../sucess/sucess?tatalmoney="+v
	  })
	  // console.log(text.value)
	  http({
	    url: "/oder/customer/customer/submit",
	    method: "post",
	    data: {
	      orderNumber: orderNumber.value,
	      remarks: text.value,
	      tablewareNumber: '',
	    },
	  }).then((res) => {
	    console.log(res);
	  });
	};
</script>

<style>
	.kong{
		height: 200rpx;
	}
	.foodlist-num{
		font-size: 24rpx;
		color: gray;
		margin-top: 10rpx;
	}
/* <!-- 优惠券弹框 --> */
	.coupons-popup-overtime{
		font-size: 30rpx;
		color: gray;
		padding: 20rpx 10rpx;
		display: flex;
		justify-content: space-between;
		margin: 0 20rpx;
	}
	.kk{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.hhh{
		display: flex;
		flex-direction: column;
		margin-left: 8rpx;
	}
	.coupons-popup-alltext{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 20rpx;
		margin-right: 20rpx;
		border-bottom: 1px dashed #d4d1d0;
	}
	.hhh text:nth-child(1){
		font-size: 34rpx;
	}
	.hhh text:nth-child(2){
		color: gray;
		font-size: 30rpx;
	}
	.coupons-popupmoney{
		color: orange;
		font-weight: bold;
		font-size: 40px;
	}
	.coupons-popup{
		background-color: white;
		border-radius: 60rpx 60rpx 0 0;
		padding: 20rpx 30rpx;
	}
	.coupons-popup-bottom{
		box-shadow: 0px 0px 5px 0px #d4d1d0;
		border-radius: 20rpx;
		margin-top: 40rpx;
	}
	.coupons-popup>view:nth-child(1){
		display: flex;
		justify-content: flex-end;
	}
	.coupons-popup>view:nth-child(1) text:nth-child(1){
		margin-right:260rpx;
	}
	/* <!-- 提交支付 --> */
	.paybox{
		width: 670rpx;
		height: 104rpx;
		margin-left: 46rpx;
		display: flex;
		align-items: center;
		text-align: center;
		position: fixed;
		bottom:30rpx;
	}
	.paybox text:nth-child(1){
		background-color: #333333;
		color: white;
		padding: 26rpx 70rpx;
		width: 280rpx;
		border-radius: 100rpx 0 0 100rpx;
	}
	.paybox text:nth-child(2){
		background-color: #f57312;
		color: white;
		padding: 26rpx;
		padding-right: 70rpx;
		border-radius: 0 100rpx 100rpx 0;
	}
	/* <!-- 餐具数量 --> */
	.tablewarebox>view{
		padding: 20rpx 0;
	}
	.tablewarebox{
		background-color: white;
		box-shadow: 0px 0px 5px 0px #d4d1d0;
		font-size: 28rpx;
		width: 614rpx;
		margin: 0 auto;
		margin-top: 24rpx;
		padding: 0 28rpx 0 28rpx;
		border-radius: 20rpx;
	}
	/* <!-- 优惠券 --> */
	.coupons-totalmoney{
		font-size: 30rpx;
		font-weight: bold;
	}
	.coupons{
		color: orange;
	}
	.couponsbox view>text:nth-child(1){
		color: #8a8583;
	}
	.couponsbox view{
		display: flex;
		justify-content: space-between;
		padding: 30rpx 0;
		border-bottom: 2px solid #f7f5f6;
	}
	.couponsbox{
		background-color: white;
		box-shadow: 0px 0px 5px 0px #d4d1d0;
		font-size: 28rpx;
		width: 614rpx;
		margin: 0 auto;
		margin-top: 24rpx;
		padding: 0 28rpx 0 28rpx;
		border-radius: 20rpx;
	}
	/* 订单列表 */
	.goonbox{
		padding:  20rpx 0;
	}
	.goon{
		width: 600rpx;
		height: 80rpx;
		line-height: 80rpx;
		color: orange;
		margin: 0 auto;
		text-align: center;
		border: 1px solid orange;
		border-radius: 90rpx;
	}
	.foodlist-food{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 18rpx;
	}
	.foodlistbox-foods{
		display: flex;
		justify-content: space-between;
		border-bottom: 2px solid #f7f5f6;
		align-items: center;
		width: 588rpx;
		margin:0 auto;
		padding: 20rpx 20rpx;
	}
	.foodlistbox-foods view:nth-child(1){
		display: flex;
		align-items: center;
	}
	.foodlistbox-foods view:nth-child(2){
		display: flex;
		flex-direction: column;
	}
	.foodlistbox-foods image{
		width: 106rpx;
		height: 106rpx;
		border-radius: 6rpx;
	}
	.foodlistbox>text{
		margin-left: 30rpx;
	}
	.foodlistbox{
		background-color: white;
		box-shadow: 0px 0px 5px 0px #d4d1d0;
		font-size: 32rpx;
		width: 670rpx;
		margin: 0 auto;
		padding-top: 34rpx;
		border-radius: 20rpx;
	}
	/* 顶部地址 */
	page {
		background-color: #f5f7f6;
		
	}
	.addressbox{
		width: 630rpx;
		background-color: white;
		margin: 34rpx auto;
		font-size: 32rpx;
		box-shadow: 0px 0px 5px 0px #d4d1d0;
		border-radius: 20rpx;
		padding: 40rpx 20rpx;		
	}
	.addressbox view:nth-child(2){
		font-size: 22rpx;
		margin-top: 20rpx;
		color: gray;
	}
</style>
