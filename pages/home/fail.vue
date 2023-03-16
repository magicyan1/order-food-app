<template>
	<view id="success">
		<icon type="clear" size="60" />
		<text>排队已取消</text>
	</view>
	<view class="detail">
		<view class="top">
			<text>中桌B010</text>
		</view>
		<view class="bot">
			<view class="stay">
				<view class="table">
					<view>前方等待桌数</view>
					<view><text>30</text>桌</view>
				</view>
				<view class="time">
					<view>预计等待时间</view>
					<view><text>20</text>分钟</view>
				</view>
			</view>
			<view class="tip">
				<text>过号请联系前台</text>
			</view>
		</view>
	</view>
	<view class="footer">
		<view class="button" @tap="queueAgain">
			<text>再次排队</text>
		</view>
	</view>
</template>

<script lang="ts" setup>
	const queueAgain = () => {
		uni.switchTab({
			url: '/pages/home/home'
		})
	}
</script>

<style lang="less" scoped>
	#success {
		margin-top: 40rpx;
		width: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		text {
			margin: 40rpx 0;
		}
	}

	.detail {
		color: #a8a8a8;
		margin: 0 auto;
		width: 668rpx;
		height: 452rpx;
		background-color: #f8f8f8;
		display: flex;
		flex-direction: column;
		align-items: center;

		.top {
			height: 140rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: bold;
			font-size: 42rpx;
			width: 668rpx;
			border-bottom: 3px dotted #a8a8a8;
		}

		.bot {
			color: #a8a8a8;
			margin-top: 40rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 28rpx;

			.stay {
				margin-top: 30rpx;
				display: flex;

				.table,
				.time {
					text-align: center;
					height: 160rpx;
					width: 300rpx;

					text {
						display: inline-block;
						margin: 20rpx 0;
						font-size: 44rpx;
						color: #a8a8a8;
					}
				}
			}
		}
	}

	.footer {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 134rpx;
		background-color: #f5f7f7;

		.button {
			width: 686rpx;
			height: 84rpx;
			border: 1px solid #f77214;
			border-radius: 50rpx;
			text-align: center;
			background-color: #fff;

			text {
				color: #f77214;
				line-height: 84rpx;
			}
		}
	}
</style>
