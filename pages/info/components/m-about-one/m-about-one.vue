<template>
	<view class="container">
		<image class="image" src="/static/default/banner.png" mode="aspectFill"></image>
		<view class="box">
			<!-- 门诊logo 名称 地址 -->
			<view class="a_wrapper">
				<image class="logo" src="/static/default/banner.png" mode="aspectFill"></image>
				<view class="right">
					<view class="title">牙小新口腔门诊</view>
					<view class="time">营业时间：09:00-12:00 12:00-18:00</view>
				</view>
			</view>
			<!-- 地址 -->
			<view class="address">
				门诊地址1：浙江省杭州市西湖区三坝雅苑浙江省杭州市西湖区三坝雅苑浙江省杭州市西湖区三坝雅苑
			</view>
			<view class="address">门诊地址2：浙江省杭州市西湖区三坝雅苑</view>
			<view class="address">门诊地址3：浙江省杭州市西湖区三坝雅苑</view>
			<!-- 按钮 -->
			<view class="button_container">
				<view class="left">
					<image class="icon" src="/static/default/phone.png" mode="aspectFill"></image>
					<text class="text">电话咨询</text>
				</view>
				<view class="center"></view>
				<view class="right">
					<image class="icon" src="/static/default/map.png" mode="aspectFill"></image>
					<text class="text">立即导航</text>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
.container {
	width: 750rpx;
	overflow: hidden;
	> .image {
		width: 100%;
		height: 750rpx * 3 * 0.2;
	}
	> .box {
		background-color: #fff;
		padding: 40rpx 32rpx;
		padding-bottom: 0;
		border-radius: 32rpx 32rpx 0 0;
		margin-top: -128rpx;
		> .a_wrapper {
			@include mFlex;
			justify-content: left;
			margin-bottom: 30rpx;
			.logo {
				width: 96rpx;
				height: 96rpx;
				flex: none;
				border-radius: 4rpx;
			}
			.right {
				width: 450rpx;
				flex: none;
				margin-left: 30rpx;
				.title {
					font-size: 32rpx;
					color: $text-color;
					margin-bottom: 32rpx;
				}
				.time {
					font-size: 26rpx;
					color: $text-color-grey;
				}
			}
		}

		.address {
			color: $text-color-grey;
			margin-bottom: 20rpx;
			font-size: 26rpx;
			line-height: 1.4;
			text-indent: -5.6em;
			margin-left: 5.6em;
		}

		.button_container {
			border-top: 1px solid $border-color;
			@include mFlex;
			justify-content: space-between;
			font-size: 28rpx;
			> .left {
				width: (750rpx-100rpx) * 0.5;
				flex: none;
				@include mFlex;
				> .icon{
					width: 36rpx;
					height: 36rpx;
				}
				> .text {
					margin-left: 10rpx;
				}
			}
			> .center {
				flex: none;
				height: 80rpx;
				width: 2rpx;
				background-color: $border-color;
			}
			> .right {
				width: (750rpx-100rpx) * 0.5;
				flex: none;
				@include mFlex;
				> .icon{
					width: 36rpx;
					height: 36rpx;
				}
				> .text {
					margin-left: 10rpx;
				}
			}
		}
	}
}
</style>
