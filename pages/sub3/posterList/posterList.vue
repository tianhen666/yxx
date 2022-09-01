<template>
	<view class="container">
		<view class="box1">
			<view class="box1_item" @tap="navigateTo('/pages/sub3/posterInfo/posterInfo')">
				<image src="/static/images/fuwu1.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script setup>
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'
</script>

<style lang="scss" scoped>
.box {
	width: $main-width;
	margin: auto;
	padding: $padding;
	background-color: #fff;
}
</style>
