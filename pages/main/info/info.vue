<template>
	<!-- 背景 -->
	<view class="pageBg"><image class="image" src="/static/images/bg.jpg" mode="aspectFill"></image></view>
	<!-- #ifndef H5 -->
	<!-- 标题栏 -->
	<uni-nav-bar statusBar fixed :title="'门诊信息'" color="#ffffff" :border="false"></uni-nav-bar>
	<!-- #endif -->

	<!-- 轮播图 -->
	<!-- <m-carousel></m-carousel> -->
	<view class="blank30"></view>

	<!-- 关于我们一 -->
	<m-address :info="info"></m-address>
	<view class="blank30"></view>

	<!-- 关于我们 -->
	<m-about :info="info">
		<template #title>
			<m-title3 title="关于我们"></m-title3>
		</template>
	</m-about>
	<view class="blank30"></view>

	<!-- 专家团队 -->
	<m-dentist :listData="docotorList">
		<template #title>
			<m-title3 title="专家团队"></m-title3>
		</template>
	</m-dentist>

	<view class="blank40"></view>
</template>

<script setup>
import mAddress from './components/m-address/m-address.vue'
import mAbout from './components/m-about/m-about.vue'
import mDentist from './components/m-dentist/m-dentist.vue'

import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { _storedoctorGetlist } from '@/aTemp/apis/doctor.js'
import { _storeGetinfo } from '@/aTemp/apis/store.js'

const docotorList = ref([])
const info = ref({})
// 获取医生列表
const getDoctorList = data => {
	_storedoctorGetlist(data).then(res => {
		const { code, data, msg } = res
		docotorList.value = data
	})
}

onLoad(options => {
	// 店铺信息
	_storeGetinfo().then(res => {
		const { code, msg, data } = res
		info.value = data
	})
})

onLoad(options => {
	// 获取医生列表
	getDoctorList()
})
</script>
<style lang="scss" scoped></style>
