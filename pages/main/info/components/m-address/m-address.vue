<template>
	<view class="container">
		<view class="box_type">
			<!-- 门诊名称 -->
			<view class="title">{{ info.name }}</view>

			<!-- 地址 -->
			<view class="address">
				<view class="address_box" @tap="setClipboardData(`${info.address}${info.addressDetail}`)">
					<image class="image" src="/static/images/daohang2.png" mode="aspectFill"></image>
					{{ `${info.address}${info.addressDetail}` }}
				</view>
			</view>

			<!-- 按钮 -->
			<view class="button_container">
				<button class="btn" @tap="makePhoneCall(info.mobile)">电话咨询</button>
				<button class="btn" @tap="navigateTo('/pages/sub1/yuyue/yuyue')">门诊预约</button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { makePhoneCall, setClipboardData, navigateTo } from '@/aTemp/utils/uniAppTools.js'

const props = defineProps({
	// 当前店铺信息
	info: {
		type: Object,
		required: true,
		default: () => {}
	}
})
</script>
<style lang="scss" scoped>
.container {
	width: $main-width;
	margin: auto;
	overflow: hidden;
	position: relative;
	z-index: 2;
	background-color: #fff;
	padding: $padding;
	border-radius: 16rpx;
	.box_type {
		> .title {
			font-size: 32rpx;
			font-weight: 600;
			color: #333333;
			line-height: 32rpx;
			padding-bottom: 30rpx;
		}
		> .address {
			padding: 20rpx;
			margin-bottom: 20rpx;
			line-height: 1.8;
			background-image: linear-gradient(to right, #eef2ff, #ffffff);
			font-size: 26rpx;
			font-weight: 600;
			color: #5c79ff;
			position: relative;
			z-index: 1;
			border-radius: 8rpx;
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
				border-bottom-color: #eef2ff;
				border-left-color: transparent;
				border-right-color: transparent;
			}
			.address_box {
				margin-bottom: 30rpx;
				&:last-child {
					margin-bottom: 0;
				}
				.image {
					vertical-align: middle;
					width: 22rpx;
					height: 24rpx;
					display: inline-block !important;
				}
			}
		}
		> .button_container {
			@include mFlex;

			.btn {
				width: 248rpx;
				height: 64rpx;
				font-size: 26rpx;
				line-height: 64rpx;
				background-color: $main-color;
				color: #fff;
				border-radius: 80rpx;
			}
		}
	}
}
</style>
