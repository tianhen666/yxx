<template>
	<view class="container">
		<view class="left">
			<view class="text">本月邀请</view>
			<view class="text_num">588080人</view>
		</view>
		<view class="center">
			<view class="text">累计邀请</view>
			<view class="text_num">626262人</view>
		</view>
		<view class="right">
			<view class="text">累计收益</view>
			<view class="text_num">88.88元</view>
		</view>
	</view>
</template>

<script></script>

<style lang="scss" scoped>
.container {
	color: $main-color;
	width: $main-width;
	margin: auto;
	box-sizing: border-box;
	@include mFlex;
	justify-content: space-between;
	padding: 40rpx 32rpx 40rpx;
	font-size: 28rpx;
	position: relative;
	z-index: 1;
	margin-top: 38rpx;
	background-image: linear-gradient(to right, #fde399 , #fdae69);
	border-radius: 16rpx;
	.left,
	.right,
	.center {
		width: 180rpx;
		flex: none;
		text-align: center;
		overflow: hidden;
		font-size: 32rpx;
		> .text {
			@include singleLineTextOverHidden;
			margin-bottom: 32rpx;
			color: #af5d13;
			background-color: #ffecc4;
			padding: 15rpx 0;
			border-radius: 80rpx;
		}
		> .text_num {
			color: #333;
			@include singleLineTextOverHidden;
		}
	}
}
</style>
