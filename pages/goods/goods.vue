<template>
	<view class="search">
		<view class="searchBox" @click="search">
			<text class="iconfont icon-sousuo"></text>
		</view>
	</view>
	<!-- 地址栏 -->
	<view class="addressBar">
		<text>麦美乐双流区餐厅</text>
		<text>成都市双流区西航港新街景茂雍水岸宽景路73号</text>
	</view>
	<!-- 商品内容 -->
	<view class="goodsBox">
		<!-- 左侧种类导航 -->
		<scroll-view class="ategoryNav" scroll-y="true" >
			<view 
			class="ategoryBox"
			v-for="(item,index) in list"
			:key="name"
			:data-i="item.typeTno"
			@click="ategoryChange"
			:class="navActive==item.typeTno ? 'on1' : ''"
			>
				<view class="verticalBar"
				:class="navActive==item.typeTno ? 'on2' : ''"></view>
				<view class="ategory">
					<image :src="item.image"></image>
					<text>{{item.typeName}}</text>
				</view>
				<view class="count" v-show="count==0?false:true">0</view>
			</view>
		</scroll-view>
		<!-- 右侧食品内容 -->
		<scroll-view 
		class="goodsPage" 
		:scroll-y="true"
		:scroll-into-view="navActive"
		:scroll-with-animation="true"
		:enhanced="true"
		:show-scrollbar="false"
		@scorll="onScorll"
		>
		<view>
			<swiper
			:indicator-dots="true" 
			indicator-color="rgba(255, 255, 255, .3)"
			indicator-active-color="rgba(255, 255, 255)"
			:autoplay="true" 
			:interval="3000" 
			:duration="1000"
			:circular="true">
				<swiper-item>
					<image src="../../static/goodsImage/1.png"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/goodsImage/2.png"></image>
				</swiper-item>
			</swiper>
			<view
			class="ategoryPage" 
			v-for="(item,index) in list"
			:key="name"
			:id="item.typeTno">
				<view class="tip">
					<image :src="item.image"></image>
					<text>{{item.typeName}}</text>
				</view>
				<view 
					class="goods" 
					v-for="(v,index) in item.goodsList" 
					:key="name"
					:data-name="v.goodsName"
					:data-id="v.goodsId"
					@click="goodsDetail">
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
			</view>
		</view>
		</scroll-view>
		<view class="trolley" v-if="goodsAll==0?false:true">
			<view class="number">
				<view class="numIcon">
					<image src="../../static/logo.png"></image>
					<view class="numComoputed">{{goodsAll}}</view>
				</view>
				<text>￥{{priceAll}}</text>
			</view>
			<view class="billing" @click="billing">去结算</view>
		</view>
	</view>
</template>
<script setup lang="ts">
import {ref,onMounted} from "vue";
import http from '../../utils/http.js';
// import iconfont from '@/static/iconfont/font_0qivch445ot/iconfont.js'
import {
  onLoad,
  onShow
 } from "@dcloudio/uni-app";

let list2=ref([])

// import {onLoad} 
const specs=false;
const price=ref(11);
let navActive=ref('a1');//导航栏name
let contentActive=ref('超值套餐');//内容栏name
const heightArr=ref([]);
const winHeight=ref(0);
const containerH=ref(0);
const count=ref(0)
const priceAll=ref(0)
const goodsAll=ref(0)
const priceList=ref({
	priceAll:0,
	goodsAll:0
})
const list=ref([]);
let ategoryChange=(e)=>{
	navActive.value=e.currentTarget.dataset.i;
	console.log(navActive.value)
}
// 获取窗口可用高度
const statusBarHeight=ref(0)
onShow(()=>{
	uni.getSystemInfo({
		success:res=>{
			winHeight.value=res.windowHeight;
			let custom = uni.getMenuButtonBoundingClientRect();
			statusBarHeight.value = custom.bottom + custom.top - res.statusBarHeight;
			console.log(statusBarHeight.value);
		}
	});
	let value3=uni.getStorageSync('goodsList');
	if(value3){
		list.value=value3;
	}
	try{
		let value=uni.getStorageSync('trolley')
		if(value){
			list2.value=value
		}
	}catch(e){
		console.log(e);
	}
	let value2=uni.getStorageSync('priceList')
	if(value2){
		priceList.value=value2
	}
	priceAll.value=priceList.value.priceAll;
	goodsAll.value=priceList.value.goodsAll;
	setHeightArr();
})

