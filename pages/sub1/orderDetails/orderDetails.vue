<template>
	<m-page-loading v-if="loading"></m-page-loading>
	<view class="container" v-else>
		<!-- 背景 -->
		<view class="pageBg"><image class="image" src="/static/images/bg.png" mode="aspectFill"></image></view>
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

			<view class="box1_flex">
				<!-- 图文信息 -->
				<image
					:src="orderDetail.productPic ? orderDetail.productPic.split(',')[0] : '/static/images/no_img.jpg'"
					mode="aspectFill"
					class="goods_img"
				></image>
				<view class="box1_flex_center">
					<!-- 标题 -->
					<view class="title">{{ orderDetail.productName }}</view>
					<!-- 提示 -->
					<view class="tips">
						<icon type="warn" size="26rpx" color="#F73639" />
						<text class="text">购买后不可退换</text>
					</view>
				</view>
				<view class="box1_flex_right">
					<!-- 价格 -->
					<view class="price">
						<text class="price_cn">￥</text>
						<text>{{ orderDetail.payPrice }}</text>
					</view>
					<!-- 数量 -->
					<view class="quantity">x{{ orderDetail.count }}</view>
				</view>
			</view>

			<template v-if="orderDetail.status === 2">
				<view class="line"></view>
				<!-- 核销码 -->
				<u-qrcode
					ref="uqrcode"
					canvasId="qrcode"
					type="2d"
					:value="orderDetail.orderNo"
					:options="{ margin: 10 }"
				></u-qrcode>

				<!-- 剩余使用次数 -->
				<view class="blank20"></view>
				<view class="tips1"><text class="text">请在到店使用时出示核销码</text></view>
			</template>
		</view>
		<view class="blank32"></view>

		<!-- 套餐详情 -->
		<view class="content_text">
			<m-title2 title="套餐详情"></m-title2>
			<text class="text">{{ orderDetail.producttitle }}</text>
		</view>
		<view class="blank32"></view>

		<view class="box2">
			<m-title2 title="订单信息"></m-title2>
			<view class="blank20"></view>

			<view class="box2_item">
				<view class="left" @tap="setClipboardData(orderDetail.payPrice)">订单金额</view>
				<view class="right">￥{{ orderDetail.payPrice }}</view>
			</view>
			<view class="box2_item" @tap="setClipboardData(orderDetail.nickname || orderDetail.remarkname)">
				<view class="left">购买人</view>
				<view class="right">{{ user.nickname || user.remarkname }}</view>
			</view>
			<view class="box2_item" @tap="setClipboardData(user.mobile)">
				<view class="left">手机号</view>
				<view class="right">{{ user.mobile }}</view>
			</view>
			<view class="box2_item" @tap="setClipboardData(orderDetail.orderNo)">
				<view class="left">订单号</view>
				<view class="right">{{ orderDetail.orderNo }}</view>
			</view>
			<view class="box2_item">
				<view class="left">下单时间</view>
				<view class="right">{{ dayjs(orderDetail.createDt).format('YYYY-MM-DD HH:mm:ss') }}</view>
			</view>
			<view class="box2_item">
				<view class="left">支付时间</view>
				<view class="right">
					{{ orderDetail.payDt ? dayjs(orderDetail.payDt).format('YYYY-MM-DD HH:mm:ss') : '未支付' }}
				</view>
			</view>
		</view>

		<view class="blank40"></view>
		<view class="blank40"></view>

		<!-- 剩余支付时间 -->
		<view class="syzfsj" v-if="dayjs(orderDetail.createDt).add(30, 'minute') - dayjs() > 0 && orderDetail.status === 1">
			<view class="left">剩余支付时间</view>
			<view class="right">{{ `${djs}` }}</view>
		</view>
		<!-- 底部按钮 -->
		<m-btn-fix-bottom
			v-if="dayjs(orderDetail.createDt).add(30, 'minute') - dayjs() > 0 && orderDetail.status === 1"
			:loading="btnLoading"
			:text="'立即支付'"
			@btnClick="orderPayment(orderDetail)"
		></m-btn-fix-bottom>
	</view>
</template>

