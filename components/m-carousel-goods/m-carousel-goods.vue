<template>
	<view class="swiper_wrapper">
		<swiper class="swiper" indicator-dots autoplay circular skip-hidden-item-layout interval="5000">
			<swiper-item v-for="(item, index) in props.listData" :key="index">
				<image class="image" :src="item" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
const props = defineProps({
	listData: {
		type: Array,
		require: true,
		defaule: () => []
	}
})
</script>

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
