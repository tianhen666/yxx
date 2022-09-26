<template>
	<view class="info_wrapper">
		<!-- 详情信息 -->
		<view class="box1">
			<image class="logo" :src="info.icon" mode="aspectFill"></image>
			<view class="text_wrapper">
				<view class="name">{{ info.name }}</view>
				<view class="address">{{ info.descData }}</view>

				<!-- 营业时间 -->
				<view class="text_warpper_box1">
					<view class="work_time" v-if="info.businessDt">
						营业时间：{{ info.businessDt.split(',')[0] + '-' + info.businessDt.split(',')[1] }}
					</view>
					<view class="distance">
						<uni-icons color="#929292" type="location" size="28rpx" />
						<text>距离6.8km</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 按钮... -->
		<view class="box2">
			<view class="icon-wrapper">
				<image class="icon" src="/static/images/daohang.png" mode="aspectFill"></image>
				<image
					@tap="makePhoneCall(info.mobile)"
					class="icon"
					src="/static/images/dianhua.png"
					mode="aspectFill"
				></image>
			</view>
			<!-- 预约服务 -->
			<view class="addWx" @tap="navigateTo('/pages/sub1/yuyue/yuyue')">
				<image class="image" src="/static/images/shijian.png" mode="aspectFill"></image>
				<text>预约服务</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { previewImage, makePhoneCall, navigateTo } from '@/aTemp/utils/uniAppTools.js'
const props = defineProps({
	info: {
		required: true,
		type: Object,
		default: () => {}
	}
})
</script>

<style lang="scss" scoped>
.info_wrapper {
	position: relative;
	z-index: 2;
	background-color: #ffffff;
	width: $main-width;
	margin: auto;
	padding: 20rpx 20rpx 30rpx 20rpx;
	border-radius: 16rpx;
}
.box1 {
	@include mFlex;
	justify-content: space-between;
	> .logo {
		width: 160rpx;
		height: 160rpx;
		flex: none;
		border-radius: 8rpx;
	}
	> .text_wrapper {
		flex: auto;
		overflow: hidden;
		padding-left: 20rpx;
		.name {
			color: $text-color;
			line-height: 44rpx;
			margin-bottom: 12rpx;
			font-weight: 500;
			font-size: 32rpx;
		}
		.address {
			font-size: 24rpx;
			text-align: justify;
			line-height: 34rpx;
			min-height: 68rpx;
			color: $text-color-grey;
			@include textOverHidden();
		}
		.text_warpper_box1 {
			@include mFlex;
			justify-content: space-between;
			margin-top: 12rpx;
			.distance {
				font-size: 24rpx;
				color: $text-color-grey;
			}
			.work_time {
				font-size: 24rpx;
				color: $main-color;
				font-weight: 400;
				font-size: 24rpx;
			}
		}
	}
}

.box2 {
	@include mFlex;
	justify-content: space-between;
	padding-top: 30rpx;
	.icon-wrapper {
		flex: none;
		width: 180rpx;
		overflow: hidden;
		@include mFlex;
		justify-content: space-between;
		> .icon {
			width: 60rpx;
			height: 60rpx;
		}
	}

	.addWx {
		flex: none;
		@include mFlex;
		height: 80rpx;
		width: 396rpx;
		border-radius: 80rpx;
		background-color: $main-color;
		color: $text-color-inverse;
		font-size: 32rpx;
		> .image {
			width: 32rpx;
			height: 32rpx;
			margin-right: 10rpx;
		}
	}
}
</style>
