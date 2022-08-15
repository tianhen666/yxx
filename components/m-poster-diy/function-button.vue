<template>
	<view class="fix-wrapper">
		<view class="fix">
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
			<view class="button1-container">
				<view class="item" @tap.prevent.stop="handleAdd">
					<view class="icon"><image class="icon_img" src="../../static/huiyuan.svg" mode="aspectFill"></image></view>
					<text>添加</text>
				</view>
				<view class="item" @tap="editWraper">
					<view class="icon"><image class="icon_img" src="../../static/huiyuan.svg" mode="aspectFill"></image></view>
					<text>编辑</text>

					<!-- 编辑功能按钮 -->
					<view class="fun-container" v-show="isShowFun">
						<view class="fun-item" @tap.prevent.stop="edit">
							<view class="icon">
								<uni-icons type="folder-add-filled" :color="icon1.color" :size="icon1.size"></uni-icons>
							</view>
							<text>修改</text>
						</view>
						<view class="fun-item" @tap.prevent.stop="copy">
							<view class="icon">
								<uni-icons type="folder-add-filled" :color="icon1.color" :size="icon1.size"></uni-icons>
							</view>
							<text>复制</text>
						</view>
						<view class="fun-item" @tap.prevent.stop="handleDelete">
							<view class="icon">
								<uni-icons type="folder-add-filled" :color="icon1.color" :size="icon1.size"></uni-icons>
							</view>
							<text>删除</text>
						</view>
						<view class="fun-item" @tap.prevent.stop="moveToTop">
							<view class="icon">
								<uni-icons type="folder-add-filled" :color="icon1.color" :size="icon1.size"></uni-icons>
							</view>
							<text>置顶</text>
						</view>
						<view class="fun-item" @tap.prevent.stop="moveToBottom">
							<view class="icon">
								<uni-icons type="folder-add-filled" :color="icon1.color" :size="icon1.size"></uni-icons>
							</view>
							<text>置底</text>
						</view>
					</view>
				</view>
				<view class="item" @tap="fontStyle">
					<view class="icon"><image class="icon_img" src="../../static/huiyuan.svg" mode="aspectFill"></image></view>
					<text>文字样式</text>

					<view class="fun-container" v-show="isShowFun1">
						<view class="fun-item" @tap.prevent.stop="fontSize">
							<view class="icon">
								<uni-icons type="folder-add-filled" :color="icon1.color" :size="icon1.size"></uni-icons>
							</view>
							<text>字号</text>
						</view>
						<view class="fun-item" @tap.prevent.stop="fontColor">
							<view class="icon">
								<uni-icons type="folder-add-filled" :color="icon1.color" :size="icon1.size"></uni-icons>
							</view>
							<text>颜色</text>
						</view>
						<view class="fun-item">
							<view class="icon">
								<uni-icons type="folder-add-filled" :color="icon1.color" :size="icon1.size"></uni-icons>
							</view>
							<text>对齐</text>
						</view>
						<view class="fun-item">
							<view class="icon">
								<uni-icons type="folder-add-filled" :color="icon1.color" :size="icon1.size"></uni-icons>
							</view>
							<text>行高</text>
						</view>
						<view class="fun-item">
							<view class="icon">
								<uni-icons type="folder-add-filled" :color="icon1.color" :size="icon1.size"></uni-icons>
							</view>
							<text>加粗</text>
						</view>
						<view class="fun-item">
							<view class="icon">
								<uni-icons type="folder-add-filled" :color="icon1.color" :size="icon1.size"></uni-icons>
							</view>
							<text>字体</text>
						</view>
					</view>
				</view>
				<view class="item">
					<view class="btn"><text>生成海报并下载到手机</text></view>
				</view>
			</view>
		</view>
	</view>
	<!-- 功能选项弹框 -->
	<function-pop />
</template>

