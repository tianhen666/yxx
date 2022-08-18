<template>
	<view class="info_wrapper">
		<!-- 详情信息 -->
		<view class="details">
			<!-- logo... -->
			<view class="left">
				<image class="logo" src="/static/default/banner.png" mode="aspectFill"></image>
				<view class="text-wrapper">
					<view class="name">{{ props.info.name }}</view>
					<view class="address">
						牙小新口腔门诊牙小新口腔门诊牙小新口腔门诊牙小新口腔门诊牙小新口腔门诊牙小新口腔门诊牙小新口腔门诊牙小新口腔门诊
					</view>
				</view>
			</view>

			<!-- 间隔 -->
			<view class="center"></view>

			<!-- 按钮... -->
			<view class="right">
				<view class="distance">距离6.8km</view>
				<view class="icon-wrapper">
					<view class="icon"><uni-icons type="paperplane-filled" size="44rpx"></uni-icons></view>
					<view class="icon" @tap="clickCall"><uni-icons type="phone-filled" size="40rpx"></uni-icons></view>
				</view>
			</view>
		</view>

		<!-- 营业时间 -->
		<view class="work-time">营业时间：上午09:00-12:00 下午12:00-18:00</view>

		<!-- 挂号预约 -->
		<view class="addWx" @tap="clickImgView">
			<image class="image" src="/static/default/yuyue.png" mode="aspectFill"></image>
			<text class="addWx_text">挂号预约</text>
		</view>
	</view>
</template>

<script setup>
import { previewImage } from '@/aTemp/utils/uniAppTools.js'
const props = defineProps({
	info: {
		required: true,
		type: Object,
		default() {
			return {
				name: '陈景康口腔',
				url: '/static/default/banner.png',
				phone: '1773022541'
			}
		}
	}
})

const clickImgView = () => {
	previewImage([props.info.url])
}
const clickCall = () => {
	uni.makePhoneCall({
		phoneNumber: props.info.phone
	})
}
</script>

<style lang="scss" scoped>
.info_wrapper {
	background-color: #ffffff;
	width: $main-width;
	margin: auto;
	padding: $padding;
	box-sizing: border-box;
	border-radius: 16rpx;
}
.details {
	@include mFlex;
	justify-content: space-between;
	> .left {
		width: 450rpx;
		flex: none;
		@include mFlex;
		justify-content: space-between;
		.logo {
			width: 120rpx;
			height: 120rpx;
			flex: none;
		}
		.text-wrapper {
			flex: none;
			width: 310rpx;
			.name {
				color: $text-color;
				margin-bottom: 16rpx;
			}
			.address {
				font-size: 26rpx;
				text-align: justify;
				line-height: 1.5;
				color: $text-color-grey;
				@include textOverHidden();
			}
		}
	}
	> .center {
		flex: none;
		width: 1px;
		background-color: $border-color;
		height: 120rpx;
	}

	> .right {
		flex: none;
		width: 130rpx;
		.distance {
			font-size: 26rpx;
			text-align: center;
			color: $text-color-grey;
			margin-bottom: 10px;
		}
		.icon-wrapper {
			@include mFlex;
			justify-content: space-between;
			> .icon {
				@include mFlex;
				width: 56rpx;
				height: 56rpx;
				border-radius: 50%;
				overflow: hidden;
				background-color: #{$main-color}66;
			}
		}
	}
}

.work-time {
	font-size: 26rpx;
	color: $text-color-grey;
	margin: 25rpx 0;
}

.addWx {
	@include mFlex;
	height: 80rpx;
	border-radius: 8rpx;
	background-color: $main-color;
	color: $text-color-inverse;
	> .image {
		width: 48rpx;
		height: 48rpx;
	}
	&_text {
		padding-left: 10rpx;
	}
}
</style>
