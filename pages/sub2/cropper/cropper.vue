<template>
	<view class="container">
		<bt-cropper
			ref="cropper"
			showGrid
			:quality="1"
			:dWidth="750"
			:fileType="imgFormat"
			:ratio="ratio"
			:imageSrc="imageSrcs[imageSrcIndex]"
			canvas2d
		></bt-cropper>
		<m-btn-fix-bottom :text="`正在裁剪第${imageSrcIndex + 1}张图片(共${imageSrcs.length})`" @btnClick="crop" />
	</view>
</template>
<style>
.container {
	height: 100vh;
}
</style>
<script setup>
import { showToastText, navigateBack } from '@/aTemp/utils/uniAppTools'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// cropperStore裁剪状态管理
import { _storeCropper } from '@/aTemp/store/storeCropper.js'
const storeCropper = _storeCropper()

// 获取请求地址
import config from '@/global-config.js'
const baseURL = config.BASE_URL

const imageSrcs = ref([]) //需要裁剪的图片列表
const imageSrcIndex = ref(0) //当前正在裁剪的图片索引
const ratio = ref(1) //裁剪比例
const url = ref('') // 上传服务器url
const resImageSrcs = ref([]) //裁剪完成的图片
const cropper = ref(null) //裁剪组件对象
const param = ref('') //裁剪store字段参数
const baseDir = ref('') //上传到服务端的文件夹
const imgFormat = ref('jpg') // 生成图片的格式
onLoad(option => {
	imageSrcs.value = option.imgUrls ? decodeURIComponent(option.imgUrls).split(',') : []
	ratio.value = parseFloat(option.ratio) || 1
	param.value = option.param || 'imgUrls'
	url.value = baseURL + decodeURIComponent(option.url)
	baseDir.value = option.baseDir || ''
})

const crop = () => {
	uni.showLoading({
		title: '裁剪，上传中',
		mask: true
	})

	// 设置图片格式 是jpg, 还是png
	try {
		imgFormat.value = imageSrcs.value[imageSrcIndex.value].split('.')[1]
		// console.log(imageSrcs.value[imageSrcIndex.value])
	} catch (e) {
		console.log(e)
		imgFormat.value = 'jpg'
	}

	// 通过组件定义的ref调用cropper方法，返回一个promise对象
	cropper.value.crop().then(tempFilePath => {
		uni.uploadFile({
			url: url.value, //仅为示例，非真实的接口地址
			filePath: tempFilePath,
			formData: { baseDir: baseDir.value },
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
					// 全局添加完成后的图片
					storeCropper.$patch(state => {
						state.imgUrls[param.value].length = 0
						state.imgUrls[param.value].push(...resImageSrcs.value)
					})
					navigateBack()
				}
			}
		})
	})
}
</script>
