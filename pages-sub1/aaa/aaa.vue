<template>
<!-- 	<w-painter :palette="poster" @imgOK="createImgOk" :use2D="true" :refresh="refresh"></w-painter>
	<poster-diy :posterData="poster"></poster-diy>
	<button type="primary" @tap="saveImg">点击</button> -->
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { saveImageToPhotosAlbum, previewImage } from '@/utils/uniApp.js'
import { currTimestamp } from '@/utils/index.js'

// 解决使用原生微信小程序组件,传入object不能及时更新问题
let refresh = ref('')
// customStyle="left: -9999px; top: -9999rpx;position: absolute;"

let poster = reactive({
	width: '654rpx',
	height: '1000rpx',
	background: '#aaa',
	views: [
		{
			id: '1123123123123',
			type: 'text',
			text: '你好11',
			css: {
				top: '100rpx',
				left: '60rpx',
				fontSize: '30rpx',
				color: 'red'
			}
		}
	]
})
watch(
	() => poster,
	(newPoster, prevPoster) => {
		refresh.value = currTimestamp()
	},
	{
		deep: true
	}
)

let imgUrl = ref()
// 保存图片
const saveImg = () => {
	saveImageToPhotosAlbum(imgUrl.value).then(e => {
		previewImage([imgUrl.value])
	})
}

const createImgOk = e => {
	imgUrl.value = e.detail.path
	// console.log(e.detail.path)
	console.log(e.detail)
}
</script>
<style scoped>
:global(page) {
	background-color: #f1f1f1;
}
</style>
