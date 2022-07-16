<template>
	<view class="mask" @tap="closure" v-show="isShowMask"></view>
	<view class="fun-container" v-if="isShowFun" :class="{ moveUp: isShowMask, moveDown: !isShowMask }"></view>
</template>

<script setup>
import { inject,watch,ref } from 'vue'
// 蒙版是否显示
const isShowMask = inject('isShowMask')
// 功能函数是否显示
const isShowFun = ref(false)
// 如果蒙版显示为true,执行一次
watch(isShowMask, () => {
	isShowFun.value = true
})
// 关闭蒙版
const closure = () => {
	isShowMask.value = false
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
	z-index: 9999998;
}
.fun-container {
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 9999999;
	height: 150px;
	width: 100%;
	background-color: #fff;
	border-radius: 20rpx;
	transform: translate3d(0, 100%, 0);
	perspective: 1000px;
	backface-visibility: hidden;
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
