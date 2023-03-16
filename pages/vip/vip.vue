<template>
	<swiper :duration="800" @change="change" :current="index">
		<swiper-item>
			<view class="swiper-item bg1">
				<view class="left">
					<text>你已经到达该等级</text>
					<text>享受折扣为<text>95折</text></text>
				</view>
				<view class="right">
					<span class="iconfont icon-vip1"></span>
					<text>白银</text>
				</view>
			</view>
		</swiper-item>
		<swiper-item>
			<view class="swiper-item bg2">
				<view class="left">
					<text>你已经到达该等级</text>
					<text>享受折扣为<text>85折</text></text>
				</view>
				<view class="right">
					<span class="iconfont icon-vip2"></span>
					<text>白金</text>
				</view>
			</view>
		</swiper-item>
		<swiper-item>
			<view class="swiper-item bg3">
				<view class="left">
					<text>你已经到达该等级</text>
					<text>享受折扣为<text>75折</text></text>
				</view>
				<view class="right">
					<span class="iconfont icon-vip3"></span>
					<text>钻石</text>
				</view>
			</view>
		</swiper-item>
	</swiper>
	<view class="cardBox" v-show="index==0?true:false">
		<view class="card">
			<view>白银会员</view>
			<text>-5%</text>
			<text>Every purchase you make after that</text>
		</view>
	</view>
	<view class="cardBox2" v-show="index==1?true:false">
		<view class="card2">
			<view>白金会员</view>
			<text>-15%</text>
			<text>Every purchase you make after that</text>
		</view>
	</view>
	<view class="cardBox3" v-show="index==2?true:false">
		<view class="card3">
			<view>钻石会员</view>
			<text>-25%</text>
			<text>Every purchase you make after that</text>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		ref
	} from "vue"
	let index = ref(0)
	const change = (e) => {
		console.log(e.detail);
		index.value = e.detail.current
	}
	const color = ref([]);
</script>

