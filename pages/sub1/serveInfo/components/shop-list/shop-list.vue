<template>
	<view class="container">
		<slot name="title"></slot>
		<view
			class="container_item"
			v-for="(item, index) in listData"
			:key="index"
			@tap="navigateTo(`/pages/sub1/goodsInfo/goodsInfo?targetId=${item.id}`)"
		>
			<image class="image" :src="item.pics.split(',')[0]" mode="aspectFill"></image>
			<view class="right">
				<view class="title">{{ item.title }}</view>

				<!-- 价格 -->
				<view class="box">
					<view class="price_wrapper">
						<view class="price">
							<text class="price_cn">￥</text>
							<text>{{ item.price }}</text>
						</view>
						<view class="originalPrice" v-if="item.priceNormal">
							<text>￥</text>
							<text class="originalPrice_through">{{ item.priceNormal }}</text>
						</view>
					</view>

					<view class="right">购买</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'
const props = defineProps({
	listData: {
		required: true,
		type: Array,
		default: () => []
	}
})
</script>

<style lang="scss" scoped>
.container {
	width: $main-width;
	margin: auto;
	&_item {
		overflow: hidden;
		background-color: #ffffff;
		border-radius: 8rpx;
		@include mFlex;
		justify-content: space-between;
		margin-bottom: 20rpx;
		&:last-child {
			margin-bottom: 0;
		}
		> .image {
			width: 140rpx;
			height: 140rpx;
			flex: none;
			border-radius: 8rpx;
		}
		> .right {
			flex: auto;
			padding-left: 30rpx;
			> .title {
				color: $text-color;
				text-align: justify;
				line-height: 1.5;
				font-size: 26rpx;
				min-height: 80rpx;
				@include textOverHidden;
			}
			> .box {
				@include mFlex;
				justify-content: space-between;
				margin-top: 20rpx;
				> .price_wrapper {
					flex: none;
					white-space: nowrap;
					overflow: hidden;
					@include mFlex;
					justify-content: left;
					flex-wrap: wrap;
					> .price {
						color: $sub-color;
						font-size: 36rpx;
						margin-right: 15rpx;
						.price_cn {
							font-size: 26rpx;
						}
					}
					> .originalPrice {
						margin-top: 15rpx;
						color: $text-color-grey;
						font-size: 26rpx;
						.originalPrice_through {
							text-decoration: line-through;
						}
					}
				}
				> .right {
					flex: none;
					color: #ffffff;
					font-size: 24rpx;
					width: 144rpx;
					text-align: center;
					background-color: $sub-color;
					padding: 15rpx 0;
					border-radius: 8rpx;
					margin-left: 20rpx;
				}
			}
		}
	}
}
</style>
