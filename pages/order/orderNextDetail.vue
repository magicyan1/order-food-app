<template v-slot="cancel">
	<view class="order">
		<view class="contain">
			<view class="common">
				<view v-if="arr22.topData.cancelBox==='已失效'" class="cancelBox">
					<view class="top-status" >
						<view class="status-contain">
							<text class="iconfont icon-dingdan"></text>
							<view class="status-contain-title">已取消</view>
							<view class="time-box">
								<view class="time-p">支付超时，订单已取消</view>
							</view>
						</view>
						<view class="status-button-box">
							<view class="button-common" @tap="nextOrder">
								<text class="iconfont icon-jia"></text>
								<view>再来一单</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="arr22.topData.isOkBox==='已完成'" class="isOkBox">
					<view class="top-status">
						<view class="status-contain">
							<text class="iconfont icon-dingdan"></text>
							<view class="status-contain-title">订单已完成</view>
							<view class="time-box">
								<view class="time-p">感谢您的购买，期待再次光临</view>
							</view>
						</view>
						<view class="status-button-box">
							<view class="button-common"  @tap="nextOrder">
								<text class="iconfont icon-jia"></text>
								<view>再来一单</view>
								<view class="comments" @tap="toComments">评价</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="arr22.topData.toPayBox==='待支付'" class="toPayBox">
					<view class="top-status">
						<view class="status-contain">
							<text class="iconfont icon-shijian"></text>
							<view class="status-contain-title">待支付</view>
							<view class="time-box">
								<view class="time-p">剩余支付时间</view>
								<view class="time-t active">14:59</view>
							</view>
						</view>
						<view class="status-button-box">
							<view class="button-common active">
								<text class="iconfont icon-a-zhifuqianbaodaizhifu"></text>
								<view>立即支付</view>
							</view>
							<view class="button-common">
								<text class="iconfont icon-quxiao"></text>
								<view>取消订单</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="arr22.topData.productionBox==='制作中'" class="productionBox">
					<view class="top-status">
						<view class="status-contain">
							<text class="iconfont icon-caozuo-bianchao"></text>
							<view class="status-contain-title">菜品制作中</view>
							<view class="time-box">
								<view class="time-p">预计</view>
								<view class="time-t active">14:59</view>
								<view class="time-p">左右制作完成</view>
							</view>
						</view>
						<view class="status-button-box">
							<view class="button-common">
								<text class="iconfont icon-wenbenbianji"></text>
								<view>催单</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="arr22.topData.onTheWayBox==='配送中'">
					<view class="top-status">
						<view class="status-contain">
							<text class="iconfont icon-qihang"></text>
							<view class="status-contain-title">菜品配送中</view>
							<view class="time-box">
								<view class="time-p">预计</view>
								<view class="time-t active">14:59</view>
								<view class="time-p">之前送达，请耐心等待</view>
							</view>
						</view>
						<view class="status-progress-box">
							<view class="status-progress-title">配送进度</view>
							<view class="status-progress-contain">
								<view class="status-progress-contain-left">
									<text class="iconfont icon-shangpin"></text>
									<view>
										<view>您的商品已经打包完好，正在等待商家配送。</view>
										<view class="status-progress-time">2022-10-09 10:09:09</view>
									</view>
								</view>
								<view> > </view>
							</view>
						</view>
						<view class="status-button-box">
							<view class="button-common active">
								<text class="iconfont icon-gongdanqueren"></text>
								<view>确认收货</view>
							</view>
							<view class="button-common"  @tap="nextOrder">
								<text class="iconfont icon-wenbenbianji"></text>
								<view>再来一单</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="toConsume"></view>	
			</view>
			<view class="food-info">
				<view class="food-title">餐品信息</view>
				<view class="food-box" 
					v-for="item in list"
					key="goodsName"
					>
					<view class="food-left">
						<view class="food-img">
							<image :src="item.src"></image>
						</view>
						<view class="food-p title-box">
							<view class="food-p-title title">{{item.name}}</view>
							<view class="food-p-text">
								<view class="first-child">3人份</view>
								<view>少辣</view>
							</view>
						</view>
					</view>
					<view class="food-price title-box">
						<view class="food-unit-price title">￥{{item.price}}</view>
						<view class="food-number-price">x{{item.num}}</view>
					</view>
				</view>
				<view class="price-box">
					<view class="discount">
						<view class="discount-p">折扣金额</view>
						<view class="discount-num">-￥16.5</view>
					</view>
					<view class="all-price">
						<view>合计 ￥106.0</view>
					</view>
				</view>
			</view>
			<view class="orderStoreInfo">
				<view class="orderStoreInfo-title">
					<view class="orderStoreInfo-title-p">门店信息</view>
					<!-- <view>
						<text class="iconfont icon-dianhua"></text>
						<text class="iconfont icon-ditu_dingwei_o"></text>
					</view> -->
				</view>
				<view class="orderStoreInfo-list">
					<view class="orderStoreInfo-list-p">门店名称</view>
					<view class="orderStoreInfo-list-c">麦乐美餐厅</view>
				</view>
				<view class="orderStoreInfo-list">
					<view class="orderStoreInfo-list-p">门店地址</view>
					<view class="orderStoreInfo-list-c">成都市双流区西航港新街景茂雍水岸宽景路73号</view>
				</view>
				<view class="orderStoreInfo-list">
					<view class="orderStoreInfo-list-p">联系方式</view>
					<view class="orderStoreInfo-list-c">19166009901</view>
				</view>
				
			</view>
			<view class="orderInfo">
				<view class="orderInfo-title">
					<view class="orderInfo-title-p">订单信息</view>
				</view>
				<view class="has-border">
					<view class="orderInfo-list" >
						<view class="orderInfo-list-p">就餐方式</view>
						<view class="orderInfo-list-c">{{orderArr.diningMethod}}</view>
					</view>
					<view class="orderInfo-list">
						<view class="orderInfo-list-p">用餐人数</view>
						<view class="orderInfo-list-c">{{orderArr.tablewareNumber}}</view>
					</view>
					<view class="orderInfo-list">
						<view class="orderInfo-list-p">桌号</view>
						<view class="orderInfo-list-c">{{orderArr.tableNum}}</view>
					</view>
				</view>
				<view class="orderInfo-list">
					<view class="orderInfo-list-p">订单编号</view>
					<view class="orderInfo-list-c">{{orderArr.orderNumber}}</view>
				</view>
				<view class="orderInfo-list">
					<view class="orderInfo-list-p">下单时间</view>
					<view class="orderInfo-list-c">{{orderArr.orderTime}}</view>
				</view>
				<view class="orderInfo-list">
					<view class="orderInfo-list-p">联系方式</view>
					<view class="orderInfo-list-c">{{orderArr.phone}}</view>
				</view>
				<view class="orderInfo-list">
					<view class="orderInfo-list-p">备注</view>
					<view class="orderInfo-list-c">{{orderArr.remarks}}</view>
				</view>
			</view>
		</view>
	</view>
