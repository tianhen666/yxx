<template>
	<view class="container">
		<view class="left"></view>
		<view class="center">{{ props.title }}</view>
		<view class="right"></view>
	</view>
</template>

<script setup>
const props = defineProps({
	title: {
		required: true,
		type: String,
		default: '我是标题'
	}
})
</script>

<style lang="scss" scoped>
.container {
	@include mFlex;
	padding-bottom: 32rpx;
	> .center {
		color: $text-color;
		font-size: 34rpx;
		margin: 0 32rpx;
	}
	> .left,
	> .right {
		height: 2rpx;
		width: 80rpx;
		background-color: #dfdfdf;
	}
}
</style>
