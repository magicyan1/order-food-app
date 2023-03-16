<template>
	<view class="order"
		
		v-for="orderList in arr.orderList"
		key="id">
		<!-- 标题名 -->
		<view class="title">
			<view class="title-left-box">
				<view class="tab">{{orderList.tab}}</view>
				<view>{{orderList.store}}</view>
			</view>
			<view class="pay">{{orderList.status==='支付中'?'制作中':orderList.status}}</view>
		</view>
		<view v-if="orderList.status==='已完成'" style="color: #ccc;">
			下单时间：2022-11-21 10:00:01
		</view>
		<!-- 列表内容 -->
		<view class="list" style="overflow-y: auto;"  @tap="toOrder(orderList,orderList.id)">
			<view class="list-left-goods"
				v-for="v in orderList.img"
				key="finalPrice"
			>
				<view class="goods-box">
					<image style="vertical-align: middle;" :src="v.src"></image>
					<view class="title">{{v.title}}</view>
				</view>
			</view>
			<view class="price">
				<view>￥{{orderList.price}}</view>
				<view style="color: #ccc;">共{{orderList.num}}件</view>
			</view>
		</view>
		<!-- 按钮区 -->
		<view class="button-box">
			<view
			@tap="orderNum11(orderList)"
			v-for="v in orderStatusToButton?.[orderList.status] ?? []"
			key="v"
			>
				<view 
				class='buttonList' 
				:class="v=='取消订单'?'first-child':'active'"
				@tap="resNewOrder(v)"
				
				>
				{{v}}
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
		border: 1px solid #fff;
		padding: 30rpx;
		border-radius: 20rpx;
		margin: 30rpx;
		background-color: #fff;
		 box-shadow: 0px 0px 5px 0px #d4d1d0;
		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #ccc;
			padding-bottom: 20rpx;
			.title-left-box {
				display: flex;
				justify-content: space-around;
				align-items: center;
				font-size: 32rpx;
				.tab {
					border-radius:50rpx;
					border: 1px solid #000;
					background-color: #000;
					color: #fff;
					padding: 10rpx 20rpx;
					margin-right: 20rpx;
					text-align: center;
					vertical-align: middle;
				}
			}
			.pay {
				color: orange;
			}
		}
		.list {
			display: flex;
			align-items: center;
			overflow-y: auto;
			justify-content: space-between;
			padding-bottom: 20rpx;
			border-bottom: 1px solid #ccc;
			margin-bottom: 20rpx;
			.list-left-goods {
				flex: 1;
				margin-right: 30rpx;
				.goods-box {
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					align-items: center;
					width: 150rpx;
					height: 150rpx;
					margin: 30rpx 0;
					image {
						width: 100rpx;
						height: 100rpx;
					}
					.title {
						font-size: 26rpx;
						text-overflow: ellipsis;
						white-space: nowrap
					}
				}
			}
			
		}
		
		.price {
			text-align: right;
			width: 120rpx;
		}
		.button-box {
			display: flex;
			justify-content: flex-end;
			.buttonList {
				margin-left: 30rpx;
				text-align: center;
				width: 160rpx;
				height: 40rpx;
				border-radius:50rpx;
				border: 1px solid #ccc;
				padding: 14rpx;
				font-size: 30rpx;
				color: #ccc;
				
			}
			.first-child {
				margin-right: 20rpx;
			}
			.active {
				background-color: orange;
				color: #fff;
			}
		}
	}
	
</style>


<script setup>
import * as order from '../../apis/order/order.js'
import {ref,reactive,computed,onMounted} from 'vue'
import {onShow,onReachBottom,onLoad} from '@dcloudio/uni-app';

const arr = reactive({
	orderList:[
		{
			id:1,
			tab:'堂食',
			store:'麦乐美餐厅',
			status:'',
			img: [],
			price:'',
			num:'',
			button1:[],
		},
	]
	
})



const orderStatusToButton = {
	"已完成": ["再来一单"],
	"已失效": ["再来一单"],
	"制作中": ["催单"],
	"支付中": ["催单"],
	"待支付": ["取消订单", "立即支付"],
}

let userId = ref('')

// 跳转到订单详情
function toOrder(orderList,id){
	const orderData = {
		orderNum:id,
		newStatus:orderList.status
	}
	uni.setStorageSync('order',orderData)
	uni.navigateTo({
				url: './orderNextDetail'
				})
}
// 获取到当前按钮点击的本条id
const orderNumber=ref('')
function orderNum11(orderList){
	orderNumber.value = orderList.id;
	uni.setStorageSync('orderNewId',orderNumber.value)
}

// 跳转到再来一单
function resNewOrder(v){
	if(v==='再来一单'){
		console.log(v)
		 let orderCancelId=uni.getStorageSync('orderNewId')// 获取当前本条再来一单的id
		uni.switchTab({
			url: '/pages/goods/goods'
		});
	}else if(v==='立即支付'){
		console.log(v)
		 let orderCancelId=uni.getStorageSync('orderNewId')// 获取当前本条再来一单的id
		uni.navigateTo({
			url:'../orderDetail/sucess/sucess'
		})
	}else if(v==='催单'){
		uni.showToast({
			title: '催单成功',
			//将值设置为 success 或者直接不用写icon这个参数
			icon: 'success',
			//显示持续时间为 2秒
			duration: 1000
		})
	}else if(v==='取消订单'){
		
		uni.showModal({
				title: '提示',
				content: '请问确认取消该条订单吗？',
				// 取消按钮的文字自定义
				cancelText: "取消",
				// 确认按钮的文字自定义
				confirmText: "确定",
				//删除字体的颜色
				confirmColor:'red',
				//取消字体的颜色
				cancelColor:'#000000',
				success: function(res) {
				if (res.confirm) {
				    // 执行确认后的操作
					
					
				} 
				else {
					// 执行取消后的操作
				}
			}
		})
		
	}
}


// 到本页面的时候显示
onShow(()=>{
	 let user=uni.getStorageSync('userId')
	  if(user){
	   console.log(user)
	   
	  }
	  userId.value = 1;
	  arr.orderList = [];
	order.getAllOrder(userId.value).then((res)=>{
		if(res?.data){
			res.data?.forEach((item) => {
				const img = [];
				const button1 = [];
				item?.orderDishDtos.forEach((v) => {
					img.push({
						src: v?.image,
						title: v?.goodsName
					});
				})
				arr.orderList.push({
					id:item?.orderNumber,
					tab:'堂食',
					store:'麦乐美餐厅',
					status:item?.orderStatus,
					img,
					price:item?.finalPrice,
					num:item?.countNumber,
					button1:item?.other
				})
			}) 
		}else {
			arr.orderList.push({
				id:"1",
				tab:'堂食',
				store:'麦乐美餐厅',
				status: "完成",
				img: [],
				price:22,
				num:2,
				button1:"再来一单"
			})
		}
	}).catch(() => {
		arr.orderList.push({
			id:"1",
			tab:'堂食',
			store:'麦乐美餐厅',
			status: "完成",
			img: [],
			price:22,
			num:2,
			button1:"再来一单"
		})
	})
	
})


	
</script>