<template>
	<!-- 标题栏 -->
	<uni-nav-bar
		@clickLeft="clickLeft"
		left-icon="left"
		title="订单详情"
		statusBar
		fixed
		color="#ffffff"
		:border="false"
	></uni-nav-bar>

	<!-- 标识是否使用 -->
	<view class="status_box">
		<image class="image" src="/static/default/w_time.png" mode="aspectFill"></image>
		<view class="text">已使用</view>
	</view>
	<view class="bg"></view>

	<view class="box1">
		<m-title2 title="商品信息"></m-title2>

		<!-- 图文信息 -->
		<m-left-right-layout rightWidth="430rpx">
			<template #left>
				<image src="/static/default/banner.png" mode="aspectFill" class="goods_img"></image>
			</template>

			<template #right>
				<!-- 左右布局 -->
				<m-left-right-layout rightWidth="100rpx" alignItems="flex-start">
					<template #left>
						<!-- 标题 -->
						<view class="title">金属托槽矫正金属托槽矫正金属托槽矫金属托槽矫正金属托槽矫正金属托槽矫</view>
						<!-- 提示 -->
						<view class="tips">
							<icon type="warn" size="26rpx" color="#F73639" />
							<text class="text">购买后不可退换</text>
						</view>
					</template>

					<template #right>
						<!-- 价格 -->
						<view class="price">
							<text class="price_cn">￥</text>
							<text>88</text>
						</view>
						<!-- 数量 -->
						<view class="quantity">x1</view>
					</template>
				</m-left-right-layout>
			</template>
		</m-left-right-layout>

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

		<view class="box2_item">
			<view class="left">订单金额</view>
			<view class="right">￥88</view>
		</view>
		<view class="box2_item">
			<view class="left">购买人</view>
			<view class="right">￥88</view>
		</view>
		<view class="box2_item">
			<view class="left">手机号</view>
			<view class="right">￥88</view>
		</view>
		<view class="box2_item">
			<view class="left">订单号</view>
			<view class="right">￥88</view>
		</view>
		<view class="box2_item">
			<view class="left">下单时间</view>
			<view class="right">￥88</view>
		</view>
		<view class="box2_item">
			<view class="left">支付时间</view>
			<view class="right">￥88</view>
		</view>
	</view>
	<view class="blank32"></view>

	<view class="blank40"></view>
	<view class="blank40"></view>

	<!-- 底部按钮 -->
	<m-bottom-btn></m-bottom-btn>
</template>

<script setup>
const clickLeft = () => {
	uni.navigateBack()
}
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #f5f5f5;
}
:global(.bg) {
	height: 100rpx;
	width: 750rpx;
	background-image: linear-gradient($main-color 0%, transparent);
}
.status_box {
	@include mFlex;
	justify-content: left;
	padding: $padding;
	background-color: $main-color;
	> .image {
		height: 40rpx;
		width: 40rpx;
		margin-right: 10rpx;
	}
	> .text {
		color: #ffffff;
		font-size: 32rpx;
	}
}
.box1 {
	width: $main-width;
	padding: $padding;
	background-color: #ffffff;
	box-sizing: border-box;
	margin: auto;
	border-radius: 16rpx;
	margin-top: -100rpx;
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
		margin-bottom: 32rpx;
		&:last-child {
			margin-bottom: 0;
		}
		> .left {
			color: $text-color-grey;
			font-size: 28rpx;
		}
		> .right {
			font-size: 28rpx;
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
