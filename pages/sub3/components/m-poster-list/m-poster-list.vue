<template>
	<view class="list">
		<view
			class="list_item"
			v-for="(item, index) in 8"
			:key="index"
			@tap="navigateTo('/pages/sub3/posterInfo/posterInfo')"
		>
			<image
				class="image"
				src="https://imgs.fenxiangzl.com/tooth/product/0e4dc240-93c2-4de9-af63-3029cf954ffe.jpg"
				mode="aspectFill"
				v-if="index < 6"
			></image>
		</view>
	</view>
</template>

<script setup>
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'
</script>

<style scoped lang="scss">
.list {
	@include mFlex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-top: -25rpx;
	&_item {
		width: 220rpx;
		.image {
			margin-top: 25rpx;
			width: 100%;
			height: 392rpx;
			border-radius: 8rpx;
		}
	}
}
</style>
