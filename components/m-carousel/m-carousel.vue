<template>
	<view class="swiper_wrapper">
		<uni-swiper-dot
			:info="listData"
			:current="current"
			mode="round"
			:dotsStyles="{
				backgroundColor: 'rgba(0, 0, 0, .4)',
				border: 'none',
				selectedBackgroundColor: '#ffffff',
				selectedBorder: 'none'
			}"
		>
			<swiper class="swiper" autoplay circular interval="5000" @change="change">
				<swiper-item v-for="(item, index) in listData" :key="index">
					<image class="image" :src="item.url" mode="aspectFill" @tap="bannerTap(item)"></image>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { showToastText } from '@/aTemp/utils/uniAppTools.js'
const bannerTap = item => {
	showToastText('点击了banner')
	console.log(item)
}
const change = e => {
	current.value = e.detail.current
}
const listData = ref([
	{
		url: '/static/default/banner.jpg',
		pId: '1'
	},
	{
		url: '/static/default/banner.jpg',
		pId: '1'
	},
	{
		url: '/static/default/banner.jpg',
		pId: '1'
	}
])
const current = ref(0)
</script>

<style lang="scss" scoped>
.swiper {
	width: $main-width;
	height: ($main-width * 0.5);
	margin: auto;
	border-radius: 20rpx;
	overflow: hidden;
	.image {
		width: 100%;
		height: 100%;
	}
}
</style>
