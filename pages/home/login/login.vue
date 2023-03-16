<template>
	<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
		<image class="avatar" :src="img"></image>
	</button>
	<form @submit="formSubmit">
		<view class="input">
			<view class="nickname">
				<text>昵称:</text><input class="uni-input" name="nickname" type="nickname" placeholder="这是一个输入框" />
			</view>
			<view class="nickname">
				<text>姓名:</text><input type="text" name="username" class="uni-input" placeholder="请输入真实姓名" />
			</view>
			<view class="nickname">
				<text>手机号:</text><input type="number" name="phone" class="uni-input" placeholder="请输入手机号" />
			</view>
			<button formType="submit" style="width: 530rpx;margin-top: 20rpx;" type="primary">确定</button>
		</view>
	</form>
</template>

<script setup lang="ts">
	import http from '../../../utils/http.js'
	import date from '../../../utils/date.js'
	import {
		updatUser,
		addUser,
		queryId
	} from "@/apis/home/login.js"
	import {
		ref
	} from 'vue';
	import {
		onLoad
	} from "@dcloudio/uni-app";
	const defaultAvatarUrl =
		'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
	let img = ref(defaultAvatarUrl)
	let address = ''
	const onChooseAvatar = (e) => {
		const {
			avatarUrl
		} = e.detail
		img.value = avatarUrl
	}
	const formSubmit = (e) => {
		let registrationTime = Date.now()
		let data = {
			integral: 0,
			membershipLevel: '白银会员',
			nickname: e.detail.value.nickname,
			phoneNumber: e.detail.value.phone,
			name: e.detail.value.username,
			registrationTime: registrationTime,
			address: address,
			numberTransactions: 0
		}
		//存储用户信息
		uni.setStorageSync('user', data);
		uni.setStorageSync('userAvatar', img.value);
		//添加用户
		queryId(e.detail.value.phone).then(res => {
			console.log(res, 111);
			if (!res.data) {
				addUser(data).then(res => {
					console.log('添加用户', res);
					queryId(e.detail.value.phone).then(res => {
						console.log('查询用户1', res)
						uni.setStorageSync('userId', res.data.id);
					})
				})
				console.log('添加用户');
				console.log('查询用户');
			} else {
				queryId(e.detail.value.phone).then(res => {
					console.log('查询用户2', res);
					uni.setStorageSync('userId', res.data.id);
					console.log('存储成功', res.data.id);
					updatUser(data).then(res => {
						console.log('修改成功', res);
						console.log(data, 111);
					})
				})
			}
		})

		uni.switchTab({
			url: '/pages/home/home'
		})
	}
	//上来获取地理位置
	onLoad((option) => {
		uni.authorize({
			scope: 'scope.userLocation',
			success() {
				uni.getLocation({
					type: 'wgs84',
					isHighAccuracy: true,
					success: (res) => {
						uni.request({
							url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${res.latitude},${res.longitude}&key=UMJBZ-2HYCR-CKYWY-W736Y-2EFZ3-BXFJM&get_poi=0`,
							success(res) {
								address = res.data.result.address
							},
							fail(err) {
								console.log(err);
							}
						})
					},
					fail(err) {
						console.log('fail', err);
					}
				})
			}
		})
	});
</script>

<style scoped lang="less">
	.avatar-wrapper {
		padding: 0;
		width: 172rpx !important;
		border-radius: 16rpx;
		margin-top: 80rpx;
		margin-bottom: 80rpx;
	}

	.avatar {
		display: block;
		width: 172rpx;
		height: 172rpx;
	}

	.input {
		width: 750rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.nickname {
		width: 600rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 20rpx 0;

		text {
			border: 1px solid #ccc;
			line-height: 80rpx;
			border-right: none;
			display: inline-block;
			text-align: center;
			width: 160rpx;
			border-radius: 10rpx 0 10rpx;
		}

		input {
			border: 1px solid #ccc;
			line-height: 80rpx;
			height: 80rpx;
			padding-left: 20rpx;
			border-radius: 0 10rpx 10rpx 0;
			font-size: 30rpx;
		}
	}
</style>
