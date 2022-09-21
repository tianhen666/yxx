<template>
	<!-- 背景 -->
	<view class="bg"><image class="image" src="/static/images/bg.png" mode="aspectFill"></image></view>
	<!-- #ifndef H5 -->
	<!-- 标题栏 -->
	<uni-nav-bar statusBar :title="'门诊信息'" color="#ffffff" :border="false"></uni-nav-bar>
	<!-- #endif -->
	
	<!-- 轮播图 -->
	<!-- <m-carousel></m-carousel> -->
	<view class="blank30"></view>
	
	<!-- 关于我们一 -->
	<m-address></m-address>
	<view class="blank30"></view>

	<!-- 关于我们 -->
	<m-about>
		<template #title>
			<m-title3 title="关于我们"></m-title3>
		</template>
	</m-about>
	<view class="blank30"></view>

	<!-- 牙医 -->
	<m-dentist>
		<template #title>
			<m-title3 title="医生团队"></m-title3>
		</template>
	</m-dentist>
</template>

<script setup>
import mAddress from './components/m-address/m-address.vue'
import mAbout from './components/m-about/m-about.vue'
import mDentist from './components/m-dentist/m-dentist.vue'
</script>
<style lang="scss" scoped>
	
:global(page) {
	background-color: #F9F9F9;
}
</style>
