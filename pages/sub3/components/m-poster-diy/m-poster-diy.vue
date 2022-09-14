<template>
	<!-- 移动区域 -->
	<view class="movableArea" @tap="movableAreaTap" :style="movableAreaStyle">
		<!-- 移动物体 -->
		<view
			v-for="(item, index) in posterData.views"
			:key="index"
			:style="`transform: translate3d(${item.css.left},${item.css.top},0)`"
			class="movableView"
		>
			<view class="tip" v-show="movableViewIndex === index" @tap.prevent.stop="edit">
				点击修改{{ item.type === 'text' ? '文字' : '图片' }}
			</view>

			<view
				class="movableVie-wrapper"
				@touchstart.prevent.stop="handleTouchStart($event, item, index)"
				@touchmove.prevent.stop="movableViewIndex === index ? handleTouchMove($event, item, index) : ''"
				@touchend.prevent.stop="movableViewIndex === index ? handleTouchEnd($event, item, index) : ''"
				:id="item.id"
				:style="item.css"
				:class="{ heightText: item.type === 'text' }"
			>
				<!-- 图片用image节点 -->
				<image v-if="item.type === 'image'" class="img" :src="item.url" mode="aspectFill" />
				<!-- 文本用view节点 -->
				<text v-if="item.type === 'text'" class="text">{{ item.text }}</text>
			</view>

			<!-- 删除 -->
			<view
				v-show="movableViewIndex === index"
				:class="[item.type === 'text' ? 'movableView_del_text' : 'movableView_del_img', 'movableView_del']"
				@tap.prevent.stop="del"
			>
				<image class="image" src="./images/del_1.png" mode="aspectFit" />
			</view>

			<!-- 缩放 -->
			<view
				v-show="movableViewIndex === index"
				@touchstart.prevent.stop="movableViewIndex === index ? scaleTouchStart($event, item, index) : ''"
				@touchmove.prevent.stop="movableViewIndex === index ? scaleTouchMove($event, item, index) : ''"
				@touchend.prevent.stop="scaleTouchEnd"
				:class="[item.type === 'text' ? 'movableView_scale_text' : 'movableView_scale_img', 'movableView_scale']"
			>
				<image class="image" src="./images/scale_icon.png" mode="aspectFit" />
			</view>
		</view>
	</view>

	<!-- 底部按钮 -->
	<function-button />

	<!-- 添加元素弹窗 -->
	<uni-popup ref="typeAddPopup" type="bottom" :safeArea="false"><function-pop-add /></uni-popup>
	<!-- 编辑元素弹窗 -->
	<uni-popup ref="typeEditPopup" type="bottom" :safeArea="false" @maskClick="handleEditMask">
		<function-pop-edit />
	</uni-popup>
	<!-- 编制字体弹窗 -->
	<uni-popup ref="typefontStylePopup" type="bottom" :safeArea="false"><function-pop-font-style /></uni-popup>
</template>

<script setup>
import functionPopAdd from './function-pop-add.vue'
import functionPopEdit from './function-pop-edit.vue'
import functionPopFontStyle from './function-pop-font-style.vue'
import { reactive, provide, ref, watch, computed, toRaw } from 'vue'
import functionButton from './function-button.vue'
import { _debounce } from '@/aTemp/utils/tools.js'

const props = defineProps({
	posterData: {
		type: Object,
		required: true,
		default() {
			return {}
		}
	}
})

// 海报数据
const { posterData } = props
provide('posterData', posterData)

// 移动区域宽度
const movableAreaStyle = computed(() => {
	if (posterData.background.indexOf('.') !== -1) {
		return `width:${posterData.width};height:${posterData.height};background-image:url(${posterData.background});`
	} else {
		return `width:${posterData.width};height:${posterData.height};background-color:${posterData.background};`
	}
})

// 当前选中的元素(初始值)
const movableViewObj = ref({})
provide('movableViewObj', movableViewObj)

// 当前选中的索引
const movableViewIndex = ref(-1)
provide('movableViewIndex', movableViewIndex)

// 操作者触摸位置
let operator = {
	touchX: 0,
	touchY: 0
}

// 快照列表
let posterDataList = ref([])
provide('posterDataList', posterDataList)
// 快照指针
let posterDataListIndex = ref(-1)
provide('posterDataListIndex', posterDataListIndex)
// 当数据发生变化，是否记录快照
let pushStatus = ref(true)
provide('pushStatus', pushStatus)

// 添加一个快照记录
const setPosterDataList = _debounce(data => {
	posterDataList.value.push(data)
	posterDataListIndex.value++
	// console.log(posterDataListIndex)
	// console.log(posterDataList)
}, 300)

// 监听数据变化
watch(
	posterData.views,
	(newVal, oldVal) => {
		// 如果在撤销操作中不添加快照记录
		if (pushStatus.value) {
			setPosterDataList(JSON.stringify(newVal))
		}
	},
	{ immediate: true }
)

// 移动区域点击事件
const movableAreaTap = e => {
	movableViewObj.value = {}
	movableViewIndex.value = -1
}

// // 判断是否只有一个触摸点
const isOneTouch = e => {
	const len = e.touches.length
	if (len > 1) return false
	return true
}

