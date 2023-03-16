<template>
	<view class="consume">
		<!-- 待消费顶部标题 -->
		<view class="top-title">
			<view class="top-title-box">
				<image></image>
				<view class="top-title-p-box">
					<view class="top-title-p">
						<text>草莓冰沙300ml</text>
						<text>1杯</text>
						<text>堂食可用</text>
					</view>
					<view class="top-title-n">200积分</view>
				</view>
			</view>
		</view>
		<!-- 待消费券码 -->
		<view class="consume-code">
			<view>券码 060900807758</view>
			<view class="consume-code-time">有效期至2019.08.06</view>
			<view>二维码</view>
		</view>
		<!-- 适用门店 -->
		<view class="consume-store">
			<view style="color: #ccc;">适用门店</view>
			<view style="color: #F7A676;">共1家</view>
		</view>
		<!-- 兑换须知 -->
		<view class="consume-exchange">
			<view class="consume-exchange-title">兑换须知</view>
			<view class="consume-exchange-list">1、有效期：兑换后当天有效</view>
			<view class="consume-exchange-list">2、适用：仅限堂食</view>
			<view class="consume-exchange-list">3、本券不与其他优惠叠加使用，不可转让、转售、不可兑换为现金。</view>
			<view class="consume-exchange-list">4、本优惠券不可开发票</view>
		</view>
		<!-- 订单信息 -->
		<view class="orderInfo">
			<view class="orderInfo-title">
				<view class="orderInfo-title-p">订单信息</view>
			</view>
			<view class="has-border">
				<view class="orderInfo-list">
					<view class="orderInfo-list-p">就餐方式</view>
					<view class="orderInfo-list-c">堂食</view>
				</view>
			</view>
			<view class="orderInfo-list">
				<view class="orderInfo-list-p">就餐方式</view>
				<view class="orderInfo-list-c">堂食</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	.consume {
		margin: 30rpx;
		.top-title {
			border: 1px solid #F3F3F3;
			border-bottom: 1px dashed #F3F3F3;
			border-radius: 0 0 20rpx 20rpx;
			font-size: 35rpx;
			.top-title-box {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 30rpx;
				image {
					width: 100rpx;
					height: 100rpx;
					border: 1px solid #F3F3F3;
					border-radius: 15rpx;
				}
				.top-title-p-box {
					height: 100rpx;
					
				}
				.top-title-p {
					display: flex;
					justify-content: center;
					text {
						margin-left: 15rpx;
					}
				}
				.top-title-n {
					margin-left: 15rpx;
					color: #9D9997;
					margin-top: 20rpx;
				}
			}
		}
		.consume-code {
			border: 1px solid #F3F3F3;
			border-bottom: 1px dashed #F3F3F3;
			border-radius: 20rpx 20rpx 0 0;
			font-size: 35rpx;
			padding: 30rpx;
			.consume-code-time {
				color: #ccc;
				font-size: 25rpx;
				margin: 25rpx 0 40rpx;
			}
		}
		.consume-store {
			height: 90rpx;
			line-height: 90rpx;
			display: flex;
			justify-content: space-between;
			font-size: 30rpx;
			border: 1px solid #F3F3F3;
			padding: 0 30rpx;
			margin: 30rpx 0;
			border-radius: 20rpx;
		}
		.consume-exchange {
			border: 1px solid #F3F3F3;
			padding: 40rpx 30rpx;
			border-radius: 20rpx;
			.consume-exchange-title {
				font-size: 30rpx;
				margin-bottom: 40rpx;
			}
			.consume-exchange-list {
				font-size: 25rpx;
				margin-bottom: 20rpx;
				color: #ccc;
			}
		}
		/* 订单信息区域 */
		.orderInfo {
			padding: 0 30rpx;
			border: 1rpx solid #F3F3F3;
			border-radius: 20rpx;
			.has-border {
				border-bottom: 1px solid #F3F3F3;
				margin-bottom: 30rpx;
			}
			.orderInfo-title{
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #F3F3F3;
				margin-bottom: 37rpx;
				height: 105rpx;
				line-height: 105rpx;
				padding: ;
				.orderInfo-title-p {
					font-size: 30rpx;
				}
			}
			.orderInfo-list {
				display: flex;
				justify-content: space-between;
				margin-bottom: 37rpx;
				.orderInfo-list-p {
					color: #999999;
					font-size: 25rpx;
				}
				.orderInfo-list-c {
					font-size: 25rpx;
				}
			}
		}
		
	}
	
	
</style>
