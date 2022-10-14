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
				<swiper-item v-for="(item, index) in props.listData" :key="index" @tap="bannerTap(item)">
					<image class="image" :src="item.banner" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { showToastText, navigateTo } from '@/aTemp/utils/uniAppTools.js'
// 数据列表
const props = defineProps({
	listData: {
		type: Array,
		required: true,
		default: () => []
	}
})

// 当前索引
const current = ref(0)

// 点击事件
const bannerTap = item => {
	if (item.productId) {
		navigateTo(`/pages/sub1/goodsInfo/goodsInfo?targetId=${item.productId}`)
	}
}

// 改变索引事件
const change = e => {
	current.value = e.detail.current
}
</script>

<style lang="scss" scoped>
.swiper {
	width: $main-width;
	height: ($main-width * 0.6);
	margin: auto;
	
	overflow: hidden;
	.image {
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}
}
</style>
