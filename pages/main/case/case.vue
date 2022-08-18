<template>
	<!-- 标题栏 -->
	<uni-nav-bar title="xxx门诊" statusBar fixed color="#ffffff" :border="false"></uni-nav-bar>
	<!-- tab切换 -->
	<uni-segmented-control :current="current" :values="items" style-type="text" @clickItem="onClickItem" />
	<!-- 切换内容 -->
	<view class="content">
		<m-tab v-show="current === 0"></m-tab>
		<view v-show="current === 1"><text class="content-text">选项卡2的内容</text></view>
	</view>
</template>

<script setup>
import mTab from './components/m-tab/m-tab.vue'
import { ref, reactive } from 'vue'
const items = reactive(['门诊案例', '知识科普'])
const current = ref(0)
const onClickItem = e => {
	if (current.value !== e.currentIndex) {
		current.value = e.currentIndex
	}
}
</script>

<style lang="scss" scoped>
.content {
	background-color: #f5f5f5;
}
.content:deep(.segmented-control) {
	overflow: visible !important;
	height: 96rpx;
	.segmented-control__item {
		min-width: 120rpx;
		flex: none !important;
	}
	.control--segmented-control__text {
		padding: 4rpx 0 !important;
		font-size: 26rpx !important;
	}
	.segmented-control__item--text {
		font-size: 26rpx !important;
	}
}
</style>
