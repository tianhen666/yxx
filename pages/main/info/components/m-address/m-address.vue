<template>
	<view class="container">
		<!-- 门诊名称 -->
		<view class="title">牙小新口腔门诊</view>

		<!-- 地址 -->
		<view class="address">
			<image class="image" src="/static/images/daohang2.png" mode="aspectFill"></image>
			浙江省杭州市西湖区三坝雅苑浙江省杭州市西湖区三坝雅苑浙江省杭州市西湖区三坝雅苑
		</view>

		<!-- 按钮 -->
		<view class="button_container">
			<button>电话咨询</button>
			<button>门诊预约</button>
		</view>
	</view>
</template>

<style lang="scss" scoped>
.container {
	width: $main-width;
	margin: auto;
	overflow: hidden;
	position: relative;
	z-index: 2;
	background-color: #fff;
	padding: 20rpx;
	border-radius: 16rpx;
	> .title {
		font-size: 32rpx;
		font-weight: 600;
		color: #333333;
		line-height: 32rpx;
		padding-bottom: 30rpx;
	}
	> .address {
		padding: 20rpx;
		margin-bottom: 20rpx;
		line-height: 1.8;
		background-image: linear-gradient(to right, #eef2ff, #ffffff);
		font-size: 26rpx;
		font-weight: 600;
		color: #5c79ff;
		position: relative;
		z-index: 1;
		border-radius: 8rpx;
		&:after {
			content: '';
			position: absolute;
			z-index: 2;
			top: -28rpx;
			display: block;
			width: 0px;
			height: 0px;
			border: 14rpx solid transparent;
			border-top-color: transparent;
			border-bottom-color: #eef2ff;
			border-left-color: transparent;
			border-right-color: transparent;
		}
		> .image {
			vertical-align: middle;
			width: 22rpx;
			height: 24rpx;
			display: inline-block !important;
		}
	}
}
</style>