<style scoped lang="less">
	@import url('../../static/vip/iconfont.css');

	.bg1 {
		background: linear-gradient(135deg, #757f9a, #d7dde8);
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		box-sizing: border-box;

		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 40rpx;

			text {
				color: #fff;
				line-height: 50rpx;
				font-size: 30rpx;

				text {
					color: yellow;
					font-size: 44rpx;
					margin: 10rpx;
				}
			}
		}

		.right {
			display: flex;
			flex-direction: column;
			align-items: center;

			.icon-vip1 {
				font-size: 160rpx;
				color: #fdeff9;
			}

			text {
				color: #fff;
				background-color: coral;
				border-radius: 16rpx;
				line-height: 54rpx;
				text-align: center;
				width: 90rpx;
			}
		}

	}

	.bg2 {
		background: linear-gradient(-135deg, #5efce8, #736efe);
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		box-sizing: border-box;

		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 40rpx;

			text {
				color: #fff;
				line-height: 50rpx;
				font-size: 30rpx;

				text {
					color: yellow;
					font-size: 44rpx;
					margin: 10rpx;
				}
			}
		}

		.right {
			display: flex;
			flex-direction: column;
			align-items: center;

			.icon-vip2 {
				font-size: 160rpx;
				color: #55007f;
			}

			text {
				color: #fff;
				background-color: coral;
				border-radius: 16rpx;
				line-height: 54rpx;
				text-align: center;
				width: 90rpx;
			}
		}

	}




	.bg3 {
		background: linear-gradient(135deg, #03001e, #7303c0, #ec38bc, #fdeff9);
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		box-sizing: border-box;

		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 40rpx;

			text {
				color: #fff;
				line-height: 50rpx;
				font-size: 30rpx;

				text {
					color: yellow;
					font-size: 44rpx;
					margin: 10rpx;
				}
			}
		}

		.right {
			display: flex;
			flex-direction: column;
			align-items: center;

			.icon-vip3 {
				font-size: 160rpx;
				color: #ebfdb8;
			}

			text {
				color: #fff;
				background-color: coral;
				border-radius: 16rpx;
				line-height: 54rpx;
				text-align: center;
				width: 90rpx;
			}
		}

	}


	swiper {
		margin-top: 40rpx;
		width: 750rpx;
	}

	.swiper-item {
		margin: 0 auto;
		width: 700rpx;
		height: 300rpx;
	}

	.cardBox {
		width: 750rpx;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.card {
		z-index: 9;
		margin-top: 40rpx;
		height: 540rpx;
		position: relative;
		display: flex;
		place-content: center;
		flex-direction: column;
		place-items: center;
		overflow: hidden;
		border-radius: 20px;
		padding: 60rpx 80rpx;
		box-sizing: border-box;

		view {
			width: 540rpx;
			text-align: center;
			color: #fff;
			z-index: 1;
			font-size: 40rpx;
			margin-bottom: 90rpx;
		}
	}


	.card text {
		display: block;
		width: 400rpx;
		z-index: 1;
		color: white;
		font-size: 80rpx;
		margin: 10rpx;
	}

	.card text:last-child {
		z-index: 1;
		color: white;
		font-size: 34rpx;
	}

	.card::before {
		content: '';
		position: absolute;
		width: 100px;
		background-image: linear-gradient(180deg, rgb(255, 0, 255), rgb(0, 170, 255));
		height: 900rpx;
		animation: rotBGimg 3s linear infinite;
		transition: all 0.2s linear;
	}

	@keyframes rotBGimg {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.card::after {
		content: '';
		position: absolute;
		width: 700rpx;
		height: 520rpx;
		background: linear-gradient(135deg, #f0f2f0, #000c40);
		;
		inset: 5px;
		border-radius: 15px;
	}


	.cardBox2 {
		width: 750rpx;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.card2 {
		margin-top: 40rpx;
		height: 540rpx;
		position: relative;
		display: flex;
		place-content: center;
		flex-direction: column;
		place-items: center;
		overflow: hidden;
		border-radius: 20px;
		padding: 60rpx 80rpx;
		box-sizing: border-box;

		view {
			width: 540rpx;
			text-align: center;
			color: #fff;
			z-index: 1;
			font-size: 40rpx;
			margin-bottom: 90rpx;
		}
	}


	.card2 text {
		display: block;
		width: 400rpx;
		z-index: 1;
		color: white;
		font-size: 80rpx;
		margin: 10rpx;
	}

	.card2 text:last-child {
		z-index: 1;
		color: white;
		font-size: 34rpx;
	}

	.card2::before {
		content: '';
		position: absolute;
		width: 100px;
		background-image: linear-gradient(180deg, #ef370a, #0aef37);
		height: 900rpx;
		animation: rotBGimg 3s linear infinite;
		transition: all 0.2s linear;
	}


	.card2::after {
		content: '';
		width: 700rpx;
		height: 520rpx;
		position: absolute;
		background: linear-gradient(135deg, #5efce8, #736efe);
		;
		inset: 5px;
		border-radius: 15px;
	}


	// 钻石会员
	.cardBox3 {
		width: 750rpx;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.card3 {
		margin-top: 40rpx;
		height: 540rpx;
		position: relative;
		display: flex;
		place-content: center;
		flex-direction: column;
		place-items: center;
		overflow: hidden;
		border-radius: 20px;
		padding: 60rpx 80rpx;
		box-sizing: border-box;

		view {
			width: 540rpx;
			text-align: center;
			color: #fff;
			z-index: 1;
			font-size: 40rpx;
			margin-bottom: 90rpx;
		}
	}


	.card3 text {
		display: block;
		width: 400rpx;
		z-index: 1;
		color: white;
		font-size: 80rpx;
		margin: 10rpx;
	}

	.card3 text:last-child {
		z-index: 1;
		color: white;
		font-size: 34rpx;
	}

	.card3::before {
		content: '';
		position: absolute;
		width: 100px;
		background-image: linear-gradient(180deg, #303952, #12cbc4);
		height: 900rpx;
		animation: rotBGimg 3s linear infinite;
		transition: all 0.2s linear;
	}

	.card3::after {
		content: '';
		position: absolute;
		width: 700rpx;
		height: 520rpx;
		background: linear-gradient(-135deg, #03001e, #7303c0, #ec38bc, #fdeff9);
		;
		inset: 5px;
		border-radius: 15px;
	}
</style>
