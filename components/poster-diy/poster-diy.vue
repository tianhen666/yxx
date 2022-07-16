<template>
	<!-- 移动区域 -->
	<view class="movableArea" id="movableArea" @tap.prevent.stop="movableAreaTap">
		<!-- 移动物体 -->
		<view
			class="movableView"
			@touchstart.prevent.stop="handleTouchStart($event, key)"
			@touchmove.prevent.stop="handleTouchMove($event, key)"
			:style="`transform: translate3d(${val.x}px,${val.y}px,0);z-index: ${val.z};`"
			v-for="(val, key) in posterData"
			:id="key"
			:key="key"
		>
			<!-- 文本用text节点 -->
			<view :style="`width:${val.w}px;height:auto`" v-if="val.type === 'text'">
				<text class="text" :style="val.style">{{ val.value }}</text>
			</view>

			<!-- 图片用image节点 -->
			<view :style="`width:${val.w}px;height:${val.h}px`" v-if="val.type === 'img'">
				<image :style="val.style" class="img" :src="val.value" mode="scaleToFill" />
			</view>

			<!-- 文本删除 -->
			<image
				v-if="val.type === 'text' && movableView.id === key"
				class="movableView_del movableView_del_text"
				src="../../static/del_1.png"
				mode="aspectFit"
				@touchend.prevent.stop="handleDelete(key)"
			/>
			<!-- 图片删除 -->
			<image
				v-if="val.type === 'img' && movableView.id === key"
				class="movableView_del movableView_del_img"
				src="../../static/del_1.png"
				mode="aspectFit"
				@touchend.prevent.stop="handleDelete(key)"
			/>

			<!-- 文本缩放 -->
			<image
				v-if="val.type === 'text' && movableView.id === key"
				class="movableView_scale movableView_scale_text"
				src="../../static/scale_icon.png"
				mode="aspectFit"
				@touchstart.prevent.stop="scaleTouchStart($event, key, 'text')"
				@touchmove.prevent.stop="scaleTouchMove($event, key, 'text')"
			/>
			<!-- 图片缩放 -->
			<image
				v-if="val.type === 'img' && movableView.id === key"
				class="movableView_scale movableView_scale_img"
				src="../../static/scale_icon.png"
				mode="aspectFit"
				@touchstart.prevent.stop="scaleTouchStart($event, key, 'img')"
				@touchmove.prevent.stop="scaleTouchMove($event, key, 'img')"
			/>
		</view>
	</view>
	
	<!-- 底部按钮 -->
	<function-button />
</template>

<script setup>
import { reactive, provide } from 'vue'
import functionButton from './function-button.vue'
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

// 当前移动物体数据
const movableView = reactive({
	// 编号
	id: '',
	// 位置
	relativeX: 0,
	relativeY: 0,
	// 宽高
	movableW: 0,
	movableH: 0
})
provide('movableView', movableView)

// 操作者触摸位置
const operator = reactive({
	touchX: 0,
	touchY: 0
})

// 移动区域点击事件
const movableAreaTap = e => {
	movableView.id = ''
}

// 判断是否有多个触摸点
const isOneTouch = e => {
	const len = e.touches.length
	if (len > 1) return false
	return true
}
// 触摸事件
const handleTouchStart = (e, key) => {
	let isOneTouchState = isOneTouch(e)
	if (!isOneTouchState) return false

	// 操作对象赋值
	operator.touchX = e.changedTouches[0].pageX
	operator.touchY = e.changedTouches[0].pageY

	// 移动对象赋值
	movableView.id = key
	movableView.relativeX = posterData[key].x
	movableView.relativeY = posterData[key].y
}
// 触摸滑动事件
const handleTouchMove = (e, key) => {
	if (movableView.id !== key) return false
	posterData[key].x = movableView.relativeX + e.changedTouches[0].pageX - operator.touchX
	posterData[key].y = movableView.relativeY + e.changedTouches[0].pageY - operator.touchY
}

// 缩放开始事件
const scaleTouchStart = (e, key, type) => {
	let isOneTouchState = isOneTouch(e)
	if (!isOneTouchState) return false
	// 设置触摸点位置
	operator.touchX = e.changedTouches[0].pageX
	operator.touchY = e.changedTouches[0].pageY
	// 保存当前移动物体宽高
	movableView.id = key
	movableView.movableW = posterData[key].w
	movableView.movableH = posterData[key].h
}
// 缩放中事件
const scaleTouchMove = (e, key, type) => {
	if (movableView.id !== key) return false

	if (type === 'text') {
		// 元素放大尺寸= 当前尺寸+变化尺寸
		posterData[key].w = Math.abs(movableView.movableW + e.changedTouches[0].pageX - operator.touchX)
	}
	// 图片根据y轴增加等比放大
	if (type === 'img') {
		posterData[key].h = Math.abs(movableView.movableH + e.changedTouches[0].pageY - operator.touchY)
		posterData[key].w = (posterData[key].h / movableView.movableH) * movableView.movableW
	}
}
// 删除
const handleDelete = key => {
	delete posterData[key]
}
</script>

<style lang="scss" scoped>
/*移动区域宽度*/
$movable-area-w: 320px;
/*移动区域高度*/
$movable-area-h: 560px;
/* 操作图标大小 */
$iocn-size: 15px;

.movableArea {
	position: relative;
	width: $movable-area-w;
	height: $movable-area-h;
	overflow: hidden;
	box-sizing: border-box;
	background-color: #ffffff;
	margin: auto;
	margin-top: 5px;
}
.movableView {
	border: 1px dashed red;
	height: auto;
	width: auto;
	box-sizing: border-box;
	position: absolute;
	cursor: pointer;
	line-height: 1;
}
.movableView .img {
	display: block;
	width: 100%;
	height: 100%;
}
.movableView .text {
	display: block;
}
.movableView_del,
.movableView_scale {
	width: $iocn-size;
	height: $iocn-size;
	position: absolute;
}
.movableView_del {
	left: -($iocn-size * 0.5);
}
.movableView_del_img {
	bottom: -($iocn-size * 0.5);
}
.movableView_del_text {
	top: 50%;
	margin-top: -($iocn-size * 0.5);
}
.movableView_scale {
	right: -($iocn-size * 0.5);
}
.movableView_scale_img {
	bottom: -($iocn-size * 0.5);
}
.movableView_scale_text {
	top: 50%;
	margin-top: -($iocn-size * 0.5);
}
</style>
