<template>
	<view class="container">
		<!-- 头像，手机昵称模块 -->
		<view class="mine-head" @click="noLogin">
			<view class="nick-phone">
				<image :src="userImage" class="via" />
				<text class="nickname">

					<text>{{minenickname}}</text>
					<text class="phone">{{phone}}</text>
					<text class="vip">{{member}}</text>
				</text>
			</view>
			<!-- 付款二维码 -->
			<text src="./images/用户会员码.jpg" mode="" class="iconfont icon-saoma pay" @tap="toPay">
			</text>
		</view>
		<view class="option">
			<view class="option-items" @tap='pushMessage'>
				<text class='option-items-left'>
					<text class="icon-xiaoxi iconfont"></text>
					<text>消息</text>
				</text>
				<text class="icon-saoma iconfont"></text>
			</view>
			<view class="option-items" @tap='address'>
				<text class='option-items-left'>
					<text class="icon-ditu_dingwei_o iconfont"></text>
					<text>地址管理</text>
				</text>
				<text class="icon-saoma iconfont"></text>
			</view>
			<view class="option-items" @tap='contact'>
				<text class='option-items-left'>
					<text class="icon-kefu iconfont"></text>
					<text>联系客服</text>
				</text>
				<text class="icon-saoma iconfont"></text>
			</view>
			<view class="option-items" @tap='userMessage'>
				<text class='option-items-left'>
					<text class="icon-yonghu-yuan iconfont"></text>
					<text>个人信息</text>
				</text>
				<text class="icon-saoma iconfont"></text>
			</view>

		</view>
	</view>
	<uni-popup ref="popup" type="success">
		<view class="attention">
			请先回首页登录哦！
		</view>

	</uni-popup>
</template>

<script setup>
	import http from '../../utils/http.js'
	import {
		onMounted,
		onBeforeMount,
		ref,
		computed,
		getCurrentInstance
	} from 'vue'
	// 跳转到会员码界面
	const defaultAvatarUrl =
		'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
	let minenickname = ref('')
	let phone = ref()
	let userImage = ref(defaultAvatarUrl)
	let member = ref('')
	let addressAll = [
		// 		id: 0,
		// 		nickname: "9523",
		// 		phone: "14675036681",
		// 		address: "云华路333号"
		// 	},
		// 	{
		// 		id: 1,
		// 		nickname: "9527",
		// 		phone: "17740845560",
		// 		address: "云华路333号"
		// 	},
		// 	{
		// 		id: 2,
		// 		nickname: "赵老三",
		// 		phone: "13541908232",
		// 		address: "云华路333号"
		// 	},
		// 	{
		// 		id: 3,
		// 		nickname: "赵赵赵",
		// 		phone: "13541903232",
		// 		address: "云华路333号"
		// 	},
		// 	{
		// 		id: 4,
		// 		nickname: "发发",
		// 		phone: "13521453144",
		// 		address: "云华路333号"
		// 	},
		// 	{
		// 		id: 5,
		// 		nickname: "手风琴",
		// 		phone: "13521453135",
		// 		address: "云华路333号"
		// 	},
		// 	{
		// 		id: 6,
		// 		nickname: "今晚月亮很美11",
		// 		phone: "13037745567",
		// 		address: "云华路333号"
		// 	},
		// 	{
		// 		id: 7,
		// 		nickname: "懦弱之举",
		// 		phone: "18181317244",
		// 		address: "云华路333号"
		// 	},
		// 	{
		// 		id: 8,
		// 		nickname: "你还会爱我吗",
		// 		phone: "13775896985",
		// 		address: "云华路333号"
		// 	},
		// 	{
		// 		id: 9,
		// 		nickname: "这是最后一次",
		// 		phone: "13711196985",
		// 		address: "云华路333号"
		// 	}
	]
	let addressItem = {
		nickname: '',
		phone: '',
		address: ''
	}
	let {
		proxy
	} = getCurrentInstance()
	const toPay = function() {
		uni.navigateTo({
			url: './qrcode',
			animationType: 'pop-in',
			animationDuration: 200
		});
	}

	const interTopup = function() {
		uni.navigateTo({
			url: './balance/topUp',
			animationType: 'pop-in',
			animationDuration: 200
		});
	}
	const pushMessage = function() {
		uni.navigateTo({
			url: './message',
			animationType: 'pop-in',
			animationDuration: 200
		});
	}
	const address = function() {
		uni.navigateTo({
			url: './address/address',
			animationType: 'pop-in',
			animationDuration: 200
		});
	}
	const contact = function() {
		uni.navigateTo({
			url: './service',
			animationType: 'pop-in',
			animationDuration: 200
		});
	}
	const userMessage = function() {
		uni.navigateTo({
			url: './profile',
			animationType: 'pop-in',
			animationDuration: 200
		});

	};
	const noLogin = function() {
		if (minenickname.value === '请登录') {
			proxy.$refs.popup.open('center')
		}
	}


	let url = ref('')
	let nickname = ref('')
	onMounted(() => {
		// uni.setStorageSync('address',addressAll)
		uni.getStorage({
			key: 'user',
			success: function(res) {
				member.value = res.data.membershipLevel
				minenickname.value = res.data.nickname
				phone.value = res.data.phoneNumber
			},
			fail: function() {
				minenickname.value = '请登录'
			}
		})
		uni.getStorage({
			key: 'userAvatar',
			success: function(res) {
				userImage.value = res.data
			}
		})

		http({
			url: '/membershipDetails/queryAll',
			method: 'GET'
		}).then((res) => {
			addressAll.length = res.data.list.length
			for (let i = 0; i < res.data.list.length; i++) {
				addressItem.id = res.data.list[i].i
				addressItem.nickname = res.data.list[i].nickname
				addressItem.phone = res.data.list[i].phoneNumber
				addressItem.address = res.data.list[i].address
				addressAll.splice(i, 1, JSON.parse(JSON.stringify(addressItem)))
			}
			// console.log(addressAll.value)
			uni.setStorageSync('address', addressAll)
		})
	})
	// phone.value =computed(()=>{
	// 	 return phone.value.substring(0, 3) + '****' + phone.value.substring(7);	 
	// })
	// uni.login({
	//   provider: 'weixin',
	//   success: function (loginRes) {
	//     // console.log(loginRes.authResult);
	//     // 获取用户信息
	//     uni.getUserInfo({
	//       provider: 'weixin',
	//       success: function (infoRes) {
	// 		url.value=infoRes.userInfo.avatarUrl
	// 		nickname.value=infoRes.userInfo.nickName
	// 		// console.log(nickname.value)
	//       }
	//     });
	//   }
	// });
	// uni.getUserProfile({
	// 		desc:"用于完善用户信息",  //必填，声明获取用户个人信息后的用途，不超过30个字符
	// 		success: (res) => {
	// 			console.log(res)
	// 			uni.showToast({
	// 				icon:"none",
	// 				title:'获取成功'
	// 			})
	// 		},
	// 		fail: (err) => {
	// 			console.log(err)
	// 			uni.showToast({
	// 				icon:"none",
	// 				title:'用户拒绝获取'
	// 			})
	// 		}  
	// 	})
