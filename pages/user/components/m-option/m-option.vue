<template>
	<view class="container">
		<view class="option_btn">
			<view class="option_item" v-for="(item, index) in props.listData" @tap="jumpClick(item)" :key="index">
				<view class="left">
					<image class="image" :src="item.icon" mode="aspectFill"></image>
					<text>{{ item.title }}</text>
				</view>
				<view class="right"><uni-icons type="forward" size="15"></uni-icons></view>
			</view>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	listData: {
		type: Array,
		required: true,
		default() {
			return [
				{
					icon: '/static/order/yaoqing.png',
					title: '员工管理',
					path: '/pages-sub1/index/index'
				},
				{
					icon: '/static/order/yaoqing.png',
					title: '员工管理',
					path: '/pages-sub1/index/index'
				},
				{
					icon: '/static/order/yaoqing.png',
					title: '员工管理',
					path: '/pages-sub1/index/index'
				}
			]
		}
	}
})
const jumpClick = item => {
	uni.navigateTo({
		url: item.path
	})
}
</script>

<style lang="scss" scoped>
.container {
	.option_btn {
		background-color: #ffffff;
		border-radius: 16rpx;
		width: $main-width;
		margin: auto;
		padding: 20rpx 32rpx;
		box-sizing: border-box;
		.option_item {
			height: 80rpx;
			@include mFlex;
			justify-content: space-between;
			.left {
				@include mFlex;
				justify-content: left;
				flex: 1;
				font-size: 28rpx;
				color: #666666;
				> .image {
					width: 48rpx;
					height: 48rpx;
					margin-right: 15rpx;
				}
			}
			.right {
			}
		}
	}
}
</style>
