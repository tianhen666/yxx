<template>
	<scroll-view scroll-x="true" class="scroll-view_H" scroll-left="20">
		<uni-segmented-control :current="current" :values="items" style-type="text" @clickItem="onClickItem" />
	</scroll-view>
	<view class="content">
		<m-list v-show="current === 0"></m-list>
		<!-- <m-list v-show="current === 1"></m-list> -->
	</view>
</template>

<script setup>
import mList from '../m-list/m-list.vue'
import { ref } from 'vue'
const items = [
	'综合',
	'洁牙',
	'贴面',
	'种植',
	'种植',
	'种植',
	'种植',
	'种植',
	'种植',
	'种植',
	'种植',
	'种植',
	'种植1',
	'种植1',
	'种植1',
	'种植1'
]
const current = ref(0)
const onClickItem = e => {
	if (current.value !== e.currentIndex) {
		current.value = e.currentIndex
	}
}
</script>

<style lang="scss" scoped>
.scroll-view_H {
	white-space: nowrap;
}
</style>