let setHeightArr=()=>{
	let query=uni.createSelectorQuery();
	let heightArr2=[];
	let s=ref(0);
	query.selectAll('.ategoryPage').boundingClientRect();
	query.exec(function(res){
		res.forEach((res)=>{
			res.forEach((v)=>{
				s.value += v.height;
				heightArr2.push(s)
			})
		})
	})
	heightArr.value=[...heightArr2];
	query.selectAll('.goodsPage').boundingClientRect(
		function(res){
			containerH.value= res[0].height;
		}
	).exec();
}
let onScorll=(e)=>{
	console.log(1)
	let scorllTop=e.detail.scrollTop;
	scorllTop+=10;
	let scorllArr=[...heightArr.value];
	if(scorllTop>=scorllArr[scorllArr.length - 1]-containerH.value){
		return
	}else{
		for(let i=0;i<scorllArr.length;i++){
			if(scorllTop>=0 && scorllTop <scorllArr[0]){
				navActive.value='a0';
			}else if(scorllTop>=scorllArr[i-1] && scorllTop<scorllArr[i]){
				navActive.value=list[i].i;
			}
		}
	}
}

// 去结算页面
let billing=()=>{
	uni.navigateTo({
		url:'/pages/goods/trolley'
	})
}
// 去详情页面
let goodsDetail=(e)=>{
	let name=e.currentTarget.dataset.name;
	let id=e.currentTarget.dataset.id;
	uni.navigateTo({
		url:`/pages/goodsDetail/goodsDetail?id=${id}&&name=${name}`
	})
}
// 去搜索页面
let search=()=>{
	uni.navigateTo({
		url:`/pages/goods/search`
	})
}
// 发送请求和接受请求
let getGoodsData=()=>{
	console.log(1);
	http({
		url:`/Goods/GoodsType/Type`,
		method:'get'
	}).then((res)=>{
		let value=uni.getStorageSync('goodsList')
		if(value){
			list.value=value
		}else{
			list.value=res.data
			uni.setStorageSync('goodsList',list.value);
		}
	})
}
getGoodsData();
// 增加

const goodsNum=ref(
	{
		"cartId": 0,
		"goodsCount": 0,
		"goodsId": 0,
		"goodsQuantity": "",
		"goodsTaste": "",
		"userId": 1
	}
)

