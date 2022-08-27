<template>
	<!-- 标题栏 -->
	<uni-nav-bar title="xxx门诊" statusBar fixed color="#ffffff" :border="false"></uni-nav-bar>

	<!-- 轮播 -->
	<m-carousel></m-carousel>
	<view class="blank30"></view>

	<!-- 门诊信息 -->
	<m-info></m-info>
	<view class="blank30"></view>

	<!-- 门诊活动 -->
	<m-activity-list>
		<template #title>
			<m-title2 title="热门活动" hot path="/pages-sub1/activityList/activityList"></m-title2>
		</template>
	</m-activity-list>
	<view class="blank30"></view>

	<!-- 门诊服务 -->
	<m-serve-list>
		<template #title>
			<m-title2 title="门诊服务"></m-title2>
		</template>
	</m-serve-list>
	<view class="blank40"></view>
</template>

<script setup>
import mInfo from './components/m-info/m-info.vue'
import mServeList from './components/m-serveList/m-serveList.vue'
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app'

onShareAppMessage(() => {
	return {
		title: 'xxx口腔门诊',
		path: '/pages/index/index'
	}
})
</script>
<style lang="scss" scoped>
:global(page) {
	background-color: #f5f5f5;
}

/* 图标颜色 */
:global(.uniui-paperplane-filled) {
	color: $main-color !important;
}
:global(.uniui-phone-filled) {
	color: $main-color !important;
}
</style>
