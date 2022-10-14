<template>
	<view class="container">
		<!-- <view class="title">欢迎登录</view> -->

		<!-- 头像 -->
		<button open-type="chooseAvatar" class="avatar" @chooseavatar="onChooseAvatar" hover-class="avatar-button-hover">
			<image :src="avatar || '/static/images/default_avatar.png'" class="image" mode="aspectFill"></image>
		</button>
		<view class="blank40"></view>

		<!-- 用户名 -->
		<view class="nickname">
			<uni-easyinput type="nickname" trim v-model="nickname" placeholder="请输入用户名"></uni-easyinput>
		</view>
		<view class="blank40"></view>

		<!-- 协议 -->
		<view class="box1">
			<radio class="myradio" :checked="isAgree" @click="isAgree = !isAgree" />
			<view class="box1_item2">
				<text @tap="isAgree = !isAgree">我已阅读并同意</text>
				<text class="text1" @tap="navigateTo('/pages/main/agree/agree')">《用户隐私协议》</text>
			</view>
		</view>

		<view class="box2">
			<view class="btn" @tap="clickTips" v-if="!isAgree || !nickname || !avatar">微信授权登录</view>
			<button v-else open-type="getPhoneNumber" class="btn btnAgree" @getphonenumber="getphonenumber">
				微信授权登录
			</button>
		</view>
	</view>
</template>

<script setup>
import { _wxMobile } from '@/aTemp/apis/login.js'
import { showToastText, redirectTo, showLoading, navigateTo, uploadFile } from '@/aTemp/utils/uniAppTools.js'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import config from '@/global-config.js'
// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 是否同意协议
const isAgree = ref(false)

// 回跳页面
const jumpPage = ref('')

// 加载中
const loading = ref(false)

// 头像
const avatar = ref('')
// 用户名
const nickname = ref('')

onLoad(options => {
	const { path } = options
	if (path) {
		jumpPage.value = decodeURIComponent(path)
	} else {
		jumpPage.value = '/pages/main/index/index'
	}
})

// 输入提示
const clickTips = () => {
	// console.log(!avatar.value)
	// console.log(!nickname.value)
	// console.log(!isAgree.value)
	if (!avatar.value) {
		showToastText('请点击灰色头像，上传头像')
		return
	}
	if (!nickname.value) {
		showToastText('请输入用户名')
		return
	}
	if (!isAgree.value) {
		showToastText('请阅读，并且同意协议')
		return
	}
}

// 获取并上传头像
const onChooseAvatar = async e => {
	const avatarUrl = e.detail.avatarUrl
	const resUploadFile = await uploadFile(avatarUrl, config.BASE_URL + '/enrollform/uploadimage',{baseDir: 'avatar'})
	const { code, data, msg } = JSON.parse(resUploadFile)
	avatar.value = data
}

// 获取手机号事件
const getphonenumber = val => {
	// 加载中
	showLoading()
	// 获取code
	const { code } = val.detail

	if (code) {
		_wxMobile({ code: code, avatar: avatar.value, nickname: nickname.value }).then(res => {
			const { msg, data, code } = res
			if (data) {
				useUserMain.$patch({ mobile: data,avatar: avatar.value,nickname: nickname.value })
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
	/* .title {
		font-size: 42rpx;
		padding-bottom: 120rpx;
	} */
	.avatar {
		font-size: 0;
		background-color: transparent;
		padding: 0;
		margin: 0;
		&::after {
			border: none;
		}
		.image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			display: inline-block !important;
		}
	}

	.nickname {
		:deep(.uni-easyinput__content) {
			background-color: transparent !important;
		}
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
		margin-top: 20rpx;
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
