<template>
	<view class="container">
		<!-- 头像 -->
		<image
			class="image"
			@tap="navigateTo('/pages/sub2/manageUserInfo/manageUserInfo')"
			:src="useUserMain.avatar || '/static/images/default_avatar.png'"
			mode="aspectFill"
		></image>
		<!-- 名称 -->
		<view class="name_box" @tap="navigateTo('/pages/sub2/manageUserInfo/manageUserInfo')">
			<view class="name">{{ useUserMain.nickname || '微信用户' }}</view>
			<view class="userId">{{ useUserMain.mobile || '------------' }}</view>
		</view>
		<!-- 邀请码 -->
		<view class="invitation" @tap="wxWxqrCode">
			<image class="image" src="/static/images/erweima.png" mode="aspectFill"></image>
			<text class="text">个人码</text>
		</view>

		<!-- 邀请按钮 -->
		<view class="invitation">
			<button class="btn" open-type="share" hover-class="my-hover-class"></button>
			<image class="image" src="/static/images/yaoqing.png" mode="heightFix"></image>
			<text class="text">邀请好友</text>
		</view>
	</view>
</template>

<script setup>
import { _wxWxqrCode } from '@/aTemp/apis/login.js'
// base64转图片路径
import { base64ToPath } from 'image-tools'
import { previewImage, navigateTo, showLoading } from '@/aTemp/utils/uniAppTools.js'
// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 生成直接邀请码
const wxWxqrCode = () => {
	showLoading('加载中')
	_wxWxqrCode({
		page: 'pages/main/index/index',
		scene: `i=${useUserMain.userid}&sd=${useUserMain.storeId}&s=0&t=0`,
		width: 430
	}).then(async res => {
		const { msg, data, code } = res
		const imgPath = await base64ToPath('data:image/png;base64,' + data)
		uni.hideLoading()
		// 分享图片
		uni
			.showShareImageMenu({
				path: imgPath
			})
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	})
}
</script>

<style lang="scss" scoped>
.container {
	position: relative;
	z-index: 1;
	width: $main-width;
	@include mFlex;
	margin: auto;
	padding-top: 10rpx;
	color: #ffffff;
	> .image {
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		flex: none;
	}
	.name_box {
		width: 300rpx;
		flex: 1;
		margin-left: 20rpx;
		.name {
			font-size: 36rpx;
			@include singleLineTextOverHidden;
		}
		.userId {
			font-size: 28rpx;
			margin-top: 22rpx;
			@include singleLineTextOverHidden;
		}
	}
	.invitation {
		position: relative;
		z-index: 1;
		width: 100rpx;
		flex: none;
		@include mFlex(column);
		margin-left: 20rpx;
		> .image {
			width: 48rpx;
			height: 48rpx;
		}
		> .text {
			margin-top: 8rpx;
			line-height: 34rpx;
			font-size: 24rpx;
		}
		> .btn {
			position: absolute;
			z-index: 2;
			width: 100%;
			height: 100%;
			background-color: transparent;
			&:after {
				border: none;
			}
		}
	}
}
</style>
