<template>
	<!-- 会员码界面 -->
	<view class="container">
		<view class="container-item">
		<image src="./images/user-page.jpg" mode="" style="width: 90%;height: 70vh;"></image>
		<span>积分：<span class='money'>{{money}}</span></span>
		</view>
		
	</view>
</template>

<script setup>
import {onMounted,ref} from 'vue'
let money=ref()
	onMounted(()=>{
		uni.getStorage({
			key: 'user',
			success: function(res) {
			money.value=res.data.numberTransactions
			}})
	})
</script>

<style lang="less" scoped>
	
	.container{
		width: 100vw;
		height: 100vh;
		padding: 5vw;
		background-color:#f5f7f7 ;
		.container-item{
			width: 90vw;
			height: 66vh;
			background-color:#ffffff ;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		
			:last-child{
				padding-top:5vh
			}
		}
	}
</style>