<script setup>
import functionPop from './function-pop.vue'
import { readonly, provide, inject, ref, watch, computed } from 'vue'
import { showToastText } from '../../utils/uniApp.js'
import { currTimestamp } from '../../utils/index.js'
// 图标样式
const icon = readonly({
	color: '#ffffff',
	size: 19
})
const icon1 = readonly({
	color: '#550000',
	size: 19
})
// 海报数据
const posterData = inject('posterData')

// 是否显示蒙版
const isShowMask = inject('isShowMask')
// 功能选项
const funType = inject('funType')

// 编辑
const isShowFun = ref(false)
const editWraper = () => {
	isShowFun1.value = false
	if (!movableView.id) {
		showToastText('请选择文字或图片')
		return false
	}
	isShowFun.value = !isShowFun.value
}

// 文字样式
const isShowFun1 = ref(false)
const fontStyle = () => {
	isShowFun.value = false
	if (movableView.type !== 'text' || !movableView.id) {
		showToastText('请选择文字编辑')
		return false
	}
	isShowFun1.value = !isShowFun1.value
}
// 字号
const fontSize = () => {
	funType.value = 1
	funType.title = '修改文字大小'
	funType.type = 'text'
	isShowMask.value = true
	isShowFun1.value = false
}
// 颜色
const fontColor = () => {
	funType.value = 2
	funType.title = '修改文字颜色'
	funType.type = 'text'
	isShowMask.value = true
	isShowFun1.value = false
}

// 选中数据
const movableView = inject('movableView')
watch(
	() => movableView.id,
	(id, prevId) => {
		// 如果ID为空隐藏功能选项
		if (!id) {
			isShowFun.value = false
			isShowFun1.value = false
		}
	}
)
//复制
const copy = () => {
	const addId = 'id_' + timestamp()
	const checkedView = JSON.parse(JSON.stringify(posterData[movableView.id]))
	checkedView.x += 10
	checkedView.y += 10
	movableView.id = addId
	posterData[movableView.id] = checkedView
	isShowFun.value = false
}

// 返回降序层级
const descendZindexArry = () => {
	const arry1 = Object.entries(posterData)
	const arry2 = arry1.map(item => item[1].z)
	arry2.sort((a, b) => {
		return a - b
	})
	return arry2
}

// 放置顶部
const moveToTop = () => {
	const zindexArry = descendZindexArry()
	const zindexMax = zindexArry[zindexArry.length - 1]
	const zindexCurrent = posterData[movableView.id].z
	isShowFun.value = false
	if (zindexCurrent === zindexMax) return false
	posterData[movableView.id].z = zindexMax + 1
}
// 放置底部
const moveToBottom = () => {
	const zindexArry = descendZindexArry()
	const zindexMin = zindexArry[0]
	const zindexCurrent = posterData[movableView.id].z
	isShowFun.value = false
	if (zindexCurrent === zindexMin) return false
	if (zindexMin <= 0) {
		posterData[movableView.id].z = 0
	} else {
		posterData[movableView.id].z = zindexMin - 1
	}
}

const emit = defineEmits(['handleEdit', 'handleDelete'])
// 编辑
const edit = () => {
	emit('handleEdit')
	isShowFun.value = false
	isShowFun1.value = false
}

// 删除
const handleDelete = () => {
	emit('handleDelete')
	isShowFun.value = false
}

// 添加
const handleAdd = () => {
	isShowMask.value = true
	funType.value = 0
	funType.type = 'add'
	isShowFun.value = false
	isShowFun1.value = false
}
</script>

<style lang="scss" scoped>
.fix-wrapper {
	height: 140px;
}
.fix {
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 99997;
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
		width: 40px;
		height: 40px;
		background-color: #666666;
		border-radius: 50%;
		font-size: 10px;
		line-height: 1;
		color: #fff;
		margin-left: 10px;
		align-items: center;
		justify-content: center;
	}
}
.button1-container {
	background-color: #ffffff;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: 13px 30rpx;
	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 13px;
		line-height: 1;
		color: #666666;
		position: relative;
	}
	.btn {
		background-color: aqua;
		color: #ffffff;
		font-size: 14px;
		padding: 13px 20px;
		border-radius: 100px;
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
