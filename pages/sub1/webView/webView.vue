<template>
	<web-view :src="url"></web-view>
</template>

<script setup>
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
const url = ref('')
onLoad(options => {
	url.value = decodeURIComponent(options.url || '')
})
</script>
