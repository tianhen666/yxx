<template>
	<view class="container">
		<view class="container_item" v-for="(item, index) in list" :key="index" @tap="jumpClick">
			<image class="image" src="/static/default/banner.png" mode="aspectFill"></image>
			<view class="text">金属托槽矫正金属托槽矫正金属托槽矫正金属托槽矫正</view>
			<view class="price">
				<text class="price_cn">￥</text>
				<text>{{ item.price }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
const list = [
	{
		title: '测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题',
		time: '2022.08.18-2022.08.28',
		img: '/static/default/banner.png',
		price: 888888888888,
		originalPrice: 888888888888,
		jion: 99,
		type: '拼团'
	},
	{
		title: '测试标题',
		desc: '描述信息描述信息描述信息描述信息',
		img: '/static/default/banner.png',
		time: '2022.08.18-2022.08.28',
		price: 8888,
		originalPrice: 180,
		jion: 99,
		type: '拼团'
	},
	{
		title: '测试标题',
		desc: '描述信息描述信息描述信息描述信息',
		img: '/static/default/banner.png',
		price: 8888,
		originalPrice: 180,
		jion: 99,
		type: '拼团'
	}
]
const jumpClick =()=>{
	uni.navigateTo({
		url:'/pages-sub1/goodsInfo/goodsInfo'
	})
}
</script>

<style lang="scss" scoped>
.container {
	@include mFlex;
	justify-content: space-between;
	width: $main-width;
	margin: auto;
	&_item {
		width: 220rpx;
		overflow: hidden;
		flex: none;
		background-color: #ffffff;
		border-radius: 8rpx;
		> .image {
			width: 220rpx;
			height: 220rpx;
		}
		> .text {
			color: $text-color-grey;
			margin-top: 10rpx;
			font-size: 24rpx;
			text-align: justify;
			padding: 0 20rpx;
			line-height: 1.6;
			min-height: 80rpx;
			@include textOverHidden;
		}
		> .price {
			margin: 20rpx;
			white-space: nowrap;
			overflow: hidden;
			color: $sub-color;
			font-size: 36rpx;
			&_cn {
				font-size: 26rpx;
			}
		}
	}
}
</style>
