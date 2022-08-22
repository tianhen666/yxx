<template>
	<view class="fix">
		<view class="fix_warpper">
			<button class="btn btn1" @tap="btnClick1">{{ props.text1 }}</button>
			<button class="btn btn2" @tap="btnClick2">{{ props.text2 }}</button>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	text1: {
		required: true,
		type: String,
		default: '分类'
	},
	text2: {
		required: true,
		type: String,
		default: '按钮'
	}
})

const emits = defineEmits(['btnClick1', 'btnClick2'])

const btnClick1 = () => {
	emits('btnClick1')
}
const btnClick2 = () => {
	emits('btnClick2')
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
		@include mFlex;
		justify-content: space-between;
		> .btn {
			flex: none;
			margin: 0;
			width: 300rpx;
			font-size: 32rpx;
			height: 88rpx;
			line-height: 88rpx;
			color: #ffffff;
			background-color: $main-color;
		}
	}
}
</style>
