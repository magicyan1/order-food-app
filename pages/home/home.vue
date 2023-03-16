<template>
	<view class="home">
		<!-- 背景图片+用户信息 -->
		<view class="image">
			<image class="img" src="../../static/tabbarImage/bg.png"></image>
			<view class="user">
				<view class="user-left">
					<image :src="userAvatar" mode=""></image>
					<view class="user-mid">
						<view class="name">
							<text>{{user.nickname}}</text>
							<text>{{user.membershipLevel}}</text>
						</view>
						<view class="title">
							<text>欢迎来到麦乐美餐厅</text>
						</view>
					</view>
				</view>
				<view class="user-right">
					<image src="../../static/logo.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 堂食+外卖 -->
		<view class="eat-method">
			<view class="card" @tap="eatIn">
				<span class="iconfont icon-tangshi"></span>
				<text>堂食</text>
			</view>
			<view class="card1" @tap="eatOut">
				<span class="iconfont icon-qihang"></span>
				<text>外卖</text>
			</view>
		</view>
		<!-- 排队+会员 -->
		<view class="queue">
			<view class="card" @tap="queue">
				<span class="iconfont icon-paiduishu"></span>
				<text>排队取号</text>
			</view>
			<view class="card1" @tap="vip">
				<span class="iconfont icon-a-VIPhuiyuanhuiyuanka
"></span>
				<text>会员详情</text>
			</view>
		</view>
	</view>
	<!-- 弹窗 -->
	<uni-popup ref="popup" background-color="#fff" :mask-click="false">
		<view class="popup-content">
			<text>您还没有登录，点击去登录</text>
			<view class="tologin">
				<button type="primary" @tap="toLogin">登录</button>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
	import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue'
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";
	import store from '@/store/index.js';
	import http from '@/utils/http.js';
	let popup = ref(null)
	let msg = ref(store.state.username)
	//从Storage获取用户信息,头像
	let user = ref(uni.getStorageSync('user'))
	let userAvatar = ref(uni.getStorageSync('userAvatar'))
	//打开弹窗
	const open = () => {
		popup.value.open('bottom')

	}
	// 跳转登录
	const toLogin = () => {
		uni.redirectTo({
			url: '/pages/home/login/login'
		})
	}
	//跳转到食堂
	const eatIn = () => {
		uni.switchTab({
			url: '/pages/goods/goods'
		});
		uni.setStorageSync('method', '堂食')
	}
	//跳转到外卖
	const eatOut = () => {
		uni.switchTab({
			url: '/pages/goods/goods'
		});
		uni.setStorageSync('method', '外卖')
	}
	//跳转到排队
	const queue = () => {
		uni.navigateTo({
			url: '/pages/home/queue'
		})
	}
	//跳转到vip
	const vip = () => {
		uni.navigateTo({
			url: '/pages/vip/vip'
		})
	}
	onMounted(() => {
		let user = uni.getStorageSync('user')
		console.log(user, 'user信息');
		if (!user) {
			open()
		}
	})
</script>

<style scoped lang="scss">
	@import url("../../static/iconfont/font_0qivch445ot/iconfont.css");

	.popup-content {
		height: 300rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		text {
			margin-bottom: 40rpx;
		}
	}

	.home {
		position: relative;
		width: 750rpx;

		.image {
			width: 750rpx;
			height: 540rpx;
			// background-color: #f6eae3;
			text-align: center;
			box-sizing: border-box;
			padding-bottom: 100rpx;

			.img {
				width: 750rpx;
				position: relative;
				top: -100rpx;
				background-color: #f6eae3;
				transform: scale(1.2);
			}
		}

		.user {
			margin: 0 auto;
			border: 1px solid #efd5c3;
			background-color: #fff;
			width: 686rpx;
			height: 148rpx;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			padding: 0 32rpx;
			box-sizing: border-box;
			justify-content: space-between;
			transform: translateY(-120rpx);

			.user-left {
				display: flex;
				align-items: center;

				image {
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
				}

				.user-mid {
					margin-left: 30rpx;
					text-align: left;

					.name {
						margin-bottom: 8rpx;
					}

					.name text:first-child {
						font-size: 36rpx;
					}

					.name text:last-child {
						margin-left: 20rpx;
						font-size: 28rpx;
						background-color: #f77214;
						color: #fff;
						border-radius: 8rpx;
						padding: 0 6rpx;
					}

					.title {
						// line-height: 46rpx;
						color: #999;
						font-size: 26rpx;
					}
				}
			}

			.user-right {
				image {
					width: 80rpx;
					height: 80rpx;
				}
			}


		}

		.eat-method {
			display: flex;
			justify-content: space-between;
			padding: 0 32rpx;

			.card {
				width: 310rpx;
				height: 240rpx;
				border: 2px solid #fce1ce;
				border-radius: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;


				.icon-tangshi {
					font-size: 80rpx;
					color: #f77214;
				}



				text {
					margin-top: 20rpx;
					color: #656665;
					font-weight: 500;
				}

			}

			.card1 {
				width: 310rpx;
				height: 240rpx;
				border: 2px solid #fce1ce;
				border-radius: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.icon-qihang {
					font-size: 140rpx;
					color: #f77214;
					font-weight: 500;
				}

				text {
					// margin-top: -40rpx;
					// display: inline-block;
					color: #656665;
					font-weight: 500;
					transform: translateY(-16rpx);
				}
			}
		}
	}

	.queue {
		display: flex;
		justify-content: space-between;
		padding: 0 32rpx;

		.card {
			background-color: #def5f1;

			.icon-paiduishu {
				font-size: 70rpx;
				color: #5bc5b2;
			}

			text {
				color: #5bc5b2;
				margin-top: 10rpx;
			}
		}

		.card1 {
			background-color: #ebe4ff;

			.icon-a-VIPhuiyuanhuiyuanka {
				font-size: 70rpx;
				color: #2646a7;
				margin-top: 10rpx;
			}

			text {
				color: #2646a7;
			}
		}

		.card,
		.card1 {
			margin-top: 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-radius: 20rpx;
			width: 316rpx;
			height: 160rpx;


		}
	}
</style>
