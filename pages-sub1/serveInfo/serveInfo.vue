<template>
	<view class="container">
		<!-- 服务图片 -->
		<view class="banner_img"><image src="/static/default/banner.png" mode="aspectFill" class="image"></image></view>

		<!-- 介绍 -->
		<view class="serve_text">
			<m-title2 title="服务介绍"></m-title2>

			<view class="title">舒柔洁牙</view>

			<view class="serve_item_box">
				<view class="serve_item">
					<view class="left">适用症状：</view>
					<view class="right">牙色素、牙结石、牙垢、牙斑菌、茶垢、烟垢等 牙齿问题。</view>
				</view>

				<view class="serve_item">
					<view class="left">服务特色：</view>
					<view class="right">
						牙色素、牙结石、牙垢、牙斑菌、茶垢、烟垢等 牙齿问题。牙色素、牙结石、牙垢、牙斑菌、茶 垢、烟垢等牙齿问题。
					</view>
				</view>
			</view>
		</view>
		<view class="blank20"></view>

		<!-- 相关商品 -->
		<view class="related_goods">
			<shop-list>
				<template #title>
					<m-title2 title="相关商品" />
				</template>
			</shop-list>
		</view>
		<view class="blank20"></view>

		<!-- 图文详情 -->
		<view class="serve_img">
			<m-title1 title="图文详情"></m-title1>
			<image class="image" src="/static/default/content.png" mode="widthFix"></image>
		</view>
		<view class="blank40"></view>
		
		<!-- 底部按钮 -->
		<m-bottom-btn></m-bottom-btn>
	</view>
</template>

<script setup>
import shopList from './components/shop-list/shop-list.vue'
</script>

<style lang="scss" scoped>
:global(page) {
	background: #f5f5f5;
}
.container {
	.banner_img {
		> .image {
			width: 750rpx;
			height: 750rpx * 3 * 0.2;
		}
	}
	.serve_text {
		padding: $padding;
		background-color: #ffffff;
		.title {
			background-color: #{$main-color}66;
			border-radius: 16rpx 16rpx 0 0;
			font-size: 28rpx;
			color: $text-color;
			height: 80rpx;
			line-height: 80rpx;
			padding: 0 24rpx;
			@include singleLineTextOverHidden;
		}
		.serve_item_box {
			border: 1px solid #f0f0f0;
			border-radius: 0 0 16rpx 16rpx;
			border-top: none;
			padding: 24rpx;
			.serve_item {
				@include mFlex;
				justify-content: left;
				align-items: flex-start;
				font-size: 24rpx;
				margin-bottom: 24rpx;
				line-height: 1.6;
				&:last-child {
					margin-bottom: 0;
				}
				.left {
					flex: none;
					color: $text-color-grey;
				}
				.right {
					flex: 1;
					color: $text-color;
				}
			}
		}
	}
	.related_goods {
		padding: $padding;
		background-color: #ffffff;
	}
	.serve_img {
		padding-top: 32rpx;
		background-color: #ffffff;
		> .image {
			width: 750rpx;
		}
	}
}
</style>
