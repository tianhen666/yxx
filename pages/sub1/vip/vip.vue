<template>
	<m-page-loading v-if="pageLoading"></m-page-loading>

	<view class="container" v-else>
		<!-- 背景 -->
		<view class="pageBg"><image class="image" src="/static/images/bg.jpg" mode="aspectFill"></image></view>

		<!-- #ifndef H5 -->
		<!-- 标题栏 -->
		<uni-nav-bar
			@clickLeft="navigateBack"
			left-icon="left"
			title="会员中心"
			statusBar
			fixed
			color="#ffffff"
			:border="false"
		></uni-nav-bar>
		<!-- #endif -->

		<!-- 会员显示 -->
		<view class="box">
			<m-title2 title="会员服务"></m-title2>

			<view class="wrapper">
				<view
					class="item_wrapper"
					v-for="(item, index) in vipListData"
					:key="index"
					@tap="current = index"
					:class="{ current: current === index }"
				>
					<view class="text1">规格{{ index === 0 ? '一' : index === 1 ? '二' : '' }}</view>
					<view class="text2">{{ item.vipName }}</view>
					<view class="text3">{{ item.vipTitle }}</view>
					<view class="text4">
						<text class="text4_cn">￥</text>
						<text>{{ item.vipPaice }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 按钮 -->
		<m-btn-fix-bottom :loading="btnLoading" text="立即购买" @tap="storeVipOrderPayment" />
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { navigateBack, redirectTo, showToastText } from '@/aTemp/utils/uniAppTools.js'
import { _storeVipOrderPayment, _storeVipOrderOrderlist, _storeVipOrderWxNotifys } from '@/aTemp/apis/store.js'
import { _debounce } from '@/aTemp/utils/tools.js'
const pageLoading = ref(true)
const vipListData = ref([])

onLoad(options => {
	// console.log(options)

	_storeVipOrderOrderlist().then(res => {
		const { msg, data, code } = res
		vipListData.value = data

		pageLoading.value = false
	})
})

// 选中的规格
const current = ref(0)

// 提交订单函数
const btnLoading = ref(false)
const storeVipOrderPayment = _debounce(
	() => {
		_storeVipOrderPayment({ type: vipListData.value[current.value].id })
			.then(res => {
				btnLoading.value = false

				const { data, code, msg } = res

				// 唤醒支付所需要的参数
				const resDataObj = JSON.parse(data)
				console.log(resDataObj)

				// 内部订单编号
				const orderNumExternal = resDataObj.orderNumExternal

				// 移领订单编号
				const orderNum = resDataObj.orderNum || resDataObj.orderNumParent

				// 支付信息
				const payInfo = JSON.parse(resDataObj.pay_info)
				console.log(payInfo)

				// 错误提示
				if (!payInfo) {
					showToastText(resDataObj.result_msg)
					return
				}

				return

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
						const myParameter = { orderNumExternal: orderNumExternal, status: 2, orderNum: orderNum }
						_storeVipOrderWxNotifys(myParameter).then(resData => {
							console.log('resData')
						})
						// 去订单列表页
						redirectTo('/pages/main/user/user')
					})
					.catch(err => {
						showToastText('取消支付~')

						// 去订单列表页
						redirectTo('/pages/main/user/user')
					})
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
.box {
	width: $main-width;
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: $padding;
	box-sizing: border-box;
	margin: auto;
	margin-top: 30rpx;
	.wrapper {
		@include mFlex;
		justify-content: space-between;
		.item_wrapper {
			width: 296rpx;
			height: 296rpx;
			flex: none;
			box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
			position: relative;
			text-align: center;
			border-radius: 16rpx;
			border: 2px solid transparent;
			.text1 {
				position: absolute;
				left: -4rpx;
				top: -4rpx;
				padding: 0 20rpx;
				height: 48rpx;
				line-height: 48rpx;
				font-size: 24rpx;
				color: #ffffff;
				border-radius: 16rpx 0px 16rpx 0px;
				background-image: linear-gradient(to right bottom, #efd8a2, #fdaf6d);
			}
			.text2 {
				padding-top: 100rpx;
			}
			.text3 {
				font-size: 24rpx;
				color: $text-color-grey;
				padding-top: 30rpx;
			}
			.text4 {
				padding-top: 42rpx;
				color: $main-color;
				.text4_cn {
					font-size: 24rpx;
				}
			}
		}
		.current {
			border: 2px solid $main-color;
			background-color: $main-color;
			color: #fff !important;
			> .text3 {
				color: #fff !important;
			}
			> .text4 {
				color: #fff !important;
			}
		}
	}

	> .btn {
		margin-top: 40rpx;
		height: 88rpx;
		font-size: 32rpx;
		color: #ffffff;
		line-height: 88rpx;
		background-color: $main-color;
	}
}
</style>
