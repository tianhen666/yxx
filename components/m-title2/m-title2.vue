<template>
	<view class="container">
		<view class="title">
			<slot name="icon"></slot>
			<text>{{ props.title }}</text>
		</view>
		<view class="right" @tap="moreClick" v-if="props.path">
			<text>{{ props.moreText }}</text>
			<uni-icons type="forward" size="15" color="#929292"></uni-icons>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	title: {
		required: true,
		type: String,
		default: '我是标题'
	},
	path: {
		type: String,
		default: ''
	},
	moreText: {
		type: String,
		default: '查看更多'
	}
})
const moreClick = () => {
	uni
		.navigateTo({
			url: props.path
		})
		.catch(err => {
			uni.switchTab({
				url: props.path
			})
		})
}
</script>

<style lang="scss" scoped>
.container {
	@include mFlex;
	justify-content: space-between;
	padding-bottom: 24rpx;
	.title {
		flex: auto;
		overflow: hidden;
		color: $text-color;
		font-size: 32rpx;
		font-weight: 500;
		@include mFlex;
		justify-content: flex-start;
		> .image {
			width: 44rpx;
			height: 44rpx;
			margin-right: 10rpx;
		}
	}
	.right {
		@include mFlex;
		color: $text-color-grey;
		font-size: 24rpx;
		font-weight: 400;
		opacity: 0.68;
	}
}
</style>
