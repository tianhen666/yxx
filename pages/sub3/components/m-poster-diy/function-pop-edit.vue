<template>
	<view v-show="funShow">
		<view class="fun-container box">
			<view class="fun-item" @tap.prevent.stop="modify">
				<view class="icon"><image class="image" src="./images/scale_icon.png" mode="aspectFit" /></view>
				<text>修改</text>
			</view>
			<view class="fun-item" @tap.prevent.stop="copy">
				<view class="icon"><image class="image" src="./images/scale_icon.png" mode="aspectFit" /></view>
				<text>复制</text>
			</view>
			<view class="fun-item" @tap.prevent.stop="del">
				<view class="icon"><image class="image" src="./images/scale_icon.png" mode="aspectFit" /></view>
				<text>删除</text>
			</view>
			<view class="fun-item" @tap.prevent.stop="moveTop">
				<view class="icon"><image class="image" src="./images/scale_icon.png" mode="aspectFit" /></view>
				<text>置顶</text>
			</view>
			<view class="fun-item" @tap.prevent.stop="moveBottom">
				<view class="icon"><image class="image" src="./images/scale_icon.png" mode="aspectFit" /></view>
				<text>置底</text>
			</view>
		</view>
	</view>

	<!-- 文字输入框 -->
	<view class="box1 box" v-show="!funShow && textInput">
		<view class="title">
			<view class="title_left" @tap.prevent.stop=";(textInput = false), (funShow = true)">取消</view>
			<view class="title_right" @tap.prevent.stop="textIpnutConfirm">确定</view>
		</view>
		<fuck-textarea v-model="movableViewObj.text" :maxlength="50" placeholder="请输入文字内容"></fuck-textarea>
	</view>
</template>

<script setup>
import { ref, inject } from 'vue'
import { chooseImage, uploadFile, showToastText } from '@/aTemp/utils/uniAppTools.js'
// 全局基础配置
import config from '@/global-config.js'

// 接收弹出窗对象
const typeEditPopup = inject('typeEditPopup')

// 接收海报数据
const posterData = inject('posterData')

// 接收选中对象(初始值)
const movableViewObj = inject('movableViewObj')

// 当前选中的索引
const movableViewIndex = inject('movableViewIndex')

// 功能是否显示
const funShow = inject('funShow')
// 输入框是否显示
const textInput = inject('textInput')
// 修改元素
const modify = () => {
	if (movableViewObj.value.type === 'image') {
	} else if (movableViewObj.value.type === 'text') {
		funShow.value = false
		textInput.value = true
	} else {
		showToastText('没有选中元素~')
	}
}
// 确认修改
const textIpnutConfirm = () => {
	if (textInput.value) {
		posterData.views[movableViewIndex.value].text = movableViewObj.value.text
		textInput.value = false
	}
	
	
	typeEditPopup.value.close()
	funShow.value = true
}

// 复制元素
const copy = async () => {
	const obj = JSON.parse(JSON.stringify(movableViewObj.value))
	obj.id = Date.now()
	obj.css.top = parseInt(obj.css.top) + 10 + 'px'
	obj.css.left = parseInt(obj.css.left) + 10 + 'px'

	movableViewObj.value = obj
	posterData.views.push(obj)
	movableViewIndex.value = posterData.views.length - 1
	typeEditPopup.value.close()
}

// 删除
const del = () => {
	posterData.views.splice(movableViewIndex.value, 1)
	movableViewObj.value = {}
	movableViewIndex.value = ''
	typeEditPopup.value.close()
}

// 置顶
const moveTop = () => {
	posterData.views.push(posterData.views.splice(movableViewIndex.value, 1)[0])
	movableViewIndex.value = posterData.views.length - 1
	typeEditPopup.value.close()
	// posterData.views.unshift(posterData.views.splice(movableViewIndex.value, 1)[0]);
}

// 置低
const moveBottom = () => {
	posterData.views.unshift(posterData.views.splice(movableViewIndex.value, 1)[0])
	movableViewIndex.value = 0
	typeEditPopup.value.close()
}
</script>

<style lang="scss" scoped>
.box {
	width: 100%;
	background-color: #fff;
	padding: 10px 0 40px;
	border-radius: 8px 8px 0 0;
	overflow: hidden;
	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		font-size: 14px;
		&_left {
			color: #999;
		}
		&_right {
			color: #ff4b4b;
		}
	}
}
.fun-container {
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
.box1 {
	padding-left: 20px;
	padding-right: 20px;
}
</style>
