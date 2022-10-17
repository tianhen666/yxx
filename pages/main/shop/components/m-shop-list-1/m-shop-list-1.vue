<template>
	<view class="container">
		<view
			class="item"
			v-for="(item, index) in listData"
			:key="index"
			@tap.stop="navigateTo(`/pages/sub1/goodsInfo/goodsInfo?targetId=${item.id}`)"
		>
			<view class="item_in">
				<view class="image_box"><image class="image" :src="item.pics[0]" mode=""></image></view>
				<view class="title">{{ item.title }}</view>
				<view class="bottom_box">
					<view class="left">{{ item.sold || 0 }}人买过</view>
					<view class="right">
						<text class="price_cn">￥</text>
						<text>{{ item.price }}</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="listData.length % 2 === 1"></view>
	</view>
</template>

<script setup>
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'
const props = defineProps({
	listData: {
		type: Array,
		default: () => []
	}
})
</script>

<style scoped lang="scss">
.container {
	width: $main-width;
	margin: auto;
	@include mFlex;
	justify-content: space-between;
	flex-flow: wrap;
	.item {
		padding: 1px;
		background-image: linear-gradient($main-color, #{$main-color}33);
		width: 48%;
		border-radius: 16rpx;
		overflow: hidden;
		margin-bottom: $main-width * 0.04;
		.item_in {
			background-color: #fff;
			padding: 15rpx;
			border-radius: 16rpx;
			overflow: hidden;
			.image_box {
				padding-top: 100%;
				position: relative;
				.image {
					position: absolute;
					top: 0;
					height: 100%;
					width: 100%;
					left: 0;
					border-radius: 16rpx;
				}
			}
			.title {
				font-weight: 32rpx;
				padding: 25rpx 0 35rpx;
				font-weight: 600;
				@include singleLineTextOverHidden;
			}
			.bottom_box {
				@include mFlex;
				justify-content: space-between;
				.left {
					font-size: 25rpx;
					color: $main-color;
					background-color: #{$main-color}33;
					border-radius: 100rpx;
					padding: 6rpx 10rpx;
				}
				.right {
					color: $sub-color;
					font-weight: 600;
					font-size: 30rpx;
					.price_cn {
						font-size: 24rpx;
						font-weight: normal;
					}
				}
			}
		}
	}
}
</style>
