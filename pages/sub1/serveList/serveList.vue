<template>
	<m-page-loading v-if="loading"></m-page-loading>
	<view class="container" v-else>
		<m-serve-list2 :listData="serveListData"></m-serve-list2>
		<view class="blank40"></view>
		<view class="blank40"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { _serveGetlist } from '@/aTemp/apis/service.js'
// 拉取活动信息
const serveListData = ref([])

// 加载中
const loading = ref(true)

onLoad(options => {
	// console.log(options)
	_serveGetlist({ status: 0 }).then(res => {
		const { code, msg, data } = res
		serveListData.value = data
		loading.value = false
	})
})
</script>

<style lang="scss" scoped>
	.container{
		width: $main-width;
		margin: auto;
		padding: 32rpx 0;
	}
</style>