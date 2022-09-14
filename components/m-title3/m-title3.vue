<template>
	<view class="container">
		<view class="title">{{ props.title }}</view>
		<image class="image" src="/static/images/m-title3.png" mode="aspectFill"></image>
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
	padding-bottom: 32rpx;
	@include mFlex;
	flex-direction: column;
	>.title{
		font-size: 32rpx;
		font-weight: 500;
		color: #333333;
		line-height: 44rpx;
		padding-bottom: 6rpx;
	}
	>.image{
		width: 306rpx;
		height: 14rpx;
	}
}
</style>
