<template>
	<m-page-loading v-if="loading"></m-page-loading>
	<view class="container" v-else>
		<view class="item" style="border-bottom: none; padding: 0;">
			<!-- <image class="image" :src="dataObj.avatar" mode="aspectFill"></image> -->
			<view class="swiper_wrapper">
				<uni-swiper-dot
					:info="dataObj.avatar"
					:current="Bcurrent"
					mode="round"
					:dotsStyles="{
						backgroundColor: 'rgba(0, 0, 0, .4)',
						border: 'none',
						selectedBackgroundColor: '#ffffff',
						selectedBorder: 'none'
					}"
				>
					<swiper class="swiper" autoplay circular interval="500000" @change="Bchange">
						<swiper-item v-for="(item, index) in dataObj.avatar" :key="index">
							<image class="image" :src="item" mode="aspectFill"></image>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
			</view>
		</view>
		<view class="item left_right">
			<text class="title">医生名称</text>
			<text class="text">{{ dataObj.name }}</text>
		</view>
		<view class="item left_right">
			<text class="title">医生职务</text>
			<text class="text">{{ dataObj.post }}</text>
		</view>
		<view class="item">
			<view class="title">医生介绍</view>
			<view class="content">
				<text>{{ dataObj.descData }}</text>

				<template v-if="dataObj.detail">
					<image
						class="image"
						mode="widthFix"
						:src="item"
						v-for="(item, index) in dataObj.detail.split(',')"
						@tap="previewImage(dataObj.detail.split(','), index)"
						:key="index"
					></image>
				</template>
			</view>
		</view>
	</view>
	<view class="blank40"></view>
	<view class="blank40"></view>
</template>

<script setup>
import { onLoad, onShow } from '@dcloudio/uni-app'
import { _storedoctorGetinfo } from '@/aTemp/apis/doctor.js'
import { ref, reactive, computed } from 'vue'
import { previewImage } from '@/aTemp/utils/uniAppTools.js'
// 数据ID
const dataId = ref(0)
// 表单数据
const dataObj = ref({})
const loading = ref(true)
// 页面加载
onLoad(optios => {
	dataId.value = parseInt(optios.targetId) || 0
	// 是否存在dataId
	if (dataId.value > 0) {
		// 拉取数据
		_storedoctorGetinfo({ id: dataId.value }).then(res => {
			const { data, msg, code } = res
			data.avatar = data.avatar.split(',')
			dataObj.value = data
			loading.value = false
		})
	}
})

const Bcurrent = ref(0)
// 改变索引事件
const Bchange = e => {
	Bcurrent.value = e.detail.current
}
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #fff;
}
.swiper {
	width: $main-width;
	height: $main-width;
	margin: auto;
	overflow: hidden;
	border-radius: 16rpx;
	.image {
		width: 100%;
		height: 100%;
		border-radius: 16rpx;
	}
}
.left_right {
	@include mFlex;
	justify-content: space-between;
}
.container {
	> .item {
		border-bottom: 1px solid $border-color;
		padding: 32rpx 0;
		width: $main-width;
		margin: auto;
		&:last-child {
			border-bottom: none;
		}
		.image_box {
			width: 100%;
			height: 0;
			padding-top: 50%;
			position: relative;
			.image {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				border-radius: 10rpx;
				border: 1px solid #f5f5f5;
			}
		}

		.title {
			font-size: 32rpx;
			color: $text-color;
		}
		.content {
			background: #f5f5f5f5;
			font-size: 28rpx;
			color: $text-color;
			line-height: 60rpx;
			padding: $padding;
			border-radius: 16rpx;
			margin-top: 32rpx;
			position: relative;
			&:after {
				content: '';
				position: absolute;
				z-index: 2;
				top: -28rpx;
				display: block;
				width: 0px;
				height: 0px;
				border: 14rpx solid transparent;
				border-top-color: transparent;
				border-bottom-color: #f5f5f5f5;
				border-left-color: transparent;
				border-right-color: transparent;
			}
			.image {
				width: 100%;
			}
		}
	}
}
</style>
