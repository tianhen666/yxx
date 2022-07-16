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
				<view class="item">
					<view class="icon"><image class="icon_img" src="../../static/huiyuan.svg" mode="aspectFill"></image></view>
					<text>添加</text>
				</view>
				<view class="item" @tap="edit">
					<view class="icon"><image class="icon_img" src="../../static/huiyuan.svg" mode="aspectFill"></image></view>
					<text>编辑</text>

					<view class="fun-container" v-show="isShowFun">
						<view class="fun-item">
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
					</view>
				</view>
				<view class="item" @tap="fontStyle">
					<view class="icon"><image class="icon_img" src="../../static/huiyuan.svg" mode="aspectFill"></image></view>
					<text>文字</text>

					<view class="fun-container" v-show="isShowFun1">
						<view class="fun-item">
							<view class="icon">
								<uni-icons type="folder-add-filled" :color="icon1.color" :size="icon1.size"></uni-icons>
							</view>
							<text>修改</text>
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
import { readonly, provide, inject, ref, watch } from 'vue'
import { showToastText } from '../../utils/uniApp.js'
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
const isShowMask = ref(false)
provide('isShowMask', isShowMask)

// 编辑
const isShowFun = ref(false)
const edit = () => {
	if (!movableView.id) {
		showToastText("请选择文本或图片")
		return false
	}
	isShowFun.value = !isShowFun.value
	isShowFun1.value = false
}

// 文字样式
const isShowFun1 = ref(false)
const fontStyle = () => {
	isShowFun1.value = !isShowFun1.value
	isShowFun.value = false
}

// 选中数据
const movableView = inject('movableView')
//复制
const copy = () => {
	const checkedView = JSON.parse(JSON.stringify(posterData[movableView.id]))
	checkedView.x += 10
	checkedView.y += 10
	movableView.id +='-copy'
	posterData[movableView.id] = checkedView
	isShowFun.value = false
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
.icon {
	display: flex;
	justify-content: center;
	align-items: center;
}
.icon_img {
	width: 26px;
	height: 26px;
	display: block;
	margin-bottom: 2px;
}

.fun-container {
	border-radius: 5px;
	position: absolute;
	transform: translate3d(0, -100%, 0);
	background-color: #ffffff;
	padding: 10px;
	padding-bottom: 0;
	box-shadow: 0 0 7px grey;
	top: -13px;
}
.fun-item {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 10px;
	width: 100rpx;
}
</style>
