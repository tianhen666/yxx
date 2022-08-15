<template>
	<view class="container">
		<!-- 头像名称 -->
		<view class="box1">
			<m-left-right-layout rightWidth="580rpx">
				<template #left>
					<image class="logo" src="/static/default/banner.png" mode="aspectFill"></image>
				</template>
				<template #right>
					<view class="title">牙小新口腔门诊</view>
					<view class="time">2022-07-18</view>
				</template>
			</m-left-right-layout>
		</view>
		<view class="blank30"></view>

		<!-- 内容 -->
		<view class="box2">
			<m-title2 title="案例详情"></m-title2>
			<view class="cycle">
				<text class="text1">治疗周期：</text>
				<text>2022-07-18 - 2022-08-18</text>
			</view>
			<text class="desc">
				<text class="text1">案例描述：</text>
				拔牙拔牙，拔牙拔牙拔牙拔牙拔牙，拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔牙拔
			</text>
		</view>
		<view class="blank30"></view>

		<image class="image" src="/static/default/banner.png" mode="aspectFill"></image>

		<!-- 治疗前 -->
		<view class="blank20"></view>
		<m-title1 title="治疗前"></m-title1>
		<image class="image" src="/static/default/banner.png" mode="aspectFill"></image>
		<image class="image" src="/static/default/banner.png" mode="aspectFill"></image>
		<image class="image" src="/static/default/banner.png" mode="aspectFill"></image>
		<image class="image" src="/static/default/banner.png" mode="aspectFill"></image>

		<!-- 治疗后 -->
		<view class="blank20"></view>
		<m-title1 title="治疗后"></m-title1>
		<image class="image" src="/static/default/banner.png" mode="aspectFill"></image>
		<image class="image" src="/static/default/banner.png" mode="aspectFill"></image>
		<image class="image" src="/static/default/banner.png" mode="aspectFill"></image>
		<image class="image" src="/static/default/banner.png" mode="aspectFill"></image>

		<view class="btn_wrapper">
			<view class="flx_box"><button class="shareBtn">分享给好友</button></view>
		</view>
	</view>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
	padding: 32rpx 32rpx 0;
	.box1 {
		border-bottom: 1px solid $border-color;
		padding-bottom: 32rpx;
		.logo {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
		}
		.title {
			font-size: 28rpx;
			color: $text-color;
			margin-bottom: 20rpx;
		}
		.time {
			font-size: 24rpx;
			color: $text-color-grey;
		}
	}
	.box2 {
		font-size: 26rpx;
		.text1 {
			color: $text-color-grey;
		}
		.cycle {
			margin-bottom: 32rpx;
		}
		.desc {
			text-align: justify;
			line-height: 1.5;
		}
	}
	> .image {
		width: 686rpx;
		height: 368rpx;
		margin-bottom: 30rpx;
	}
	> .btn_wrapper {
		height: 88rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		> .flx_box {
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
			width: $main-width;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			height: 88rpx;
			line-height: 88rpx;
			> .shareBtn {
				color: #ffffff;
				background-color: $main-color;
				font-size: 32rpx;
			}
		}
	}
}
</style>
