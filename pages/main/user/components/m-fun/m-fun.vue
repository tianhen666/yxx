<template>
	<view class="container">
		<view class="c_wrapper">
			<!-- 更多 -->
			<m-title2
				:title="props.listData.title"
				moreText="查看全部"
				:path="props.listData.path"
			></m-title2>

			<!-- 按钮 -->
			<view class="btn_box">
				<view
					class="btn_box_item"
					v-for="(item, index) in props.listData.sub"
					:key="index"
					@tap="itemClick(item)"
				>
					<image class="image" :src="item.imgUrl" mode="heightFix"></image>
					<text class="text">{{ item.name }}</text>
				</view>
				<view class="btn_box_item" v-if="props.listData.sub.length % 4 >= 1"></view>
				<view class="btn_box_item" v-if="props.listData.sub.length % 4 >= 2"></view>
				<view class="btn_box_item" v-if="props.listData.sub.length % 4 >= 3"></view>
			</view>
		</view>
	</view>
</template>

<script setup>
// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js';
const useUserMain = _useUserMain();

import { showToastText } from '@/aTemp/utils/uniAppTools.js';

const props = defineProps({
	listData: {
		type: Object,
		required: true,
		default() {
			return {};
		}
	}
});

const emits = defineEmits(['moduleFun']);
const itemClick = item => {
	if (useUserMain.overdue === 1 && !item.expiredAvailable) {
		showToastText('当前店铺已到期');
		return;
	}

	if (Array.isArray(item.power) && !item.power.includes(useUserMain.power)) {
		showToastText('没有权限~');
		return;
	}

	if (item.path) {
		uni.navigateTo({
			url: item.path
		});
	}
	if (item.fun) {
		emits('moduleFun', item);
	}
};
</script>

<style lang="scss" scoped>
.container {
	position: relative;
	z-index: 1;
	overflow: visible;
	.c_wrapper {
		box-shadow: 0 0 20px 5px #eee;
		width: $main-width;
		padding: $padding;
		margin: auto;
		border-radius: 16rpx;
		background-color: #ffffff;
		.btn_box {
			@include mFlex;
			justify-content: space-between;
			overflow: hidden;
			flex-wrap: wrap;
			margin-top: -30rpx;
			&_item {
				margin-top: 50rpx;
				@include mFlex(column);
				width: 21%;
				flex: none;
				> .image {
					width: 48rpx;
					height: 50rpx;
					margin-bottom: 10rpx;
				}
				> .text {
					line-height: 34rpx;
					font-size: 24rpx;
					color: #333333;
				}
			}
		}
	}
}
</style>
