<template>
	<view class="container">
		<view
			class="container_item"
			v-for="(item, index) in listData"
			:key="index"
			@tap="navigateTo('/pages/sub1/orderDetails/orderDetails')"
		>
			<!-- 订单编号，订单状态 -->
			<view class="container_item_box">
				<view class="container_item_box_left">
					<view class="order_sn">订单号：{{ item.orderNo }}</view>
				</view>
				<view class="container_item_box_right">
					<view class="order_status style1" v-if="item.status === 1">
						{{ dayjs(item.createDt).add(30, 'minute') - dayjs() > 0 ? '待支付' : '已过期' }}
					</view>
					<view class="order_status style2" v-else-if="item.status === 2">待使用</view>
					<view class="order_status  style3" v-else-if="item.status === 3">已完成</view>
				</view>
			</view>
			<view class="blank32"></view>

			<!-- 图文信息 -->
			<view class="container_item_box1">
				<view class="container_item_box1_left">
					<image :src="item.productPic" mode="aspectFill" class="goods_img"></image>
				</view>
				<view class="container_item_box1_right">
					<view class="title">{{ item.productName }}</view>

					<view class="container_item_box1_right_box">
						<!-- 价格 -->
						<text class="price">
							<text class="text1">实际付款：</text>
							<text class="price_cn">￥</text>
							<text>{{ parseFloat(item.price) * parseInt(item.count) }}</text>
						</text>
						<!-- 数量 -->
						<view class="quantity">x{{ item.count }}</view>
					</view>
				</view>
			</view>

			<view class="blank32"></view>
			<view class="order_btn_box">
				<!-- 待支付 -->
				<view class="time" v-if="item.status === 1">
					{{
						dayjs(item.createDt).add(30, 'minute') - dayjs() > 0
							? '待支付：剩余' + _getMinutes(item.createDt, 30) + '分钟'
							: '订单已过期，请重新下单'
					}}
				</view>
				<view class="item_btn style1" v-if="item.status === 1 && dayjs(item.createDt).add(30, 'minute') - dayjs() > 0">
					去付款
				</view>

				<!-- 已支付 -->
				<view class="time timeStyle1" v-if="item.status === 2">
					支付时间：{{ dayjs(item.payDt).format('YYYY-MM-DD HH:mm:ss') }}
				</view>
				<view class="item_btn style2" v-if="item.status === 2">去使用</view>

				<!-- 已使用 -->
				<view class="time timeStyle1" v-if="item.status === 3 || item.status === 4">
					完成时间：{{ dayjs(item.payDt).format('YYYY-MM-DD HH:mm:ss') }}
				</view>
				<view class="item_btn  style3" v-if="item.status === 3">去评论</view>
				<view class="item_btn  style3" v-if="item.status === 4">已评论</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { _getMinutes } from '@/aTemp/utils/tools.js'
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'
const props = defineProps({
	listData: {
		type: Array,
		required: true,
		default() {
			return []
		}
	}
})
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
			> .timeStyle1 {
				color: $text-color-grey;
			}
			.item_btn {
				@include mFlex;
				width: 120rpx;
				height: 48rpx;
				border-radius: 48rpx;
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
