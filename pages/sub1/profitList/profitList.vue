<template>
	<!-- 标题栏 -->
	<uni-nav-bar
		@clickLeft="clickLeft"
		left-icon="left"
		title="我的推广收益"
		statusBar
		fixed
		color="#ffffff"
		:border="false"
	></uni-nav-bar>

	<view class="box">
		<view class="profit_add">您的当前累计收益</view>
		<view class="profit_number">6666.66</view>
	</view>

	<!-- 背景 -->
	<view class="pageBg uni-navbar--fixed"></view>

	<view class="box1">
		<view class="box1_item">
			<view class="text">今日收益</view>
			<view class="text_num">588080</view>
		</view>
		<view class="box1_item">
			<view class="text">本周收益</view>
			<view class="text_num">588080</view>
		</view>
		<view class="box1_item">
			<view class="text">本月收益</view>
			<view class="text_num">588080</view>
		</view>
	</view>
	<view class="blank40"></view>
	
	<view class="title_box">
		<m-title2 title="收益记录"></m-title2>
	</view>
	
	<view class="box2">
		<view class="box2_item">
			<view class="left">用户信息</view>
			<view class="center">邀请时间</view>
			<view class="right">收益总计</view>
		</view>
		<view class="box2_item" v-for="(item, index) in listData" :key="index">
			<view class="left">
				<view class="wrapper">
					<image class="image" :src="item.imgUrl" mode="aspectFill"></image>
					<text class="text">{{ item.name }}</text>
				</view>
			</view>
			<view class="center">
				<text class="text">{{ item.time }}</text>
			</view>
			<view class="right">
				<text class="text">+{{ item.meony }}</text>
			</view>
		</view>
	</view>

	<!-- 底部邀请 -->
	<m-invitation-btn-fix></m-invitation-btn-fix>
</template>

<script setup>
import { reactive } from 'vue'
const listData = reactive([
	{
		imgUrl: '/static/default/banner.png',
		name: '昵称昵称昵称',
		time: '2022-07-18',
		meony: '16.68'
	},
	{
		imgUrl: '/static/default/banner.png',
		name: '昵称昵称昵称',
		time: '2022-07-18',
		meony: '16.68'
	},
	{
		imgUrl: '/static/default/banner.png',
		name: '昵称昵称昵称',
		time: '2022-07-18',
		meony: '16.68'
	}
])
const clickLeft = () => {
	uni.navigateBack()
}
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #f5f5f5;
}
:global(.bg) {
	height: 100rpx;
	width: 750rpx;
	background-image: linear-gradient($main-color 0%, transparent);
}
.box {
	text-align: center;
	background-color: $main-color;
	color: #ffffff;
	padding-bottom: 40rpx;
	.profit_add {
		font-size: 36rpx;
		padding-top: 46rpx;
	}
	.profit_number {
		font-size: 52rpx;
		padding-top: 35rpx;
	}
}
.box1 {
	width: $main-width;
	background-color: #ffffff;
	@include mFlex;
	justify-content: space-between;
	color: $text-color;
	font-size: 28rpx;
	margin: auto;
	margin-top: -100rpx;
	border-radius: 16rpx;
	padding: 24rpx 0;
	.box1_item {
		width: 33.3%;
		flex: none;
		overflow: hidden;
		text-align: center;
		> .text {
			margin-bottom: 30rpx;
		}
	}
}
.title_box{
	width: $main-width;
	margin: auto;
}
.box2 {
	margin: auto;
	background-color: #ffffff;
	width: $main-width;
	box-sizing: border-box;
	padding: $padding;
	border-radius: 16rpx;
	.box2_item {
		@include mFlex;
		justify-content: space-between;
		text-align: center;
		border-bottom: 1px solid $border-color;
		padding-bottom: 20rpx;
		margin-bottom: 20rpx;
		font-size: 28rpx;
		&:first-child {
			border: none;
		}
		&:last-child {
			border: none;
			padding-bottom: 0;
			margin-bottom: 0;
		}
		.left {
			width: 50%;
			flex: none;
			overflow: hidden;
			> .wrapper {
				@include mFlex;
				justify-content: left;
				> .image {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					flex: none;
				}
				> .text {
					flex: auto;
					margin-left: 10rpx;
					color: $text-color-grey;
					@include singleLineTextOverHidden;
					font-size: 28rpx;
					text-align: left;
				}
			}
		}
		.center {
			width: 28%;
			flex: none;
			overflow: hidden;
			> .text {
				color: $text-color-grey;
				font-size: 26rpx;
			}
		}
		.right {
			width: 20%;
			flex: none;
			overflow: hidden;
			> .text {
				color: $sub-color;
				font-size: 28rpx;
			}
		}
	}
}
</style>
