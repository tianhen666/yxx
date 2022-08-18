<template>
	<!-- 标题栏 -->
	<uni-nav-bar title="个人中心" statusBar fixed color="#ffffff" :border="false"></uni-nav-bar>

	<!-- 用户端显示 -->
	<p-user v-if="false"></p-user>

	<!-- 商家端显示 -->
	<s-user v-else></s-user>
</template>
<t-color-picker></t-color-picker>
<script setup>
import pUser from './components/p-user.vue'
import sUser from './components/s-user.vue'
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #f5f5f5;
}
:global(.bg) {
	height: 100rpx;
	width: 750rpx;
	background-image: linear-gradient($main-color 0%, transparent);
}
</style>
