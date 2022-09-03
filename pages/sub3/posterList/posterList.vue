<template>
	<view class="container">
		<view class="box1">
			<view class="box1_item" @tap="navigateTo('/pages/sub3/posterInfo/posterInfo')">
				<image src="/static/images/fuwu1.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>

	<view class="box1" :style="styleData"></view>
	<button @tap="aa">点击</button>
	<button @tap="bb">撤销</button>
</template>

<script setup>
import { ref } from 'vue'
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'
const styleData = ref({})

const aa = () => {
	const command = new ChangePositionCommand('left', 10)
	manager.addCommand(command)
	styleData.value = manager.state
}

const bb = () => {
	manager.undo()
	styleData.value = manager.state
}
</script>

<style lang="scss" scoped>
.box {
	width: $main-width;
	margin: auto;
	padding: $padding;
	background-color: #fff;
}
.box1 {
	position: fixed;
	width: 100px;
	height: 100px;
	background-color: red;
}
</style>
