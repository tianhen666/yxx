<template>
	<view class="container">
		<!-- 头像 -->
		<image
			class="image"
			@tap="navigateTo('/pages/sub2/manageUserInfo/manageUserInfo')"
			src="/static/images/default_avatar.png"
			mode="aspectFill"
		></image>
		<!-- 名称 -->
		<view class="name_box" @tap="navigateTo('/pages/sub2/manageUserInfo/manageUserInfo')">
			<view class="name">牙小新牙小新</view>
			<view class="userId">ID:1234565798</view>
		</view>
		<!-- 邀请码 -->
		<view class="invitation">
			<image class="image" src="/static/images/erweima.png" mode="aspectFill"></image>
			<text class="text">个人码</text>
		</view>
		<!-- 邀请按钮 -->
		<view class="invitation">
			<image class="image" src="/static/images/yaoqing.png" mode="heightFix"></image>
			<text class="text">邀请好友</text>
		</view>
	</view>
</template>

<script setup>
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'
</script>

<style lang="scss" scoped>
.container {
	position: relative;
	z-index: 1;
	width: $main-width;
	@include mFlex;
	margin: auto;
	padding-top: 34rpx;
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
	}
}
</style>
