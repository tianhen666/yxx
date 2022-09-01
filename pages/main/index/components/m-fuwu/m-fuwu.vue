<template>
	<view class="box_fuwu">
		<view class="box_fuwu_left" @tap="previewImage([props.info.customer])">
			<image class="image" src="/static/images/fuwu1.png" mode="aspectFill"></image>
			<view class="title">预约服务</view>
			<view class="sub_title">关爱牙齿 从我做起</view>
		</view>
		<view class="box_fuwu_right">
			<view class="box_fuwu_right_item1" @tap="navigateTo(`/pages/sub1/serveList/serveList`)">
				<image class="image" src="/static/images/fuwu2.png" mode="aspectFill"></image>
				<view class="title">爱牙护牙</view>
				<view class="sub_title">牙齿管理专家</view>
			</view>
			<view class="box_fuwu_right_item2">
				<view class="box_fuwu_right_item2_left" @tap="switchTab('/pages/main/case/case?current=1')">
					<image class="image" src="/static/images/fuwu3.png" mode="aspectFill"></image>
					<view class="title" style="color:#D56464;">口腔知识</view>
					<view class="sub_title" style="color:#D5646488;">关爱口腔健康</view>
				</view>
				<view class="box_fuwu_right_item2_right" @tap="switchTab('/pages/main/case/case?current=0')">
					<image class="image" src="/static/images/fuwu4.png" mode="aspectFill"></image>
					<view class="title" style="color:#CB9B57;">门诊案例</view>
					<view class="sub_title" style="color:#CB9B5788;">真实案例</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { previewImage, switchTab, navigateTo } from '@/aTemp/utils/uniAppTools.js'
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
		width: 262rpx;
		height: 340rpx;
		position: relative;
		> .image {
			border-radius: 16rpx;
			width: 100%;
			height: 100%;
		}
		> .title {
			position: absolute;
			left: 0;
			top: 26rpx;
			font-size: 32rpx;
			font-family: 'HelloFont-WenYiHei', 'HelloFont';
			font-weight: bold;
			color: #4885fe;
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
			color: #4885fe88;
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
			> .image {
				border-radius: 16rpx;
				width: 100%;
				height: 100%;
			}
			> .title {
				position: absolute;
				left: 20rpx;
				top: 26rpx;
				font-size: 32rpx;
				font-family: 'HelloFont-WenYiHei', 'HelloFont';
				font-weight: bold;
				line-height: 40rpx;
				width: 100%;
				color: #0ba681;
			}
			> .sub_title {
				position: absolute;
				left: 20rpx;
				top: 76rpx;
				font-size: 24rpx;
				font-family: 'PingFangSC-Regular', 'PingFang SC';
				font-weight: 400;
				line-height: 34rpx;
				width: 100%;
				color: #0ba68188;
			}
		}

		&_item2 {
			height: 160rpx;
			width: 100%;
			@include mFlex;
			justify-content: space-between;
			&_left,
			&_right {
				width: 192rpx;
				height: 160rpx;
				flex: none;
				position: relative;
				> .image {
					border-radius: 16rpx;
					width: 100%;
					height: 100%;
				}
				> .title {
					position: absolute;
					left: 20rpx;
					top: 20rpx;
					font-size: 32rpx;
					font-family: 'HelloFont-WenYiHei', 'HelloFont';
					font-weight: bold;

					line-height: 40rpx;
					width: 100%;
				}
				> .sub_title {
					position: absolute;
					left: 20rpx;
					top: 62rpx;
					font-size: 24rpx;
					font-family: 'PingFangSC-Regular', 'PingFang SC';
					font-weight: 400;
					line-height: 34rpx;
					width: 100%;
				}
			}
		}
	}
}
</style>
