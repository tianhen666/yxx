<template>
	<view class="activity">
		<view class="activity_item" v-for="(item, index) in props.list" :key="index" @tap="jumpClick(item)">
			<view class="activity_item_img">
				<image class="image" :src="item.img" mode="aspectFill"></image>
				<!-- 活动类型 -->
				<view class="type">
					<image class="image" :src="`/static/default/type${index + 1}.png`" mode="aspectFill"></image>
					<text class="text">{{ item.type }}活动</text>
				</view>
			</view>

			<!-- 带有背景区域 -->
			<view class="a_wrapper">
				<view class="title">{{ item.title }}</view>
				<!-- 价格时间 -->
				<view class="b_wrapper">
					<view class="time">{{ item.time }}</view>
					<view class="price_wrapper">
						<!-- 划线价格 -->
						<view class="originalPrice">
							<text class="through">￥{{ item.originalPrice }}</text>
						</view>
						<!-- 出售价格 -->
						<view class="price">
							<text class="price_cn">￥</text>
							<text>{{ item.price }}</text>
						</view>
					</view>
				</view>

				<!-- 参与 -->
				<view class="add_wrapper">
					<view class="left">
						<view class="img_wrapper">
							<view class="image_box style1">
								<image class="image" src="/static/default/tup4.jpg" mode="aspectFill"></image>
							</view>
							<view class="image_box style2">
								<image class="image" src="/static/default/tup4.jpg" mode="aspectFill"></image>
							</view>
							<view class="image_box style3">
								<image class="image" src="/static/default/tup4.jpg" mode="aspectFill"></image>
							</view>
						</view>
						<view class="text">已有{{ item.jion }}人参与</view>
					</view>
					<view class="jion" :class="`style${index + 1}`">
						<text>参与{{ item.type }}</text>
						<image class="image" :src="`/static/default/right${index + 1}.png`" mode="aspectFill"></image>
					</view>
				</view>
			</view>
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
					price: 2999,
					originalPrice: 4999,
					jion: 99,
					type: '拼团'
				},
				{
					id: 123456,
					title: '测试标题测试标题测试标题测试标题测试标题测试标题测试',
					time: '2022.08.18-2022.08.28',
					img: '/static/default/banner.png',
					price: 2999,
					originalPrice: 4999,
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
	&_item {
		border-radius: 20rpx;
		padding: 20rpx;
		background-color: #fff;
		overflow: hidden;
		margin-bottom: 32rpx;
		&:last-child {
			margin-bottom: 0;
		}
		> .activity_item_img {
			width: 100%;
			padding-top: 50%;
			position: relative;
			border-radius: 20rpx;
			overflow: hidden;
			> .image {
				border-radius: 20rpx;
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
			}
			.type {
				position: absolute;
				right: 0;
				top: 0;
				width: 154rpx;
				height: 64rpx;
				font-size: 24rpx;
				font-weight: 600;
				color: #fff;
				padding: 0 0 12rpx 12rpx;
				text-align: center;
				>.image{
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					right: 0;
					z-index: 1;
				}
				>.text{
					width: 100%;
					height: 100%;
					@include mFlex;
					position: relative;
					z-index: 2;
				}
			}
		}

		.a_wrapper {
			border-radius: 0 0 8rpx 8rpx;
			overflow: hidden;
			.title {
				padding: 20rpx 0;
				font-size: 28rpx;
				font-weight: 500;
				color: $text-color;
				@include singleLineTextOverHidden;
				text-align: justify;
			}
			.b_wrapper {
				@include mFlex;
				justify-content: space-between;

				> .time {
					width: 288rpx;
					height: 40rpx;
					background: #d5e6ff;
					border-radius: 21px;
					flex: none;
					font-weight: 400;
					color: #4b8eff;
					line-height: 24px;
					@include mFlex;
					font-size: 24rpx;
				}

				.price_wrapper {
					flex: none;
					width: 263rpx;
					overflow: hidden;
					flex-wrap: wrap;
					white-space: nowrap;
					@include mFlex;
					justify-content: flex-end;

					.price {
						color: $sub-color;
						font-size: 36rpx;
						font-weight: 400;
						&_cn {
							font-size: 24rpx;
						}
					}
					.originalPrice {
						margin-top: 8rpx;
						margin-right: 8rpx;
						color: #cdcdcd;
						font-size: 24rpx;
						font-weight: 400;
						.through {
							text-decoration: line-through;
						}
					}
				}
			}
			.add_wrapper {
				@include mFlex;
				justify-content: space-between;
				padding-top: 28rpx;
				> .left {
					@include mFlex;
					justify-content: flex-start;
					flex: auto;
					margin-right: 20rpx;
					.img_wrapper {
						flex: none;
						position: relative;
						overflow: hidden;
						height: 54rpx;
						width: 130rpx;
						> .image_box {
							position: absolute;
							top: 0;
							border-radius: 50%;
							width: 54rpx;
							height: 54rpx;
							padding: 2rpx;
							background-color: #efefef;
							overflow: hidden;
							> .image {
								width: 100%;
								height: 100%;
								border-radius: 50%;
							}
						}
						> .style1 {
							left: 0;
							z-index: 1;
						}
						> .style2 {
							left: 32rpx;
							z-index: 2;
						}
						> .style3 {
							left: 64rpx;
							z-index: 3;
						}
						> .style4 {
							left: 96rpx;
							z-index: 4;
						}
					}
					> .text {
						flex: auto;
						overflow: hidden;
						font-size: 24rpx;
						color: $text-color-grey;
						font-size: 24rpx;
						color: #cdcdcd;
					}
				}
				> .jion {
					@include mFlex;
					width: 156rpx;
					height: 48rpx;
					flex: none;
					border-radius: 48rpx;
					font-size: 24rpx;
					font-weight: 400;

					> .image {
						margin-left: 6rpx;
						width: 24rpx;
						height: 24rpx;
					}
				}
				.style1 {
					color: #4685fb;
					background: linear-gradient(to right, transparent, rgba(70, 133, 251, 0.3));
				}
				.style2 {
					color: #fb4646;
					background: linear-gradient(to right, transparent, rgba(251, 70, 70, 0.3));
				}
			}
		}
	}
}
</style>
