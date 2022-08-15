<template>
	<view class="content">
		<!-- tab切换 -->
		<uni-segmented-control :current="current" :values="items" style-type="text" @clickItem="onClickItem" />
		<view class="blank20"></view>
		<!-- 切换内容 -->
		<view class="content"><mTabContent></mTabContent></view>
	</view>
</template>

<script setup>
import mTabContent from './components/m-tab-content/m-tab-content.vue'
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const items = reactive(['全部', '待付款', '待使用', '已完成'])
const current = ref(0)
// tab切换
const onClickItem = e => {
	if (current.value !== e.currentIndex) {
		current.value = e.currentIndex
	}
}

// 页面加载
onLoad(option => {
	current.value = parseInt(option.current)
})


</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #f5f5f5;
}
.content {
	:deep(.segmented-control--text) {
		height: 92rpx !important;
		background-color: #ffffff;
	}
}
</style>
