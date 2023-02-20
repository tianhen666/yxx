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
			<view class="fun-item" @tap.prevent.stop="fontAlignFun">
				<view class="icon"><image class="image" src="./images/scale_icon.png" mode="aspectFit" /></view>
				<text>对齐</text>
			</view>
			<view class="fun-item" @tap.prevent.stop="fontLineHeightFun">
				<view class="icon"><image class="image" src="./images/scale_icon.png" mode="aspectFit" /></view>
				<text>行高</text>
			</view>
			<view class="fun-item" @tap.prevent.stop="fontBoldFun">
				<view class="icon"><image class="image" src="./images/scale_icon.png" mode="aspectFit" /></view>
				<text>加粗</text>
			</view>
			<view class="fun-item" @tap.prevent.stop="fontFamilyFun">
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
			<view class="title_center">{{ fonstSetTitle }}</view>
			<view class="title_right" @tap.prevent.stop="fontStyleConfirm">确定</view>
		</view>

		<!-- 文字大小 -->
		<slider
			:value="parseInt(posterData.value.views[movableViewIndex]?.css?.fontSize || 8)"
			@change="fontSizeChange"
			show-value
			min="8"
			max="50"
			block-size="16"
			v-if="fontStyleSize"
			style="margin: 0;padding-top: 10px;"
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

		<!-- 对齐方式 -->
		<view class="font_align" v-if="fontStyleAlign">
			<view
				class="font_align_item"
				:class="item.val === (posterData.value.views[movableViewIndex]?.css?.textAlign || 'left') ? 'style1' : ''"
				@tap.stop.prevent="fontAlignChange(item, index)"
				v-for="(item, index) in alignList"
				:key="index"
			>
				<view class="icon"><image class="image" src="./images/scale_icon.png" mode="aspectFit" /></view>
				<text>{{ item.text }}</text>
			</view>
		</view>

		<!-- 文字行高 -->
		<slider
			:value="parseInt(posterData.value.views[movableViewIndex]?.css?.lineHeight || 8)"
			@change="fontLineHeightChange"
			show-value
			min="8"
			max="150"
			block-size="16"
			v-if="fontStyleLineHeight"
			style="margin: 0;padding-top: 10px;"
		/>

		<!-- 文字加粗 -->
		<view class="font_bold" v-if="fontStyleBold">
			<view
				class="font_bold_item"
				:class="item.val === (posterData.value.views[movableViewIndex].css.fontWeight || 'normal') ? 'style1' : ''"
				@tap.stop.prevent="fontBoldChange(item)"
				v-for="(item, index) in boldList"
				:key="index"
			>
				<view class="icon"><image class="image" src="./images/scale_icon.png" mode="aspectFit" /></view>
				<text>{{ item.text }}</text>
			</view>
		</view>

		<!-- 文字字体 -->
		<view class="font_family" v-if="fontStyleFamily">
			<view
				class="font_family_item"
				@tap.stop.prevent="fontFamilyChange(item)"
				v-for="(item, index) in familyList"
				:key="index"
			>
				<view class="img_box"><image class="image" :src="item.imgUrl" mode="aspectFill" /></view>
				<radio class="myradio" :checked="item.val === posterData.value.views[movableViewIndex].css.fontFamily" />
			</view>
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
// 设置标题文字
const fonstSetTitle = ref('设置文字大小')

/* 设置文字字体大小 */
const fontStyleSize = inject('fontStyleSize')
const fontSizeFun = () => {
	fonstSetTitle.value = '设置文字大小'
	fonstStyleFunShow.value = false
	fontStyleSize.value = true
}
const fontSizeChange = e => {
	posterData.value.views[movableViewIndex.value].css.fontSize = e.detail.value + 'px'
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
	fonstSetTitle.value = '设置文字颜色'
	fonstStyleFunShow.value = false
	fontStyleColor.value = true
}
const fontColorChange = color => {
	posterData.value.views[movableViewIndex.value].css.color = color
}

// 对齐方式
const alignList = [
	{
		text: '左对齐',
		val: 'left'
	},
	{
		text: '居中',
		val: 'center'
	},
	{
		text: '右对齐',
		val: 'right'
	}
]
const fontStyleAlign = inject('fontStyleAlign')
const fontAlignFun = () => {
	fonstSetTitle.value = '设置文字对齐方式'
	fonstStyleFunShow.value = false
	fontStyleAlign.value = true
}
const fontAlignChange = (item, index) => {
	posterData.value.views[movableViewIndex.value].css.textAlign = item.val
}

// 设置文字行高
const fontStyleLineHeight = inject('fontStyleLineHeight')
const fontLineHeightFun = () => {
	fonstSetTitle.value = '设置文字行高'
	fonstStyleFunShow.value = false
	fontStyleLineHeight.value = true
}
const fontLineHeightChange = e => {
	posterData.value.views[movableViewIndex.value].css.lineHeight = e.detail.value + 'px'
}

