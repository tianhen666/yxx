<template>
	<view class="container">
		<view class="blank32"></view>
		<!-- 图文混排 -->
		<view class="box1 box">
			<!-- 剩余可用数量 -->
			<view class="box1_item2">{{ 0 > 0 ? '剩余1份商品可用' : '订单已完成' }}</view>

			<view class="box1_item">
				<view class="box1_item_left"><image :src="item.url" mode="aspectFill" class="goods_img"></image></view>
				<view class="box1_item_right">
					<view class="title">{{ item.title }}</view>

					<view class="box1_item_right_box">
						<!-- 价格 -->
						<view class="price">
							<text class="text1">实际付款：</text>
							<text class="price_cn">￥</text>
							<text class="num">{{ parseFloat(item.price) * parseInt(item.quantity) }}</text>
						</view>
						<!-- 数量 -->
						<view class="quantity">x{{ item.quantity }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="blank32"></view>

		<!-- 套餐详情 -->
		<view class="content_text box">
			<m-title2 title="套餐详情"></m-title2>
			<text class="text">1、成年人洗牙4次\n1、成年人洗牙4次\n1、成年人洗牙4次</text>
		</view>
		<view class="blank32"></view>

		<!-- 订单列表 -->
		<view class="box2 box">
			<m-title2 title="订单信息"></m-title2>
			<view class="box2_item">
				<view class="box2_item_left">订单金额</view>
				<view class="box2_item_right">￥0.01</view>
			</view>
			<view class="box2_item">
				<view class="box2_item_left">购买人</view>
				<view class="box2_item_right">派大星</view>
			</view>
			<view class="box2_item">
				<view class="box2_item_left">购买人</view>
				<view class="box2_item_right">派大星</view>
			</view>
			<view class="box2_item">
				<view class="box2_item_left">购买人</view>
				<view class="box2_item_right">派大星</view>
			</view>
			<view class="box2_item">
				<view class="box2_item_left">购买人</view>
				<view class="box2_item_right">派大星</view>
			</view>
			<view class="box2_item">
				<view class="box2_item_left">购买人</view>
				<view class="box2_item_right">派大星</view>
			</view>
		</view>
		<view class="blank32"></view>

		<!-- 分佣信息 -->
		<view class="box3 box">
			<m-title2 title="分佣信息"></m-title2>
			<view class="box3_item">
				<view class="box3_item_left">邀请人</view>
				<view class="box3_item_right">
					<view class="box3_item_right_box">
						<image class="image" src="/static/default/tup4.jpg" mode="aspectFill"></image>
						<view class="name">天痕</view>
					</view>
					<view class="phone">17730225541</view>
				</view>
			</view>
			<view class="box3_item">
				<view class="box3_item_left">分佣金额</view>
				<view class="box3_item_right">￥0.01</view>
			</view>
		</view>

		<!-- 联系客户拨打电话 -->
		<m-btn-fix-bottom text="联系客户" @btnClick="makePhoneCall('17730225541')"></m-btn-fix-bottom>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { navigateTo, makePhoneCall } from '@/aTemp/utils/uniAppTools.js'
const item = ref({
	orderSN: 'PR2022071614245246',
	type: 0,
	title: '金属托槽矫正金属托槽矫正金属托槽矫金属托槽矫正金属托槽矫正金属托槽矫',
	price: 88,
	quantity: 2,
	url: '/static/default/banner.png',
	time: '2022-8-16 12:33:10'
})
</script>

<style scoped lang="scss">
:global(page) {
	background-color: $uni-bg-color !important;
}
.container {
	.box {
		background-color: #fff;
		padding: $padding;
		width: $main-width;
		margin: auto;
		border-radius: 16rpx;
	}
	.box1 {
		&_item {
			@include mFlex;
			justify-content: space-between;
			align-items: stretch;
			&_left {
				flex: none;
				.goods_img {
					width: 120rpx;
					height: 120rpx;
					border-radius: 8rpx;
				}
			}
			&_right {
				flex: auto;
				overflow: hidden;
				margin-left: 20rpx;
				> .title {
					color: $text-color;
					font-size: 26rpx;
					@include singleLineTextOverHidden;
					margin-bottom: 40rpx;
					margin-top: 10rpx;
					text-align: justify;
				}
				&_box {
					@include mFlex;
					justify-content: space-between;
					.price {
						flex: auto;
						overflow: hidden;
						color: $sub-color;
						font-size: 32rpx;
						.text1 {
							color: $text-color-grey;
							font-size: 24rpx;
						}
						.num {
							font-weight: bold;
						}
						&_cn {
							font-size: 20rpx;
						}
					}
					> .quantity {
						color: $text-color-grey;
						font-size: 28rpx;
					}
				}
			}
		}
		&_item2 {
			padding-bottom: 32rpx;
			font-size: 30rpx;
			color: $main-color;
			font-weight: bold;
		}
	}

	.content_text {
		background-color: #fff;
		padding: 32rpx;
		width: $main-width;
		box-sizing: border-box;
		margin: auto;
		border-radius: 16rpx;
		> .text {
			display: block;
			border: 1px solid #f0f0f0;
			border-radius: 16rpx;
			padding: 20rpx;
			color: $text-color;
			font-size: 26rpx;
			line-height: 1.8;
		}
	}
	.box2 {
		&_item {
			@include mFlex;
			justify-content: space-between;
			margin-bottom: 35rpx;
			&:last-child {
				margin-bottom: 0;
			}
			&_left {
				color: #999;
				font-size: 26rpx;
			}
			&_right {
				font-size: 26rpx;
			}
		}
	}
	.box3 {
		&_item {
			@include mFlex;
			justify-content: space-between;
			margin-bottom: 40rpx;
			&:last-child {
				margin-bottom: 0;
			}
			&_left {
				flex: auto;
				color: #999;
				font-size: 26rpx;
			}
			&_right {
				flex: none;
				font-size: 26rpx;
				&_box {
					@include mFlex;
					justify-content: flex-end;
					> .image {
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
					}
					> .name {
						padding-left: 20rpx;
					}
				}
				> .phone {
					padding-top: 10rpx;
					color: #999;
				}
			}
		}
	}
}
</style>
