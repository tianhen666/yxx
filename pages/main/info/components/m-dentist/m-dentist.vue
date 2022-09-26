<template>
	<view class="container">
		<slot name="title"></slot>
		<view class="container_item" v-for="(item, index) in listData" :key="index" @tap="navigateTo">
			<image class="image" :src="item.avatar" mode="aspectFill"></image>
			<view class="right">
				<view class="name">
					<text>{{ item.name }}</text>
					<text class="type">{{ item.post }}</text>
				</view>
				<view class="desc">{{ item.descData }}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'

const props = defineProps({
	// 数据列表
	listData: {
		type: Array,
		required: true,
		default: () => []
	}
})
</script>

<style lang="scss" scoped>
.container {
	width: $main-width;
	padding: 20rpx;
	background-color: #fff;
	margin: auto;
	position: relative;
	border-radius: 16rpx;
	overflow: hidden;
	z-index: 2;
	&_item {
		border-radius: 16rpx;
		padding: 20rpx;
		@include mFlex;
		justify-content: space-between;
		margin-bottom: 30rpx;
		background-color: #f7f9ff;
		&:last-child {
			margin-bottom: 0;
		}
		> .image {
			width: 200rpx;
			height: 200rpx * 1.3;
			flex: none;
			border-radius: 4rpx;
		}
		> .right {
			width: 380rpx;
			flex: none;
			.name {
				@include mFlex;
				justify-content: flex-start;
				font-size: 28rpx;
				font-weight: 600;
				color: #333333;
				line-height: 28rpx;
				padding-bottom: 20rpx;
			}
			.type {
				@include mFlex;
				flex: none;
				width: 66rpx;
				height: 32rpx;
				border-radius: 8rpx;
				border: 1px solid #3f5eff;
				font-size: 20rpx;
				font-weight: 400;
				color: #3f5eff;
				line-height: 20rpx;
				margin-left: 16rpx;
			}
			.desc {
				color: $text-color-grey;
				line-height: 1.6;
				font-size: 26rpx;
				text-align: justify;
				min-height: 125rpx;
				@include textOverHidden(3);
			}
		}
	}
}
</style>
