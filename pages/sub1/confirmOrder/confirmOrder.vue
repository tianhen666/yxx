<template>
	<view v-if="loading" style="padding:0 32rpx;"><ls-skeleton :skeleton="skeleton" :loading="loading" /></view>
	<view class="container" v-else>
		<view class="blank32"></view>
		<!-- 商品信息 -->
		<view class="box1 box">
			<m-title2 title="商品信息"></m-title2>

			<view class="box1_item">
				<!-- 商品图片 -->
				<view class="box1_item_left"><image class="goods_img" :src="dataObj.pics[0]" mode="aspectFill"></image></view>

				<view class="box1_item_right">
					<!-- 标题 -->
					<view class="title">{{ dataObj.title }}</view>

					<!-- 介绍 -->
					<view class="descData">{{ dataObj.descData }}</view>

					<!-- 提示 -->
					<view class="tips">
						<icon type="warn" size="28rpx" color="#F73639" />
						<text class="text">购买后不可退换</text>
					</view>
				</view>
			</view>
		</view>
		<view class="blank32"></view>

		<view class="box2 box">
			<m-title2 title="价格明细"></m-title2>

			<view class="box2_item">
				<view class="box2_item_left"><text class="text1">商品金额</text></view>

				<view class="box2_item_right">
					<view class="price">
						<text class="price_cn">￥</text>
						<text>{{ dataObj.price }}</text>
					</view>
				</view>
			</view>

			<view class="box2_item">
				<view class="box2_item_left">
					<text class="text1">购买数量</text>
					<text class="text2" v-if="dataObj.limitCount">此商品限购{{ dataObj.limitCount }}件</text>
				</view>

				<view class="box2_item_right">
					<uni-number-box :min="1" :max="dataObj.limitCount || 1000" v-model="quantity"></uni-number-box>
				</view>
			</view>

			<view class="box2_item">
				<view class="box2_item_left"><text class="text1">合计</text></view>

				<view class="box2_item_right">
					<text class="text2">需支付金额</text>
					<text class="price style1">
						<text class="price_cn">￥</text>
						<text>{{ parseFloat(quantity * dataObj.price).toFixed(2) }}</text>
					</text>
				</view>
			</view>
		</view>

		<!-- 底部按钮 -->
		<m-btn-fix-bottom text="确认支付" @btnClick="confirm" :loading="btnLoading"></m-btn-fix-bottom>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { _storeproductGetinfo } from '@/aTemp/apis/shop.js'
import { _wxpayPayment, _wxpayWxNotifys } from '@/aTemp/apis/store.js'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { navigateTo, showToastText, redirectTo } from '@/aTemp/utils/uniAppTools.js'
import { _debounce } from '@/aTemp/utils/tools.js'

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 骨架屏
import lsSkeleton from '@/components/ls-skeleton/ls-skeleton.nvue'
const skeleton = [64, 'title', 'news', 64, 'title', 'line-lg*3']

// 加载中
const loading = ref(true)
// 数据ID
const dataId = ref(0)
// 数据对象
const dataObj = ref({})
// 数量
const quantity = ref(1)

onLoad(options => {
	dataId.value = options.id || 0
	_storeproductGetinfo({ id: dataId.value }).then(res => {
		const { code, data, msg } = res
		;(data.detail = data.detail ? data.detail.split(',') : []), (data.pics = data.pics ? data.pics.split(',') : [])
		dataObj.value = data

		setTimeout(() => {
			loading.value = false
		}, 500)
	})
})

// 加载中
const btnLoading = ref(false)
const confirm = _debounce(
	() => {
		// 判断是否授权登录
		if (!useUserMain.isLogin) {
			navigateTo('/pages/main/login/login')
			btnLoading.value = false
			return
		}

		_wxpayPayment({ count: quantity.value, productId: dataId.value, enrollId: 0 })
			.then(res => {
				btnLoading.value = false
				const { data, code, msg } = res

				try {
					const resDataObj = JSON.parse(data)
					// console.log(resDataObj)

					// 订单编号
					const orderNumExternal = resDataObj.orderNumExternal

					// 支付信息
					const payInfo = JSON.parse(resDataObj.pay_info)
					// console.log(payInfo)

					// 唤醒支付
					uni
						.requestPayment({
							timeStamp: payInfo.timeStamp,
							nonceStr: payInfo.nonceStr,
							package: payInfo.package,
							signType: payInfo.signType,
							paySign: payInfo.sign
						})
						.then(val => {
							showToastText('支付成功~')

							// 支付成功回调，并且分账 status: 2 //待使用
							const myParameter = { orderNumExternal: orderNumExternal, status: 2 }
							_wxpayWxNotifys(myParameter).then(resData => {
								console.log('resData')
							})
							// 去订单列表页
							redirectTo('/pages/sub1/orderList/orderList?current=2')
						})
						.catch(err => {
							// 去订单列表页
							redirectTo('/pages/sub1/orderList/orderList?current=1')
							showToastText('取消支付~')
						})
				} catch (e) {
					// 错误信息
					console.log(err)

					try {
						// 支付返回信息
						const resDataObj = JSON.parse(data)
						showToastText(resDataObj.result_msg || '支付失败')
					} catch (e) {
						showToastText(data || '支付失败')
					}
				}
			})
			.catch(err => {
				btnLoading.value = false
				console.log(err)
			})
	},
	1000,
	btnLoading
)
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: $uni-bg-color;
}
.box {
	background-color: #ffffff;
	padding: 32rpx;
	width: $main-width;
	margin: auto;
	border-radius: 16rpx;
}

.box1 {
	&_item {
		@include mFlex;
		justify-content: space-between;
		&_left {
			width: 180rpx;
			height: 180rpx;
			flex: none;
			.goods_img {
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
			}
		}
		&_right {
			flex: auto;
			overflow: hidden;
			padding-left: 32rpx;
			> .title {
				@include singleLineTextOverHidden;
				margin-bottom: 14rpx;
				font-size: 30rpx;
			}
			> .descData {
				display: block;
				color: #999;
				font-size: 26rpx;
				line-height: 1.6;
				min-height: 80rpx;
				margin-bottom: 14rpx;
				@include textOverHidden;
			}
			> .tips {
				@include mFlex;
				justify-content: flex-start;
				> .text {
					color: $sub-color;
					font-size: 24rpx;
					margin-left: 20rpx;
				}
			}
		}
	}
}

.box2 {
	&_item {
		@include mFlex;
		justify-content: space-between;
		padding-bottom: 32rpx;
		margin-bottom: 32rpx;
		border-bottom: 1px solid $uni-border-2;
		white-space: nowrap;
		&:last-child {
			margin-bottom: 0;
			padding-bottom: 0;
			border: none;
		}
		&_left {
			flex: auto;
			overflow: hidden;
			padding-right: 20rpx;
		}
		&_right {
			.price {
				color: #666;
				font-size: 32rpx;
				white-space: nowrap;
				&_cn {
					font-size: 24rpx;
				}
			}
			.style1 {
				font-weight: bold;
				color: $sub-color;
			}
		}

		.text1 {
			font-size: 30rpx;
			color: $text-color;
			padding-right: 20rpx;
		}
		.text2 {
			color: $text-color-grey;
			font-size: 24rpx;
			padding-right: 20rpx;
		}
	}
}
</style>
