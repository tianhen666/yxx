<template>
	<view class="container">
		<view class="option_btn">
			<view class="option_item" v-for="(item, index) in props.listData.sub" @tap="navigateTo(item.path)" :key="index">
				<view class="left">
					<image class="image" :src="item.imgUrl" mode="aspectFill"></image>
					<text class="text">{{ item.title }}</text>
				</view>
				<view class="right"><uni-icons type="forward" size="15" color="#aaaaaa"></uni-icons></view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'
const props = defineProps({
	listData: {
		type: Array,
		required: true,
		default() {
			return []
		}
	}
})
</script>

<style lang="scss" scoped>
.container {
	.option_btn {
		background-color: #ffffff;
		border-radius: 16rpx;
		width: $main-width;
		margin: auto;
		padding: 40rpx 36rpx;
		box-sizing: border-box;
		.option_item {
			@include mFlex;
			justify-content: space-between;
			margin-bottom: 80rpx;
			&:last-child{
				margin-bottom: 0;
			}
			.left {
				@include mFlex;
				justify-content: left;
				flex: 1;
				font-size: 28rpx;
				color: #666666;
				> .image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 20rpx;
				}
				>.text{
					font-size: 32rpx;
					font-weight: 400;
					color: #444444;
					line-height: 32rpx;
				}
			}
			.right {
			}
		}
	}
}
</style>
