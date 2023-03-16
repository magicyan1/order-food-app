<template>
	<view class="goodsDetail">
		<scroll-view :scroll-y="true" class="goodsPic">
			<image :src="goodsInfo.image" mode="widthFix"></image>
		</scroll-view>
		<view class="content">
			<text>{{goodsInfo.goodsName}}</text>
			<text>{{goodsInfo.goodsDetails}}</text>
		</view>

		<view v-if="goodsInfo.goodsTypes == choices[0].type?true:(goodsInfo.goodsTypes == choices[0].type?true:false)"
			class="choices">
			<!-- 根据种类给出规格选项 -->
			<view v-for="v in choices" :key="v.type">
				<view v-if="goodsInfo.goodsTypes == v.type?true:false" class="choices-box">
					<text>{{v.title}}</text>
					<view class="choices-list">
						<view v-for="item in v.list" :key="item">
							<text>{{item}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="reviews">
			<text>外卖评价</text>
			<view class="reviews-list" v-if="2+1>3">
				
			</view>
			<view class="reviews-list" v-else>
				<text>暂无，期待您的餐后评价</text>
			</view>
		</view>

		<view class="bar">
			<view class="bar-box">
				<text>￥{{goodsPriceAll}}</text>
				<view class="bar-box-num">
					<view class="bar-box-num-cul"
						@click="(()=>(goodsNum>1?goodsNum--:1) && (goodsPriceAll = goodsInfo.goodsPrice * goodsNum))">-
					</view>
					<text>{{goodsNum}}</text>
					<view class="bar-box-num-add"
						@click="(()=>(goodsNum++) && (goodsPriceAll = goodsInfo.goodsPrice * goodsNum))">+</view>
				</view>
			</view>
			<view class="add-car">
				<view @click="backToGoods">加入购物车</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import http from "../../utils/http.js";
	import {
		onMounted,
		ref
	} from "vue";
	import {
		onLoad
	} from "@dcloudio/uni-app";
	let goodsInfo = ref({
		"goodsId": 8,
		"goodsGno": "a3",
		"goodsName": "奥尔良鸡肉卷",
		"goodsPrice": 8,
		"goodsTypes": 1,
		"image": "https://tse3-mm.cn.bing.net/th/id/OIP-C.C7OMIPLACjR1IzpcDIx4FQHaGr?w=178&h=160&c=7&r=0&o=5&dpr=2&pid=1.7",
		"goodsDetails": "手工制作鸡肉卷",
		"goodsCount": 0,
		"buttonType": 1
	});

	const choices = [{
			type: '2',
			title: '请选择1',
			list: ['温热', '热', '常温', '去冰', '少冰', '正常冰']
		},
		{
			type: '1',
			title: '请选择2',
			list: ['番茄酱', '沙拉酱', '辣椒面', '唐扬酱', '原味']
		}
	]

	//添加数量
	let goodsNum = ref(1);
	let goodsPriceAll = ref(0);
	let goodsId = ref('');
	let goodsName = ref('');


	// 对时间格式优化
	const timestampPadStart = str => {
		// 必须转为字符串数字padStart方法
		str = String(str)
		return str.padStart(2, '0')
	}

	// 处理时间
	const formatTimestamp = ts => {
		const date = new Date(Number(ts))

		const YYYY = timestampPadStart(date.getFullYear())
		const MM = timestampPadStart(date.getMonth() + 1)
		const DD = timestampPadStart(date.getDate())

		return `${YYYY}.${MM}.${DD}`
	}

	let trolley = ref({});

	onLoad((option) => {
		//获取购物车信息
		try {
			trolley = uni.getStorageSync('trolley')
		} catch (e) {

		}
		goodsId.value = option.id;
		goodsName.value = option.name;
	})

	const backToGoods = () => {
		uni.navigateBack({
			delta: 1
		})
	}

	const render = () => {
		let p1 = http({
			url: '/Goods/Goods/GoodsName',
			method: 'get',
			params: {
				goodsName: goodsName.value
			}
		})

		Promise.all([p1]).then((res) => {
			goodsInfo.value = res[0].data[0];
			goodsPriceAll.value = goodsInfo.value.goodsPrice;
		})
	}

	onMounted(() => {
		render();
	})
</script>

<style lang="less">
	.goodsDetail {
		.goodsPic {
			width: 750rpx;
			height: 510rpx;

			image {
				width: 750rpx;
			}
		}

		.content {
			padding: 0rpx 30rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			padding-top: 30rpx;
			border-bottom: 2rpx solid #eee;
			box-sizing: border-box;

			text {
				&:first-child {
					font-size: 38rpx;
					font-weight: bold;
					color: #2a2a2a;
				}

				&:last-child {
					text-indent: 2em;
					padding-top: 45rpx;
					padding-bottom: 30rpx;
					font-size: 22rpx;
					color: #8b8b8b;
				}
			}

		}

		.choices {
			width: 750rpx;
			margin-top: 20rpx;
			padding-bottom: 30rpx;
			border-bottom: 30rpx solid #eee;

			.choices-box {
				width: 750rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				>text {
					margin-left: 30rpx;
				}

				.choices-list {
					width: 750rpx;
					display: flex;
					flex-direction: row;
					justify-content: space-evenly;
					flex-wrap: wrap;
					align-items: center;
					margin-top: 20rpx;

					view {
						width: 100rpx;
						height: 40rpx;
						border: 1rpx solid #eee;
						border-radius: 6rpx;
						text-align: center;
						line-height: 40rpx;
						font-size: 24rpx;
					}
				}

			}

		}

		.reviews {
			width: 750rpx;
			height: 200rpx;
			margin-left: 30rpx;
			padding-bottom: 180rpx;

			.reviews-list {
				margin-top: 20rpx;
				
				.detail{
					margin-top: 20rpx;
					
					>view {
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
				}
			}
		}

		.bar {
			position: fixed;
			bottom: 0rpx;
			left: 0rpx;
			width: 750rpx;
			height: 180rpx;
			box-shadow: 0rpx -4rpx 4rpx #eee;

			.bar-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #fff;
				height: 80rpx;
				padding: 0 30rpx;
				box-sizing: border-box;

				>text {
					color: red;
				}

				.bar-box-num {
					display: flex;

					justify-content: space-between;
					align-items: center;
					width: 140rpx;

					.bar-box-num-cul {
						width: 40rpx;
						height: 40rpx;
						border: 2rpx solid #aaa;
						border-radius: 50%;
						text-align: center;
						color: #aaa;
						line-height: 40rpx;
					}

					.bar-box-num-add {
						width: 44rpx;
						height: 44rpx;
						border-radius: 50%;
						text-align: center;
						color: #fff;
						background-color: red;
						line-height: 40rpx;
					}
				}
			}

			.add-car {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100rpx;
				background-color: #fff;

				>view {
					width: 600rpx;
					height: 60rpx;
					background-color: red;
					color: #fff;
					text-align: center;
					line-height: 60rpx;
					border-radius: 30rpx;
				}
			}
		}
	}
</style>
