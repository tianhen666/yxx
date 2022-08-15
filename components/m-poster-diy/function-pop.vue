<template>
	<!-- 蒙版 -->
	<view class="mask" v-show="isShowMask"></view>

	<!-- 动画 -->
	<view class="fun-container" v-if="isShowPanel" :class="{ moveUp: isShowMask, moveDown: !isShowMask }">
		<!-- 文字编辑 -->
		<view class="font_eidt" v-if="funType.type === 'text'">
			<view class="title-container">
				<view class="left" @tap="fontClose"><text>取消</text></view>
				<view class="center">
					<text>{{ funType.title }}</text>
				</view>
				<view class="right" @tap="fontConfirm"><text>确定</text></view>
			</view>

			<view class="content-container">
				<template v-if="funType.value === 0">
					<view class="textarea-wrapper">
						<textarea
							class="textarea"
							:show-confirm-bar="false"
							:maxlength="textareaMaxLength"
							auto-blur
							fixed
							:cursor-spacing="80"
							disable-default-padding
							v-model="posterData[movableView.id]['value']"
						/>
						<text class="textarea-tip">
							还能输入
							<text style="color: red;">{{ textareaLength }}</text>
							字
						</text>
					</view>
				</template>

				<template v-if="funType.value === 1">
					<slider :value="fontSize" @changing="fontSizeChange" show-value min="8" max="200" block-size="15" />
				</template>

				<template v-if="funType.value === 2">
					<view class="font-color">
						<view
							class="font-color-item"
							v-for="item in colorList"
							:style="{ backgroundColor: item }"
							@tap.stop.prevent="fontColorChange(item)"
						></view>
					</view>
					<view style="height: 12px;"></view>
					<view class="font-color">
						<view
							class="font-color-item"
							v-for="item in colorList1"
							:style="{ backgroundColor: item }"
							@tap.stop.prevent="fontColorChange(item)"
						></view>
					</view>
				</template>
			</view>
		</view>

		<!-- 添加选项 -->
		<view class="fun-item-wrapper" v-if="funType.type === 'add'">
			<template v-if="funType.value === 0">
				<view class="fun-wrap">
					<view class="fun-item" @tap.prevent.stop="addFont">
						<view class="icon"><image class="icon-img" src="../../static/huiyuan.svg" mode="aspectFill"></image></view>
						<text>文字</text>
					</view>
					<view class="fun-item" @tap.prevent.stop="addImg">
						<view class="icon"><image class="icon-img" src="../../static/huiyuan.svg" mode="aspectFill"></image></view>
						<text>图片</text>
					</view>
					<view class="fun-item">
						<view class="icon"><image class="icon-img" src="../../static/huiyuan.svg" mode="aspectFill"></image></view>
						<text>背景</text>
					</view>
					<view class="fun-item">
						<!-- <view class="icon"><image class="icon-img" src="../../static/huiyuan.svg" mode="aspectFill"></image></view>
					<text>图片</text> -->
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script setup>
import { inject, watchEffect, computed, ref, reactive } from 'vue'
import { currTimestamp } from '../../utils/index.js'
import { chooseImage, getImageInfo } from '../../utils/uniApp.js'
// 海报数据
const posterData = inject('posterData')
// 选中数据
const movableView = inject('movableView')
// 蒙版是否显示
const isShowMask = inject('isShowMask')
// 功能选项
const funType = inject('funType')

// 面板是否显示
const isShowPanel = ref(false)
watchEffect(() => {
	if (isShowMask.value) {
		isShowPanel.value = true
	}
})

