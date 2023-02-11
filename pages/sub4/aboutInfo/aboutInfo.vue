<template>
	<view>
		<view class="box3">
			<view class="title">欢迎来到牙小新</view>
			<view class="content">
				想要开通口腔门诊小程序，或者在使用的过程中遇到问题，请安照下面方式咨询客服，我们会在第一时间联系您!
			</view>
			<view class="kefu_box">
				<image class="img" src="/static/images/kefu.png"></image>
			</view>
		</view>

		<view class="box1">
			<view class="tel">
				<text>服务热线：186-3717-5903</text>
			</view>
			<button class="btn" @click="mCall('186-3717-5903')">联系客服</button>
			<view class="img_box" @click="previewImage(imgUrlList)">
				<image class="img" :src="imgUrlList[0]"></image>
			</view>
			<view class="text">
				<text>点击图片识别客服微信二维码</text>
			</view>
		</view>

		<view class="box2">
			<view class="title">
				牙小新只为口腔门诊研发
			</view>
			<view class="content">
				1.帮助门诊打开新的流量渠道-线上渠道<br />
				2.帮助门诊解决营销获客的数据问题<br />
				3.帮助门诊解决及优化日常营销动作问题<br />
				4.帮助门诊实现全员营销问题<br />
				5.提高私域运营转化效率问题<br />
				6.帮助门诊实现线上独立门店，展现更专业的品牌形象<br />
			</view>
		</view>
		<view class="blank40"></view>
	</view>
</template>
<style lang="scss" scoped>
	.box3 {
		background-color: $main-color;
		color: #fff;
		padding: 32rpx 32rpx 70rpx;
		position: relative;
		overflow: hidden;

		.title {
			font-size: 32rpx;
			margin-bottom: 30rpx;
		}

		.content {
			font-size: 24rpx;
			line-height: 2;
			width: 500rpx;
		}

		.kefu_box {
			width: 290rpx;
			height: 290rpx;
			position: absolute;
			right: -20rpx;
			bottom: 10rpx;

			.img {
				width: 100%;
				height: 100%;
			}
		}
	}

	.box1 {
		position: relative;
		z-index: 10;
		background-color: #fff;
		border-radius: 10rpx;
		text-align: center;
		width: $main-width;
		box-sizing: border-box;
		margin: auto;
		margin-top: -40rpx;
		padding: 60rpx 0;

		.tel {
			color: #333;
			font-size: 28rpx;
			margin-bottom: 30rpx;
		}

		.btn {
			width: 500rpx;
			background-color: $main-color;
			color: #fff;
			font-size: 30rpx;
			border-radius: 50rpx;
			margin-bottom: 70rpx;
		}

		.img_box {
			width: 260rpx;
			height: 260rpx;
			margin: auto;

			.img {
				width: 100%;
				height: 100%;
			}

			margin-bottom: 30rpx;
		}

		.text {
			font-size: 28rpx;
			color: #666;
		}
	}

	.box2 {
		background-color: #fff;
		border-radius: 10rpx;
		width: $main-width;
		box-sizing: border-box;
		margin: auto;
		margin-top: 30rpx;
		padding: 32rpx 20rpx;

		.title {
			font-size: 32rpx;
			margin-bottom: 30rpx;
		}

		.content {
			font-size: 26rpx;
			line-height: 2;
			color: #999;
		}
	}
</style>

<script setup>
	import {
		previewImage
	} from '@/aTemp/utils/uniAppTools.js'

	const imgUrlList = [
		'https://imgs.fenxiangzl.com/fileyxx/imgs/zhangrugangwx.jpeg'
	]
	const mCall = (val) => {
		uni.makePhoneCall({
			phoneNumber: val
		});
	}
</script>
