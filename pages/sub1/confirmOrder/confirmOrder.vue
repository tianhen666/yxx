<template>
	<view class="container">
		<view class="blank20"></view>

		<view class="box1">
			<m-title2 title="商品信息"></m-title2>
			<!-- 商品详情 -->
			<m-left-right-layout rightWidth="500rpx">
				<template #left>
					<image class="goods_img" src="/static/default/banner.png" mode="aspectFill"></image>
				</template>
				<template #right>
					<view class="goods_info">
						<!-- 标题 -->
						<view class="title">金属托槽矫正金属托槽矫正金属托槽矫金属托槽矫正金属托槽矫正金属托槽矫</view>
						<!-- 价格,数量 -->
						<view class="box1_box1">
							<view class="price">
								<text class="price_cn">￥</text>
								<text>8888888888888888888888888888</text>
							</view>
							<view class="quantity"><uni-number-box></uni-number-box></view>
						</view>
						<!-- 提示 -->
						<view class="tips">
							<icon type="warn" size="26rpx" color="#F73639" />
							<text class="text">购买后不可退换</text>
						</view>
					</view>
				</template>
			</m-left-right-layout>
		</view>
		<view class="blank20"></view>

		<view class="box2">
			<m-title2 title="价格明细"></m-title2>
			<view class="item">
				<m-left-right-layout>
					<template #left>
						<text class="text1" style="margin-right: 20rpx;">商品金额</text>
						<text class="text2">共8888888件商品</text>
					</template>
					<template #right>
						<view class="price">
							<text class="price_cn">￥</text>
							<text>88888888888</text>
						</view>
					</template>
				</m-left-right-layout>
			</view>
			<view class="item">
				<m-left-right-layout>
					<template #left>
						<text class="text1" style="margin-right: 20rpx;">合计</text>
					</template>
					<template #right>
						<text class="text2" style="margin-right: 20rpx;">需支付金额</text>
						<text class="price">
							<text class="price_cn">￥</text>
							<text>88888888888</text>
						</text>
					</template>
				</m-left-right-layout>
			</view>
		</view>

		<!-- 底部按钮 -->
		<view class="box3">
			<view class="wrapper">
				<m-left-right-layout rightWidth="320rpx">
					<template #left>
						<view class="money">
							<text>合计：</text>
							<text class="price">
								<text class="price_cn">￥</text>
								<text>88888888888</text>
							</text>
						</view>
					</template>
					<template #right>
						<view class="btn">确定订单</view>
					</template>
				</m-left-right-layout>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
:global(page) {
	background-color: #f5f5f5;
}
.container {
	.box1 {
		padding: 32rpx;
		background-color: #ffffff;
		.goods_img {
			width: 160rpx;
			height: 160rpx;
			border-radius: 8rpx
		}
		.goods_info {
			> .title {
				@include singleLineTextOverHidden;
				margin-bottom: 24rpx;
				font-size: 28rpx;
			}
			> .box1_box1 {
				@include mFlex;
				justify-content: space-between;
				margin-bottom: 24rpx;
				.price {
					flex: auto;
					overflow: hidden;
					color: $sub-color;
					font-size: 32rpx;
					white-space: nowrap;
					margin-right: 20rpx;
					&_cn {
						font-size: 24rpx;
					}
				}
				.quantity {
					flex: none;
				}
			}
			> .tips {
				@include mFlex;
				color: $sub-color;
				justify-content: left;
				font-size: 24rpx;
				> .text {
					margin-left: 10rpx;
				}
			}
		}
	}
	.box2 {
		background-color: #ffffff;
		padding: 32rpx;
		> .item {
			padding-bottom: 32rpx;
			margin-bottom: 32rpx;
			border-bottom: 1px solid $border-color;
			white-space: nowrap;
			&:last-child {
				margin-bottom: 0;
				padding-bottom: 0;
				border: none;
			}
		}
		.text1{
			font-size: 30rpx;
			color: $text-color;
		}
		.text2 {
			color: $text-color-grey;
			font-size: 24rpx;
		}
		.price {
			white-space: nowrap;
			font-size: 30rpx;
			color: $text-color;
			&_cn {
				font-size: 24rpx;
			}
		}
	}
	.box3 {
		height: 100rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		.wrapper {
			background-color: #ffffff;
			position: fixed;
			bottom: 0;
			left: 0;
			height: 100rpx;
			width: 100%;
			overflow: hidden;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
			.money {
				margin-left: 32rpx;
				font-size: 30rpx;
				.price {
					white-space: nowrap;
					&_cn {
						font-size: 24rpx;
					}
				}
			}
			.btn {
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				background-color: $sub-color;
				color: #ffffff;
			}
		}
	}
}
</style>
