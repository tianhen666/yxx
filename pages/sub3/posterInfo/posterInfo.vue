<template>
	<w-painter
		:palette="posterData.value"
		@imgOK="createImgOk"
		@imgErr="imgErr"
		:use2D="true"
		:dirty="false"
		:LRU="false"
		customStyle="left: -9999px; top: -9999rpx;position: absolute;"
	></w-painter>
	<m-poster-diy></m-poster-diy>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref, provide, reactive } from 'vue'
import mPosterDiy from '@/pages/sub3/components/m-poster-diy/m-poster-diy.vue'
import { showLoading, saveImageToPhotosAlbum, previewImage, showToastText } from '@/aTemp/utils/uniAppTools.js'
import { _wxWxqrCode } from '@/aTemp/apis/login.js'
import { _posterGetPostercontent, _posterDraftsOne } from '@/aTemp/apis/poster.js'
// base64转图片路径
import { base64ToPath } from 'image-tools'

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 海报ID
const posterId = ref(0)
provide('posterId', posterId)

// 海报图片数据
const posterData = reactive({ value: {} })
provide('posterData', posterData)

// 海报其他数据(全部属性)
const posterOtherData = reactive({ value: {} })
provide('posterOtherData', posterOtherData)

// 是否门诊草稿箱
const drafts = ref('')

onLoad(options => {
	console.log(options)
	drafts.value = options.drafts
	posterId.value = parseInt(options.id) || 0
	posterGetPostercontent()
})

// 获取海报数据
const posterGetPostercontent = async () => {
	showLoading('海报数据加载中')

	// 获取邀请码
	const wxWxqrCode = await _wxWxqrCode({
		page: 'pages/main/index/index',
		scene: `i=${useUserMain.userid}&sd=${useUserMain.storeId}&s=0&t=0`,
		width: 430
	})
	const imgPath = await base64ToPath('data:image/png;base64,' + wxWxqrCode.data)

	let res = {}
	if (drafts.value == 'true') {
		res = await _posterDraftsOne({
			id: posterId.value
		})
	} else {
		res = await _posterGetPostercontent({
			id: posterId.value
		})
	}

	const { code, data, msg } = res
	// console.log(data)
	posterOtherData.value = data
	posterData.value = JSON.parse(data.posterImg)

	// 添加二维码
	posterData.value.views.push({
		css: {
			top: parseInt(posterData.value.height) - 100 + 'px',
			left: parseInt(posterData.value.width) - 100 + 'px',
			width: '80px',
			height: '80px'
		},
		id: 'code',
		type: 'image',
		url: imgPath
	})
	posterData.value.code = posterData.value.views.length - 1

	uni.hideLoading()
}

// 海报是否初始化完成
const firstComplete = ref(false)
// 图片生成完成
const createImgOk = e => {
	console.log(e.detail.path)

	if (firstComplete.value) {
		uni.hideLoading()
		saveImageToPhotosAlbum(e.detail.path).then(() => {
			previewImage([e.detail.path])
		})
	} else {
		uni.hideLoading()
		firstComplete.value = true
	}
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
