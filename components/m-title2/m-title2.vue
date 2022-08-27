<template>
	<view class="container">
		<view class="title">
			<image v-if="props.hot" class="image" src="/static/default/hot.png" mode="aspectFill"></image>
			<text>{{ props.title }}</text>
		</view>
		<view class="right" @tap="moreClick" v-if="props.path">
			<text>{{ props.moreText }}</text>
			<uni-icons type="forward" size="15"></uni-icons>
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
	},
	hot: {
		type: Boolean,
		default: false
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
	padding-bottom: 32rpx;
	.title {
		color: $text-color;
		font-size: 34rpx;
		@include mFlex;
		> .image {
			width: 44rpx;
			height: 44rpx;
			margin-right: 10rpx;
		}
	}
	.right {
		@include mFlex;
		color: $text-color-grey;
		font-size: 26rpx;
	}
}
</style>
