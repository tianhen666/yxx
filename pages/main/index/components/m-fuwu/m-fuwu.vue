<template>
	<view class="box_fuwu">
		<view class="box_fuwu_left" @tap="navigateTo('/pages/sub1/yuyue/yuyue')">
			<image class="image" src="/static/images/fuwu1.png" mode="heightFix"></image>
			<view class="title">找我合作</view>
			<view class="sub_title">我喜欢....见面聊！</view>
		</view>
		<view class="box_fuwu_right">
			<view class="box_fuwu_right_item1" @tap="navigateTo(`/pages/sub1/serveList/serveList`)">
				<image class="image" src="/static/images/fuwu2.png" mode="heightFix"></image>
				<view class="title">往期活动</view>
				<view class="sub_title">哈哈，玩过的都在这儿</view>
			</view>
			<view class="box_fuwu_right_item2">
				<view class="box_fuwu_right_item2_left" @tap="switchTab('/pages/main/news/news')">
					<image class="image" src="/static/images/fuwu3.png" mode="heightFix"></image>
					<view class="title" style="color:#65601d;">鸭鸭课堂</view>
					<view class="sub_title" style="color:#65601d88;">一起去浪</view>
				</view>
				<view class="box_fuwu_right_item2_right" @tap="switchTab('/pages/main/info/info')">
					<image class="image" src="/static/images/fuwu4.png" mode="heightFix"></image>
					<view class="title" style="color:#366991;">公益活动</view>
					<view class="sub_title" style="color:#36699188;">会员特享</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { previewImage, switchTab, navigateTo,showToastText } from '@/aTemp/utils/uniAppTools.js'
const props = defineProps({
	info: {
		required: true,
		type: Object,
		default: () => {}
	}
})
</script>

<style lang="scss" scoped>
.box_fuwu {
	@include mFlex;
	justify-content: space-between;
	align-items: stretch;
	&_left {
		flex: none;
		width: 274rpx;
		height: 340rpx;
		position: relative;
		background-color: #bb2329;
		border-radius: 16rpx;
		> .image {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
			width: 50%;
			height: 65%;
		}
		> .title {
			position: absolute;
			left: 0;
			top: 26rpx;
			font-size: 32rpx;
			font-family: 'HelloFont-WenYiHei', 'HelloFont';
			font-weight: bold;
			color: #fff;
			line-height: 40rpx;
			width: 100%;
			text-align: center;
		}
		> .sub_title {
			position: absolute;
			left: 0;
			top: 76rpx;
			text-align: center;
			font-size: 24rpx;
			font-family: 'PingFangSC-Regular', 'PingFang SC';
			font-weight: 400;
			color: #fff;
			line-height: 34rpx;
			width: 100%;
		}
	}
	&_right {
		flex: none;
		width: 404rpx;
		@include mFlex;
		flex-direction: column;
		justify-content: space-between;
		&_item1 {
			height: 160rpx;
			width: 100%;
			position: relative;
			background-color: #73ecff;
			border-radius: 16rpx;
			> .image {
				position: absolute;
				width: 50%;
				height: 90%;
				bottom: 0;
				right: 20rpx;
			}
			> .title {
				position: absolute;
				left: 0;
				top: 26rpx;
				font-size: 32rpx;
				font-family: 'HelloFont-WenYiHei', 'HelloFont';
				font-weight: bold;
				line-height: 40rpx;
				width: 100%;
				padding-left: 20rpx;
				color: #2d666f;
			}
			> .sub_title {
				position: absolute;
				left: 0;
				top: 76rpx;
				font-size: 24rpx;
				font-family: 'PingFangSC-Regular', 'PingFang SC';
				font-weight: 400;
				line-height: 34rpx;
				width: 100%;
				padding-left: 20rpx;
				color: #2d666f88;
			}
		}

		&_item2 {
			height: 160rpx;
			width: 100%;
			@include mFlex;
			justify-content: space-between;
			&_left{
				background-color: #fbef4f;
			}
			&_right{
				background-color: #8cccff;
			}
			&_left,
			&_right {
				width: 192rpx;
				height: 160rpx;
				flex: none;
				position: relative;
				border-radius: 16rpx;
				> .image {
					position: absolute;
					width: 50%;
					height: 50%;
					bottom: 10rpx;
					right: 10rpx;
				}
				> .title {
					position: absolute;
					left: 0x;
					top: 20rpx;
					font-size: 32rpx;
					font-family: 'HelloFont-WenYiHei', 'HelloFont';
					font-weight: bold;
					line-height: 40rpx;
					width: 100%;
					padding-left: 20rpx;
				}
				> .sub_title {
					position: absolute;
					left: 0;
					top: 62rpx;
					font-size: 24rpx;
					font-family: 'PingFangSC-Regular', 'PingFang SC';
					font-weight: 400;
					line-height: 34rpx;
					width: 100%;
					padding-left: 20rpx;
				}
			}
		}
	}
}
</style>
