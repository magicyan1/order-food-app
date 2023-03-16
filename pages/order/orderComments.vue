<template>
	<!-- 评价-->
	<view class="order-comments-title">提交好评或建议，帮助骑手和商家做的更好</view>
	<view class="order-comments">
		
		<view class="comments-contain">
			<view class="store">
				<image src='../../static/tabbarImage/bg.png'></image>
				<view>麦乐美餐厅</view>
			</view>
			<view class="comments-score">
				<view>商家服务：</view><uni-rate v-model="rateValue1" @change="onChange1" />
			</view>
			<view class="comments-score">
				<view>菜品味道：</view><uni-rate v-model="rateValue2" @change="onChange2" />
			</view>
			<view class="comments-score">
				<view>商品包装：</view><uni-rate v-model="rateValue3" @change="onChange3" />
			</view>
			<!-- 输入评论内容 -->
			<view>
				<view class="uni-textarea">
					<textarea 
						v-model="txt"
						placeholder="请输入评价内容"
						maxlength=50
						class="text-box"
					/>
				</view>
			</view>
			<!-- 上传图片 -->
			<view class="example-body">
				<uni-file-picker limit="9" title="最多选择9张图片"></uni-file-picker>
			</view>
			<!-- 是否匿名 -->
			<view class="radio-box">
				<label class="radio"><radio value="0" :checked="value11===0" @tap="radio(0)"/>匿名</label>
				<label class="radio"><radio value="1" :checked="value11===1" @tap="radio(1)" />不匿名</label>
			</view>
			<!-- 推荐商品 -->
			<view>
				<view>推荐商品</view>
				<view class="goods">
					<view>香辣鸡翅</view>
					<view>
						<view>推荐</view>
						<view>不推荐</view>
					</view>
					</view>
				</view>
			</view>
			<!-- 配送服务 -->
			<view class="comments-score">
				<view>配送服务：</view><uni-rate v-model="rateValue" @change="onChange" />
			</view>
			<view class="uni-textarea-rider">
				<textarea 
					v-model="txt"
					placeholder="请输入评价内容"
					maxlength=50
					class="text-box"
				/>
			</view>
		
	</view>
</template>

<script setup>
	import * as order from '../../apis/order/order.js'
	import {ref,reactive,computed,onMounted} from 'vue'
	import {onShow,onReachBottom,onLoad} from '@dcloudio/uni-app';
	let rateValue = reactive({
		rateValue1: 0,
		rateValue2: 0,
		rateValue3: 0,
		txt:'',
		value11:3
	})
	const radio=(e)=>{
			if(e===1){
				rateValue.value11=1
			}else {
				rateValue.value11=0
			}
		}
</script>


<style lang="less">

.order-comments-title {
	font-size: 20rpx;
	color: orange;
	height: 30rpx;
	line-height: 30rpx;
	text-align: center;
}
.order-comments {
	margin: 30rpx;
	border: 1px solid #ccc;
	border-radius: 20rpx;
	padding: 30rpx;
	.store {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 20rpx;
		image {
			width: 100rpx;
			height: 100rpx;
			margin-right: 20rpx;
		}
	}
}
.comments-score {
	display: flex;
	justify-content: flex-start;
}
/deep/textarea {
	margin:20rpx 0;
	width: 600rpx;
}
.radio-box {
	margin-top: 20rpx;
	.radio {
		margin-left: 20rpx;
	}
}
/deep/.uni-textarea-rider {
	width: 600rpx;
	height: 100rpx;
	
}
</style>
