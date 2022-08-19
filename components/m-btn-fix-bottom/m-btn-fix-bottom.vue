<template>
	<view class="fix">
		<view class="fix_warpper">
			<button class="btn" @tap="btnClick">{{ props.text }}</button>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	text: {
		required: true,
		type: String,
		default: '按钮'
	}
})

const emits = defineEmits(['btnClick'])

const btnClick = () => {
	emits('btnClick')
}
</script>

<style lang="scss" scoped>
.fix {
	padding-top: 40rpx;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	height: 128rpx;
	box-sizing: content-box;
	.fix_warpper {
		position: fixed;
		// z-index: 88;
		z-index: 999999999;
		width: 100%;
		padding: $padding;
		padding-top: 0;
		box-sizing: border-box;
		left: 0;
		bottom: 40rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		> .btn {
			font-size: 32rpx;
			height: 88rpx;
			line-height: 88rpx;
			color: #ffffff;
			background-color: $main-color;
		}
	}
}
</style>
