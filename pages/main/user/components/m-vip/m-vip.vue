<template>
	<view class="container">
		<!-- vip续费 -->
		<view class="vip" @tap="navigateTo('/pages/sub1/vip/vip')">
			<image class="image" src="/static/images/vip.png" mode="aspectFill"></image>
			<view class="time_text">
				{{ `您的会员将在${dayjs(storeInfo.expireDt).format('YYYY年MM月DD日')}到期` }}
			</view>
			<view class="btn">立即续费</view>
		</view>
	</view>
</template>

<script setup>
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'
import dayjs from 'dayjs'
import { inject } from 'vue'

const storeInfo = inject('storeInfo')
</script>

<style lang="scss" scoped>
.container {
	position: relative;
	z-index: 2;
	color: #ffffff;
	width: $main-width;
	@include mFlex;
	margin: auto;
	overflow: hidden;
	.vip {
		margin-top: 38rpx;
		width: 100%;
		position: relative;
		width: 100%;
		height: 188rpx;
		> .image {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 188rpx;
		}
		> .time_text {
			top: 84rpx;
			left: 20rpx;
			position: absolute;
			z-index: 1;
			color: #ae590e;
			font-size: 24rpx;
		}
		> .btn {
			position: absolute;
			z-index: 1;
			top: 126rpx;
			left: 20rpx;
			width: 138rpx;
			height: 44rpx;
			color: #ae590e;
			font-size: 24rpx;
			background: url('@/static/images/vip_bg.png') no-repeat;
			background-size: cover;
			@include mFlex;
		}
	}
}
</style>
