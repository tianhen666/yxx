<template>
	<view class="container">
		<slot name="title"></slot>
		<view class="container_item" v-for="(item, index) in list" :key="index">
			<image class="image" :src="item.img" mode="aspectFill"></image>
			<view class="right">
				<view class="title">
					金属托槽矫正金属托槽矫正金属托槽矫正金属托槽矫正金属托槽矫正金属托槽矫正金属托槽矫正金属托槽矫正
				</view>

				<!-- 价格 -->
				<view class="box">
					<view class="price_wrapper">
						<view class="price">
							<text class="price_cn">￥</text>
							<text>{{ item.price }}</text>
						</view>
						<view class="originalPrice">
							<text>￥</text>
							<text class="originalPrice_through">{{ item.originalPrice }}</text>
						</view>
					</view>

					<view class="right">立即购买</view>
				</view>
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
		price: 888888888888888888888888,
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
		&:last-child{
			margin-bottom: 0;
		}
		> .image {
			width: 220rpx;
			height: 220rpx;
			flex: none;
			border-radius: 8rpx;
		}
		> .right {
			flex: auto;
			padding-left:30rpx;
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
				margin-top: 30rpx;
				> .price_wrapper {
					flex: none;
					white-space: nowrap;
					width: 226rpx;
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
				}
			}
		}
	}
}
</style>
