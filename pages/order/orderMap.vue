<template>
	<view>
		<map style="width: 750rpx; height:500rpx" longitude="{{longitude}}" latitude="{{latitude}}">
		</map>
		   <button @tap="selectAddress">选择活动地址</button>
	</view>
</template>

<script setup>
	import {ref,onMounted} from 'vue'
	
	const longitude = ref('');
	const latitude = ref('');
	  
	  onMounted(()=>{
		// 获取用户当前的设置；
		wx.getSetting({
		  success(res) {
		    console.log(res);
		    //如果没有授权获取用户位置，则进入IF。
		    if (!res.authSetting['scope.userLocation']) {
		      //发起授权获取用户位置的请求：
		      wx.authorize({
		        scope: 'scope.userLocation',
		        success() {
		          console.log(2);
		          wx.getLocation({
		            type: 'gcj02',
		            success(res) {
		              console.log(res)
		              longitude.value=res.longitude,
		              latitude.value=res.latitude
		            },
		            fail(err){
		              console.log(44,err)
		            }
		          })
		        }
		      })
		    } else {
		      // 用户已经授权了
		      wx.getLocation({
		        type: 'gcj02',
		        success(res) {
		          console.log(res)
		          longitude.value=res.longitude,
		          latitude.value=res.latitude
		        }
		      })
		    }
		  }
		})
	
		
	})
</script>
<script>
	export default {
		data() {
			return {
				 
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
