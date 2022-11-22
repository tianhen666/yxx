<template>
	<view class="container">
		<view class="box_type">
			<view class="swiper_wrapper">
				<uni-swiper-dot
					:info="[info.pics, '/static/images/no_img.jpg']"
					:current="Bcurrent"
					mode="round"
					:dotsStyles="{
						backgroundColor: 'rgba(0, 0, 0, .4)',
						border: 'none',
						selectedBackgroundColor: '#ffffff',
						selectedBorder: 'none'
					}"
				>
					<swiper class="swiper" autoplay circular interval="500000" @change="Bchange">
						<swiper-item v-for="(item, index) in [info.pics, '/static/images/no_img.jpg']" :key="index">
							<image class="image" :src="item" mode="aspectFill"></image>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
			</view>

			<!-- 门诊名称 -->
			<view class="title">{{ info.name }}</view>

			<!-- 地址 -->
			<view class="address">
				<view class="address_box" @tap="daohang()">
					<image class="image" src="/static/images/daohang2.png" mode="aspectFill"></image>
					{{ `${info.address}${info.addressDetail}` }}
				</view>
			</view>

			<!-- 按钮 -->
			<view class="button_container">
				<button class="btn" @tap.stop="makePhoneCall(info.mobile)">快call我</button>
				<button class="btn" @tap.stop="">加微信</button>
				<button class="btn" @tap.stop="navigateTo('/pages/sub1/yuyue/yuyue')">见面聊</button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { makePhoneCall, openLocation, navigateTo } from '@/aTemp/utils/uniAppTools.js'

const props = defineProps({
	// 当前店铺信息
	info: {
		type: Object,
		required: true,
		default: () => {}
	}
})

// 打开内置地图
const daohang = () => {
	openLocation(props.info.lat, props.info.lng, props.info.addressDetail, props.info.address).then(res => {
		console.log(res)
	})
}

const Bcurrent = ref(0)
// 改变索引事件
const Bchange = e => {
	Bcurrent.value = e.detail.current
}
</script>
<style lang="scss" scoped>
.swiper {
	width: 100%;
	height: ($main-width * 0.8);
	margin: auto;
	overflow: hidden;
	border-radius: 16rpx;
	.image {
		width: 100%;
		height: 100%;
		border-radius: 16rpx;
	}
}
.container {
	width: $main-width;
	margin: auto;
	overflow: hidden;
	position: relative;
	z-index: 2;
	background-color: #fff;
	padding: $padding;
	border-radius: 16rpx;
	.box_type {
		> .img_box {
			width: 100%;
			padding-top: 80%;
			position: relative;
			.image {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}
		> .title {
			font-size: 32rpx;
			font-weight: 600;
			color: #333333;
			line-height: 32rpx;
			padding: 30rpx 0;
		}
		> .address {
			padding: 20rpx;
			margin-bottom: 20rpx;
			line-height: 1.8;
			background-image: linear-gradient(to right, #{$main-color}33, #ffffff);
			font-size: 26rpx;
			font-weight: 600;
			color: #000;
			position: relative;
			z-index: 1;
			border-radius: 8rpx;
			&:after {
				content: '';
				position: absolute;
				z-index: 2;
				top: -28rpx;
				display: block;
				width: 0px;
				height: 0px;
				border: 14rpx solid transparent;
				border-top-color: transparent;
				border-bottom-color: #{$main-color}33;
				border-left-color: transparent;
				border-right-color: transparent;
			}
			.address_box {
				text-indent: -26rpx;
				padding-left: 26rpx;
				.image {
					vertical-align: middle;
					width: 22rpx;
					height: 24rpx;
					display: inline-block !important;
				}
			}
		}
		> .button_container {
			@include mFlex;
			.btn {
				flex: none;
				width: 200rpx;
				height: 64rpx;
				font-size: 28rpx;
				line-height: 64rpx;
				background-color: $main-color;
				color: #000;
				font-weight: 500;
				border-radius: 80rpx;
				&:after{
					border: none;
				}
			}
		}
	}
}
</style>
