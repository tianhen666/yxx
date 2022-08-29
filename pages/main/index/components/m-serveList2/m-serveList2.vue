<template>
	<view class="container">
		<view class="serve_list">
			<!-- 列表 -->
			<view class="serve_list_item" v-for="(item, index) in list" :key="index" :class="'bg' + (1 + index)">
				<view class="title">{{ item.title }}</view>
				<view class="peculiarity">{{ item.peculiarity }}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
const list = [
	{
		title: '烤瓷牙',
		peculiarity: '门诊精选',
		img: '/static/default/banner.png',
		views: '1000'
	},
	{
		title: '牙齿种植',
		peculiarity: '技术过硬',
		img: '/static/default/banner.png',
		views: '1000'
	},
	{
		title: '牙齿美白',
		peculiarity: '门诊首推',
		img: '/static/default/banner.png',
		views: '1000'
	},
	{
		title: '牙齿贴面',
		peculiarity: '最受欢迎',
		img: '/static/default/banner.png',
		views: '1000'
	}
]
</script>

<style lang="scss" scoped>
.container {
	.serve_list {
		@include mFlex;
		justify-content: space-between;
		flex-wrap: wrap;
		.serve_list_item {
			overflow: hidden;
			width: 333rpx;
			height: 132rpx;
			flex: none;
			box-sizing: border-box;
			margin-bottom: 30rpx;
			border-radius: 16rpx;
			padding: 30rpx 28rpx;
			&:nth-last-child(2) {
				margin-bottom: 0;
			}
			&:nth-last-child(1) {
				margin-bottom: 0;
			}
			.title {
				font-size: 28rpx;
				font-weight: 600;
				line-height: 28rpx;
			}
			.peculiarity{
				font-size: 24rpx;
				font-weight: 400;
				line-height: 24rpx;
				padding-top: 20rpx;
			}
		}
		.bg1 {
			color: #4b8eff;
			background: url('@/static/default/fw1.png') no-repeat;
			background-size: cover;
			.peculiarity{
				color: #4b8eff88;
			}
		}
		.bg2 {
			color: #34c251;
			background: url('@/static/default/fw2.png') no-repeat;
			background-size: cover;
			.peculiarity{
				color: #34c25188;
			}
		}
		.bg3 {
			color: #ff6464;
			background: url('@/static/default/fw3.png') no-repeat;
			background-size: cover;
			.peculiarity{
				color: #ff646488;
			}
		}
		.bg4 {
			color: #ff8e47;
			background: url('@/static/default/fw4.png') no-repeat;
			background-size: cover;
			.peculiarity{
				color: #ff8e4788;
			}
		}
	}
}
</style>
