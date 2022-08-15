<template>
	<view class="container">
		<!-- 头像 -->
		<image class="image" src="/static/default/banner.png" mode="aspectFill"></image>
		<!-- 名称 -->
		<view class="name_box">
			<view class="name">牙小新牙小新</view>
			<view class="userId">ID:1234565798</view>
		</view>
		<!-- 邀请码 -->
		<view class="invitation">
			<view class="image_wrapper"><image class="image" src="/static/user/code.png" mode="aspectFill"></image></view>
			<text class="text">个人码</text>
		</view>
		<!-- 邀请按钮 -->
		<view class="invitation">
			<view class="image_wrapper"><image class="image" src="/static/user/share.png" mode="aspectFill"></image></view>
			<text class="text">邀请好友</text>
		</view>
	</view>
</template>

<script></script>

<style lang="scss" scoped>
.container {
	background-color: $main-color;
	color: #ffffff;
	width: 750rpx;
	box-sizing: border-box;
	@include mFlex;
	padding: $padding;

	> .image {
		width: 96rpx;
		height: 96rpx;
		border-radius: 50%;
		flex: none;
	}
	.name_box {
		width: 300rpx;
		flex: 1;
		margin-left: 20rpx;
		.name {
			@include singleLineTextOverHidden;
		}
		.userId {
			font-size: 24rpx;
			margin-top: 20rpx;
			@include singleLineTextOverHidden;
		}
	}
	.invitation {
		width: 100rpx;
		flex: none;
		@include mFlex(column);
		margin-left: 20rpx;
		> .image_wrapper {
			background-color: #ffffff66;
			padding: 5rpx;
			border-radius: 4rpx;
			margin-bottom: 10rpx;
			> .image {
				width: 48rpx;
				height: 48rpx;
			}
		}
		> .text {
			margin-top: 6rpx;
			font-size: 24rpx;
		}
	}
}
</style>