// 对齐方式
const boldList = [
	{
		text: '加粗',
		val: 'bold'
	},
	{
		text: '不加粗',
		val: 'normal'
	}
]
const fontStyleBold = inject('fontStyleBold')
const fontBoldFun = () => {
	fonstSetTitle.value = '设置文字加粗'
	fonstStyleFunShow.value = false
	fontStyleBold.value = true
}
const fontBoldChange = (item, index) => {
	posterData.value.views[movableViewIndex.value].css.fontWeight = item.val
}

// 设置文字字体
const familyList = [
	{
		val: '宋体',
		imgUrl: 'https://imgs.lechiwl.com/tooth/activity/0e5d2c8c-5a95-4daf-817e-feb6686e2e4b.jpg'
	},
	{
		val: '微软雅黑',
		imgUrl: 'https://imgs.lechiwl.com/tooth/activity/0e5d2c8c-5a95-4daf-817e-feb6686e2e4b.jpg'
	}
]
const fontStyleFamily = inject('fontStyleFamily')
const fontFamilyFun = () => {
	fonstSetTitle.value = '设置字体'
	fonstStyleFunShow.value = false
	fontStyleFamily.value = true
}
const fontFamilyChange = item => {
	posterData.value.views[movableViewIndex.value].css.fontFamily = item.val
}

// 取消修改
const fontStyleCancel = () => {
	if (fontStyleSize.value) {
		posterData.value.views[movableViewIndex.value].css.fontSize = movableViewObj.value.css.fontSize
		fontStyleSize.value = false
	}

	if (fontStyleColor.value) {
		posterData.value.views[movableViewIndex.value].css.color = movableViewObj.value.css.color
		fontStyleColor.value = false
	}

	if (fontStyleAlign.value) {
		posterData.value.views[movableViewIndex.value].css.textAlign = movableViewObj.value.css.textAlign
		fontStyleAlign.value = false
	}

	if (fontStyleLineHeight.value) {
		posterData.value.views[movableViewIndex.value].css.lineHeight = movableViewObj.value.css.lineHeight
		fontStyleLineHeight.value = false
	}

	if (fontStyleBold.value) {
		posterData.value.views[movableViewIndex.value].css.fontWeight = movableViewObj.value.css.fontWeight
		fontStyleBold.value = false
	}

	if (fontStyleFamily.value) {
		posterData.value.views[movableViewIndex.value].css.fontFamily = movableViewObj.value.css.fontWeight
		fontStyleFamily.value = false
	}

	fonstStyleFunShow.value = true
}
// 确定修改
const fontStyleConfirm = () => {
	if (fontStyleSize.value) {
		movableViewObj.value.css.fontSize = posterData.value.views[movableViewIndex.value].css.fontSize
		fontStyleSize.value = false
	}

	if (fontStyleColor.value) {
		movableViewObj.value.css.color = posterData.value.views[movableViewIndex.value].css.color
		fontStyleColor.value = false
	}

	if (fontStyleAlign.value) {
		movableViewObj.value.css.textAlign = posterData.value.views[movableViewIndex.value].css.textAlign
		fontStyleAlign.value = false
	}

	if (fontStyleLineHeight.value) {
		movableViewObj.value.css.lineHeight = posterData.value.views[movableViewIndex.value].css.lineHeight
		fontStyleLineHeight.value = false
	}

	if (fontStyleBold.value) {
		movableViewObj.value.css.fontWeight = posterData.value.views[movableViewIndex.value].css.fontWeight
		fontStyleBold.value = false
	}

	if (fontStyleFamily.value) {
		movableViewObj.value.css.fontFamily = posterData.value.views[movableViewIndex.value].css.fontFamily
		fontStyleFamily.value = false
	}

	typefontStylePopup.value.close()
	setTimeout(() => {
		fonstStyleFunShow.value = true
	}, 500)
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
		padding: 10px 20px 20px;
		font-size: 14px;
		border-bottom: 2px solid #ddd;
		margin:0 -20px 10px;
		&_left {
			color: #666;
		}
		&_center {
			color: #999;
		}
		&_right {
			color: #4b8eff;
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
	.font_color {
		display: grid;
		grid-template-columns: repeat(9, 1fr);
		grid-template-rows: 20px 20px;
		row-gap: 10px;
		padding-top: 10px;
		&_item {
			margin: auto;
			width: 20px;
			height: 20px;
		}
	}

	/* 文字对齐加粗 */
	.font_align,
	.font_bold {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 50px;
		margin-top: 20px;
		&_item {
			border: 1px solid #fff;
			flex: none;
			width: 28%;
			height: 50px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			background-color: #fff;
			font-size: 14px;
			border-radius: 8px;
			> .icon {
				width: 20px;
				height: 20px;
				> .image {
					width: 100%;
					height: 100%;
				}
			}
		}
		> .style1 {
			border: 1px solid #ff4b4b;
		}
	}

	/* 文字字体 */
	.font_family {
		&_item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 15px;
			padding-bottom: 15px;
			border-bottom: 1px solid #ddd;
			&:last-child{
				border: none;
			}
			&:last-child {
				margin-bottom: 0;
			}
			.img_box {
				flex: none;
				width: 70%;
				height: 50px;
				> .image {
					width: 100%;
					height: 100%;
				}
			}
			.myradio{
				transform:scale(0.7)
			}
		}
	}
}
</style>
