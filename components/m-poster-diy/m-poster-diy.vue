<template>
	<!-- 移动区域 -->
	<view class="movableArea" id="movableArea" @tap.prevent.stop="movableAreaTap" :style="movableAreaStyle">
		<!-- 移动物体 -->
		<view
			v-for="item in posterData.views"
			:key="item.id"
			:style="`transform: translate3d(${item.css.left},${item.css.top},0);z-index: ${item.css.zIndex};`"
			class="movableView"
		>
			<text class="tip" v-if="movableView.id === item.id" @tap.prevent.stop="handleEdit">
				点击修改{{ item.type === 'text' ? '文字' : '图片' }}
			</text>

			<view
				class="movableVie-wrapper"
				@touchstart.prevent.stop="handleTouchStart($event, item)"
				@touchmove.prevent.stop="handleTouchMove($event, item)"
				:id="item.id"
			>
				<!-- 文本用text节点 -->
				<image v-if="item.type === 'img'" :style="item.style" class="img" :src="item.value" mode="scaleToFill" />
				<!-- 图片用image节点 -->
				<text v-if="item.type === 'text'" :style="item.css" class="text">{{ item.text }}</text>
			</view>

			<!-- 删除 -->
			<view
				v-if="movableView.id === item.id"
				:class="[item.type === 'text' ? 'movableView_del_text' : 'movableView_del_img', 'movableView_del']"
				@tap.prevent.stop="handleDelete"
			>
				<image src="/static/poster-diy/del_1.png" mode="aspectFit" style="width: 100%;height: 100%;" />
			</view>

			<!-- 缩放 -->
			<!-- <view
				v-if="movableView.id === item.id"
				@touchstart.prevent.stop="scaleTouchStart($event, item.id)"
				@touchmove.prevent.stop="scaleTouchMove($event, item.id)"
				@touchend.prevent.stop="scaleTouchEnd"
				:class="[val.type === 'text' ? 'movableView_scale_text' : 'movableView_scale_img', 'movableView_scale']"
			>
				<image src="../../static/scale_icon.png" mode="aspectFit" style="width: 100%;height: 100%;" />
			</view> -->
		</view>
	</view>

	<!-- 底部按钮 -->
	<!-- <function-button @handleEdit="handleEdit" @handleDelete="handleDelete" /> -->
</template>

<script setup>
import { reactive, provide, ref, watch, computed, toRaw } from 'vue'
import functionButton from './function-button.vue'
import { chooseImage, getImageInfo } from '../../utils/uniApp.js'
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
	return `width:${posterData.width};height:${posterData.height};background:${posterData.background};`
})

// 当前移动物体数据
let movableView = reactive({
	id: '',
	type: ''
})
provide('movableView', movableView)

// 操作者触摸位置
const operator = reactive({
	touchX: 0,
	touchY: 0
})

// 移动区域点击事件
// const movableAreaTap = e => {
// 	movableView = {}
// }

// 判断是否只有一个触摸点
const isOneTouch = e => {
	const len = e.touches.length
	if (len > 1) return false
	return true
}

// 触摸事件
const handleTouchStart = (e, item) => {
	let isOneTouchState = isOneTouch(e)
	if (!isOneTouchState) return false
	// 操作对象赋值
	operator.touchX = e.changedTouches[0].pageX
	operator.touchY = e.changedTouches[0].pageY
	// 移动对象赋值
	const currMovableView = JSON.parse(JSON.stringify(item))
	Object.keys(currMovableView).forEach(key => {
		movableView[key] = currMovableView[key]
	})
}
// 触摸滑动事件
const handleTouchMove = (e, item) => {
	let isOneTouchState = isOneTouch(e)
	if (!isOneTouchState) return false
	if (movableView.id !== e.currentTarget.id) return false
	item.css.top =
		parseFloat(movableView.css.top) + (e.changedTouches[0].pageY - operator.touchY) / (uni.upx2px(10) / 10) + 'rpx'
	item.css.left =
		parseFloat(movableView.css.left) + (e.changedTouches[0].pageX - operator.touchX) / (uni.upx2px(10) / 10) + 'rpx'
}

