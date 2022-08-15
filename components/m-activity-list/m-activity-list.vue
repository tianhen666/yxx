<template>
	<view class="activity">
		<!-- 标题插槽 -->
		<slot name="title"></slot>

		<view class="activity_item" v-for="(item, index) in props.list" :key="index" @tap="jumpClick(item)">
			<image class="image" :src="item.img" mode="aspectFill"></image>
			<!-- 活动类型 -->
			<view class="type">{{ item.type }}活动</view>

			<!-- 带有背景区域 -->
			<view class="a_wrapper">
				<view class="title">{{ item.title }}</view>
				<!-- 价格时间 -->
				<view class="b_wrapper">
					<view class="price_wrapper">
						<view class="price">
							<text class="price_cn">￥</text>
							<text>{{ item.price }}</text>
						</view>
						<view class="originalPrice">
							<text>￥</text>
							<text class="through">{{ item.originalPrice }}</text>
						</view>
					</view>
					<view class="time">{{ item.time }}</view>
				</view>

				<!-- 参与 -->
				<view class="add_wrapper">
					<view class="left">
						<view class="img_wrapper">
							<image class="image" src="/static/default/tup4.jpg" mode="aspectFill"></image>
							<image class="image" :src="item.img" mode="aspectFill"></image>
							<image class="image" :src="item.img" mode="aspectFill"></image>
						</view>
						<view class="text">已有{{ item.jion }}人参与</view>
					</view>
					<view class="jion">参与{{ item.type }}</view>
				</view>
			</view>
			<!-- 间距 -->
			<view class="blank40" v-if="index < list.length - 1"></view>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	list: {
		required: true,
		type: Array,
		default() {
			return [
				{
					id: 123456,
					title: '测试标题测试标题测试标题测试标题测试标题测试标题测试',
					time: '2022.08.18-2022.08.28',
					img: '/static/default/banner.png',
					price: 888888888888,
					originalPrice: 888888888888,
					jion: 99,
					type: '拼团'
				}
			]
		}
	}
})

const jumpClick = item => {
	uni.navigateTo({
		url: `/pages-sub1/activityInfo/activityInfo`
	})
}
</script>

<style lang="scss" scoped>
.activity {
	width: $main-width;
	margin: auto;
	box-sizing: border-box;
	padding: $padding;
	border-radius: 8rpx;
	background-color: #fff;
	&_item {
		border-radius: 8rpx;
		overflow: hidden;
		position: relative;
		> .image {
			width: ($main-width)- ($padding * 2);
			height: (($main-width)- ($padding * 2)) * 3 * 0.2;
		}
		.type {
			position: absolute;
			left: 0;
			top: 0;
			color: #fff;
			background-color: #{$sub-color}CC;
			width: 128rpx;
			height: 48rpx;
			line-height: 48rpx;
			border-radius: 8rpx 0 12rpx 0;
			font-size: 24rpx;
			text-align: center;
		}
		.a_wrapper {
			padding: 24rpx;
			background-color: #f1f1f1;
			border-radius: 0 0 8rpx 8rpx;
			overflow: hidden;
			.title {
				color: $text-color;
				@include singleLineTextOverHidden;
				text-align: justify;
			}
			.b_wrapper {
				padding: 32rpx 0;
				@include mFlex;
				justify-content: space-between;
				.price_wrapper {
					flex: none;
					width: 263rpx;
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
				.time {
					color: $text-color-grey;
					font-size: 24rpx;
					width: 260rpx;
					flex: none;
					text-align: right;
				}
			}
			.add_wrapper {
				@include mFlex;
				justify-content: space-between;
				> .left {
					@include mFlex;
					justify-content: space-between;
					width: 270rpx;
					flex: none;
					.img_wrapper {
						margin-left: 24rpx;
						> .image {
							border-radius: 50%;
							width: 48rpx;
							height: 48rpx;
							display: inline-block;
							margin-left: -24rpx;
							overflow: hidden;
						}
					}
					> .text {
						font-size: 24rpx;
						color: $text-color-grey;
					}
				}
				> .jion {
					width: 144rpx;
					height: 56rpx;
					flex: none;
					border-radius: 8rpx;
					background-color: $sub-color;
					line-height: 56rpx;
					color: #fff;
					text-align: center;
					font-size: 24rpx;
				}
			}
		}
	}
}
</style>
