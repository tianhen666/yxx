<template>
	<view class="container">
		<slot name="title"></slot>
		<!-- 滚动图片 -->
		<scroll-view scroll-x="true" class="scroll-view_H" scroll-left="20">
			<view class="scroll_item"><image class="image" src="/static/images/imgt.png" mode="heightFix"></image></view>
			<view class="scroll_item"><image class="image" src="/static/images/imgt.png" mode="heightFix"></image></view>
			<view class="scroll_item"><image class="image" src="/static/images/imgt.png" mode="heightFix"></image></view>
			<view class="scroll_item"><image class="image" src="/static/images/imgt.png" mode="heightFix"></image></view>
		</scroll-view>

		<view class="about_text">
			杭州口腔医院创建于1952年,是浙江省内历史最悠久、规模最大、在市民中享有广泛盛誉的口腔专科医院。
			杭州口腔医院创建于1952年,是浙江省内历史最悠久、规模最大、在市民中享有广泛盛誉的口腔专科医院。
		</view>
	</view>
</template>

<style lang="scss" scoped>
.container {
	width: $main-width;
	padding: $padding;
	background-color: #fff;
	overflow: hidden;
	margin: auto;
	position: relative;
	z-index: 2;
	border-radius: 16rpx;
	overflow: hidden;
	.scroll-view_H {
		white-space: nowrap;
		margin-top: 20rpx;
		border-radius: 4rpx;
		overflow: hidden;
		.scroll_item {
			display: inline-block;
			margin-right: 20rpx;
			> .image {
				height: 180rpx;
				width: 200rpx;
				border-radius: 4rpx;
			}
			&:last-child {
				margin-right: 0;
			}
		}
	}
	.about_text{
		color:$text-color-grey;
		font-size: 26rpx;
		line-height: 1.6;
		text-align: justify;
		margin-top: 10rpx;
	}
}
</style>
