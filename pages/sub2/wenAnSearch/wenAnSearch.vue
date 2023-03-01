<template>
	<view class="box">
		<swiper-list-item
			:currentTabIndex="0"
			:tabIndex="0"
			:tabListObj="[{ id: 0 }]"
			search
		></swiper-list-item>
	</view>
</template>

<script setup>
import swiperListItem from '@/pages/sub2/wenAnList/components/swiper-list-item/swiper-list-item.vue';
</script>

<style lang="scss">
.box {
	height: 100vh;
	overflow: hidden;
}
</style>
