<template>
	<view class="container">
		<!-- vip续费 -->
		<view class="vip">
			<view class="left">
				<view class="box">
					<image class="image" src="/static/user/vip.png" mode="aspectFill"></image>
					<view class="text">牙小新会员</view>
				</view>
				<view class="time_text">您的会员将在2023-07-14到期</view>
			</view>
			<view class="right" @tap="jumpClick">立即续费</view>
		</view>
	</view>
</template>

<script setup>
const jumpClick = () => {
	uni.navigateTo({
		url: '/pages-sub1/vip/vip'
	})
}
</script>

<style lang="scss" scoped>
.container {
	.vip {
		@include mFlex;
		justify-content: space-between;
		width: $main-width;
		padding: $padding;
		box-sizing: border-box;
		border-radius: 16rpx;
		background-image: linear-gradient(to right, #ffffff, #00000033);
		margin: auto;
		box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
		.left {
			flex: 1;
			.box {
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
}
</style>
