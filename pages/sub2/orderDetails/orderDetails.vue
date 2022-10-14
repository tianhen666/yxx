<template>
	<m-page-loading v-if="loading"></m-page-loading>

	<view class="container" v-else>
		<view class="blank32"></view>
		<!-- 图文混排 -->
		<view class="box1 box">
			<!-- 剩余可用数量 -->
			<view class="box1_item2">{{ orderDetail.status === 2 ? '订单未使用	' : '订单已完成' }}</view>

			<view class="box1_item">
				<view class="box1_item_left">
					<image
						:src="orderDetail.productPic ? orderDetail.productPic.split(',')[0] : '/static/images/no_img.jpg'"
						mode="aspectFill"
						class="goods_img"
					></image>
				</view>
				<view class="box1_item_right">
					<view class="title">{{ orderDetail.productName }}</view>

					<view class="box1_item_right_box">
						<!-- 价格 -->
						<view class="price">
							<text class="text1">实际付款：</text>
							<text class="price_cn">￥</text>
							<text class="num">{{ orderDetail.payPrice }}</text>
						</view>
						<!-- 数量 -->
						<view class="quantity">x{{ orderDetail.count }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="blank32"></view>

		<!-- 套餐详情 -->
		<view class="content_text box">
			<m-title2 title="套餐详情"></m-title2>
			<text class="text">{{ orderDetail.producttitle }}</text>
		</view>
		<view class="blank32"></view>

		<!-- 订单列表 -->
		<view class="box2 box">
			<m-title2 title="订单信息"></m-title2>
			<view class="box2_item">
				<view class="box2_item_left">订单金额</view>
				<view class="box2_item_right">￥{{ orderDetail.payPrice }}</view>
			</view>
			<view class="box2_item" @tap="setClipboardData(user.nickname)">
				<view class="box2_item_left">购买人</view>
				<view class="box2_item_right">{{ user.nickname || user.remarkname }}</view>
			</view>
			<view class="box2_item" @tap="setClipboardData(user.mobile)">
				<view class="box2_item_left">手机号</view>
				<view class="box2_item_right">{{ user.mobile }}</view>
			</view>
			<view class="box2_item" @tap="setClipboardData(orderDetail.orderNo)">
				<view class="box2_item_left">订单号</view>
				<view class="box2_item_right">{{ orderDetail.orderNo }}</view>
			</view>
			<view class="box2_item">
				<view class="box2_item_left">下单时间</view>
				<view class="box2_item_right">{{ dayjs(orderDetail.createDt).format('YYYY-MM-DD HH:mm:ss') }}</view>
			</view>
			<view class="box2_item">
				<view class="box2_item_left">支付时间</view>
				<view class="box2_item_right">
					{{ orderDetail.payDt ? dayjs(orderDetail.payDt).format('YYYY-MM-DD HH:mm:ss') : '未支付' }}
				</view>
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
						<image
							class="image"
							:src="userInvite.avatar || '/static/images/default_avatar.png'"
							mode="aspectFill"
						></image>
						<view class="name">{{ userInvite.nickname || userInvite.remarkname }}</view>
					</view>
					<view class="phone">{{ userInvite.mobile }}</view>
				</view>
			</view>
			<view class="box3_item">
				<view class="box3_item_left">分佣金额</view>
				<view class="box3_item_right">￥{{ orderDetail.sharePrice }}</view>
			</view>
		</view>

		<!-- 联系客户拨打电话 -->
		<m-btn-fix-bottom text="联系客户" @btnClick="makePhoneCall(userInvite.mobile)"></m-btn-fix-bottom>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { navigateTo, makePhoneCall } from '@/aTemp/utils/uniAppTools.js'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { _orderGetinfo } from '@/aTemp/apis/order.js'
import { showToastText, setClipboardData } from '@/aTemp/utils/uniAppTools.js'
import dayjs from 'dayjs'

// 订单编号ID
const orderNo = ref('')
// 加载中
const loading = ref(true)
// 订单详情
const orderDetail = ref({})
// 邀请人
const userInvite = ref({})
// 下单用户
const user = ref({})

// 页面开始加载
onLoad(async options => {
	// console.log(options)

	orderNo.value = options.orderNo || ''

	// 获取订单详情信息
	_orderGetinfo({
		orderNo: orderNo.value
	}).then(res => {
		const { data, code, msg } = res
		orderDetail.value = data.orderDetail
		user.value = data.user
		userInvite.value = data.userInvite

		setTimeout(()=>{
			loading.value = false
		},1000)
	})
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
					border: 1px solid #f0f0f0;
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
					margin-bottom: 30rpx;
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
			border: 1px solid #ddd;
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
			margin-bottom: 30rpx;
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
