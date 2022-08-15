<template>
	<view class="container">
		<bt-cropper ref="cropper" showGrid :quality="0.8" :ratio="ratio" :imageSrc="imageSrcs[imageSrcIndex]">
			<!-- 你想插入的内容 -->
			<m-btn-fix-bottom :text="`正在裁剪第${imageSrcIndex + 1}张图片(共${imageSrcs.length})`" @btnClick="crop" />
		</bt-cropper>
	</view>
</template>
<style>
.container {
	height: 100vh;
}
</style>
<script setup>
import http from '@/api/index.js'
import { showToastText } from '@/utils/uniApp.js'
import { computed, ref, watch } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'

import { useCropperStore } from '@/stores/main'
// cropperStore裁剪状态管理
const cropperStore = useCropperStore()

const baseURL = http.config.baseURL // 获取请求地址

const imageSrcs = ref([]) //需要裁剪的图片列表
const imageSrcIndex = ref(0) //当前正在裁剪的图片索引
const ratio = ref(1) //裁剪比例
const url = ref('') // 上传服务器url
const resImageSrcs = ref([]) //裁剪完成的图片
const cropper = ref(null) //裁剪组件对象

onLoad(option => {
	imageSrcs.value = option.imgUrls ? decodeURIComponent(option.imgUrls).split(',') : []
	ratio.value = parseFloat(option.ratio)
	url.value = baseURL + decodeURIComponent(option.url)
})

const crop = () => {
	uni.showLoading({
		title: '裁剪，上传中',
		mask: true
	})
	// 通过组件定义的ref调用cropper方法，返回一个promise对象
	cropper.value.crop().then(([err, res]) => {
		if (!err) {
			uni.uploadFile({
				url: url.value, //仅为示例，非真实的接口地址
				filePath: res.tempFilePath,
				name: 'file',
				success: uploadFileRes => {
					uni.hideLoading()
					const { code, data: imgUrl, msg } = JSON.parse(uploadFileRes.data)
					if (code != 0) {
						showToastText('上传失败,请返回重试~')
						return
					}
					// 缓存已经裁剪完成的图片
					resImageSrcs.value.push(imgUrl)
					if (imageSrcs.value.length > resImageSrcs.value.length) {
						imageSrcIndex.value++
					} else {
						cropperStore.imgUrls = [...resImageSrcs.value]
						uni.navigateBack()
					}
				}
			})
		} else {
			console.err(err)
		}
	})
}
</script>
