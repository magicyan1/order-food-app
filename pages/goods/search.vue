<template>
	<view class="container">
		<scroll-view
		class="goodsPage"
		scroll-y="true"
		:enhanced="true"
		:show-scrollbar="false">
		<view class="computed">
			 <view class="page-section">
			    <view class="weui-cells weui-cells_after-title">
			      <view class="weui-cell weui-cell_input">
			        <input class="weui-input" 
					v-model="input"
					auto-focus placeholder="将会获取焦点"/>
			      </view>
			    </view>
			  </view>
			<text @click="render">搜索</text>
		</view>
			<view
				class="goods" 
				v-for="(v,index) in list2" 
				:key="name">
					<image :src="v.image"></image>
					<view class="goodsR">
						<text>{{v.goodsName}}</text>
						<view class="detail">
							{{v.goodsDetails}}
						</view>
						<view class="priceBox">
							<text>￥{{v.goodsPrice}}</text>
							<view class="specs" v-if="specs">
								选规格
							</view>
							<view class="bar-box-num" v-else>
								<!-- :class="v.goodsCount==0?'':'active'" -->
								<view  class="bar-box-num-cul"
								:data-id="v.goodsId"
								:data-price="v.goodsPrice"
								@click.stop="downNum">-</view>
								<!-- v-show="v.goodsCount==0?false:true" -->
								<view class="digit"
								>{{v.goodsCount}}</view>
								<view class="bar-box-num-add"
								:data-id="v.goodsId" 
								:data-price="v.goodsPrice"
								@click.stop="addNum">+</view>
							</view>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<!-- 按钮 -->
		<view class="order" @click="toOrderPage">
				返回菜单
		</view>
	</view>
</template>

<script setup lang="ts">
import {ref,onMounted} from "vue";
import http from '../../utils/http.js';
import {
  onLoad,
  onShow
 } from "@dcloudio/uni-app";
const input=ref('')
const priceAll=ref(0)
const goodsAll=ref(0)
const priceList=ref({
	priceAll:0,
	goodsAll:0
})
const list2=ref([]);
const specs=ref(false)

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
// 搜索渲染
let render=()=>{
	if(input.value.trim()==''){
	    list2.value=[];
	}else{
		goodsList.value.forEach((v)=>{
			v.goodsList.forEach((n)=>{
				if(n.goodsName.includes((input.value))){
					list2.value.push((n))
				}
			})
		})
	}
}

// 增加
let addNum=(e)=>{
	let id=e.currentTarget.dataset.id
	let price=e.currentTarget.dataset.price
		goodsList.value.forEach((v)=>{
			v.goodsList.forEach((n)=>{
				if(n.goodsId==id){
					n.goodsCount++;
					priceAll.value+=price
					goodsAll.value++;
					// list.value.forEach((v)=>{
					// 	if(v.goodsId=id){
							
					// 	}
					// })
					list.value.push(n)
					let list3=[...new Set(list.value)];
					// console.log(list3);
					let priceList={
						priceAll:priceAll.value,
						goodsAll:goodsAll.value
					}
					try{
						uni.setStorageSync('trolley',list3);
						uni.setStorageSync('priceList',priceList);
						uni.setStorageSync('goodsList',goodsList.value);
					}catch(e){
						console.log(e);
					}
				}
			})
		})
}
// 减少
let downNum=(e)=>{
	console.log(e.currentTarget.dataset.id)
	let id=e.currentTarget.dataset.id
	let price=e.currentTarget.dataset.price
	goodsList.value.forEach((v)=>{
		v.goodsList.forEach((n)=>{
			if(n.goodsId==id){
				if(n.goodsCount>0){
					n.goodsCount--;
					priceAll.value-=price
					goodsAll.value--;
					list.value.push(n)
					let list3=[...new Set(list.value)];
					console.log(list3);
					if(n.goodsCount==0){
						list3.splice(list3.indexOf(n),1)
					}
					let priceList={
						priceAll:priceAll.value,
						goodsAll:goodsAll.value
					}
					uni.setStorageSync('trolley',list3);
					uni.setStorageSync('priceList',priceList);
					uni.setStorageSync('goodsList',goodsList.value);
				}else{
					console.log('不能再减了')
				}
			}
		})
	})
}


// 返回商品页面
let toOrderPage=()=>{
	uni.navigateBack({
		delta:1
	})
}

</script>

<style scoped lang="less">
@import url('@/static/iconfont/font_0qivch445ot/iconfont.css');
.container{
	width: 100%;
	height: 1200rpx;
	background: #fff;
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
	justify-content: space-evenly;
	align-items: center;
	font-size: 28rpx;
	border-radius: 10rpx;
	color: #8a8a8a;
	.page-section{
		width: 556rpx;
		height: 52rpx;
		padding-left: 20rpx;
		background-color: #f8f8f8;
		border-radius: 50rpx;
	}
}
.goods{
		width: 670rpx;
		height: 186rpx;
		display: flex;
		margin-top: 26rpx;
		
	}
	.goods image{
		width: 226rpx;
		height: 170rpx;
		margin-right: 16rpx;
	}
	.goodsR{
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.goodsR text{
		font-size: 28rpx;
	}
	.detail{
		font-size: 24rpx;
		color: #757575;
	}
	.priceBox{
		width: 100%;
		height: 96rpx;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		
	}
	.priceBox text{
		font-size: 30rpx;
	}
	.specs{
		width: 110rpx;
		height: 40rpx;
		background: #e60000;
		color: #ffffff;
		font-size: 24rpx;
		text-align: center;
		line-height: 40rpx;
		border-radius: 10rpx;
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

.order{
	width: 602rpx;
	height: 64rpx;
	position: absolute;
	bottom: 24rpx;
	left: 74rpx;
	border-radius: 50rpx;
	background-color: #e60000;
	text-align: center;
	line-height: 64rpx;
	font-size: 28rpx;
	color: #ffffff;
}

</style>
