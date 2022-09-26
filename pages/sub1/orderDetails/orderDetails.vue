<template>
	<m-page-loading v-if="loading"></m-page-loading>
	<view class="container" v-else>
		<!-- 背景 -->
		<view class="pageBg"><image class="image" src="/static/images/bg.jpg" mode="aspectFill"></image></view>
		<!-- #ifndef H5 -->
		<!-- 标题栏 -->
		<uni-nav-bar
			@clickLeft="navigateBack"
			left-icon="left"
			title="订单详情"
			statusBar
			fixed
			color="#ffffff"
			:border="false"
		></uni-nav-bar>
		<!-- #endif -->

		<view class="box1">
			<m-title2 title="商品信息"></m-title2>

			<!-- 图文信息 -->

			<image src="/static/default/banner.png" mode="aspectFill" class="goods_img"></image>
			<!-- 标题 -->
			<view class="title">{{ orderDetail[1].productName }}</view>
			<!-- 提示 -->
			<view class="tips">
				<icon type="warn" size="26rpx" color="#F73639" />
				<text class="text">购买后不可退换</text>
			</view>
			<!-- 价格 -->
			<view class="price">
				<text class="price_cn">￥</text>
				<text>{{ orderDetail[1].payPrice }}</text>
			</view>
			<!-- 数量 -->
			<view class="quantity">x{{ orderDetail[1].count }}</view>

			<view class="line"></view>
			<!-- 核销码 -->
			<image class="qrCode" src="/static/default/qrCode.png" mode="aspectFill"></image>
			<view class="blank20"></view>
			<view class="text_num">
				共
				<text class="text_color">1</text>
				张，剩余
				<text class="text_color">1</text>
				次可用
			</view>
			<view class="text_num">147 586 32</view>
			<view class="tips tips1">
				<icon type="warn" size="26rpx" color="#F73639" />
				<text class="text">请在到店使用时出示核销码</text>
			</view>
		</view>
		<view class="blank32"></view>

		<!-- 套餐详情 -->
		<view class="content_text">
			<m-title2 title="套餐详情"></m-title2>
			<text class="text">1、成年人洗牙4次\n1、成年人洗牙4次\n1、成年人洗牙4次</text>
		</view>
		<view class="blank32"></view>

		<view class="box2">
			<m-title2 title="订单信息"></m-title2>
			<view class="blank20"></view>
			
			<view class="box2_item">
				<view class="left">订单金额</view>
				<view class="right">￥{{ orderDetail[1].payPrice }}</view>
			</view>
			<view class="box2_item">
				<view class="left">购买人</view>
				<view class="right">{{ orderDetail[0].nickname || orderDetail[0].remarkname }}</view>
			</view>
			<view class="box2_item">
				<view class="left">手机号</view>
				<view class="right">{{ orderDetail[0].mobile }}</view>
			</view>
			<view class="box2_item">
				<view class="left">订单号</view>
				<view class="right">{{ orderDetail[1].orderNo }}</view>
			</view>
			<view class="box2_item">
				<view class="left">下单时间</view>
				<view class="right">{{ dayjs(orderDetail[1].createDt).format('YYYY-MM-DD HH:mm:ss') }}</view>
			</view>
			<view class="box2_item">
				<view class="left">支付时间</view>
				<view class="right">
					{{ orderDetail[1].payDt ? dayjs(orderDetail[1].payDt).format('YYYY-MM-DD HH:mm:ss') : '未支付' }}
				</view>
			</view>
		</view>
		<view class="blank32"></view>

		<view class="blank40"></view>
		<view class="blank40"></view>

		<!-- 底部按钮 -->
		<m-bottom-btn></m-bottom-btn>
	</view>
</template>

<script setup>
import dayjs from 'dayjs'
import { _orderGetinfo } from '@/aTemp/apis/order.js'
import { navigateBack } from '@/aTemp/utils/uniAppTools.js'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const orderNo = ref('')
const loading = ref(true)
const orderDetail = ref({})
// 页面加载
onLoad(option => {
	// 在传递的参数中获取订单编号
	orderNo.value = option.orderNo || ''

	// 获取订单列表
	_orderGetinfo({
		orderNo: orderNo.value
	}).then(res => {
		loading.value = false
		const { data, code, msg } = res
		orderDetail.value = data
	})
})
</script>

<style lang="scss" scoped>
.box1 {
	width: $main-width;
	padding: $padding;
	background-color: #ffffff;
	box-sizing: border-box;
	margin: auto;
	border-radius: 16rpx;
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
		margin-bottom: 30rpx;
		text-align: justify;
	}
	.tips {
		@include mFlex;
		justify-content: left;
		> .text {
			color: $sub-color;
			margin-left: 10rpx;
			font-size: 24rpx;
		}
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
	> .line {
		height: 1px;
		background-color: #f5f5f5;
		margin: 24rpx 0;
	}
	> .qrCode {
		width: 320rpx;
		height: 320rpx;
		margin: auto;
	}
	> .text_num {
		text-align: center;
		font-size: 28rpx;
		padding-bottom: 30rpx;
		.text_color {
			color: $sub-color;
		}
	}
	> .tips1 {
		justify-content: center;
	}
}

/* 订单信息 */
.box2 {
	background-color: #fff;
	padding: 32rpx;
	width: $main-width;
	box-sizing: border-box;
	margin: auto;
	border-radius: 16rpx;
	.box2_item {
		@include mFlex;
		justify-content: space-between;
		margin-bottom: 40rpx;
		&:last-child {
			margin-bottom: 0;
		}
		> .left {
			color: $text-color-grey;
			font-size: 26rpx;
		}
		> .right {
			font-size: 26rpx;
			color: $text-color-grey;
		}
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
		font-size: 28rpx;
		line-height: 2;
	}
}
</style>
