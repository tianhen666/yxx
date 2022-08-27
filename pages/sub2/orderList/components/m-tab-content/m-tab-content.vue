<template>
	<view class="container">
		<view
			class="container_item"
			v-for="(item, index) in props.listData"
			:key="index"
			@tap="navigateTo('/pages/sub2/orderDetails/orderDetails')"
		>
			<!-- 订单编号，订单状态 -->
			<view class="container_item_box">
				<view class="container_item_box_left">
					<view class="order_sn">订单号：{{ item.orderSN }}</view>
				</view>
				<view class="container_item_box_right">
					<view class="order_status style1" v-if="item.type === 0">未使用</view>
					<view class="order_status style2" v-else-if="item.type === 1">已完成</view>
				</view>
			</view>
			<view class="blank32"></view>

			<!-- 图文信息 -->
			<view class="container_item_box1">
				<view class="container_item_box1_left">
					<image :src="item.url" mode="aspectFill" class="goods_img"></image>
				</view>
				<view class="container_item_box1_right">
					<view class="title">{{ item.title }}</view>

					<view class="container_item_box1_right_box">
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

			<view class="blank32"></view>
			<view class="order_btn_box">
				<view class="time" v-if="item.type === 0">支付时间: {{ item.time }}</view>
				<view class="time" v-if="item.type === 1">完成时间: {{ item.time }}</view>
				<view class="item_btn style1" @tap.stop.prevent="makePhoneCall('17730225541')">联系卖家</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { navigateTo, makePhoneCall } from '@/aTemp/utils/uniAppTools.js'

import { ref } from 'vue'
import dayjs from 'dayjs'
const props = defineProps({
	listData: {
		type: Array,
		required: true,
		default() {
			return []
		}
	}
})
const showTime = ref('')
</script>

<style lang="scss" scoped>
.container {
	padding-bottom: 90rpx;
	.container_item {
		padding: $padding;
		background-color: #ffffff;
		width: $main-width;
		margin: auto;
		margin-bottom: 32rpx;
		border-radius: 16rpx;
		&:last-child {
			margin-bottom: 0;
		}

		&_box {
			@include mFlex;
			justify-content: space-between;
			&_left {
				flex: auto;
				.order_sn {
					color: $text-color-grey;
					font-size: 26rpx;
				}
			}
			&_right {
				> .order_status {
					font-size: 26rpx;
				}
				> .style1 {
					color: $sub-color;
				}
				> .style2 {
					color: $text-color-grey;
				}
				> .style3 {
					color: $text-color-grey;
				}
			}
		}

		&_box1 {
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
						font-size: 30rpx;
						.text1 {
							color: $text-color-grey;
							font-size: 24rpx;
						}
						.num {
							font-weight: bold;
						}
						&_cn {
							font-size: 22rpx;
						}
					}
					> .quantity {
						color: $text-color-grey;
						font-size: 26rpx;
					}
				}
			}
		}

		.order_btn_box {
			@include mFlex;
			justify-content: space-between;
			> .time {
				flex: auto;
				margin-right: 20rpx;
				color: #999;
				font-size: 26rpx;
			}
			.item_btn {
				@include mFlex;
				width: 150rpx;
				height: 55rpx;
				border-radius: 55rpx;
				text-align: center;
				font-size: 24rpx;
			}
			> .style1 {
				border: 1px solid $sub-color;
				color: $sub-color;
			}
			> .style2 {
				border: 1px solid $text-color-grey;
				color: $text-color-grey;
			}
			> .style3 {
				border: 1px solid $text-color-grey;
				color: $text-color-grey;
			}
		}
	}
}
</style>
