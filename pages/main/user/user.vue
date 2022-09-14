<template>
	
	<!-- 背景 -->
	<view class="bg"><image class="image" src="/static/images/bg.png" mode="aspectFill"></image></view>
	<!-- #ifndef H5 -->
	<!-- 标题栏 -->
	<uni-nav-bar statusBar :title="'我的'" color="#ffffff" :border="false"></uni-nav-bar>
	<!-- #endif -->
	
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
</style>
