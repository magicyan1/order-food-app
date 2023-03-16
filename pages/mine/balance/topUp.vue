<template>
	<!-- 充值，余额界面 -->
	<view class="container">
		<view class="topBar">
			<view class="topBar-items" @tap="handleBalance">
				<span :class="[state===1?'border':'null']">充值</span>
			</view>
			<view class="topBar-items" @tap="handleRecoding">
				<span :class="[state===0?'border':'null']">充值记录</span>
			</view>
		</view>

		<view class="content-container">
			<view class="balance" :class="[state===1?'isShow':'noShow']">
				<view class="money">
					<text>￥1200000.0</text>
					<span>账户余额</span>
				</view>
				<span>请选择充值金额</span>
				<view class="pay">
					<radio-group @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd ">
							<view class="changeItems">
								<radio value="500" color="#f77214" style="transform:scale(0.5);"
									:checked="index === current" />
								<text>充值500元</text>
							</view>
						</label>
						<label class="uni-list-cell uni-list-cell-pd">
							<view class="changeItems">
								<radio value="1000" color="#f77214" style="transform:scale(0.5);"
									:checked="index === current" />
								<text>充值1000元</text>
							</view>
						</label>
						<label class="uni-list-cell uni-list-cell-pd">
							<view class="changeItems">
								<radio value="2000" color="#f77214" style="transform:scale(0.5);"
									:checked="index === current" />
								<text>充值2000元</text>
							</view>
						</label>
						<label class="uni-list-cell uni-list-cell-pd">
							<view class="changeItems">
								<radio value="4000" color="#f77214" style="transform:scale(0.5);"
									:checked="index === current" />
								<text>充值4000元</text>
							</view>
						</label>
					</radio-group>
				</view>
				<view class="notice">
					<span class='iconfont'></span>
					充值须知
					<span>1.您被本次充值的预付卡余额有效期为3年，请在有效期内消费<br></span>
					<span>2.本卡不记名，不挂失，仅限本人使用<br></span>
					<span>3.充值后概不退款，如果疑问，可联系商家<br></span>
				</view>
				<view class="agreement">
					<radio color="#f77214" style="transform:scale(0.5);" checked="true" /><span>我已阅读并同意<span
							style='color:#f77214 ;'>充值协议</span></span>
				</view>

				<button>确认充值</button>
			</view>


			<view class="recoding" :class="[state===0?'isShow':'noShow']">
				<view class="recoding-items">
					<view class="recoding-right">
						<text>充值<text>500</text></text>
						<text class="weak">余额<text></text></text>
					</view>
					<view class="recoding-left">
						<text>充值成功</text>
						<text class="weak">time</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	let state = ref(1)
	let handleBalance = function() {
		state.value = 1
	}
	let handleRecoding = function() {
		state.value = 0
		uni.setNavigationBarTitle({
			title: '充值余额'
		})
	}
	let radioChange = function(e) {
		console.log(e.target.value)
	}
</script>

<style lang="less" scoped>
	.isShow {
		display: block;
	}

	.noShow {
		display: none;
	}

	.border {
		color: #f77214;
		border-bottom: 10rpx solid #f77214;
	}

	.topBar {
		width: 100vw;
		height: 100rpx;
		display: flex;
		background-color: #ffffff;

		.topBar-items {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 50vw;
		}
	}

	.content-container {
		width: 100vw;
		background-color: #f5f7f7;

		.balance {
			width: 100%;
			flex-direction: column;
			align-items: center;

			.money {
				width: 92vw;
				margin: 20rpx 4vw;
				height: 18vh;
				text-align: center;
				background-color: #ffffff;
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-size: 24rpx;
				font-weight: 100;

				:first-child {
					font-size: 46rpx;
					font-weight: 900;
				}


			}

			.pay {
				display: flex;

				.changeItems {
					border-radius: 15%;
					background-color: #f77214;
					margin: 10rpx 20rpx;
					width: 44vw;
					height: 16vh;
					display: inline-block;
					position: relative;

					text {
						position: absolute;
						top: 40%;
						left: 20%;
					}
				}

			}

			.notice {
				font-size: 30rpx;

				.agreement {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}

		}

		.recoding {
			width: 100vw;
			height: 90vh;
			font-size: 26rpx;
			.recoding-items {	
				display: flex;
				width: 100vw;
				height:14vh;
				justify-content: space-between;
				font-weight: 900;
				.recoding-right{
					display: flex;
					flex-direction:column;					
				}
				.recoding-left{
					display: flex;
					flex-direction:column;			
				}
				.weak{
					font-weight: 100;
				}
			}
		}

	}
</style>
