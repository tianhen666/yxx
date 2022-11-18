<template>
	<view class="fix">
		<view class="fix_warpper">
			<button :loading="props.loading" class="btn" @tap="btnClick">{{ props.text }}</button>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	text: {
		required: true,
		type: String,
		default: '按钮'
	},
	loading: {
		type: Boolean,
		default: false
	},
})

const emits = defineEmits(['btnClick'])

const btnClick = () => {
	emits('btnClick')
}
</script>

<style lang="scss" scoped>
.fix {
	padding-top: 40rpx;
	padding-bottom: 90rpx;
	height: 92rpx;
	box-sizing: content-box;
	.fix_warpper {
		position: fixed;
		z-index: 66;
		width: 100%;
		left: 0;
		bottom: 0;
		padding-bottom: 90rpx;
		> .btn {
			width: $main-width;
			border-radius: 16rpx;
			margin: auto;
			font-size: 32rpx;
			height: 92rpx;
			line-height: 92rpx;
			color: #ffffff;
			background-color: $main-color;
			&:after{
				border: none;
			}
		}
	}
}
</style>
