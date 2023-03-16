<template>
	<view class="person">
		<view class="title">
			<text>选择就餐人数</text>
		</view>
		<view class="card">
			<view @tap="tapSel" :data-num="i" :class="i==selNum?'card-item active':'card-item'" v-for="(v,i) in 12"
				:key="i">
				<text>{{i+1}}</text>
			</view>
		</view>
	</view>
	<view class="phone">
		<view class="title">
			<text>填写手机号码</text>
		</view>
		<view class="input">
			<label>+86</label>
			<input class="uni-input" v-model="phone" type="number" maxlength="11" placeholder="请输入手机号" />
		</view>
	</view>
	<view class="flex">
		<view class="footer" @tap="getNum">
			<text>确认取号</text>
		</view>
	</view>

</template>

<script setup lang="ts">
	import {
		ref
	} from 'vue'
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		queue
	} from '@/apis/home/queue.js'
	let selNum = ref(0);
	let phone = ref(null)
	//获取人数
	const tapSel = (e) => {
		selNum.value = e.currentTarget.dataset.num
		console.log(selNum.value + 1);
	}
	//取号
	const getNum = () => {
		let userName = uni.getStorageSync('user').userName
		let data = {
			userName: userName,
			peopleCount: selNum.value + 1,
			phone: phone.value,
		}
		queue(data).then(res => {
			console.log(res, '排队信息');
			if (res.code == 0) {
				if (res.data) {
					uni.navigateTo({
						url: `/pages/home/success?tableNum=${res.data.tableNum}&waitCount=${res.data.waitCount}`
					})
				} else {
					uni.switchTab({
						url: '/pages/goods/goods'
					});
				}
			} else {
				uni.switchTab({
					url: '/pages/goods/goods'
				});
			}
		})

	}
	onLoad((option) => {
		let phoneNumber = uni.getStorageSync('user').phoneNumber
		phone.value = phoneNumber
	})
</script>

<style lang="less">
	.person {
		width: 750rpx;
		margin: 40rpx 0;

		.card {
			width: 750rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;

			.card-item {
				width: 144rpx;
				height: 144rpx;
				background-color: #efefef;
				margin: 20rpx;
				text-align: center;
				line-height: 144rpx;
				border-radius: 10rpx;
			}

			.active {
				background-color: #f77214;
			}
		}
	}

	.title {
		margin-left: 30rpx;

		text {
			font-size: 30rpx;
		}
	}

	.input {
		display: flex;
		justify-content: center;
		margin-top: 20rpx;



		label {
			display: inline-block;
			width: 116rpx;
			height: 86rpx;
			border: 1px solid #ccc;
			border-right: none;
			text-align: center;
			line-height: 86rpx;
			border-radius: 10rpx 0 0 10rpx;
			font-size: 28rpx;
		}

		input {
			width: 550rpx;
			height: 86rpx;
			border: 1px solid #ccc;
			padding-left: 20rpx;
			border-radius: 0 10rpx 10rpx 0;
			font-size: 28rpx;
		}

	}

	.flex {
		display: flex;
		justify-content: center;
	}

	.footer {
		position: fixed;
		bottom: 0;
		background-color: #f77214;
		height: 86rpx;
		width: 686rpx;
		text-align: center;
		border-radius: 36rpx;

		text {
			color: #fff;
			line-height: 86rpx;
		}
	}
</style>