// 触摸开始事件
const handleTouchStart = (e, item, index) => {
	// 有多个触摸点移除当前选中元素
	if (!isOneTouch(e)) {
		movableViewObj.value = {}
		movableViewIndex.value = -1
		return false
	}

	// 重新开始快照记录
	posterDataList.value = posterDataList.value.slice(0, posterDataListIndex.value + 1)
	pushStatus.value = true
	// console.log(posterDataList.value)
	// 清空触摸点位置
	operator = {
		touchX: 0,
		touchY: 0
	}
	// 设置触摸点位置
	operator.touchX = e.changedTouches[0].pageX
	operator.touchY = e.changedTouches[0].pageY

	// 保存当前选中的元素 深度复制
	movableViewObj.value = JSON.parse(JSON.stringify(item))
	movableViewIndex.value = index
}

// 触摸滑动事件
const handleTouchMove = (e, item, index) => {
	item.css.top = parseFloat(movableViewObj.value.css.top) + (e.changedTouches[0].pageY - operator.touchY) + 'px'
	item.css.left = parseFloat(movableViewObj.value.css.left) + (e.changedTouches[0].pageX - operator.touchX) + 'px'

	// console.log(item.css.top)
}
// 触摸结束事件
const handleTouchEnd = (e, item, index) => {}

// 缩放开始事件
const scaleTouchStart = (e, item, index) => {
	// 清空触摸点位置
	operator = {
		touchX: 0,
		touchY: 0
	}
	// 设置触摸点位置
	operator.touchX = e.changedTouches[0].pageX
	operator.touchY = e.changedTouches[0].pageY
	// 保存当前移动物体宽高
	movableViewObj.value.width = parseInt(item.css.width) || 0
	movableViewObj.value.height = parseInt(item.css.height) || 0
}
// 缩放中事件
const scaleTouchMove = (e, item, index) => {
	// 文本横向放大
	if (item.type === 'text') {
		item.css.width = Math.abs(movableViewObj.value.width + e.changedTouches[0].pageX - operator.touchX) + 'px'
	}
	// 图片根据y轴增加等比放大
	if (item.type === 'image') {
		item.css.height = Math.abs(movableViewObj.value.height + e.changedTouches[0].pageY - operator.touchY) + 'px'
		item.css.width = (parseInt(item.css.height) / movableViewObj.value.height) * movableViewObj.value.width + 'px'
	}
	// console.log(item.css.width)
}

/*
 * 弹窗对象
 *
 */
// 添加弹窗
const typeAddPopup = ref(null)
provide('typeAddPopup', typeAddPopup)
// 编辑弹窗
const typeEditPopup = ref(null)
provide('typeEditPopup', typeEditPopup)
// 字体样式弹窗
const typefontStylePopup = ref(null)
provide('typefontStylePopup', typefontStylePopup)

// 删除事件
const del = () => {
	posterData.views.splice(movableViewIndex.value, 1)
	movableViewObj.value = {}
	movableViewIndex.value = -1
}

// 显示修改功能面板
const funShow = ref(true)
provide('funShow', funShow)
// 输入框
const textInput = ref(false)
provide('textInput', textInput)
// 修改文字内容
const edit = () => {
	if (movableViewObj.value.type === 'image') {
		typeEditPopup.value.open()
	} else if (movableViewObj.value.type === 'text') {
		funShow.value = false
		textInput.value = true
		typeEditPopup.value.open()
	} else {
		showToastText('没有选中元素~')
	}
}
// 点击蒙版
const handleEditMask = () => {
	funShow.value = true
}

/*
 * 修改字体内容
 */
// 显示文字样式功能面板
const fonstStyleFunShow = ref(true)
provide('fonstStyleFunShow', fonstStyleFunShow)
// 设置文字大小
const fontStyleSize = ref(false)
provide('fontStyleSize', fontStyleSize)
// 设置文字颜色
const fontStyleColor = ref(false)
provide('fontStyleColor', fontStyleColor)
// 设置文字对齐方式
const fontStyleAlign = ref(false)
provide('fontStyleAlign', fontStyleAlign)
// 设置文字行高
const fontStyleLineHeight = ref(false)
provide('fontStyleLineHeight', fontStyleLineHeight)
// 设置文字粗体
const fontStyleBold = ref(false)
provide('fontStyleBold', fontStyleBold)
// 设置文字字体
const fontStyleFamily = ref(false)
provide('fontStyleFamily', fontStyleFamily)
</script>

<style lang="scss" scoped>
/*移动区域宽度*/
$movable-area-w: 320px;
/*移动区域高度*/
$movable-area-h: 560px;
/* 操作图标大小 */
$iocn-size: 18px;

.movableArea {
	position: relative;
	width: $movable-area-w;
	height: $movable-area-h;
	overflow: hidden;
	background-color: #fff;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	margin: auto;
	margin-top: 20px;
}
.movableView {
	border: 1px dashed red;
	height: auto;
	width: auto;
	line-height: 1;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 5;
}
.heightText {
	height: auto !important;
}
.movableView > .tip {
	font-size: 10px;
	background-color: rgba(0, 0, 0, 0.4);
	color: #ffffff;
	position: absolute;
	transform: translate3d(0, -100%, 0);
	top: -3px;
	padding: 4px 8px;
	border-radius: 5px;
	text-align: center;
	width: 90px;
}
.movableView .img {
	display: block;
	width: 100%;
	height: 100%;
}
.movableView_del,
.movableView_scale {
	position: absolute;
	z-index: 88;
	height: 100%;
	> .image {
		height: $iocn-size;
		width: $iocn-size;
	}
}
.movableView_del {
	left: -($iocn-size * 1.2);
}
.movableView_scale {
	right: -($iocn-size * 1.2);
}

.movableView_del_img {
	bottom: 0px;
}
.movableView_del_text {
}
.movableView_scale_img {
}
.movableView_scale_text {
}
</style>
