<template>
	<view class="fun-container">
		<!-- 添加文字 -->
		<view class="fun-item" @tap.prevent.stop="addFont" v-if="false">
			<view class="icon"><image class="image" src="./images/scale_icon.png" mode="aspectFit" /></view>
			<text>文字</text>
		</view>

		<!-- 添加图片 -->
		<view class="fun-item" @tap.prevent.stop="addImg" v-if="false">
			<view class="icon"><image class="image" src="./images/scale_icon.png" mode="aspectFit" /></view>
			<text>图片</text>
		</view>

		<!-- 更换背景 -->
		<view class="fun-item" @tap.prevent.stop="addBg">
			<view class="icon"><image class="image" src="./images/scale_icon.png" mode="aspectFit" /></view>
			<text>背景</text>
		</view>

		<!-- 其他选项 -->
		<view class="fun-item">
			<!-- <view class="icon"><image class="icon-img" src="../../static/huiyuan.svg" mode="aspectFill"></image></view>
				<text>图片</text> -->
		</view>
	</view>
</template>

<script setup>
import { ref, inject } from 'vue'
import { chooseImage, uploadFile, showToastText, getImageInfo, showLoading } from '@/aTemp/utils/uniAppTools.js'
// 全局基础配置
import config from '@/global-config.js'

// 接收弹出窗对象
const typeAddPopup = inject('typeAddPopup')

// 接收海报数据
const posterData = inject('posterData')
// 接收选中对象(初始值)
const movableViewObj = inject('movableViewObj')
// 当前选中的索引
const movableViewIndex = inject('movableViewIndex')

// 添加文字
const addFont = () => {
	const newViewObj = {
		id: Date.now(),
		type: 'text',
		text: '新增文字',
		css: {
			top: '100px',
			left: '60px',
			fontSize: '14px',
			width: '60px'
		}
	}

	posterData.value.views.push(newViewObj)

	// 选中这个元素
	movableViewObj.value = newViewObj
	movableViewIndex.value = posterData.value.views.length - 1
	// console.log(movableViewObj.value)
	// console.log(movableViewIndex.value)

	typeAddPopup.value.close()
}

// 添加图片
const addImg = async () => {
	const imgList = await chooseImage(1)

	const getImgInfo = await getImageInfo(imgList[0])
	const { height: imgHeight, width: imgWidth, path: imgPath } = getImgInfo

	const resUploadFile = await uploadFile(imgPath, config.BASE_URL + '/upload-flv/uploadimage', {
		baseDir: 'poster_view'
	})
	const { code, data, msg } = JSON.parse(resUploadFile)

	const newViewObj = {
		id: Date.now(),
		type: 'image',
		url: data,
		css: {
			top: '50px',
			left: '50px',
			width: '100px',
			height: imgHeight / (imgWidth / 100) + 'px'
		}
	}
	posterData.value.views.push(newViewObj)

	// 选中这个元素
	movableViewObj.value = newViewObj
	movableViewIndex.value = posterData.value.views.length - 1
	// console.log(movableViewObj.value)
	// console.log(movableViewIndex.value)

	typeAddPopup.value.close()
}

// 修改背景
const addBg = async () => {
	typeAddPopup.value.close()
	const imgList = await chooseImage(1)
	const getImgInfo = await getImageInfo(imgList[0])
	const { height: imgHeight, width: imgWidth, path: imgPath } = getImgInfo
	showLoading('图片上传中')
	const resUploadFile = await uploadFile(imgPath, config.BASE_URL + '/upload-flv/uploadimage', { baseDir: 'poster_bg' })
	const { code, data, msg } = JSON.parse(resUploadFile)
	posterData.value.width = '310px'
	posterData.value.height = imgHeight / (imgWidth / 310) + 'px'
	posterData.value.background = data
	uni.hideLoading()
}
</script>

<style lang="scss" scoped>
.fun-container {
	width: 100%;
	background-color: #fff;
	padding: 10px 0 40px;
	border-radius: 8px 8px 0 0;
	overflow: hidden;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	.fun-item {
		width: 25%;
		flex: none;
		text-align: center;
		font-size: 13px;
		margin-top: 25px;
		.icon {
			margin: auto;
			width: 25px;
			height: 25px;
			margin-bottom: 8px;
			> .image {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
