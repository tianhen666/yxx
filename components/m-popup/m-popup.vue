<template>
	<uni-popup ref="popupObj">
		<view class="popup-content" type="center">
			<view class="close" @tap.stop="popupObj.close()">
				<image class="img" src="@/static/images/close1.png" mode="aspectFill"></image>
			</view>
			<text class="text">{{ content }}</text>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'm-popup'
}
</script>

<script setup>
import { ref } from 'vue'
const props = defineProps({
	content: {
		required: true,
		type: String,
		default: '提示内容'
	}
})

/**
 * 弹出层控制
 * */
const popupObj = ref(null)
// 表单弹出
const popupfun = () => {
	popupObj.value.open()
}
// 表单关闭
const closefun = () => {
	popupObj.value.close()
}

defineExpose({
	popupfun,
	closefun
})
</script>

<style lang="scss">
/* 弹出框 */
.popup-content {
	background-color: #fff;
	border-radius: 16rpx;
	overflow: hidden;
	padding: 50rpx;
	max-width: 500rpx;
	max-height: 500rpx;
	overflow-y: auto;
	position: relative;
	.text {
		font-size: 30rpx;
		line-height: 2;
	}
	.close {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		.img {
			width: 35rpx;
			height: 35rpx;
		}
	}
}
</style>
