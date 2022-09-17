<template>
	<view class="list">
		<view
			class="list_item"
			v-for="(item, index) in listData"
			:key="index"
			@tap="navigateTo('/pages/sub3/posterInfo/posterInfo')"
		>
			<image class="image" :src="item.posterurl" mode="aspectFill" v-if="index < 6"></image>
		</view>
		<view class="list_item" v-if="listData.length % 3 == 2"></view>
	</view>
</template>

<script setup>
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'

const props = defineProps({
	listData: {
		required: true,
		type: Array,
		default: () => []
	}
})
</script>

<style scoped lang="scss">
.list {
	@include mFlex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-top: -25rpx;
	&_item {
		width: 220rpx;
		.image {
			margin-top: 25rpx;
			width: 100%;
			height: 392rpx;
			border-radius: 8rpx;
		}
	}
}
</style>
