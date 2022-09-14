<template>
	<view class="sub">
		<scroll-view scroll-x="true" class="scroll_X" :class="packUp ? '' : 'packUp'">
			<view
				class="scroll-view-item"
				:class="index === 0 ? 'active' : ''"
				v-for="(item, index) in 8"
				:key="index"
				@tap="scrollViewItemTap(item)"
			>
				家庭营销
			</view>
		</scroll-view>

		<view class="sub_arrow" @tap.prevent.stop="packUp = !packUp">
			<uni-icons :type="packUp ? 'bottom' : 'top'" size="15" color="#333"></uni-icons>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'
const packUp = ref(true)
const scrollViewItemTap = (item) => {
	const pages = getCurrentPages()
	if (pages[pages.length - 1].route === 'pages/sub3/posterListSub/posterListSub') {
	} else {
		navigateTo('/pages/sub3/posterListSub/posterListSub?index=' + item)
	}
}
</script>

<style scoped lang="scss">
.sub {
	padding: 20rpx 0;
	position: relative;
	.packUp {
		white-space: normal !important;
		height: auto !important;
	}
	.scroll_X {
		white-space: nowrap;
		width: 100%;
		.scroll-view-item {
			display: inline-block;
			font-size: 26rpx;
			padding-right: 40rpx;
			height: 60rpx;
			text-align: center;
		}
		.active {
			font-weight: bold;
			color: #000;
			font-size: 26rpx;
			&:after {
				display: block;
				content: '';
				margin: auto;
				height: 4px;
				width: 28rpx;
				margin-top: 14rpx;
				background-color: $main-color;
				border-radius: 20rpx;
			}
		}
	}
	.sub_arrow {
		position: absolute;
		right: 0;
		top: 22rpx;
		height: 30rpx;
		font-size: 0;
		background-color: #fff;
		padding-left: 10rpx;
	}
}
</style>
