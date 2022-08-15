<template>
	<view class="swiper_wrapper">
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
.swiper {
	width: 750rpx;
	height: 750rpx;
	margin: auto;
	overflow: hidden;
	.image {
		width: 100%;
		height: 100%;
	}
}
</style>
