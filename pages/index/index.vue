<template>
	<view class="content"><poster-diy :posterData="poster"></poster-diy></view>
</template>

<script setup>
import { reactive, toRefs, isProxy } from 'vue'
// 海报数据
const poster = reactive({
	id_1: {
		type: 'text',
		value: '文字文字文字文字一',
		x: 0,
		y: 10,
		z: 1000,
		w: 100,
		h: 0,
		style: { fontSize: '20px' }
	},
	id_2: {
		type: 'text',
		value: '文字文字文字文字二',
		x: 0,
		y: 100,
		z: 0,
		w: 50,
		h: 0,
		style: { fontSize: '25px' }
	},
	id_3: { type: 'img', value: '../../static/tup4.jpg', x: 0, y: 200, z: 1000000, w: 100, h: 100, style: {} }
})
</script>

<style scoped>
	:global(page){
		background-color: #f1f1f1;
	}
</style>
