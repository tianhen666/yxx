<template>
	<view class="container">
		<view class="container_item" v-for="(item, index) in listData" :key="item.spo.id">
			<!-- 订单编号，订单状态 -->
			<view class="container_item_box">
				<view class="container_item_box_left">
					<view class="order_sn">
						购买人：{{ item.user.remarkname || item.user.nickname || '未授权' }}
					</view>
					<view class="order_sn" style="margin-top: 25rpx;">
						手机号：{{ item.user.mobile }}
					</view>
				</view>
				<view class="container_item_box_right">
					<view
						class="order_status"
						v-if="item.spo.status === 1"
						:class="{ style1: dayjs(item.spo.createDt).add(5, 'minute') - dayjs() > 0 }"
					>
						{{
							dayjs(item.spo.createDt).add(5, 'minute') - dayjs() > 0
								? '待支付'
								: '未支付'
						}}
					</view>
					<view class="order_status style2" v-else-if="item.spo.status === 2">
						待使用
					</view>
					<view class="order_status  style3" v-else-if="item.spo.status === 3">
						已完成
					</view>
				</view>
			</view>
			<view class="blank32"></view>

			<!-- 图文信息 -->
			<view class="container_item_box1">
				<view class="container_item_box1_left">
					<image
						:src="
							item.spo.productPic
								? item.spo.productPic.split(',')[0]
								: '/static/images/no_img.jpg'
						"
						mode="aspectFill"
						class="goods_img"
					></image>
				</view>
				<view class="container_item_box1_right">
					<view class="title">{{ item.spo.productName }}</view>
					<view class="source">
						来源:{{
							item.spo.enrollId == 1 ? '活动' : item.spo.enrollId == 0 ? '商品' : ''
						}}
					</view>

					<view class="container_item_box1_right_box">
						<!-- 价格 -->
						<text class="price">
							<text class="text1">实际付款：</text>
							<text class="price_cn">￥</text>
							<text>{{ parseFloat(item.spo.price) * parseInt(item.spo.count) }}</text>
						</text>
						<!-- 数量 -->
						<view class="quantity">x{{ item.spo.count }}</view>
					</view>
				</view>
			</view>

			<view class="order_btn_box">
				<!-- 已支付 -->
				<view class="time timeStyle2" v-if="item.spo.status === 2">
					支付时间：{{ dayjs(item.spo.payDt).format('YYYY-MM-DD HH:mm:ss') }}
				</view>

				<!-- 已使用 -->
				<view class="time timeStyle1" v-if="item.spo.status === 3 || item.spo.status === 4">
					完成时间：{{ dayjs(item.spo.completeDt).format('YYYY-MM-DD HH:mm:ss') }}
				</view>
			</view>
		</view>
		<view v-if="listData.length == 0" class="empty">没有数据了</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';
import { _getMinutes, _debounce } from '@/aTemp/utils/tools.js';
import { navigateTo, showToastText } from '@/aTemp/utils/uniAppTools.js';
import { _orderPayment } from '@/aTemp/apis/order.js';
import { _wxpayWxNotifys } from '@/aTemp/apis/store.js';
const props = defineProps({
	listData: {
		type: Array,
		required: true,
		default() {
			return [];
		}
	}
});
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
					color: $text-color-grey;
				}
				> .style1 {
				}
				> .style2 {
					color: $main-color;
				}
				> .style3 {
					color: $sub-color;
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
					text-align: justify;
				}
				> .source {
					font-size: 25rpx;
					font-weight: normal;
					color: $text-color-grey;
					margin: 20rpx 0;
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
				font-size: 26rpx;
				color: $text-color-grey;
				padding-top: 20rpx;
			}
			> .timeStyle1 {
				color: $sub-color;
			}
			> .timeStyle2 {
				color: $main-color;
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

	.empty {
		text-align: center;
		margin-top: 50rpx;
	}
}
</style>
