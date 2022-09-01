<template>
	<view class="fix-wrapper">
		<view class="fix">
			<!-- 功能一 -->
			<view class="button-container">
				<view class="item">
					<view class="icon"><uni-icons type="undo-filled" :color="icon.color" :size="icon.size"></uni-icons></view>
					<text>撤销</text>
				</view>
				<view class="item">
					<view class="icon"><uni-icons type="redo-filled" :color="icon.color" :size="icon.size"></uni-icons></view>
					<text>重做</text>
				</view>
				<view class="item">
					<view class="icon"><uni-icons type="pyq" :color="icon.color" :size="icon.size"></uni-icons></view>
					<text>文案</text>
				</view>
				<view class="item">
					<view class="icon">
						<uni-icons type="folder-add-filled" :color="icon.color" :size="icon.size"></uni-icons>
					</view>
					<text>暂存</text>
				</view>
				<view class="item">
					<view class="icon"><uni-icons type="help-filled" :color="icon.color" :size="icon.size"></uni-icons></view>
					<text>帮助</text>
				</view>
			</view>

			<!-- 功能二 -->
			<view class="button1-container">
				<!-- 添加-->
				<view class="item" @tap.prevent.stop="handleAdd">
					<view class="icon">
						<uni-icons type="folder-add-filled" :color="icon1.color" :size="icon1.size"></uni-icons>
					</view>
					<text>添加</text>
				</view>

				<!-- 编辑 -->
				<view class="item" @tap.prevent.stop="handleEdit">
					<view class="icon">
						<uni-icons type="folder-add-filled" :color="icon1.color" :size="icon1.size"></uni-icons>
					</view>
					<text>编辑</text>
				</view>

				<!-- 设置文字样式 -->
				<view class="item" @tap="handleFontStyle">
					<view class="icon">
						<uni-icons type="folder-add-filled" :color="icon1.color" :size="icon1.size"></uni-icons>
					</view>
					<text>文字样式</text>
				</view>

				<!-- 保存海报 -->
				<view class="item"><button class="btn" @tap="savePosterImg">生成海报并下载到手机</button></view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { readonly, provide, inject, ref, watch, computed } from 'vue'
import { showLoading, showToastText } from '@/aTemp/utils/uniAppTools.js'
// 图标样式
const icon = readonly({
	color: '#ffffff',
	size: 19
})
const icon1 = readonly({
	color: '#550000',
	size: 29
})

// 接收选中对象(初始值)
const movableViewObj = inject('movableViewObj')
// 当前选中的索引
const movableViewIndex = inject('movableViewIndex')
// 接收海报数据
const posterData = inject('posterData')

// 保存海报
const refresh = inject('refresh')
// console.log(refresh)
const savePosterImg = () => {
	showLoading('海报生成中')
	refresh.value = Date.now()
}

// 添加一个元素
const typeAddPopup = inject('typeAddPopup')
const handleAdd = () => {
	typeAddPopup.value.open()
	movableViewIndex.value = ''
	movableViewObj.value = {}
}

// 编辑一个元素
const typeEditPopup = inject('typeEditPopup')
// 功能是否显示
const funShow = inject('funShow')
const handleEdit = () => {
	if (movableViewObj.value.type === 'image') {
		typeEditPopup.value.open()
	} else if (movableViewObj.value.type === 'text') {
		typeEditPopup.value.open()
	} else {
		showToastText('没有选中元素~')
	}
}

// 字体样式弹窗
const typefontStylePopup = inject('typefontStylePopup')
const handleFontStyle = () => {
	if (movableViewObj.value.type === 'text') {
		typefontStylePopup.value.open()
	} else {
		showToastText('请选择文字编辑~')
	}
}
</script>

<style lang="scss" scoped>
.fix-wrapper {
	height: 150px;
}
.fix {
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 88;
	width: 100%;
}
.button-container {
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	margin-bottom: 20rpx;
	padding-right: 30rpx;
	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background-color: #666666;
		border-radius: 50%;
		font-size: 10px;
		color: #fff;
		margin-left: 10px;
		> .icon {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 2px;
		}
	}
}

.button1-container {
	background-color: #ffffff;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 13px 30rpx;
	padding-bottom: 80rpx;
	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 13px;
		line-height: 1;
		color: #666666;
		position: relative;
		> .icon {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 2px;
		}
	}
	.btn {
		flex: none;
		background-color: $main-color;
		color: #ffffff;
		font-size: 14px;
		border-radius: 100px;
		margin: 0;
		width: 180px;
	}
}

.icon_img {
	width: 26px;
	height: 26px;
	display: block;
	margin-bottom: 3px;
}

.fun-container {
	border-radius: 5px;
	position: absolute;
	transform: translate3d(0, -100%, 0);
	background-color: #ffffff;
	padding-top: 12px;
	padding-bottom: 0;
	box-shadow: 0 0 7px grey;
	top: -13px;
}
.fun-item {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 12px;
	padding: 0 15px;
	width: 53px;
}
</style>
