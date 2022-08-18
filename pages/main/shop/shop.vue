<template>
	<!-- 标题栏 -->
	<uni-nav-bar title="xxx门诊" statusBar fixed color="#ffffff" :border="false"></uni-nav-bar>

	<!-- 轮播 -->
	<m-carousel></m-carousel>
	<view class="blank40"></view>

	<!-- 三列布局 -->
	<m-title1 title="推荐商品"></m-title1>
	<m-three-columns></m-three-columns>
	<view class="blank40"></view>

	<!-- 商品列表 -->
	<m-shop-list>
		<template #title>
			<m-title2 title="商品列表"></m-title2>
		</template>
	</m-shop-list>
	<view class="blank40"></view>
</template>

<script setup>
import mShopList from './components/m-shop-list/m-shop-list.vue'
import mThreeColumns from './components/m-three-columns/m-three-columns.vue'
</script>
<style lang="scss" scoped>
:global(page) {
	background-color: #f5f5f5;
}
</style>
