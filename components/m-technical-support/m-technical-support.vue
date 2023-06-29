<!-- 技术支持组件 -->
<template>
	<view class="boxContent" v-if="extensionField.technical">
		<text class="text">牙小新提供技术支持</text>
		<button class="btn" @click="goToPage">我也要创建小程序</button>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js';
const useUserMain = _useUserMain();

const extensionField = computed(() => {
	try {
		return JSON.parse(useUserMain.extensionField);
	} catch (e) {
		console.log('扩展字段解析失败', e);
		return {};
	}
});

const goToPage = () => {
	uni.navigateTo({
		url: '/pages/sub4/aboutInfo/aboutInfo'
	});
};
</script>

<style lang="scss">
.boxContent {
	margin-top: 40rpx;
	text-align: center;

	.text {
		font-size: 22rpx;
		color: $main-color;
	}

	.btn {
		margin-top: 20rpx;
		color: #fff;
		background-color: $main-color;
		font-size: 24rpx;
		width: 260rpx;
		line-height: 2.6;
		border-radius: 50rpx;
	}
}
</style>
