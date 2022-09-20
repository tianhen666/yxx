<template>
	<view class="container">
		<image class="bg_img" src="https://imgs.fenxiangzl.com/store/tooth/invitbg1.png" mode="widthFix"></image>
		<view class="box box1">
			<view class="text1">邀请您加入</view>
			<view class="text2">{{ storeInfo.name }}</view>
			<button class="btn" @tap="jionStore">进入门诊</button>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { _userChangeUserId } from '@/aTemp/apis/user.js'
import { _storeGetinfo } from '@/aTemp/apis/store.js'
import { onLoad } from '@dcloudio/uni-app'
import { showToastText,redirectTo } from '@/aTemp/utils/uniAppTools.js'

// 全局登录信息
import { _useMainStore } from '@/aTemp/store/storeMain.js'
const useMainStore = _useMainStore()

const storeInfo = ref({})
onLoad(options => {
	// console.log(options)
	_storeGetinfo().then(res => {
		const { data, msg, code } = res
		storeInfo.value = data
	})
})

// 进入门诊
const jionStore = () => {
	_userChangeUserId({
		userid: useMainStore.userid
	}).then(res=>{
		const { data, msg, code } = res
		showToastText("加入成功,正在跳转...")
		
		setTimeout(()=>{
			redirectTo('/pages/main/index/index')
		},1000)
	})
}
</script>

<style lang="scss" scoped>
.box {
	width: $main-width;
	margin: auto;
	border-radius: 16rpx;
	background-color: #fff;
	padding: 80rpx 30rpx;
}
.bg_img {
	width: 100%;
}
.box1 {
	margin-top: -90rpx;
	position: relative;
	z-index: 2;
	> .text1 {
		color: #aaa;
		font-size: 26rpx;
		text-align: center;
		margin-bottom: 60rpx;
	}
	> .text2 {
		color: $main-color;
		font-size: 40rpx;
		font-weight: bold;
		text-align: center;
		margin-bottom: 60rpx;
	}
	> .btn {
		border-radius: 8rpx;
		margin: auto;
		font-size: 34rpx;
		font-weight: 500;
		height: 92rpx;
		line-height: 92rpx;
		color: #ffffff;
		background-color: $main-color;
	}
}
</style>
