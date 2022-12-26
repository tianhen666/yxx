<template>
	<view class="container">
		<view class="left_box">
			<template v-for="(item, index) in listData" :key="index">
				<view
					class="item"
					@tap.stop="navigateTo(`/pages/sub1/goodsInfo/goodsInfo?targetId=${item.id}`)"
					v-if="index % 2 === 0"
				>
					<view class="item_in">
						<view class="image_box"><image class="image" :src="item.pics[0]" mode="aspectFill" lazy-load></image></view>
						<view class="title">{{ item.title }}</view>
						<view class="descData">{{ item.descData }}</view>
						<view class="bottom_box">
							<view class="left">{{ item.sold + item.virtualCount || 0 }}人买过</view>
							<view class="right">
								<text class="price_cn">￥</text>
								<text>{{ item.price }}</text>
								<text class="text1">￥{{ item.priceNormal }}</text>
							</view>
						</view>
					</view>
				</view>
			</template>
		</view>

		<view class="right_box">
			<template v-for="(item, index) in listData" :key="index">
				<view
					class="item"
					@tap.stop="navigateTo(`/pages/sub1/goodsInfo/goodsInfo?targetId=${item.id}`)"
					v-if="index % 2 === 1"
				>
					<view class="item_in">
						<view class="image_box"><image class="image" :src="item.pics[0]" mode="aspectFill" lazy-load></image></view>
						<view class="title">{{ item.title }}</view>
						<view class="descData">{{ item.descData }}</view>
						<view class="bottom_box">
							<view class="left">{{ item.sold + item.virtualCount || 0 }}人买过</view>
							<view class="right">
								<text class="price_cn">￥</text>
								<text>{{ item.price }}</text>
								<text class="text1">￥{{ item.priceNormal }}</text>
							</view>
						</view>
					</view>
				</view>
			</template>
		</view>
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
	align-items: flex-start;
	.left_box,
	.right_box {
		width: 48%;
		flex: none;
	}
	.item {
		padding: 1px;
		background-image: linear-gradient($main-color, #{$main-color}33);
		width: 100%;
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
				padding: 25rpx 0 0;
				font-weight: 600;
				@include singleLineTextOverHidden;
			}
			.descData {
				@include textOverHidden(3);
				color: #aaa;
				font-size: 26rpx;
				margin: 20rpx 0 30rpx;
				line-height: 1.6;
			}
			.bottom_box {
				@include mFlex;
				justify-content: space-between;
				.left {
					flex: none;
					font-size: 25rpx;
					color: $main-color;
					background-color: #{$main-color}33;
					border-radius: 100rpx;
					padding: 6rpx 10rpx;
				}
				.right {
					flex: none;
					color: $sub-color;
					font-weight: 600;
					font-size: 30rpx;
					.price_cn {
						font-size: 24rpx;
						font-weight: normal;
					}
					.text1 {
						color: #aaa;
						font-size: 24rpx;
						font-weight: normal;
						padding-left: 10rpx;
						text-decoration: line-through;
					}
				}
			}
		}
	}
}
</style>
