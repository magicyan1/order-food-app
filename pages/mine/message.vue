<template>
	<!-- 消息列表 -->
	<view class="container">
		<view class="message-items" @tap="deleteMessage(item.id)" v-for="item in article" :key="item.id">
			<view class="items-top">
				<text class="content">{{item.content}}</text>
				<text class="time">{{date(item.time)}}</text>				
			</view>			
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="text" message="是否删除" :duration="2000" :before-close="true" @close="close"
				@confirm="confirm">
				<text>真的要删除吗</text>
				</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		getCurrentInstance
	} from 'vue'
	import http from '../../utils/http.js'
	import date from '../../utils/date.js'
	let {
		proxy
	} = getCurrentInstance()
	let state=ref(-1)
	
	let close=function(){
		proxy.$refs.popup.close()
	}
	let article = ref([])
	let confirm = function(value) {
        state.value=value
		close();
	
	}
	let deleteMessage = function(event) {	
		proxy.$refs.popup.open()	
		console.log(event)
		if (state.value) {
			console.log('发送请求')
			http({
				url: `/msg/deleteMsg`,
				method: 'delete',
				data:{
					id:event
				},
				
			}).then((res,rej) => {
				console.log(event)
				console.log(res)
				console.log(article.value)
				http({
					url: '/msg/All',
					method: 'get'
				}).then((res) => {
					console.log(res)
					article.value=0
					article.value = res.data
					console.log(res.data)
					console.log(article.value)
					
				})
			})
		}
	}
	onMounted(() => {
		http({
			url: '/msg/All',
			method: 'GET'
		}).then((res) => {
			article.value = res.data
		})
	})
</script>

<style lang="less" scoped>
	.container {
		width: 100vh;
		height: 100vw;

		.message-items {
			height: 15vh;
			width: 94vw;
			border-bottom: 1rpx #fbfbfb solid;
			font-size: 24rpx;
			padding: 10rpx 20rpx;

			.items-top {
				width: 100%;
				height: 8vh;
				display: flex;
				justify-content: space-between;


				.item {
					font-size: 24rpx;
					border: 1px solid black;
					max-width: 20rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-bottom: 20px;
				}

				.time {
					font-size: 24rpx;
				}
			}
		}
	}
</style>