</template>
<style>
page {
	background-color: #F5F7F7;
}
</style>
<style lang="less" scoped>
	@import url("../../static/iconfont/font_0qivch445ot/iconfont.css");
	.order {
		width: 100%;
		height: 100%;
		margin: 30rpx auto;
		.contain {
			margin: 0 30rpx;
			.icon-dingdan {
				font-size: 70rpx;
				color: #F66506;
			}
		}
		.common {
			margin-bottom: 30rpx;
		}
		.cancelBox {
			.top-status {
				background-color: #fff;
				border: 1rpx solid #F3F3F3;
				border-radius: 20rpx;
				.status-contain {
					padding: 35rpx 0;
					text-align: center;
					border-bottom: 1px solid #F3F3F3;
					margin: 0 30rpx;
					.status-contain-title {
						margin: 30rpx 0;
						font-size: 40rpx;
					}
					.time-box {
						display: flex;
						justify-content: center;
						font-size: 30rpx;
						color: #8D878A;
						.active {
							color: #F66506;
						}
						.time-t {
							margin-left: 16rpx;
						}
					}
				}
				.status-button-box {
					font-size: 30rpx;
					color: #F66506;
					.iconfont {
						margin-right: 22rpx;
						border: 1px solid #F66506;
						
					}
					display: flex;
					justify-content: space-around;
					align-items: center;
					margin: 35rpx 0;
					.active {
						color: #F66506;
					}
					.button-common {
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
		}
		.toPayBox {
			.top-status {
				background-color: #fff;
				border: 1rpx solid #F3F3F3;
				border-radius: 20rpx;
				.status-contain {
					padding: 35rpx 0;
					text-align: center;
					border-bottom: 1px solid #F3F3F3;
					margin: 0 30rpx;
					.status-contain-title {
						margin: 30rpx 0;
						font-size: 40rpx;
					}
					.time-box {
						display: flex;
						justify-content: center;
						font-size: 30rpx;
						color: #8D878A;
						.active {
							color: #F66506;
						}
						.time-t {
							margin-left: 16rpx;
						}
					}
				}
				.status-button-box {
					font-size: 30rpx;
					.iconfont {
						margin-right: 22rpx;
					}
					display: flex;
					justify-content: space-around;
					align-items: center;
					margin: 35rpx 0;
					.active {
						color: #F66506;
					}
					.button-common {
						display: flex;
						justify-content: space-around;
						align-items: center;
					}
				}
			}
		}
		.isOkBox {
			.top-status {
				background-color: #fff;
				border: 1rpx solid #F3F3F3;
				border-radius: 20rpx;
				.status-contain {
					padding: 35rpx 0;
					text-align: center;
					border-bottom: 1px solid #F3F3F3;
					margin: 0 30rpx;
					.status-contain-title {
						margin: 30rpx 0;
						font-size: 40rpx;
					}
					.time-box {
						display: flex;
						justify-content: center;
						font-size: 30rpx;
						color: #8D878A;
						.active {
							color: #F66506;
						}
						.time-t {
							margin-left: 16rpx;
						}
					}
				}
				.status-button-box {
					font-size: 30rpx;
					color: #F66506;
					.iconfont {
						font-size: 25rpx;
						margin-right: 22rpx;
						border: 1px solid #F66506;
						
					}
					display: flex;
					justify-content: space-around;
					align-items: center;
					margin: 35rpx 0;
					.active {
						color: #F66506;
					}
					.button-common {
						display: flex;
						justify-content: space-around;
						align-items: center;
						.comments {
							margin-left: 30rpx;
						}
					}
				}
			}
		}
		.productionBox {
			.top-status {
				background-color: #fff;
				border: 1rpx solid #F3F3F3;
				border-radius: 20rpx;
				.status-contain {
					padding: 35rpx 0;
					text-align: center;
					border-bottom: 1px solid #F3F3F3;
					margin: 0 30rpx;
					.status-contain-title {
						margin: 30rpx 0;
						font-size: 40rpx;
					}
					.time-box {
						display: flex;
						justify-content: center;
						font-size: 30rpx;
						color: #8D878A;
						.active {
							color: #F66506;
						}
						.time-t {
							margin-left: 16rpx;
						}
					}
				}
				.status-button-box {
					font-size: 30rpx;
					.iconfont {
						margin-right: 22rpx;
					}
					display: flex;
					justify-content: space-around;
					align-items: center;
					margin: 35rpx 0;
					.active {
						color: #F66506;
					}
					.button-common {
						display: flex;
						justify-content: space-around;
						align-items: center;
					}
				}
			}
		}
		.onTheWayBox {
			.top-status {
				background-color: #fff;
				border: 1rpx solid #F3F3F3;
				border-radius: 20rpx;
				.status-contain {
					padding: 35rpx 0;
					text-align: center;
					border-bottom: 1px solid #F3F3F3;
					margin: 0 30rpx;
					.status-contain-title {
						margin: 30rpx 0;
						font-size: 40rpx;
					}
					.time-box {
						display: flex;
						justify-content: center;
						font-size: 30rpx;
						color: #8D878A;
						.active {
							color: #F66506;
						}
						.time-t {
							margin-left: 16rpx;
						}
					}
				}
				.status-progress-box {
					margin: 0 30rpx;
					border-bottom: 1px solid #F3F3F3;
					padding: 40rpx 0;
					font-size: 30rpx;
					.status-progress-title {
						font-size: 30rpx;
						margin-bottom: 30rpx;
					}
					.status-progress-contain {
						display: flex;
						justify-content: space-between;
						.status-progress-contain-left {
							display: flex;
							justify-content: flex-start;
							.icon-shangpin {
								margin-right: 16rpx;
							}
							.status-progress-time {
								margin-top: 20rpx;
								color: #8D878A;
							}
						}
					}
				}
				.status-button-box {
					font-size: 30rpx;
					.iconfont {
						margin-right: 22rpx;
					}
					display: flex;
					justify-content: space-around;
					align-items: center;
					margin: 35rpx 0;
					.active {
						color: #F66506;
					}
					.button-common {
						display: flex;
						justify-content: space-around;
						align-items: center;
					}
				}
				
				
			}
		}
	}
	
	.food-info {
				padding: 35rpx 25rpx;
				background-color: #fff;
				border: 1rpx solid #F3F3F3;
				border-radius: 20rpx;
				margin-bottom: 30rpx;
				.food-title {
					padding-bottom: 35rpx;
					font-size: 30rpx;
					border-bottom: 1px solid #F3F3F3;
				}
				.food-box {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 175rpx;
					border-bottom: 1px solid #F3F3F3;
					.title-box {
						margin: 0 20rpx;
					}
					.title {
						margin: 17rpx 0 33rpx;
						font-size: 30rpx;
					}
					.food-left {
						display: flex;
						justify-content: center;
					}
					.food-img {
						width: 110rpx;
						height: 110rpx;
						image {
							width: 110rpx;
							height: 110rpx;
						}
					}
					.food-p {
						display: flex;
						flex-direction: column;
						.food-p-title {
							font-size: 30rpx;
						}
						.food-p-text {
							display: flex;
							justify-content: flex-start;
							.first-child {
								margin-right: 10rpx;
							}
						}
						.food-p-text>view {
							font-size: 25rpx;
							color: #C3C3C3;
						}
					}
					.food-price {
						display: flex;
						flex-direction: column;
						justify-content: flex-end;
						text-align: right;
						.food-number-price {
							color: #C3C3C3;
						}
					}
				}
				.discount {
					display: flex;
					justify-content: space-between;
					height: 100rpx;
					line-height: 100rpx;
					border-bottom: 1px solid #F3F3F3;
					.discount-p {
						color: #C3C3C3;
						font-size: 30rpx;
					}
					.discount-num {
						font-size: 30rpx;
					}
					
				}
				.all-price {
					text-align: right;
					font-size: 33rpx;
					height: 100rpx;
					line-height: 100rpx;
				}
				
			}
			
	.orderStoreInfo {
		padding: 0 30rpx;
		background-color: #fff;
		border: 1rpx solid #F3F3F3;
		border-radius: 20rpx;
		.orderStoreInfo-title{
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #F3F3F3;
			margin-bottom: 37rpx;
			height: 105rpx;
			line-height: 105rpx;
			padding: ;
			.orderStoreInfo-title-p {
				font-size: 30rpx;
			}
			.iconfont {
				border: 1px solid #F3F3F3;
				background-color: antiquewhite;
				border-radius: 50%;
				color: #F1A36D;
				font-size: 30rpx;
				padding: 10rpx;
			}
			.icon-dianhua {
				margin-right: 30rpx;
			}
		}
		.orderStoreInfo-list {
			display: flex;
			justify-content: space-between;
			margin-bottom: 37rpx;
			.orderStoreInfo-list-p {
				color: #999999;
				font-size: 25rpx;
			}
			.orderStoreInfo-list-c {
				font-size: 25rpx;
			}
		}
	}
	.orderInfo {
		padding: 0 30rpx;
		background-color: #fff;
		border: 1rpx solid #F3F3F3;
		border-radius: 20rpx;
		margin: 30rpx 0;
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
	
</style>

<script setup>
import * as order from '../../apis/order/order.js'
import {ref,reactive,computed,onMounted} from 'vue'
import {onShow,onReachBottom,onLoad} from '@dcloudio/uni-app';

let orderArr = reactive({})
const list = reactive([])
const orderNum = ref('')
const status1 = ref('')

const arr22 = reactive({
	topData:[
		{
			cancelBox:'',
			isOkBox:'',
			toPayBox:'',
			productionBox:'',
			onTheWayBox:'',
			toConsume:''
		}
	],
	
	
})

let orderStatus = uni.getStorageSync('order')
if(orderStatus){
	console.log(orderStatus.newStatus==='已失效')
	console.log(orderStatus.newStatus)
	if(orderStatus.newStatus==='已失效'){
		arr22.topData.forEach((v)=>{
			v=''
		})
		arr22.topData.cancelBox='已失效'
	}
	if(orderStatus.newStatus==='已完成'){
		arr22.topData.forEach((v)=>{
			v=''
		})
		arr22.topData.isOkBox='已完成'
	}
	if(orderStatus.newStatus==='待支付'){
		arr22.topData.forEach((v)=>{
			v=''
		})
		arr22.topData.toPayBox='待支付'
	}
	if(orderStatus.newStatus==='制作中'){
		arr22.topData.forEach((v)=>{
			v=''
		})
		arr22.topData.productionBox='制作中'
	}
	if(orderStatus.newStatus==='配送中'){
		arr22.topData.forEach((v)=>{
			v=''
		})
		arr22.topData.onTheWayBox='配送中'
	}
	
}


onShow(()=>{
	let orderId1=uni.getStorageSync('order')
	order.getOneOrderInfo(orderId1.orderNum,orderId1.newStatus).then((res)=>{
		orderArr={...res?.data}
		console.log('orderArr',orderArr)
		if(res?.data) {
			res?.data?.orderDishes.forEach((t)=>{
				list.push({
					src:t?.images,
					name:t?.goodsName,
					people:'',
					price:t?.price,
					num:t?.number,
					discount:t?.flavor
				})
			})
		}
	})
})
const toComments = () => {
	uni.navigateTo({
		url:'../order/orderComments'
	})
}

const nextOrder = () => {
	uni.switchTab({
		url: '/pages/goods/goods'
	});
}
</script>