// TouchMove有时会同时触发,设置一个标识，防止同时触发
// // 应该是一个bug
// const isScaleStart = ref(false)
// // 缩放开始事件
// const scaleTouchStart = (e, key, type) => {
// 	let isOneTouchState = isOneTouch(e)
// 	if (!isOneTouchState) return false
// 	isScaleStart.value = true
// 	// 设置触摸点位置
// 	operator.touchX = e.changedTouches[0].pageX
// 	operator.touchY = e.changedTouches[0].pageY
// 	// 保存当前移动物体宽高
// 	movableView.id = key
// 	movableView.movableW = parseInt(posterData[key].style.width) || 0
// 	movableView.movableH = parseInt(posterData[key].style.height) || 0
// }
// // 缩放中事件
// const scaleTouchMove = (e, key, type) => {
// 	let isOneTouchState = isOneTouch(e)
// 	if (!isOneTouchState) return false
// 	if (!isScaleStart.value) return false
// 	if (movableView.id !== key) return false
// 	// 文本横向放大
// 	if (type === 'text') {
// 		posterData[key].style.width = Math.abs(movableView.movableW + e.changedTouches[0].pageX - operator.touchX) + 'px'
// 	}
// 	// 图片根据y轴增加等比放大
// 	if (type === 'img') {
// 		posterData[key].style.height = Math.abs(movableView.movableH + e.changedTouches[0].pageY - operator.touchY) + 'px'
// 		posterData[key].style.width =
// 			(parseInt(posterData[key].style.height) / movableView.movableH) * movableView.movableW + 'px'
// 	}
// }
// 缩放结束
// const scaleTouchEnd = () => {
// 	isScaleStart.value = false
// }
// 删除
// const handleDelete = () => {
// 	delete posterData[movableView.id]
// 	movableView.id = ''
// }

// // 是否显示蒙版
// const isShowMask = ref(false)
// provide('isShowMask', isShowMask)
// // 功能选项
// const funType = reactive({
// 	type: '',
// 	value: 0
// })
// provide('funType', funType)

// // 编辑事件
// const handleEdit = () => {
// 	// 图片编辑
// 	if (movableView.type === 'img') {
// 		// 选择图片
// 		chooseImage(1).then(imgList => {
// 			// 获取图片详情信息
// 			getImageInfo(imgList[0]).then(image => {
// 				posterData[movableView.id].style.width = 100 + 'px'
// 				posterData[movableView.id].style.height = image.height * (100 / image.width) + 'px'
// 				posterData[movableView.id].value = image.path
// 			})
// 		})
// 	}

// 	// 文本编辑
// 	if (movableView.type === 'text') {
// 		isShowMask.value = true
// 		funType.type = 'text'
// 		funType.title = '修改文字内容'
// 		funType.value = 0
// 	}
// }
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
	background-color: #eeeeee;
	margin: auto;
	margin-top: 20px;
}
.movableView {
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px dashed red;
	height: auto;
	width: auto;
	box-sizing: border-box;
	position: absolute;
	cursor: pointer;
	line-height: 1;
}
.movableView .tip {
	font-size: 10px;
	display: block;
	background-color: rgba(0, 0, 0, 0.4);
	color: #ffffff;
	position: absolute;
	transform: translate3d(0, -100%, 0);
	top: -2px;
	width: 60px;
	padding: 4px 8px;
	border-radius: 5px;
}
.movableView .img {
	display: block;
}
.movableView .text {
	display: block;
	text-align: center;
}
.movableView_del,
.movableView_scale {
	width: $iocn-size;
	height: $iocn-size;
	position: absolute;
}
.movableView_del {
	left: -($iocn-size * 1.2);
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
