<template>
	<!-- 标题栏 -->
	<uni-nav-bar title="xxx门诊" statusBar fixed color="#ffffff" :border="false"></uni-nav-bar>
	
	<!-- 关于我们一 -->
	<m-about-one></m-about-one>
	<view class="blank30"></view>

	<!-- 关于我们二 -->
	<m-about-two>
		<template #title>
			<m-title1 title="关于我们"></m-title1>
		</template>
	</m-about-two>
	<view class="blank30"></view>

	<!-- 牙医 -->
	<m-dentist>
		<template #title>
			<m-title1 title="医生团队"></m-title1>
		</template>
	</m-dentist>
</template>

<script setup>
import mAboutOne from './components/m-about-one/m-about-one.vue'
import mAboutTwo from './components/m-about-two/m-about-two.vue'
import mDentist from './components/m-dentist/m-dentist.vue'
</script>
<style lang="scss" scoped>
	
:global(page) {
	background-color: #f5f5f5;
}
</style>
