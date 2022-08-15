<template>
	<view class="container">
		<view class="container_item" v-for="(item, index) in props.listData" :key="index" @tap="toDetails">
			<!-- 订单编号，订单状态 -->
			<m-left-right-layout>
				<template #left>
					<view class="order_sn">订单号：{{ item.orderSN }}</view>
				</template>
				<template #right>
					<view class="order_status order_status_color1" v-if="item.type === 1">待付款</view>
					<view class="order_status order_status_color2" v-else-if="item.type === 2">待使用</view>
					<view class="order_status  order_status_color3" v-else-if="item.type === 3">已完成</view>
				</template>
			</m-left-right-layout>
			<view class="blank20"></view>

			<!-- 图文信息 -->
			<m-left-right-layout rightWidth="500rpx">
				<template #left>
					<image :src="item.url" mode="aspectFill" class="goods_img"></image>
				</template>

				<template #right>
					<!-- 左右布局 -->
					<m-left-right-layout rightWidth="150rpx" alignItems="flex-start">
						<template #left>
							<view class="title">{{ item.title }}</view>
							<!-- 价格 -->
							<text class="price">
								<text class="text1">实际付款：</text>
								<text class="price_cn">￥</text>
								<text>{{ parseFloat(item.price) * parseInt(item.quantity) }}</text>
							</text>
						</template>

						<template #right>
							<!-- 价格 -->
							<view class="price">
								<text class="price_cn">￥</text>
								<text>{{ item.price }}</text>
							</view>
							<!-- 数量 -->
							<view class="quantity">x{{ item.quantity }}</view>
						</template>
					</m-left-right-layout>
				</template>
			</m-left-right-layout>

			<view class="order_btn_box">
				<view class="item_btn item_btn_color1" v-if="item.type === 1">去付款</view>
				<view class="item_btn item_btn_color2" v-else-if="item.type === 2">去使用</view>
				<view class="item_btn  item_btn_color3" v-else-if="item.type === 3">去评价</view>
			</view>
		</view>
	</view>
</template>

<script setup>
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

const toDetails = () => {
	uni.navigateTo({
		url: '/pages-sub1/orderDetails/orderDetails'
	})
}
</script>

<style lang="scss" scoped>
.container {
	.container_item {
		padding: $padding;
		background-color: #ffffff;
		margin-bottom: 20rpx;
		&:last-child {
			margin-bottom: 0;
		}
		.order_sn {
			color: $text-color-grey;
			font-size: 24rpx;
		}
		.order_status {
			font-size: 24rpx;
		}
		.order_status_color1 {
			color: $sub-color;
		}
		.order_status_color2 {
			color: $text-color-grey;
		}
		.order_status_color3 {
			color: $text-color-grey;
		}
		.goods_img {
			width: 160rpx;
			height: 160rpx;
			border-radius: 8rpx;
		}
		
		.title {
			color: $text-color;
			font-size: 28rpx;
			@include textOverHidden;
			line-height: 1.5;
			margin-bottom: 20rpx;
			text-align: justify;
		}
		.text1 {
			color: $text-color-grey;
			font-size: 24rpx;
		}
		.price {
			color: $sub-color;
			font-size: 28rpx;
			text-align: right;
			&_cn {
				font-size: 24rpx;
			}
		}
		.quantity {
			color: $text-color-grey;
			font-size: 24rpx;
			text-align: right;
			margin-top: 30rpx;
		}
		.order_btn_box {
			margin-top: 10rpx;
			text-align: right;
			.item_btn {
				display: inline-block;
				width: 120rpx;
				height: 48rpx;
				border-radius: 48rpx;
				line-height: 48rpx;
				text-align: center;
				font-size: 24rpx;
			}
			.item_btn_color1 {
				border: 1px solid $sub-color;
				color: $sub-color;
			}
			.item_btn_color2 {
				border: 1px solid $text-color-grey;
				color: $text-color-grey;
			}
			.item_btn_color3 {
				border: 1px solid $text-color-grey;
				color: $text-color-grey;
			}
		}
	}
}
</style>
