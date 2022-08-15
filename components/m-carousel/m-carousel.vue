<template>
	<view class="swiper_wrapper">
		<view class="swiper_bg"></view>
		<swiper class="swiper" indicator-dots autoplay circular skip-hidden-item-layout interval="5000">
			<swiper-item>
				<image class="image" src="/static/default/banner.png" mode="aspectFill"></image>
			</swiper-item>
			<swiper-item>
				<image class="image" src="/static/default/banner.png" mode="aspectFill"></image>
			</swiper-item>
			<swiper-item>
				<image class="image" src="/static/default/banner.png" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup></script>

<style lang="scss" scoped>
.swiper_wrapper {
	position: relative;
}
.swiper_bg {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 0;
	width: 100%;
	background-color: $main-color;
	// border-radius: 0 0 40rpx 40rpx;
	height: ($main-width * 3 * 0.2) * 0.7;
}
.swiper {
	width: $main-width;
	height: ($main-width * 3 * 0.2);
	margin: auto;
	border-radius: 20rpx;
	overflow: hidden;
	.image {
		width: 100%;
		height: 100%;
	}
}
</style>
