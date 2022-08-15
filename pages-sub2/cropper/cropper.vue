<template>
	<view class="container">
		<bt-cropper ref="cropper" showGrid :quality="0.8" :ratio="ratio" :imageSrc="imageSrc">
			<!-- 你想插入的内容 -->
			<m-btn-fix-bottom text="裁剪" @btnClick="crop" />
		</bt-cropper>
	</view>
</template>
<style>
.container {
	height: 100vh;
}
</style>
<script>
import http from '@/api/index.js'
// 获取请求地址
const baseURL = http.config.baseURL
export default {
	data() {
		return {
			imageSrc: '',
			ratio: 1,
			url: ''
		}
	},
	onLoad(option) {
		this.imageSrc = option.imgUrl
		this.ratio = parseFloat(option.ratio)
		this.url = baseURL + option.url
	},
	methods: {
		crop() {
			uni.showLoading({
				title: '裁剪，上传中',
				mask:true
			})
			// 通过组件定义的ref调用cropper方法，返回一个promise对象
			this.$refs.cropper.crop().then(([err, res]) => {
				if (!err) {
					uni.uploadFile({
						url: this.url, //仅为示例，非真实的接口地址
						filePath: res.tempFilePath,
						name: 'file',
						success: uploadFileRes => {
							uni.hideLoading()
							// 触发全局事件
							uni.$emit('cropper', { imgUrl: uploadFileRes.data })
							uni.navigateBack()
						}
					})
				} else {
					console.err(err)
				}
			})
		}
	}
}
</script>
