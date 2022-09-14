<template>
	<w-painter
		:palette="posterData"
		@imgOK="createImgOk"
		@imgErr="imgErr"
		:use2D="true"
		:dirty="false"
		:LRU="false"
		:refresh="refresh"
		customStyle="left: -9999px; top: -9999rpx;position: absolute;"
	></w-painter>
	<m-poster-diy :posterData="posterData" :refresh="refresh"></m-poster-diy>
</template>

<script setup>
import { reactive, ref, provide } from 'vue'
import mPosterDiy from '@/pages/sub3/components/m-poster-diy/m-poster-diy.vue'
import { showLoading, saveImageToPhotosAlbum, previewImage, showToastText } from '@/aTemp/utils/uniAppTools.js'
// 解决使用原生微信小程序组件,传入object不能及时更新问题
const refresh = ref('')
// 向下传递
provide('refresh', refresh)

// 海报数据
const posterData = reactive({
	width: '310px',
	height: '534px',
	background: '#aaa',
	views: [
		{
			id: '1123123123123',
			type: 'text',
			text: '你好11',
			css: {
				top: '100px',
				left: '60px',
				fontSize: '30px',
				color: 'red',
				width: '200px'
			}
		},
		{
			id: '22222222',
			type: 'text',
			text: '我是文字',
			css: {
				top: '300px',
				left: '60px',
				fontSize: '30px',
				width: '300px',
				color: 'red'
			}
		},
		{
			id: '33333333333333',
			type: 'image',
			url: 'https://imgs.fenxiangzl.com/tooth/activity/0e5d2c8c-5a95-4daf-817e-feb6686e2e4b.jpg',
			css: {
				top: '48px',
				left: '48px',
				width: '192px',
				height: '192px'
			}
		}
	]
})
// watch(
// 	() => poster,
// 	(newPoster, prevPoster) => {
//
// 	},
// 	{
// 		deep: true
// 	}
// )

showLoading('海报数据加载中')
const createImgOk = e => {
	uni.hideLoading()
	if (refresh.value) {
		saveImageToPhotosAlbum(e.detail.path).then(() => {
			previewImage([e.detail.path])
		})
	}
	console.log(e.detail.path)
}
const imgErr = e => {
	showToastText('海报加载失败~')
	uni.hideLoading()
}
</script>
<style scoped>
:global(page) {
	background-color: #f1f1f1;
}
</style>
