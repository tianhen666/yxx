<template>
	<view class="container">
		<view
			class="container_item"
			v-for="(item, index) in props.listData"
			:key="index"
			@tap="navigateTo(`/pages/sub2/orderDetails/orderDetails?orderNo=${item.orderNo}`)"
		>
			<!-- 订单编号，订单状态 -->
			<view class="container_item_box">
				<view class="container_item_box_left">
					<view class="order_sn">订单号：{{ item.orderNo }}</view>
				</view>
				<view class="container_item_box_right">
					<view class="order_status style1" v-if="item.status === 2">未使用</view>
					<view class="order_status style2" v-else-if="item.status === 3">已完成</view>
				</view>
			</view>
			<view class="blank32"></view>

			<!-- 图文信息 -->
			<view class="container_item_box1">
				<view class="container_item_box1_left">
					<image
						:src="item.productPic.split(',')[0] || '/static/images/no_img.jpg'"
						mode="aspectFill"
						class="goods_img"
					></image>
				</view>
				<view class="container_item_box1_right">
					<view class="title">{{ item.productName }}</view>
					<view class="source">
						来源:{{ item.enrollId == 1 ? '活动' : item.enrollId == 0 ? '商品' : '' }}
					</view>
					<view class="container_item_box1_right_box">
						<!-- 价格 -->
						<view class="price">
							<text class="text1">实际付款：</text>
							<text class="price_cn">￥</text>
							<text class="num">{{ item.payPrice }}</text>
						</view>
						<!-- 数量 -->
						<view class="quantity">x{{ item.count }}</view>
					</view>
				</view>
			</view>

			<view class="blank32"></view>
			<view class="order_btn_box">
				<view class="time" v-if="item.status === 2">
					支付时间: {{ dayjs(item.payDt).format('YYYY-MM-DD HH:mm:ss') }}
				</view>
				<view class="time" v-if="item.status === 3">
					完成时间: {{ dayjs(item.completeDt).format('YYYY-MM-DD HH:mm:ss') }}
				</view>
				<view class="item_btn style1" @tap.stop.prevent="makePhoneCall(item.mobile)">
					联系顾客
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { navigateTo, makePhoneCall } from '@/aTemp/utils/uniAppTools.js';
import { ref } from 'vue';
import dayjs from 'dayjs';
const props = defineProps({
	listData: {
		type: Array,
		required: true,
		default() {
			return [];
		}
	}
});
const showTime = ref('');
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
				> .source {
					font-size: 25rpx;
					font-weight: normal;
					color: $text-color-grey;
					margin: 20rpx 0;
				}
				> .title {
					color: $text-color;
					font-size: 26rpx;
					@include singleLineTextOverHidden;
					text-align: justify;
				}
				&_box {
					@include mFlex;
					justify-content: space-between;
					line-height: 1;
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
