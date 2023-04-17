<template>
	<view class="container">
		<slot name="title"></slot>
		<view
			class="box2_item_box"
			v-for="(item, index) in infoList"
			:key="index"
			@tap.stop="
				useUserMain.storeId !== item.storeId
					? reLaunch(`/pages/main/index/index?storeId=${item.storeId}`)
					: ''
			"
		>
			<view class="box2_item_box_left">
				<image
					class="image"
					:src="item.pics || '/static/images/no_img.jpg'"
					mode="aspectFill"
				></image>
			</view>
			<view class="box2_item_box_right">
				<view class="name">{{ item.name }}</view>
				<view class="address">{{ `${item.address}${item.addressDetail}` }}</view>
				<view class="btn_box">
					<button class="btn style1" v-if="useUserMain.storeId === item.storeId">
						当前门诊
					</button>
					<button
						class="btn"
						v-else
						@tap.stop="reLaunch(`/pages/main/index/index?storeId=${item.storeId}`)"
					>
						进入门店
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { reLaunch } from '@/aTemp/utils/uniAppTools.js';
// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js';
const useUserMain = _useUserMain();

const props = defineProps({
	// 当前店铺信息
	infoList: {
		type: Array,
		required: true,
		default: () => []
	},
	// 当前店铺信息
	info: {
		type: Object,
		required: true,
		default: () => {}
	}
});
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
}
.box2_item_box {
	@include mFlex;
	justify-content: space-between;
	align-items: stretch;
	margin-bottom: 32rpx;
	&:last-of-type {
		margin-bottom: 0;
	}
	&_left {
		flex: none;
		.image {
			width: 200rpx;
			height: 200rpx * 0.2 * 4;
			border: 1px solid $uni-border-1;
			border-radius: 10rpx;
			overflow: hidden;
		}
	}
	&_right {
		flex: auto;
		padding-left: 30rpx;
		overflow: hidden;
		.name {
			font-size: 28rpx;
			color: #666;
		}
		.address {
			padding-top: 24rpx;
			color: #999999;
			font-size: 26rpx;
			line-height: 1.6;
			@include textOverHidden;
		}
		.btn_box {
			text-align: right;
			.btn {
				display: inline-block;
				text-align: center;
				font-size: 26rpx;
				background-color: $main-color;
				color: #fff;
				line-height: 1;
				padding: 8rpx 18rpx;
				border-radius: 16rpx;
				margin-top: 15rpx;
			}
			.style1 {
				background-color: #fff;
				color: #333;
				border: 1px solid #333;
			}
			.style1::after {
				border: none;
			}
		}
	}
}
</style>
