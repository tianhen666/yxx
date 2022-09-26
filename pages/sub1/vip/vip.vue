<template>
	<uni-nav-bar
		@clickLeft="clickLeft"
		left-icon="left"
		title="会员中心"
		statusBar
		fixed
		color="#ffffff"
		:border="false"
	></uni-nav-bar>
	<view class="blank40 blank_main_color"></view>

	<!-- 会员显示 -->
	<view class="pageBg"></view>
	<view class="vip">
		<view class="left">
			<view class="vip_box">
				<image class="image" src="/static/user/vip.png" mode="aspectFill"></image>
				<view class="text">牙小新会员</view>
			</view>
			<view class="time_text">您的会员将在2023-07-14到期</view>
		</view>
		<view class="right">立即续费</view>
	</view>

	<view class="blank40"></view>
	<view class="box">
		<m-title2 title="会员服务"></m-title2>
		<view class="wrapper">
			<view class="item_wrapper" @tap="current = 0" :class="{ current: current === 0 }">
				<view class="text1">30人，单店使用</view>
				<view class="text2">标准版</view>
				<view class="text3">标准版每年售价2980</view>
				<view class="text4">
					<text class="text4_cn">￥</text>
					<text>2980</text>
					<text class="text4_unit">/年</text>
				</view>
			</view>

			<view class="item_wrapper" @tap="current = 1" :class="{ current: current === 1 }">
				<view class="text1">30-50人，多店使用</view>
				<view class="text2">进阶版</view>
				<view class="text3">进阶版买两年送一年</view>
				<view class="text4">
					<text class="text4_cn">￥</text>
					<text>5960</text>
					<text class="text4_unit">/3年</text>
				</view>
			</view>
		</view>
		<!-- <view class="agreement">协议</view> -->
		<button class="btn">立即购买</button>
	</view>
</template>

<script setup>
import { ref } from 'vue'
const current = ref(0)
const clickLeft = () => {
	uni.navigateBack()
}
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #f5f5f5;
}
:global(.bg) {
	height: 100rpx;
	width: 750rpx;
	background-image: linear-gradient($main-color 0%, transparent);
}
.vip {
	@include mFlex;
	justify-content: space-between;
	width: $main-width;
	padding: $padding;
	box-sizing: border-box;
	border-radius: 16rpx;
	background-image: linear-gradient(to right, #ffffff, #00000033);
	margin: auto;
	margin-top: -100rpx;
	.left {
		flex: 1;
		.vip_box {
			@include mFlex;
			justify-content: left;
			> .image {
				width: 60rpx;
				height: 60rpx;
			}
			> .text {
				margin-left: 15rpx;
				font-weight: bold;
				font-style: oblique;
			}
		}
		.time_text {
			margin-top: 10rpx;
			font-size: 24rpx;
			color: $text-color-grey;
		}
	}
	.right {
		color: #ffffff;
		background-color: $main-color;
		border-radius: 144rpx;
		width: 144rpx;
		padding: 15rpx 0;
		font-size: 24rpx;
		text-align: center;
	}
}

.box {
	width: $main-width;
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: $padding;
	box-sizing: border-box;
	margin: auto;
	.wrapper {
		@include mFlex;
		justify-content: space-between;
		.item_wrapper {
			width: 296rpx;
			height: 296rpx;
			flex: none;
			box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
			position: relative;
			text-align: center;
			border-radius: 16rpx;
			border: 2px solid transparent;
			.text1 {
				position: absolute;
				left: -4rpx;
				top: -4rpx;
				padding: 0 20rpx;
				height: 48rpx;
				line-height: 48rpx;
				font-size: 24rpx;
				color: #ffffff;
				border-radius: 16rpx 0px 16rpx 0px;
				background-color: $main-color;
			}
			.text2 {
				padding-top: 100rpx;
			}
			.text3 {
				font-size: 24rpx;
				color: $text-color-grey;
				padding-top: 30rpx;
			}
			.text4 {
				padding-top: 42rpx;
				color: $main-color;
				.text4_cn,.text4_unit{
					font-size: 24rpx;
				}
			}
		}
		.current {
			border: 2px solid $main-color;
			color: $main-color !important;
			> .text3 {
				color: $main-color !important;
			}
		}
	}

	> .btn {
		margin-top: 40rpx;
		height: 88rpx;
		font-size: 32rpx;
		color: #ffffff;
		line-height: 88rpx;
		background-color: $main-color;
	}
}
</style>
