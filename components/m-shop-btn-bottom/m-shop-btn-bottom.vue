<template>
	<view class="bottom_btn">
		<view class="flx_box">
			<view class="item_box">
				<image class="image" src="/static/default/home.png" mode="aspectFill"></image>
				<text>首页</text>
			</view>

			<view class="item_box">
				<image class="image" src="/static/default/share.png" mode="aspectFill"></image>
				<text>分享</text>
			</view>

			<view class="right">
				<view class="item_btn color1">咨询客服</view>
				<view class="item_btn color2" @tap="clickBuy">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script setup>
const emits = defineEmits(['handleBuy'])
const clickBuy = () => {
	emits('handleBuy')
}
</script>

<style lang="scss" scoped>
.bottom_btn {
	height: 100rpx;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	.flx_box {
		width: 750rpx;
		height: 100rpx;
		@include mFlex;
		justify-content: space-between;
		background-color: #fff;
		padding-left: 32rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		font-size: 28rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		> .item_box {
			@include mFlex;
			flex: none;
			width: 120rpx;
			color: $text-color-grey;
			> .image {
				width: 32rpx;
				height: 32rpx;
				margin-right: 15rpx;
			}
		}
		> .right {
			@include mFlex;
			flex: none;
			> .item_btn {
				width: 200rpx;
				height: 100rpx;
				color: #fff;
				text-align: center;
				@include mFlex;
			}
			> .color1 {
				background: $main-color;
			}
			> .color2 {
				background: $sub-color;
			}
		}
	}
}
</style>
