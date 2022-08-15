<template>
	<view class="container">
		<!-- 轮播图片 -->
		<m-carousel-goods></m-carousel-goods>

		<!-- 标题 -->
		<view class="title">{{ goods.title }}</view>

		<view class="box1">
			<!-- 价格 -->
			<view class="price_wrapper">
				<view class="price">
					<text class="price_cn">￥</text>
					<text>{{ goods.price }}</text>
				</view>
				<view class="originalPrice">
					<text>￥</text>
					<text class="through">{{ goods.originalPrice }}</text>
				</view>
			</view>
			<!-- 销售量 -->
			<view class="sale">已售：888件</view>
		</view>
		<view class="blank20"></view>

		<view class="box2">
			<m-title2 title="购买须知"></m-title2>

			<!-- 商品限购 -->
			<view class="inform">
				<view class="left">商品限购</view>
				<view class="right">
					商品每人限购
					<text class="text">1</text>
					件，超出则该商品全部恢复非 活动价
				</view>
			</view>

			<!-- 使用规则 -->
			<view class="use_rule">
				<view class="left">使用规则</view>
				<view class="right">此活动为秒杀活动，售出后不予退还</view>
			</view>

			<!-- 提示 -->
			<view class="tips">
				<icon type="warn" size="26rpx" color="#F73639" />
				<text class="text">购买后不可退换</text>
			</view>
		</view>
		<view class="blank20"></view>

		<!-- 评论 -->
		<m-comment-list>
			<template #title>
				<m-title2 title="商品评价" moreText="查看全部" path="/pages-sub1/commentList/commentList"></m-title2>
			</template>
		</m-comment-list>
		<view class="blank20"></view>

		<!-- 商品详情 -->
		<view class="goods_img">
			<m-title1 title="商品详情"></m-title1>
			<image class="image" src="/static/default/content.png" mode="widthFix"></image>
		</view>
		<view class="blank40"></view>

		<!-- 底部按钮 -->
		<m-bottom-btn @handleBuy="handleBuy"></m-bottom-btn>
	</view>
</template>

<script setup>
const goods = {
	title: '测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题',
	time: '2022.08.18-2022.08.28',
	img: '/static/default/banner.png',
	price: 888888888888,
	originalPrice: 888888888888,
	jion: 99,
	type: '拼团'
}
const handleBuy = () => {
	uni.navigateTo({
		url:"/pages-sub1/confirmOrder/confirmOrder"
	})
}
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #f5f5f5;
}
.container {
	> .title {
		color: $text-color;
		background-color: #fff;
		padding: $padding;
		line-height: 1.6;
	}
	> .box1 {
		@include mFlex;
		justify-content: space-between;
		padding: 0 32rpx 32rpx;
		background-color: #fff;
		.price_wrapper {
			flex: none;
			width: 400rpx;
			overflow: hidden;
			flex-wrap: wrap;
			white-space: nowrap;
			@include mFlex;
			justify-content: left;
			.price {
				color: $sub-color;
				font-size: 40rpx;
				&_cn {
					font-size: 26rpx;
				}
				margin-right: 10rpx;
			}
			.originalPrice {
				margin-top: 10rpx;
				color: $text-color-grey;
				font-size: 26rpx;
				.through {
					text-decoration: line-through;
				}
			}
		}
		.sale {
			font-size: 26rpx;
			color: $text-color-grey;
		}
	}

	> .box2 {
		padding: $padding;
		background-color: #fff;
		font-size: 24rpx;
		> .inform {
			@include mFlex;
			justify-content: left;
			align-items: flex-start;
			line-height: 1.6;
			margin-bottom: 10rpx;
			> .left {
				flex: none;
				color: $text-color-grey;
				margin-right: 40rpx;
			}
			> .right {
				flex: 1;
				color: $text-color;
				> .text {
					color: $sub-color;
				}
			}
		}
		> .use_rule {
			@include mFlex;
			justify-content: left;
			align-items: flex-start;
			line-height: 1.6;
			margin-bottom: 30rpx;
			> .left {
				flex: none;
				color: $text-color-grey;
				margin-right: 40rpx;
			}
			> .right {
				flex: 1;
				color: $text-color;
			}
		}

		> .tips {
			@include mFlex;
			justify-content: left;
			> .text {
				color: $sub-color;
				margin-left: 10rpx;
				font-size: 24rpx;
			}
		}
	}
	> .goods_img {
		background-color: #fff;
		width: 750rpx;
		padding-top: 32rpx;
		> .image {
			width: 100%;
			height: auto;
		}
	}
}
</style>
