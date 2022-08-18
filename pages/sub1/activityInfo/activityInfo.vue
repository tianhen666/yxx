<template>
	<view class="container">
		<!-- 封面图 -->
		<view class="banner_img"><image class="image" src="/static/default/banner.png" mode="aspectFill"></image></view>
		<!-- 标题 -->
		<view class="title">{{ list.title }}</view>

		<view class="box1">
			<!-- 价格 -->
			<view class="price_wrapper">
				<view class="price">
					<text class="price_cn">￥</text>
					<text>{{ list.price }}</text>
				</view>
				<view class="originalPrice">
					<text>￥</text>
					<text class="through">{{ list.originalPrice }}</text>
				</view>
			</view>
			<!-- 销售量 -->
			<view class="sale">已售：888件</view>
		</view>
		<view class="blank20"></view>

		<!-- 倒计时 -->
		<view class="count_down_box">
			<view class="count_down">
				<image class="image" src="/static/default/time.png" mode="aspectFill"></image>
				<text>距离活动结束还有30天12小时30分钟</text>
			</view>
		</view>

		<!-- 活动时间 -->
		<view class="time">
			<view class="left">活动时间</view>
			<view class="right">2022年07月14日至2023年7月14日</view>
		</view>

		<!-- 购买须知 -->
		<view class="inform">
			<view class="left">购买须知</view>
			<view class="right">此活动为秒杀活动，售出后不予退还</view>
		</view>
		<view class="blank20"></view>

		<!-- 活动内容 -->
		<view class="content_text">
			<m-title2 title="活动内容"></m-title2>
			<text class="text">1、成年人洗牙4次\n1、成年人洗牙4次\n1、成年人洗牙4次</text>
		</view>
		<view class="blank20"></view>

		<!-- 活动图片 -->
		<view class="content_img">
			<m-title1 title="产品详情"></m-title1>
			<image class="image" src="/static/default/content.png" mode="widthFix"></image>
		</view>
		<view class="blank40"></view>

		<!-- 底部按钮 -->
		<m-bottom-btn></m-bottom-btn>
	</view>
</template>

<script setup>
const list = {
	id: 123456,
	title: '测试标题测试标题测试标题测试标题测试标题测试标题测试',
	time: '2022.08.18-2022.08.28',
	img: '/static/default/banner.png',
	price: 888888888888,
	originalPrice: 888888888888,
	jion: 99,
	type: '拼团'
}

const clickBuy = () => {}
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #f5f5f5;
}
.banner_img {
	> .image {
		width: 750rpx;
		height: 750rpx * 3 * 0.2;
	}
}
.title {
	color: $text-color;
	background-color: #fff;
	padding: $padding;
	line-height: 1.6;
}
.box1 {
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

.count_down_box {
	background-color: #fff;
	padding: $padding;
	.count_down {
		background-color: #fff6ea;
		color: #f73639;
		padding: 20rpx 32rpx;
		@include mFlex;
		justify-content: left;
		border-radius: 16rpx;
		font-size: 28rpx;
		> .image {
			height: 40rpx;
			width: 40rpx;
			margin-right: 20rpx;
		}
	}
}
.time {
	font-size: 28rpx;
	@include mFlex;
	justify-content: left;
	background-color: #fff;
	padding: 0 32rpx;
	> .left {
		color: $text-color-grey;
		margin-right: 40rpx;
	}
	> .right {
		color: $text-color;
	}
}
.inform {
	font-size: 28rpx;
	@include mFlex;
	justify-content: left;
	background-color: #fff;
	padding: 32rpx;
	> .left {
		color: $text-color-grey;
		margin-right: 40rpx;
	}
	> .right {
		color: $text-color;
	}
}
.content_text {
	background-color: #fff;
	padding: 32rpx;
	> .text {
		display: block;
		border: 1px solid #f0f0f0;
		border-radius: 16rpx;
		padding: 20rpx;
		color: $text-color;
		font-size: 28rpx;
		line-height: 2;
	}
}
.content_img {
	padding-top: 32rpx;
	background-color: #fff;
	> .image {
		width: 750rpx;
		height: auto;
	}
}
</style>
