<template>
	<view class="container">
		<!-- 左侧布局 -->
		<view class="left"><slot name="left"></slot></view>
		<!-- 右侧布局 -->
		<view class="right"><slot name="right"></slot></view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'
const props = defineProps({
	rightWidth: {
		type: String,
		default: 'auto'
	},
	interval: {
		type: String,
		default: '0'
	},
	justifyContent: {
		type: String,
		default: 'space-between'
	},
	alignItems: {
		type: String,
		default: 'center'
	}
})
</script>

<style lang="scss" scoped>
.container {
	@include mFlex;
	overflow: hidden;
	align-items: v-bind('props.alignItems');
	justify-content: v-bind('props.justifyContent');
	> .left {
		flex: auto;
		overflow: hidden;
	}
	> .right {
		flex: none;
		width: v-bind('props.rightWidth');
		margin-left: v-bind('props.interval');
		overflow: hidden;
	}
}
</style>
