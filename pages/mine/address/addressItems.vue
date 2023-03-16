<template>
	<view class="container">
		<view class="content">
			<form class="content-son" @submit="sure"  action="">
				<view class="uni-form-item ">
					<view class="title">姓名</view>
					<input class="uni-input" v-model="addressForm.nickname" name="nickname" placeholder="请输入姓名" />
				</view>
				<view class="uni-form-item ">
					<view class="title">手机号</view>
					<input class="uni-input" name="phonenum" v-model="addressForm.phone" placeholder="请输入手机号" />
				</view>
				<view class="uni-form-item ">
					<view class="title">地址</view>
					<input class="uni-input" name="address" v-model="addressForm.address" placeholder="请输入地址" />
				</view>
				<view class="bottom">
					<button class="operation" form-type="submit" @tap="saveHandle" style="background-color: #f77214;">保存</button>
				</view>
			</form>
		</view>
		
	</view>

</template>

<script setup>
	import {
		getCurrentInstance,
		ref,
		reactive
		
	} from 'vue'
	import {
				onLoad,
				onShow
			} from "@dcloudio/uni-app";
	let addressForm=ref({})
	let addressCenter=ref({})
	let addressAll=[];
	const {
		proxy
	} = getCurrentInstance()

// let state=ref(1)
// 	let changeAddress = function() {
// 		proxy.$refs.popup.open('top')
// 	}
	onLoad((option)=>{	
		console.log(JSON.parse(decodeURIComponent(option.item)))
		addressForm.value=JSON.parse(decodeURIComponent(option.item))
		uni.getStorage({
			key:"address",
			success:function(res){
				addressAll=res.data
			}
		})
	})
	
	let sure=function(e){
		let x=e.detail.value
		console.log(x)
		uni.getStorage({
			key:"address",
			success:function(res){
				let y=res.data		
				y.splice(addressForm.value.id,1)
				y.unshift(x)
				console.log(y)
				uni.removeStorageSync('address')
				uni.setStorageSync('address',y)
},
})
}
</script>

<style lang="less" scoped>
	.container {
		display: flex;
		flex-direction: column;
		width: 750rpx;
		background-color: #f5f7f7;
		height: 100vh;
		justify-content: space-between;

		.content {

			.content-son {
				height: 650rpx;
				width: 100%;
				display: flex;
				flex-direction: column;
				.uni-form-item .title {
						padding: 20rpx 0;
					}
				label {
					width: 90%;
					height: 100rpx;
					line-height: 100rpx;
					font-weight: 100;
					font-size: 30rpx;
					padding: 15rpx 40rpx;
				}
				.uni-input{
					font-weight: 100;
				}
			}

		}




		.bottom {
			position: absolute;
			bottom: 0;
			display: flex;
			justify-content: space-around;
			width: 100vw;
			background-color: #fef8f3;

			.operation {
				border-radius: 10%;
				text-align: center;
				width: 90%;
				height: 6vh;
				line-height: 6vh;
				border: 1rpx solid  #f77214;
			}

		}
	}

	.mapDetail {
		height: 90%;
	}
</style>