let addNum=(e)=>{
	let id=e.currentTarget.dataset.id
	let price=e.currentTarget.dataset.price
	list.value.forEach((v)=>{
		v.goodsList.forEach((n)=>{
			if(n.goodsId==id){
				n.goodsCount++;
				priceAll.value+=price
				goodsAll.value++;
				list2.value.push(n)
				let list3=[...new Set(list2.value)];
				let priceList={
					priceAll:priceAll.value,
					goodsAll:goodsAll.value
				}
				try{
					uni.setStorageSync('trolley',list3);
					uni.setStorageSync('priceList',priceList);
					uni.setStorageSync('goodsList',list.value);
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
		list.value.forEach((v)=>{
			v.goodsList.forEach((n)=>{
				if(n.goodsId==id){
					if(n.goodsCount>0){
						n.goodsCount--;
						priceAll.value-=price
						goodsAll.value--;
						list2.value.push(n)
						let list3=[...new Set(list2.value)];
						if(n.goodsCount==0){
							list3.splice(list3.indexOf(n),1)
						}
						let priceList={
							priceAll:priceAll.value,
							goodsAll:goodsAll.value
						}
						uni.setStorageSync('trolley',list3);
						uni.setStorageSync('priceList',priceList);
						uni.setStorageSync('goodsList',list.value);
					}else{
						console.log('不能再减了')
					}
				}
			})
		})
}
</script>

<style lang="less" scoped>
	@import url('@/static/iconfont/font_0qivch445ot/iconfont.css');
	page{
		height: 100%;
	}
	// 搜索
	.search{
		height: v-bind("statusBarHeight*2+'rpx'");
		width: 200rpx;
		display: flex;
		align-items: center;
	}
	.searchBox{
		height: 50rpx;
		width: 122rpx;
		background: #cfcfcf;
		border-radius: 50rpx;
		margin-left: 30rpx;
		margin-top: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.icon-sousuo{
			color: #fff;
		}
	}
	// 地址栏
	.addressBar{
		width: 100%;
		height: 92rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		border-bottom: 1px solid #e7e7e7;
		padding-left: 30rpx;
		position: absolute;
		top: 100rpx;
		left: 0px;
	}
	.addressBar text:nth-child(1){
		font-size: 32rpx;
		font-weight: 700;
	}
	.addressBar text:nth-child(2){
		font-size: 22rpx;
		color: #9b9b9b;
	}
	// 左侧种类导航
	.goodsBox{
		display: flex;
		margin-top: 80rpx
		// position: relative;
	}
	.goodsBox .ategoryNav{
		width: 130rpx;
		height: 1036rpx;
		background: #f6f6f6;
	}
	.ategoryNav .on1{
		background: #ffffff;
	}
	.ategoryBox{
		height: 122rpx;
		display: flex;
		position: relative;
	}
	.verticalBar{
		width: 8rpx;
		height: 100%;
		border-radius: 0 20rpx 20rpx 0;
	}
	.ategoryBox .on2{
		background: red;
	}
	
	.ategory{
		flex: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.ategory image{
		width: 24rpx;
		height: 24rpx;
		margin-bottom: 8rpx;
	}
	.ategory text{
		font-size: 22rpx;
		color: #9b9b9b;
		margin-top: 8rpx;
	}
	.count{
		width: 34rpx;
		height: 34rpx;
		background: #e23939;
		font-size: 16rpx;
		color: #ffffff;
		position: absolute;
		top: 4px;
		right: 0px;
		border-radius: 50%;
		overflow: hidden;
		text-align: center;
		line-height: 34rpx;
	}
	// 右侧食品内容
	.goodsPage{
		flex: 1;
		height: 1036rpx;
		display: flex;
		flex-direction: column;
		// justify-content: center;
		// align-items: center;
		padding: 0 20rpx;
	}
	.goodsPage swiper{
		width: 586rpx;
		height: 206rpx;
		border-radius: 20rpx;
		margin-bottom: 26rpx;
	}
	swiper swiper-item{
		width: 586rpx;
		height: 206rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}
	swiper image{
		width: 586rpx;
		height: 206rpx;
	}
	.ategoryPage{
		width: 100%;
		margin-top: 30rpx;
	}
	.tip{
		height: 26rpx;
		font-size: 26rpx;
		color: #757575;
		display: flex;
		align-items: center;
		vertical-align: middle;
	}
	.tip image{
		width: 26rpx;
		height: 26rpx;
		margin-right: 16rpx;
	}
	.goods{
		width: 100%;
		height: 170rpx;
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
	.change{
		width: 200rpx;
		height: 45rpx;
		display: flex;
		justify-content:flex-end;
		vertical-align: middle;
		
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
	// 购物车
	.trolley{
		width: 706rpx;
		height: 88rpx;
		font-size: 30rpx;
		color: #ffffff;
		display: flex;
		position: absolute;
		bottom: 20rpx;
		left: 24rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}
	.number{
		width: 504rpx;
		height: 100%;
		background-color: #000000;
		display: flex;
		align-items: center;
	}
	.numIcon{
		width: 132rpx;
		height: 100%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 10rpx;
	}
	.numIcon image{
		width: 50rpx;
		height: 50rpx;
	}
	.numComoputed{
		width: 34rpx;
		height: 34rpx;
		background: #ffffff;
		font-size: 16rpx;
		color: #000000;
		position: absolute;
		top: 4px;
		right: 0px;
		border-radius: 50%;
		overflow: hidden;
		text-align: center;
		line-height: 34rpx;
	}
	.billing{
		flex: 1;
		background-color: #e60000;
		text-align: center;
		line-height: 88rpx;
	}
</style>
