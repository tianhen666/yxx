<template>
	<view v-show="fonstStyleFunShow">
		<view class="fun-container box">
			<view class="fun-item" @tap.prevent.stop="fontSizeFun">
				<view class="icon"><image class="image" src="./images/scale_icon.png" mode="aspectFit" /></view>
				<text>字号</text>
			</view>
			<view class="fun-item" @tap.prevent.stop="fontColorFun">
				<view class="icon"><image class="image" src="./images/scale_icon.png" mode="aspectFit" /></view>
				<text>颜色</text>
			</view>
			<view class="fun-item">
				<view class="icon"><image class="image" src="./images/scale_icon.png" mode="aspectFit" /></view>
				<text>对齐</text>
			</view>
			<view class="fun-item">
				<view class="icon"><image class="image" src="./images/scale_icon.png" mode="aspectFit" /></view>
				<text>行高</text>
			</view>
			<view class="fun-item">
				<view class="icon"><image class="image" src="./images/scale_icon.png" mode="aspectFit" /></view>
				<text>加粗</text>
			</view>
			<view class="fun-item">
				<view class="icon"><image class="image" src="./images/scale_icon.png" mode="aspectFit" /></view>
				<text>字体</text>
			</view>
			<view class="fun-item"></view>
			<view class="fun-item"></view>
		</view>
	</view>

	<view class="box1 box" v-show="!fonstStyleFunShow">
		<view class="title">
			<view class="title_left" @tap.prevent.stop="fontStyleCancel">取消</view>
			<view class="title_right" @tap.prevent.stop="fontStyleConfirm">确定</view>
		</view>

		<!-- 文字大小 -->
		<slider
			:value="parseInt(posterData?.views[movableViewIndex]?.css?.fontSize || 8)"
			@change="fontSizeChange"
			show-value
			min="8"
			max="50"
			block-size="16"
			v-if="fontStyleSize"
		/>

		<!-- 字体颜色 -->
		<view class="font_color" v-if="fontStyleColor">
			<view
				class="font_color_item"
				v-for="(item, index) in colorList"
				:key="index"
				:style="{ backgroundColor: item }"
				@tap.stop.prevent="fontColorChange(item)"
			></view>
		</view>
	</view>
</template>

<script setup>
import { ref, inject } from 'vue'
import { chooseImage, uploadFile, showToastText } from '@/aTemp/utils/uniAppTools.js'
// 全局基础配置
import config from '@/global-config.js'

// 接收弹出窗对象
const typefontStylePopup = inject('typefontStylePopup')
// 接收海报数据
const posterData = inject('posterData')
// 接收选中对象(初始值)
const movableViewObj = inject('movableViewObj')
// 当前选中的索引
const movableViewIndex = inject('movableViewIndex')

// 功能是否显示
const fonstStyleFunShow = inject('fonstStyleFunShow')

/* 设置文字字体大小 */
const fontStyleSize = inject('fontStyleSize')
const fontSizeFun = () => {
	fonstStyleFunShow.value = false
	fontStyleSize.value = true
}
const fontSizeChange = e => {
	posterData.views[movableViewIndex.value].css.fontSize = e.detail.value + 'px'
}

// 设置文字颜色
const colorList = [
	'#000000',
	'#de0202',
	'#f46200',
	'#a95403',
	'#308f33',
	'#2e8c8c',
	'#0132cc',
	'#670099',
	'#ca01cb',
	'#ffffff',
	'#fbdbde',
	'#ffd69e',
	'#f7f39c',
	'#ccffc7',
	'#b6fdf9',
	'#b3deff',
	'#c5bcf5',
	'#ebade0'
]
const fontStyleColor = inject('fontStyleColor')
const fontColorFun = () => {
	fonstStyleFunShow.value = false
	fontStyleColor.value = true
}
const fontColorChange = color => {
	posterData.views[movableViewIndex.value].css.color = color
}

// 取消修改
const fontStyleCancel = () => {
	if (fontStyleSize.value) {
		posterData.views[movableViewIndex.value].css.fontSize = movableViewObj.value.css.fontSize
		fontStyleSize.value = false
	}

	if (fontStyleColor.value) {
		posterData.views[movableViewIndex.value].css.color = movableViewObj.value.css.color
		fontStyleColor.value = false
	}

	fonstStyleFunShow.value = true
}
// 确定修改
const fontStyleConfirm = () => {
	if (fontStyleSize.value) {
		movableViewObj.value.css.fontSize = posterData.views[movableViewIndex.value].css.fontSize
		fontStyleSize.value = false
	}
	if (fontStyleColor.value) {
		movableViewObj.value.css.color = posterData.views[movableViewIndex.value].css.color
		fontStyleColor.value = false
	}
	typefontStylePopup.value.close()
	setTimeout(() => {
		fonstStyleFunShow.value = true
	}, 500)
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
	background-color: #f1f1f1;
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

	/*文字颜色*/
	> .font_color {
		display: grid;
		grid-template-columns: repeat(9, 1fr);
		grid-template-rows: 20px 20px;
		row-gap: 10px;
		.font_color_item {
			margin: auto;
			width: 20px;
			height: 20px;
		}
	}
}
</style>
