<template>
	<view class="container">
		<view class="container_item" v-for="(item, index) in props.listData" :key="index" @tap="navigateTo('/pages/sub1/orderDetails/orderDetails')">
			<!-- 订单编号，订单状态 -->
			<view class="container_item_box">
				<view class="container_item_box_left">
					<view class="order_sn">订单号：{{ item.orderSN }}</view>
				</view>
				<view class="container_item_box_right">
					<view class="order_status style1" v-if="item.type === 1">待付款</view>
					<view class="order_status style2" v-else-if="item.type === 2">待使用</view>
					<view class="order_status  style3" v-else-if="item.type === 3">已完成</view>
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
						<text class="price">
							<text class="text1">实际付款：</text>
							<text class="price_cn">￥</text>
							<text>{{ parseFloat(item.price) * parseInt(item.quantity) }}</text>
						</text>
						<!-- 数量 -->
						<view class="quantity">x{{ item.quantity }}</view>
					</view>
				</view>
			</view>

			<view class="blank32"></view>
			<view class="order_btn_box">
				<view class="time">待支付: 剩余时间{{ showTime }}</view>
				<view class="item_btn style1" v-if="item.type === 0">去付款</view>
				<view class="item_btn style2" v-else-if="item.type === 1">去使用</view>
				<view class="item_btn  style3" v-else-if="item.type === 2">去评价</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { countDown } from '@/aTemp/utils/tools.js'
import {navigateTo} from '@/aTemp/utils/uniAppTools.js';
const props = defineProps({
	listData: {
		type: Array,
		required: true,
		default() {
			return [
				{
					orderSN: 'PR2022071614245246',
					type: 1,
					title: '金属托槽矫正金属托槽矫正金属托槽矫金属托槽矫正金属托槽矫正金属托槽矫',
					price: 88,
					quantity: 2,
					url: '/static/default/banner.png'
				},
				{
					orderSN: 'PR2022071614245246',
					type: 2,
					title: '金属托槽矫正金属托槽矫正金属托槽矫金属托槽矫正金属托槽矫正金属托槽矫',
					price: 88,
					quantity: 2,
					url: '/static/default/banner.png'
				},
				{
					orderSN: 'PR2022071614245246',
					type: 3,
					title: '金属托槽矫正金属托槽矫正金属托槽矫金属托槽矫正金属托槽矫正金属托槽矫',
					price: 88,
					quantity: 1,
					url: '/static/default/banner.png'
				}
			]
		}
	}
})

const time1 = dayjs().add(10, 'second')
const showTime = ref('')
countDown(time1, showTime)
</script>

<style lang="scss" scoped>
.container {
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
					> .price {
						flex: auto;
						overflow: hidden;
						color: $sub-color;
						font-size: 28rpx;
						.text1 {
							color: $text-color-grey;
							font-size: 24rpx;
						}
						&_cn {
							font-size: 24rpx;
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
				color: $sub-color;
				font-size: 26rpx;
			}
			.item_btn {
				width: 120rpx;
				height: 48rpx;
				border-radius: 48rpx;
				line-height: 48rpx;
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
