<template>
	<view class="container">
		<slot name="title"></slot>
		<!-- 滚动图片 -->
		<scroll-view scroll-x="true" class="scroll-view_H" scroll-left="20">
			<view class="scroll_item" v-for="(item, index) in imgList" :key="index" @tap="previewImage(imgList,index)">
				<image class="image" :src="item" mode="heightFix"></image>
			</view>
		</scroll-view>
		<view class="about_text">{{ info.descData }}</view>
	</view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { previewImage } from '@/aTemp/utils/uniAppTools.js'

const props = defineProps({
	// 数据列表
	info: {
		type: Object,
		required: true,
		default: () => ({})
	}
})

const imgList = computed(() => {
	if (Array.isArray(props.info.innerPics)) {
		return props.info.innerPics
	} else {
		if (props.info.innerPics) {
			return props.info.innerPics.split(',')
		}
		return []
	}
})
</script>

<style lang="scss" scoped>
.container {
	width: $main-width;
	padding: $padding;
	background-color: #fff;
	overflow: hidden;
	margin: auto;
	position: relative;
	z-index: 2;
	border-radius: 16rpx;
	overflow: hidden;
	.scroll-view_H {
		white-space: nowrap;
		border-radius: 4rpx;
		overflow: hidden;
		.scroll_item {
			display: inline-block;
			margin-right: 20rpx;
			> .image {
				height: 180rpx;
				width: 200rpx;
				border-radius: 4rpx;
			}
			&:last-child {
				margin-right: 0;
			}
		}
	}
	.about_text {
		color: $text-color-grey;
		font-size: 26rpx;
		line-height: 1.6;
		text-align: justify;
		margin-top: 10rpx;
	}
}
</style>
