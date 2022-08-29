<template>
	<view class="container">
		<view class="serve_list">
			<!-- 列表 -->
			<view class="serve_list_item" v-for="(item, index) in list" :key="index" @tap="jumpClick">
				<view class="image_box"><image class="image" src="/static/default/banner.jpg" mode="aspectFill"></image></view>
				<view class="title">{{ item.title }}</view>
				<view class="peculiarity">{{ item.desc }}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
const list = [
	{
		title: '测试标题',
		desc: '描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息',
		img: '/static/default/banner.png',
		views: '1000'
	},
	{
		title: '测试标题',
		desc: '描述信息描述信',
		img: '/static/default/banner.png',
		views: '1000'
	},
	{
		title: '测试标题',
		desc: '描述信息描述信息描述信息描述信息',
		img: '/static/default/banner.png',
		views: '1000'
	},
	{
		title: '测试标题',
		desc: '描述信息描述信息描述信息描述信息',
		img: '/static/default/banner.png',
		views: '1000'
	},
	{
		title: '测试标题',
		desc: '描述信息描述信息描述信息描述信息',
		img: '/static/default/banner.png',
		views: '1000'
	},
	{
		title: '测试标题',
		desc: '描述信息描述信息描述信息描述信息',
		img: '/static/default/banner.png',
		views: '1000'
	},
	{
		title: '测试标题',
		desc: '描述信息描述信息描述信息描述信息',
		img: '/static/default/banner.png',
		views: '1000'
	},
	{
		title: '测试标题',
		desc: '描述信息描述信息描述信息描述信息',
		img: '/static/default/banner.png',
		views: '1000'
	}
]
const jumpClick = () => {
	uni.navigateTo({
		url: '/pages/sub1/serveInfo/serveInfo'
	})
}
</script>

<style lang="scss" scoped>
.container {
	.serve_list {
		@include mFlex;
		justify-content: space-between;
		flex-wrap: wrap;
		&_item {
			overflow: hidden;
			width: 313rpx;
			flex: none;
			color: #fff;
			box-sizing: border-box;
			margin-bottom: 30rpx;
			&:nth-last-child(2) {
				margin-bottom: 0;
			}
			&:nth-last-child(1) {
				margin-bottom: 0;
			}
			> .image_box {
				width: 100%;
				padding-top: 50%;
				position: relative;
				border-radius: 16rpx;
				overflow: hidden;
				> .image {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
				}
			}
			.title {
				font-weight: bold;
				padding: 18rpx 0;
				font-size: 28rpx;
				font-weight: 600;
				line-height: 28rpx;
				color: #333333;
			}
			.peculiarity {
				color: #333333;
				font-size: 24rpx;
				text-align: justify;
				color: $main-color;
				@include singleLineTextOverHidden;
			}
		}
	}
}
</style>