</script>

<style lang="less" scoped>
	@import url('../../static/iconfont/font_0qivch445ot/iconfont.css');

	.container {
		width: 720rpx;
		padding: 15rpx;
		padding-top: 70rpx;
		height: 1625rpx;
		background-color: #ffffff;

		.mine-head {
			width: 100%;
			height: 10vh;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.nick-phone {
				display: flex;
				flex-wrap: wrap;
				width: 50vw;
				vertical-align: middle;

				.nickname {
					display: inline-block;
					font-size: 39rpx;
					font-weight: 900;
					margin-top: 20rpx;
					width: 30vw;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					flex-wrap: wrap;

					:first-child {
						display: inline-block;
						display: flex;
						line-height: 25rpx;
					}

					.vip {
						display: inline-block;
						position: absolute;
						right: 48vw;
						top: 9vh;
						color: #ffffff;
						background-color: #f77214;
						font-size: 20rpx;
						border: 1rpx solid;
					}

					.phone {
						text-align: center;
						font-size: 20rpx;
						font-weight: 900;
						line-height: 25rpx;
						// padding: 0 0 0 25rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						display: inline-block;
					}

				}
			}

			.via {
				width: 15vw;
				height: 15vw;
				border: 1rpx solid black;
				border-radius: 25vw;
				vertical-align: middle;

			}

			.pay {
				width: 5vw;
				height: 5vw;
				vertical-align: middle;
				margin-right: 40rpx;
				// margin: auto 20rpx;
			}
		}

		.balance {
			margin-top: 50rpx;
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			height: 18vh;

			.balance-items {
				width: 60%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				box-shadow: 11rpx 7rpx 13rpx 17rpx #ababab;

				.showMoney {
					font-weight: 900;
					font-size: 60rpx;
				}

				text {
					font-weight: 100;
					font-size: 30rpx;
				}
			}
		}

		.option {
			display: flex;
			flex-direction: column;
			width: 100vw;

			.option-items {
				width: 100vw;
				height: 12vh;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-weight: 900;
				font-size: 26rpx;
				font-weight: 500;

				.option-items-left {
					.iconfont {
						font-size: 38rpx;
						vertical-align: middle;
					}

					:first-child {
						margin-right: 15rpx;
					}
				}

				:last-child {
					margin-right: 8vw;
				}
			}
		}
	}

	.attention {
		color: #ffffff;
		font-size: 26rpx;
		width: 60vw;
		height: 20vh;
		background-color: #f76d28;
		margin: auto;
		line-height: 20vh;
		text-align: center;
		border: 1rpx solid #f77214;
		border-radius: 8%;
		box-shadow: 0rpx 7rpx 13rpx 11rpx #f5f5f5;
	}
</style>
