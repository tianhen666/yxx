<template>
	<view class="box">
		<view class="box_item">
			<image
				class="img1"
				mode="aspectFill"
				src="https://imgs.lechiwl.com/fileyxx/imgs/thIcon.png"
			></image>
			<text class="text_item">分享活动总次数：5次</text>
			<view class="invite">
				<text class="text1">参与活动用户（20人）：</text>
				<view class="img_box">
					<image
						class="u_img"
						src="https://imgs.lechiwl.com/fileyxx/imgs/thIcon.png"
					></image>
					<image
						class="u_img"
						src="https://imgs.lechiwl.com/fileyxx/imgs/thIcon.png"
					></image>
					<image
						class="u_img"
						src="https://imgs.lechiwl.com/fileyxx/imgs/thIcon.png"
					></image>
					<image
						class="u_img"
						src="https://imgs.lechiwl.com/fileyxx/imgs/thIcon.png"
					></image>
					<text
						class="more"
						@tap="navigateTo('/pages/sub2/dataDetailsItem2/dataDetailsItem2')"
					>
						更多
					</text>
				</view>
			</view>
			<text class="text_item">此活动消费金额：2000元</text>
		</view>
	</view>
</template>

<script setup>
import { navigateTo } from '@/aTemp/utils/uniAppTools.js';
</script>

<style lang="scss">
.box {
	width: $main-width;
	margin: auto;
	padding: 40rpx 0;
}
.box_item {
	.img1 {
		width: 100%;
		height: 400rpx;
		margin-bottom: 20rpx;
	}
	.text_item {
		font-size: 28rpx;
		color: #333;
		line-height: 50rpx;
	}
	.invite {
		display: flex;
		align-items: center;
		.text1 {
			font-size: 28rpx;
			color: #333;
		}
		.img_box {
			display: flex;
			.u_img {
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				display: block;
				border: 1px solid #ccc;
				margin-right: 10rpx;
			}
		}
		.more {
			text-align: center;
			line-height: 60rpx;
			width: 60rpx;
			height: 60rpx;
			font-size: 20rpx;
			border-radius: 50%;
			border: 1px solid #ccc;
			box-sizing: border-box;
		}
	}
}
</style>
