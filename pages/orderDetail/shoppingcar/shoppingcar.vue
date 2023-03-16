<template>
	<view>
		<button @click="open">点击</button>
		<uni-popup ref="popupCoupon" type="bottom">
			<view class="shoppingcar-box">
				<view class="shoppingbox">
					<view>
						<text>我的购物车(2)</text>
						<text>清空</text>
					</view>
					<view class="foodsbox" v-for="(v,i) in arr" :key="v.id">
						<view>
							<image :src="v.img"></image>
							<view>
								<text>{{v.name}}</text>
								<text>￥{{v.money}}</text>
							</view>
						</view>
						<view>
							<view @click="reduce(i)">-</view>
							<text>{{v.num}}</text>
							<view @click="add(i)">+</view>
						</view>
					</view>
				</view>
			</view>			
		</uni-popup>
	</view>
</template>

<script setup>
import {ref} from 'vue'
import store from '@/store/index.js'
import uniPopup  from '../../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue';
const num=ref(0)
// const username=ref(store.state.username)
// let test='22'
// store.state.number=test
// console.log(store,123);
// console.log(username.value)
const arr=ref([
	{img:"../../../static/orderdetailimg/1.jpg",name:"热烤鸡胸蔬菜沙拉",money:"42.0",num:"2"},
	{img:"../../../static/orderdetailimg/1.jpg",name:"热烤鸡胸蔬菜沙拉",money:"42.0",num:"5"}
])

const popupCoupon  = ref(null)
// 打开弹框
const open=()=>{
	popupCoupon.value.open('bottom')
	// console.log(arr.value)
}
// 减少数量
const reduce=(v)=>{
	if(arr.value[v].num<=0){
		arr.value[v].num=0
	}else{
		arr.value[v].num--;
	}
}
// 增加数量
const add=(v)=>{
	arr.value[v].num++;
}
</script>

<style lang="less" scoped>
@import url("../../../static/iconfont/font_0qivch445ot/iconfont.css");
.shoppingcar-box{
	border-radius: 40rpx 40rpx 0 0;
	padding: 20rpx;
	background-color: white;
}
.shoppingbox{
	background-color: white;
	font-size: 24rpx;
	>view:nth-child(1){
		padding: 20rpx 0;
		display: flex;
		justify-content:space-between;
	}
	.foodsbox{
		padding: 20rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid darkgray;
		>view:nth-child(1){
			display: flex;
			image{
				width: 120rpx;
				height: 120rpx;
			}
			view{
				margin-left: 20rpx;
				font-size: 30rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
			}
		}
	    >view:nth-child(2){
			display: flex;
			font-size: 30rpx;
			margin-right: 40rpx;
			margin-top: 40rpx;
			view{
				background-color: orange;
				color: white;
				width: 40rpx;
				height: 40rpx;
				line-height: 34rpx;
				text-align: center;
				border-radius:40rpx;
				font-size: 40rpx;
			}
			text{
				padding: 0 20rpx;
			}
		}
	}
}
</style>
