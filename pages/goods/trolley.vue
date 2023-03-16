<template>
	<view class="container">
		<scroll-view
		class="goodsPage"
		scroll-y="true"
		:enhanced="true"
		:show-scrollbar="false">
		<view class="computed">
			<text>共计{{goodsAll}}道菜，总价￥{{priceAll}}</text>
			<text @click="clear">清除</text>
		</view>
		<view class="tip">
			<text>会员专享</text>
		</view>
			<view class="goodsBox"
			v-for="(item,index) in list"
			:key="name">
				<view class="goods">
					<image :src="item.image"></image>
					<view class="detail">
						<text>{{item.goodsName}}</text>
						<text>{{item.goodsDetails}}</text>
						<text>￥{{item.goodsPrice}}</text>
					</view>
				</view>
				<view class="bar-box-num">
					<view class="bar-box-num-cul"
					:data-id="item.goodsId"
					:data-price="item.goodsPrice"
					@click="downNum">-</view>
					<view class="digit">{{item.goodsCount}}</view>
					<view class="bar-box-num-add"
					:data-id="item.goodsId"
					:data-price="item.goodsPrice"
					@click="addNum">+</view>
				</view>
			</view>
		</scroll-view>
		
		<!-- 按钮 -->
		<view class="btnBox">
			<view class="return" @click="toGoodsPage">
				继续点单
			</view>
			<view class="order" @click="toOrderPage">
				立即下单
			</view>
		</view>
		<!-- 最底部 -->
		<view class="bottom"></view>
	</view>
</template>

<script setup lang="ts">
import {ref,onMounted} from "vue";
import http from '../../utils/http.js';
import {
  onLoad,
  onShow
 } from "@dcloudio/uni-app";
const priceAll=ref(0)
const goodsAll=ref(0)
const priceList=ref({
	priceAll:0,
	goodsAll:0
})
const list2=ref([]);
const diningMethod=ref('')


	// 渲染
const list=ref([])
// 所有数据
const goodsList=ref([]);

	// 发送请求和接受请求
onShow(()=>{
	try{
		let value=uni.getStorageSync('trolley')
		let value2=uni.getStorageSync('priceList')
		if(value2){
			priceList.value=value2
		}
		priceAll.value=priceList.value.priceAll;
		goodsAll.value=priceList.value.goodsAll;
		if(value){
			list.value=value;
		}
		let value3=uni.getStorageSync('goodsList')
		if(value3){
			goodsList.value=value3
		}
	}catch(e){
		console.log(e);
	}
})
// let render=()=>{
// 	console.log(1);
// 	http({
// 		url:`/Goods/Goods/Type`,
// 		method:'get'
// 	}).then((res)=>{
// 		console.log(res);
// 		list.value=res.data
// 		console.log(list.value);
// 	})
// }
// 清除所有
let clear=()=>{
	list.value=[]
	list2.value=[];
	uni.setStorageSync('trolley',list.value);
	let priceList={
		priceAll:0,
		goodsAll:0
	}
	priceAll.value=priceList.priceAll;
	goodsAll.value=priceList.goodsAll;
	uni.setStorageSync('priceList',priceList);
	getGoodsData();
	uni.setStorageSync('goodsList',goodsList.value);
	goodsList.value.forEach((v)=>{
		v.goodsList.forEach((n)=>{
			n.goodsCount=0;
			uni.setStorageSync('goodsList',goodsList.value);
		})
	})
}
// 得到所有商品

let getGoodsData=()=>{
	console.log(1);
	http({
		url:`/Goods/GoodsType/Type`,
		method:'get'
	}).then((res)=>{
		goodsList.value=res.data
	})
}
// getGoodsData();
// 增加
let addNum=(e)=>{
	let id=e.currentTarget.dataset.id
	let price=e.currentTarget.dataset.price
		list.value.forEach((n)=>{
			if(n.goodsId==id){
				n.goodsCount++;
				priceAll.value+=price
				goodsAll.value++;
				list.value.push(n)
				let list3=[...new Set(list.value)];
				list.value=list3;
				let priceList={
					priceAll:priceAll.value,
					goodsAll:goodsAll.value
				}
				try{
					uni.setStorageSync('trolley',list3);
					uni.setStorageSync('priceList',priceList);
				}catch(e){
					console.log(e);
				}
			}
		})
		goodsList.value.forEach((v)=>{
			v.goodsList.forEach((n)=>{
				if(n.goodsId==id){
					n.goodsCount++;
					uni.setStorageSync('goodsList',goodsList.value);
				}
			})
		})
}
// 减少
let downNum=(e)=>{
	console.log(e.currentTarget.dataset.id)
	let id=e.currentTarget.dataset.id
	let price=e.currentTarget.dataset.price
			list.value.forEach((n)=>{
				if(n.goodsId==id){
					if(n.goodsCount>0){
						n.goodsCount--;
						priceAll.value-=price
						goodsAll.value--;
						list.value.push(n)
						let list3=[...new Set(list.value)];
						if(n.goodsCount==0){
							list3.splice(list3.indexOf(n),1)
						}
						list.value=list3
						let priceList={
							priceAll:priceAll.value,
							goodsAll:goodsAll.value,
						}
						uni.setStorageSync('trolley',list3);
						uni.setStorageSync('priceList',priceList);
					}else{
						console.log('不能再减了')
					}
				}
			});
			goodsList.value.forEach((v)=>{
				v.goodsList.forEach((n)=>{
					if(n.goodsId==id){
						n.goodsCount--;
						// let list4=[...new Set(goodsList.value)];
						uni.setStorageSync('goodsList',goodsList.value);
					}
				})
			})
}

