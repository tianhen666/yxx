<template>
	<w-painter
		:palette="posterData.value"
		@imgOK="createImgOk"
		@imgErr="imgErr"
		:use2D="true"
		:dirty="false"
		:LRU="false"
		:refresh="refresh"
		customStyle="left: -9999px; top: -9999rpx;position: absolute;"
	></w-painter>
	<m-poster-diy></m-poster-diy>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref, provide, reactive } from 'vue'
import mPosterDiy from '@/pages/sub3/components/m-poster-diy/m-poster-diy.vue'
import { showLoading, saveImageToPhotosAlbum, previewImage, showToastText } from '@/aTemp/utils/uniAppTools.js'

import { _posterGetPostercontent } from '@/aTemp/apis/poster.js'
// 解决使用原生微信小程序组件,传入object不能及时更新问题
const refresh = ref('')
provide('refresh', refresh)
// 海报ID
const posterId = ref(0)
provide('posterId', posterId)
// 海报图片数据
const posterData = reactive({ value: {} })
provide('posterData', posterData)

// 海报其他数据(全部属性)
const posterOtherData = reactive({ value: {} })
provide('posterOtherData', posterOtherData)

onLoad(options => {
	// console.log(options)

	posterId.value = parseInt(options.id) || 0
	posterGetPostercontent()
})

// 获取海报数据
const posterGetPostercontent = () => {
	showLoading('海报数据加载中')
	_posterGetPostercontent({
		id: posterId.value
	}).then(res => {
		const { code, data, msg } = res
		// console.log(data)
		// console.log(data.posterimg)
		posterOtherData.value = data
		posterData.value = JSON.parse(data.posterimg)

		if (!data?.posterimg) {
			uni.hideLoading()
			showToastText('海报加载失败~')
		}
	})
}

// 图片生成完成
const createImgOk = e => {
	uni.hideLoading()
	if (refresh.value) {
		saveImageToPhotosAlbum(e.detail.path).then(() => {
			previewImage([e.detail.path])
		})
	}
	console.log(e.detail.path)
}
// 图片生成失败
const imgErr = e => {
	uni.hideLoading()
	showToastText('海报加载失败~')
}
</script>
<style scoped>
:global(page) {
	background-color: #f1f1f1;
}
</style>