<script setup>
import dayjs from 'dayjs'
import { showToastText, setClipboardData } from '@/aTemp/utils/uniAppTools.js'
import { _debounce, _countDown } from '@/aTemp/utils/tools.js'
import { _orderGetinfo } from '@/aTemp/apis/order.js'
import { _wxpayWxNotifys } from '@/aTemp/apis/store.js'
import { _orderPayment } from '@/aTemp/apis/order.js'
import { navigateBack } from '@/aTemp/utils/uniAppTools.js'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { ref } from 'vue'
import uQrcode from '../components/Sansnn-uQRCode/components/u-qrcode/u-qrcode.vue'

// 订单编号
const orderNo = ref('')
// 加载中
const loading = ref(true)
// 订单详情
const orderDetail = ref({})
// 邀请人
const userInvite = ref({})
// 下单用户
const user = ref({})
// 页面加载
onLoad(options => {
	// 在传递的参数中获取订单编号
	orderNo.value = options.orderNo || ''

	// 获取订单详情信息
	_orderGetinfo({
		orderNo: orderNo.value
	}).then(res => {
		loading.value = false
		const { data, code, msg } = res
		orderDetail.value = data.orderDetail
		user.value = data.user
		userInvite.value = data.userInvite

		const timeAdd30 = dayjs(orderDetail['createDt']).add(30, 'minute')
		djsFun(timeAdd30)
	})
})

// 倒计时
const djs = ref('')
let djsIndex = 0
const djsFun = time => {
	djsIndex = setInterval(() => {
		// console.log("定时器执行")
		djs.value = _countDown(time, djsIndex)
	}, 50)
}
//页面卸载执行
onUnload(() => {
	// console.log('页面卸载')
	// 移除定时器
	clearInterval(djsIndex)
})
// 重新付款
const btnLoading = ref(false)
const orderPayment = _debounce(
	item => {
		const orderNo = item.orderNo

		_orderPayment({ orderNo: orderNo })
			.then(res => {
				btnLoading.value = false
				// 获取唤醒支付必要条件
				const { data } = res
				const payInfo = JSON.parse(data)
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

						// 支付成功回调，并且分账 status: 2 //2表示已经支付完成，待使用
						const myParameter = { orderNumExternal: orderNo, status: 2 }
						_wxpayWxNotifys(myParameter).then(resData => {
							// 修改订单状态
							item.status = 2
						})
					})
					.catch(err => {
						btnLoading.value = false
						showToastText('取消支付~')
					})
			})
			.catch(err => {
				console.log(err)
				showToastText('支付失败')
			})
	},
	1000,
	btnLoading
)
</script>

<style lang="scss" scoped>
.syzfsj {
	position: fixed;
	z-index: 78;
	bottom: 192rpx;
	font-size: 26rpx;
	right: 30rpx;
	color: #ff4b4b;
	@include mFlex;
	.left {
		flex: none;
	}
	.right {
		flex: none;
		width: 320rpx;
		text-align: right;
	}
}

:global(.uqrcode) {
	margin: auto;
}
.box1 {
	position: relative;
	z-index: 2;
	width: $main-width;
	padding: $padding;
	background-color: #ffffff;
	box-sizing: border-box;
	margin: auto;
	border-radius: 16rpx;
	margin-top: 20rpx;
	.box1_flex {
		@include mFlex;
		.box1_flex_center {
			flex: auto;
		}
		.box1_flex_right {
			flex: none;
		}
	}
	.goods_img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		flex: none;
		margin-right: 20rpx;
		border: 1px solid #f0f0f0;
	}
	.title {
		color: $text-color;
		font-size: 28rpx;
		@include textOverHidden;
		line-height: 1.5;
		margin-bottom: 40rpx;
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
		margin-bottom: 40rpx;
		&_cn {
			font-size: 24rpx;
		}
	}
	.quantity {
		color: $text-color-grey;
		font-size: 24rpx;
		text-align: right;
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
	> .tips1 {
		justify-content: center;
		text-align: center;
	}
}

/* 订单信息 */
.box2 {
	position: relative;
	z-index: 2;
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
	position: relative;
	z-index: 2;
	background-color: #fff;
	padding: 32rpx;
	width: $main-width;
	box-sizing: border-box;
	margin: auto;
	border-radius: 16rpx;
	border: 1px solid #ddd;
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
