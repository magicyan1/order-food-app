<template>
	<view class="container">
		<view class="address-items"  :class="sel == index ? 'bordercolor' : ''" v-for="(item,index) in addressAll" :key="item.id" @click="hhh(index, item)">
			<view class="left">
				<text class="recipients">收件人: {{item.nickname}}</text>
				<text >收货地址 ：{{item.address}}</text>
			</view>
			<text class='iconfont icon-wenbenbianji' @tap='enterDetail(item)'></text>
		</view>	
		<view class="bottom">
			
		</view>
	<view class="addAddress" @tap='addAddress'>
	+	新增地址
	</view>
	</view>
</template>

<script setup>
	import {onMounted,ref,watch} from 'vue'
	import http from '../../../utils/http.js'
	import store from '../../../store/index.js'
	import {
		onLoad,onShow
	} from "@dcloudio/uni-app";
	let addressAll=ref([])
	// watch(addressAll, (curr, old) => {
	//   uni.getStorage({
	//   	key:'address',
	//   	success:function(res){
	//   		console.log(res)
	//   		 addressAll.value=res.data
	//   	}
	//   })
	// })
	let whereaddress = ref("");
	let addAddressbtn = ref();
	let addresslist = ref({
	  //定义存储浏览器的数据类型
	  nickname: "",
	  address: "",
	  phoneNumber: "",
	});
	let sel = ref(0);
	let hhh = function (i, v) {
	  //点击列表的样式
	  sel.value = i;
	  //点击的该框数据存浏览器里
	  addresslist.value.nickname = v.nickname;
	  addresslist.value.address = v.address;
	  addresslist.value.phoneNumber = v.phoneNumber;
	  uni.setStorageSync("list1", addresslist.value);
	};
	let enterDetail=function(item){		
		uni.navigateTo({
			url: './addressItems?item='+encodeURIComponent(JSON.stringify(item)),
			animationType: 'pop-in',
			animationDuration: 200,
			
		});
	}
	let a = ref(["确定地址", "+	新增地址"]);
	let addAddress=function(){
		uni.navigateTo({
			url: './addressAdd',                  
			animationType: 'pop-in',
			animationDuration: 200,
			
		});
	}
	onMounted(()=>{
		uni.getStorage({
			key:'address',
			success:function(res){
				 addressAll.value=res.data
			}
		})
		      
	})
	onShow(()=>{
		uni.getStorage({
			key:'address',
			success:function(res){
				console.log(res)
				 addressAll.value=res.data
			}
		})
	})
	onLoad((v) => {
	  //获取订单详情页面传的参，赋值给whereaddress(判断字段)
	  whereaddress.value = v.whereaddress;
	  //来进行判断按钮的内容是什么
	  if (whereaddress.value == 1) {
	    addAddressbtn.value = a.value[0];
	  } else {
	    addAddressbtn.value = a.value[1];
	  }
	});
</script>

<style lang="less" scoped>
	@import url('../../../static/iconfont/font_0qivch445ot/iconfont.css');
	.bordercolor {
	  outline: 1px solid orange;
	}
 .container{
	 width:100vw;
	 heigth:100vh;
	 background-color: #f5f7f7;
	 
	.address-items{
		width: 88vw;
		height: 10vh;
		margin: 10rpx 3vw;
		background-color: #ffffff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 26rpx;
		padding: 10rpx 20rpx;
		font-weight: 900;
		.left{
			
			font-weight: 900;
			display: flex;
			flex-direction: column;
			.recipients{
				font-weight: 900;
			}
			:last-child{
				font-weight: 100;
			}
		}
	}
	.bottom{
		width: 100vw;
		height: 8vh;
	}
	.addAddress{
		border: 1rpx solid #f77214;
		background-color: #ffffff;
		border-radius:8%;
		color:#f77214;
		height: 8vh;
		margin-left: 5vw;
		margin-bottom: 10rpx;
		width: 90vw;
		text-align: center;
		line-height: 8vh;
		position:absolute;
		position: fixed;
		bottom:0;
	}
 }
</style>
