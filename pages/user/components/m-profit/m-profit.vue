<template>
	<view class="container">
		<view class="left">
			<view class="text">本月邀请</view>
			<view class="text_num">588080</view>
		</view>
		<view class="center">
			<view class="text">累计邀请</view>
			<view class="text_num">626262</view>
		</view>
		<view class="right">
			<view class="text">累计收益</view>
			<view class="text_num">88.88</view>
		</view>
	</view>
</template>

<script></script>

<style lang="scss" scoped>
.container {
	color: #ffffff;
	width: 750rpx;
	box-sizing: border-box;
	@include mFlex;
	justify-content: space-between;
	background-color: $main-color;
	padding: 10rpx 32rpx 40rpx;
	font-size: 28rpx;
	.left,
	.right,
	.center {
		width: 200rpx;
		flex: none;
		text-align: center;
		overflow: hidden;
		> .text {
			@include singleLineTextOverHidden;
			margin-bottom: 20rpx;
		}
		> .text_num {
			@include singleLineTextOverHidden;
		}
	}
}
</style>