// 去结算页面
let toGoodsPage=()=>{
	uni.navigateBack({
		delta:1
	})
}
//获取点餐方式
onMounted(()=>{	
	diningMethod.value=uni.getStorageSync('method')
})
// 去下单页面
let toOrderPage=()=>{
	// 顾客订单信息
	const orderList=ref({
		"diningMethod": "",
		"orderDisheDto2s": [
			{
				"flavor": "",
				"goodsId": 0,
				"number": "",
				"totalPrice": ""
			}
		],
		"orderTime": "",
		"userId": 0
	})
	const orderDisheDto2s=ref([])
	// 订单状态
	let res=list.value.map((n)=>{
		return {
			"flavor": "",
			"goodsId": n.goodsId,
			"number": `${n.goodsCount}`,
			"totalPrice": `${n.goodsCount*n.goodsPrice}`
		}
		// orderDisheDto2s.value=[...new Set(orderDisheDto2s.value)]
	})
	orderDisheDto2s.value=res;
	console.log(orderDisheDto2s.value);
	// 当前时间,订餐方式
	let time=Date.now()
	// 订单状态
	orderList.value={
		"diningMethod": diningMethod.value,
		"orderDisheDto2s": orderDisheDto2s.value,
		"orderTime": `${time}`,
		"userId": 1
	}
	console.log(orderList.value)
	
		
	// 发送请求
	http({
		url:`/oder/customer/customer/add`,
		method:'post',
		data:orderList.value
	}).then((res)=>{
		let orderNumberlist=ref({  
			orderNumber:"",
			finalPrice:"",  
		})
		orderNumberlist.value.orderNumber=res.data.orderNumber
		orderNumberlist.value.finalPrice=res.data.finalPrice
		uni.setStorageSync('list2',orderNumberlist.value);
		if(diningMethod.value=='外卖'){
			uni.navigateTo({
				url:'../orderDetail/orderDetail'
			})
		}else{
			uni.navigateTo({
				url:'../orderDetail/dineorder/dineorder'
			})
		}
		
	})
	
}

</script>

<style scoped lang="less">
.container{
	width: 100%;
	height: 1200rpx;
	background: #f8f8f8;
	position: relative;
}
.goodsPage{
	width: 100%;
	height: 1100rpx;
	display: flex;
	flex-direction: column;
	padding-left: 30rpx;
}
.computed{
	width: 690rpx;
	height: 90rpx;
	background-color: #ffffff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 28rpx;
	border-radius: 10rpx;
}
.computed text:nth-child(1){
	margin-left: 30rpx;
}
.computed text:nth-child(2){
	margin-right: 30rpx;
	color: #e23939;
}
.tip{
	width: 690rpx;
	height: 56rpx;
	background-color: #ffffff;
	margin-top: 22rpx;
	margin-bottom: 4rpx;
	border-radius: 10rpx 10rpx 0 0;
	line-height: 56rpx;
	font-size: 28rpx;
}
.tip text{
	margin-left: 30rpx;
}

.goodsBox{
	width: 690rpx;
	height: 140rpx;
	background-color: #ffffff;
	border-radius: 0 0 10rpx 10rpx;
	display: flex;
	justify-content: space-between;
	margin-bottom: 14rpx;
}
.goods{
	flex: 1;
	height: 100%;
	display: flex;
	align-items: center;
	margin-left: 30rpx;
}
.goods image{
	width: 88rpx;
	height: 60rpx;
}
.detail{
	flex: 1;
	height: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	margin-left: 20rpx;
}
.detail text:nth-child(1){
	font-size: 28rpx;
}
.detail text:nth-child(2){
	font-size: 22rpx;
}
.detail text:nth-child(3){
	font-size: 26rpx;
	color: #e23939;
	margin-top: 20rpx;
}
.change{
		width: 160rpx;
		height: 100%;
		display: flex;
		justify-content:flex-end;
		align-items: center;
		vertical-align: middle;
		margin-right: 30rpx;
	}
	.change image{
		width: 50rpx;
		height: 50rpx;
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
		 .active{
			 color: #333;
			 border: 1px solid #333;
		 }
	    }
	.digit{
		font-size: 24rpx;
		// margin-right: 20rpx;
	}

// 按钮
.btnBox{
	width: 690rpx;
	height: 76rpx;
	position: absolute;
	bottom: 24rpx;
	left: 30rpx;
	display: flex;
	justify-content: space-between;
}
.return{
	width: 312rpx;
	height: 72rpx;
	border: 2px solid #8b8b8b;
	border-radius: 50rpx;
	background-color: #ffffff;
	text-align: center;
	line-height: 72rpx;
	font-size: 28rpx;
}
.order{
	width: 316rpx;
	height: 76rpx;
	border-radius: 50rpx;
	background-color: #e23939;
	text-align: center;
	line-height: 76rpx;
	font-size: 28rpx;
	color: #ffffff;
}

// 最底部
.bottom{
	width: 266rpx;
	height: 6rpx;
	background-color: #313131;
	border-radius: 10rpx;
	position: absolute;
	bottom: 10rpx;
	left: 242rpx;
}
</style>
