<template>
	<view class="container">
		<view class="title">欢迎登录</view>
		<!-- 协议 -->
		<view class="box1">
			<radio class="myradio" :checked="isAgree" @tap="isAgree = !isAgree" />
			<view class="box1_item2">
				<text @tap="isAgree = !isAgree">我已阅读并同意</text>
				<text class="text1" @tap="navigateTo('/pages/main/agree/agree')">《用户隐私协议》</text>
			</view>
		</view>

		<view class="box2">
			<view class="btn" v-if="!isAgree">微信授权登录</view>
			<button v-else open-type="getPhoneNumber" class="btn btnAgree" @getphonenumber="getphonenumber">
				微信授权登录
			</button>
		</view>
	</view>
</template>

<script setup>
import { _wxMobile } from '@/aTemp/apis/login.js'
import { showToastText, redirectTo, showLoading, navigateTo } from '@/aTemp/utils/uniAppTools.js'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
// 全局登录信息
import { _useMainStore } from '@/aTemp/store/storeMain.js'
const useMainStore = _useMainStore()

// 是否同意协议
const isAgree = ref(true)

// 回跳页面
const jumpPage = ref('')

const loading = ref(false)

onLoad(options => {
	const { path } = options
	if (path) {
		jumpPage.value = decodeURIComponent(path)
	} else {
		jumpPage.value = '/pages/main/index/index'
	}
})

// 获取手机号事件
const getphonenumber = val => {
	// 加载中
	showLoading()
	// 获取code
	const { code } = val.detail

	if (code) {
		_wxMobile({ code: code }).then(res => {
			const { msg, data, code } = res
			if (data) {
				useMainStore.$patch({ mobile: data })
			}
			setTimeout(() => {
				uni.hideLoading()
				redirectTo(jumpPage.value)
			}, 500)
		})
	} else {
		showToastText('已拒绝授权登录')
	}
}
</script>

<style lang="scss" scoped>
.container {
	padding: 80rpx 50rpx 0;
	.title {
		font-size: 42rpx;
		padding-bottom: 120rpx;
	}
	.box1 {
		color: $text-color-grey;
		@include mFlex;
		justify-content: flex-start;
		font-size: 26rpx;
		.myradio {
			transform: scale(0.6);
		}
		&_item2 {
			padding-left: 4rpx;
			.text1 {
				color: $main-color;
			}
		}
	}
	.box2 {
		margin-top: 60rpx;
		.btn {
			font-size: 32rpx;
			color: #fff;
			background-color: #ccc;
			text-align: center;
			line-height: 2.5;
			margin-left: auto;
			margin-right: auto;
			overflow: hidden;
			padding-left: 14px;
			padding-right: 14px;
			border-radius: 5px;
		}
		.btnAgree {
			background-color: $main-color;
		}
	}
}
</style>
