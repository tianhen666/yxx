<template>
	<m-page-loading v-if="loading"></m-page-loading>

	<view class="container" v-else>
		<!-- 封面图 -->
		<view class="banner_img"><image class="image" :src="dataObj.mainPic" mode="aspectFill"></image></view>
		<view class="blank24"></view>

		<!-- 模块一 -->
		<view class="box1 box">
			<!-- 倒计时 -->
			<view class="count_down">
				<image class="image" src="/static/images/time.png" mode="aspectFill"></image>
				<text>距离结束还剩</text>
				<text class="text1">30天12小时30分钟</text>
			</view>
			<!-- 标题 -->
			<view class="title">{{ dataObj.title }}</view>
			<!-- 时间 -->
			<view class="time">
				{{ dayjs(dataObj.startDt).format('YYYY年M月D日') + '  至  ' + dayjs(dataObj.endDt).format('YYYY年M月D日') }}
			</view>
			<!-- 参与人 -->
			<view class="join">
				<view class="join_left">
					<view class="num">已有200人参与活动</view>
					<view class="img_wrapper">
						<view
							class="image_box"
							:style="{ zIndex: index + 1, left: index * 34 + 'rpx' }"
							v-for="(item, index) in 6"
							:key="index"
						>
							<image class="image" src="/static/default/tup4.jpg" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<button class="jion_right" @tap="confirm">参与活动</button>
			</view>
		</view>
		<view class="blank24"></view>

		<!-- 活动内容 -->
		<view class="box2 box">
			<view class="content_text">
				<m-title2 title="活动内容"></m-title2>
				<text class="text">{{ dataObj.content }}</text>
			</view>
			<view class="content_img" @tap="previewImage(dataObj.details.split(','))">
				<image
					class="image"
					v-for="(item, index) in dataObj.details.split(',')"
					:key="index"
					:src="item"
					mode="widthFix"
				></image>
			</view>
		</view>
		<view class="blank24"></view>

		<!-- 活动须知 -->
		<view class="box3 box">
			<m-title2 title="活动须知"></m-title2>
			<text class="text">{{ dataObj.content }}</text>
		</view>
		<view class="blank40"></view>
		<view class="blank40"></view>

		<!-- 底部按钮 -->
		<m-bottom-btn></m-bottom-btn>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { _enrollformGetinfo } from '@/aTemp/apis/activity.js'
import { _debounce } from '@/aTemp/utils/tools.js'
import { _wxpayPayment } from '@/aTemp/apis/store.js'
import { navigateTo, previewImage } from '@/aTemp/utils/uniAppTools.js'
import dayjs from 'dayjs'

// 加载中
const loading = ref(true)
// 数据ID
const dataId = ref(0)
// 数据对象
const dataObj = ref({})
// 页面开始加载
onLoad(options => {
	dataId.value = options.id || 0
	
	// 加载中
	loading.value = true
	_enrollformGetinfo({ id: dataId.value }).then(res => {
		const { data } = res
		// 数据赋值
		dataObj.value = data
		// 数据加载结束
		loading.value = false
	})
})

// 加载中
const btnLoading = ref(false)
const confirm = _debounce(
	() => {
		_wxpayPayment({ productId: dataId.value })
			.then(res => {
				btnLoading.value = false
				const { data, code, msg } = res
				// 修改后端返回的数据
				data.package = 'prepay_id=' + data.prepay_id
				uni
					.requestPayment(data)
					.then(val => {
						console.log(val)
					})
					.catch(err => {
						console.log(err)
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
.banner_img {
	> .image {
		width: 750rpx;
		height: 750rpx * 0.5;
	}
}

.box {
	padding: 38rpx 24rpx;
	background-color: #fff;
	width: $main-width;
	margin: auto;
	border-radius: 16rpx;
}

.box1 {
	> .count_down {
		background-color: #fff6ea;
		color: #f73639;
		font-size: 28rpx;
		padding: 20rpx;
		@include mFlex;
		justify-content: flex-start;
		border-radius: 16rpx;
		> .image {
			flex: none;
			height: 40rpx;
			width: 40rpx;
			margin-right: 10rpx;
		}
		> .text1 {
			padding-left: 10rpx;
			font-weight: 600;
		}
	}

	> .title {
		color: $text-color;
		@include singleLineTextOverHidden;
		overflow: hidden;
		font-size: 36rpx;
		padding: 48rpx 0;
	}

	> .time {
		color: $text-color-grey;
		font-size: 28rpx;
	}
	> .join {
		background-color: #fafafa;
		border-radius: 16rpx;
		margin-top: 48rpx;
		padding: $padding;
		@include mFlex;

		.join_left {
			flex: auto;
			overflow: hidden;
			.num {
				font-size: 26rpx;
				color: #666666;
				padding-bottom: 20rpx;
			}
			.img_wrapper {
				position: relative;
				overflow: hidden;
				height: 54rpx;
				width: 100%;
				> .image_box {
					position: absolute;
					top: 0;
					border-radius: 50%;
					width: 54rpx;
					height: 54rpx;
					padding: 2rpx;
					background-color: #fff;
					overflow: hidden;
					> .image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
			}
		}
		.jion_right {
			font-size: 26rpx;
			font-weight: bold;
			color: #fff;
			width: 170rpx;
			background-color: $main-color;
			border-radius: 50rpx;
			line-height: 2.2;
		}
	}
}

.box3 {
	> .text {
		display: block;
		border: 1px solid #fafafa;
		background-color: #fafafa;
		border-radius: 16rpx;
		padding: 20rpx;
		font-size: 28rpx;
		line-height: 1.6;
		overflow: hidden;
	}
}
.box2 {
	background-color: #fff;
	> .content_text {
		> .text {
			display: block;
			border: 1px solid #fafafa;
			background-color: #fafafa;
			border-radius: 16rpx;
			padding: 20rpx;
			line-height: 1.6;
			font-size: 28rpx;
			overflow: hidden;
		}
	}
	> .content_img {
		background-color: #fafafa;
		> .image {
			width: 100%;
			height: auto;
		}
	}
}
</style>
