<template>
	<!-- 个人信息 -->
	<view class="container">
		<label for="" class="head-image">头像<text class='input'></text>
			<image :src="userImage" />
		</label>
		<label for="">昵称 <text class='input'>{{userInformation.nickname}}</text></label>
		<label for="">用户名 <text class='input'>{{userInformation.name}}</text></label>
		<label for="">手机号码<text class='input'>{{userInformation.phone}}</text></label>
		<label for="" class="">
			<view class="sexItem">
				会员等级 <text class='input'>{{userInformation.vip}}</text>
			</view>
		</label>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		getCurrentInstance,
		computed
	} from 'vue';
	let minenickname=ref('')
	let phone = ref()
	let userImage = ('')
	let member=ref('')
	let user=ref('')
	let userInformation=ref({
		name:'',
		nickname:'',
		phone:'',
		vip:'',
		
	})

	// onMounted(()=>{

	// 	console.log(2,proxy.$refs.popup)
	// })
	onMounted(() => {
		uni.getStorage({
			key: 'user',
			success: function(res) {
				userInformation.value.name = res.data.name
				userInformation.value.nickname = res.data.nickname
				userInformation.value.phone = res.data.phoneNumber	
				userInformation.value.vip = res.data.membershipLevel
				console.log(userInformation.value.vip )
				console.log(res.data.membershipLevel)
			}
		})
		uni.getStorage({
			key: 'userAvatar',
			success: function(res) {
				userImage.value = res.data
			}
		})

	})
</script>

<style lang="less" scoped>
	@import url('../../static/iconfont/font_0qivch445ot/iconfont.css');

	.container {
		display: flex;
		flex-direction: column;
		width: 750rpx;

		.head-image {}

		label {
			width: 90%;
			height: 100rpx;
			line-height: 100rpx;
			font-weight: 100;
			font-size: 30rpx;
			padding: 15rpx 40rpx;

			.input {
				font-weight: 500;
				margin: 45rpx;
			}

		}

		image {
			vertical-align: middle;
			border-radius: 50%;
			width: 70rpx;
			height: 70rpx;
			float: right;

		}

		.sex {
			width: 100%;
			background-color: #ffffff;
			height: 8vh;
			text-align: center;
			line-height: 8vh;
		}
	}
</style>