// 当前值
const fontValue = computed({
	get: () => posterData[movableView.id]?.value || '',
	set: val => (posterData[movableView.id].value = val)
})
// 输入字数
const textareaMaxLength = ref(140)
// 剩余输入字数
const textareaLength = computed(() => textareaMaxLength.value - fontValue.value.length)
// 确认
const fontConfirm = e => {
	isShowMask.value = false
}
// 关闭
const fontClose = () => {
	if (funType.type === 'text' && funType.value === 0) {
		posterData[movableView.id].value = movableView.value
	}
	if (funType.type === 'text' && funType.value === 1) {
		posterData[movableView.id].style.fontSize = movableView?.style?.fontSize
	}
	if (funType.type === 'text' && funType.value === 2) {
		posterData[movableView.id].style.color = movableView?.style?.color
	}
	isShowMask.value = false
}
// 文字样式
const fontSize = computed(() => parseInt(posterData[movableView.id]?.style?.fontSize || 8))
const fontSizeChange = e => {
	posterData[movableView.id].style.fontSize = parseInt(e.detail.value) + 'px'
}
// 文字颜色
const colorList = ['#000000', '#de0202', '#f46200', '#a95403', '#308f33', '#2e8c8c', '#0132cc', '#670099', '#ca01cb']
const colorList1 = ['#ffffff', '#fbdbde', '#ffd69e', '#f7f39c', '#ccffc7', '#b6fdf9', '#b3deff', '#c5bcf5', '#ebade0']
const fontColorChange = color => {
	posterData[movableView.id].style.color = color
}

// 添加文字
const addFont = () => {
	// 初始化
	const initItem = {
		type: 'text',
		value: '新增元素',
		x: 100,
		y: 100,
		z: 100,
		style: { fontSize: '18px', width: '100px', height: 'auto' }
	}
	// 根据时间戳生成唯一字符串
	const addId = 'id_' + timestamp()
	posterData[addId] = initItem
	movableView.id = addId
	isShowMask.value = false
}
// 添加图片
const addImg = () => {
	// 初始化
	const initItem = {
		type: 'img',
		value: '',
		x: 100,
		y: 100,
		z: 100,
		style: { width: '0', height: '0' }
	}
	// 根据时间戳生成唯一字符串
	const addId = 'id_' + timestamp()

	// 选择图片
	chooseImage(1).then(imgList => {
		// 获取图片详情信息
		getImageInfo(imgList[0]).then(image => {
			initItem.style.width = 100 + 'px'
			initItem.style.height = image.height * (100 / image.width) + 'px'
			initItem.value = image.path
			movableView.id = addId
			posterData[addId] = initItem
			isShowMask.value = false
		})
	})
}
</script>

<style lang="scss" scoped>
.mask {
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.4);
	position: fixed;
	left: 0;
	top: 0;
	z-index: 99998;
}
.fun-container {
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 99999;
	width: 100%;
	background-color: #fff;
	border-radius: 20rpx;
	transform: translate3d(0, 100%, 0);
	perspective: 1000px;
	backface-visibility: hidden;
}

/*文字编辑*/
.title-container {
	padding: 15px 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #eee;
	.left {
		color: #aaaaaa;
	}
	.center {
		color: #666666;
	}
	.right {
		color: #ff0000;
	}
}
.content-container {
	color: #666666;
	background-color: #f0f0f0;
	width: 100%;
	box-sizing: border-box;
}
/*文字输入框*/
.textarea {
	width: 100%;
}
.textarea-tip {
	display: block;
	text-align: right;
	font-size: 12px;
	color: #bbb;
}
/*文字颜色*/
.font-color {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 0 20px;
	.font-color-item {
		width: 20px;
		height: 20px;
	}
}

/*功能区域*/
.fun-item-wrapper {
	padding: 20px 50px;
}
.fun-wrap {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.fun-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: #666666;
	font-size: 13px;
}

.icon-img {
	width: 30px;
	height: 30px;
	display: block;
	margin-bottom: 3px;
}
.moveUp {
	animation: moveUp 0.5s forwards;
}
@keyframes moveUp {
	0% {
		transform: translate3d(0, 100%, 0);
	}
	100% {
		transform: translate3d(0, 0, 0);
	}
}
.moveDown {
	animation: moveDown 0.5s forwards;
}
@keyframes moveDown {
	0% {
		transform: translate3d(0, 0, 0);
	}
	100% {
		transform: translate3d(0, 100%, 0);
	}
}
</style>
