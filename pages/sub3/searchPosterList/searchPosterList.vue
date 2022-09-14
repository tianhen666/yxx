<template>
	<view class="box">
		<view class="blank30"></view>
		<!-- 搜索 -->
		<uni-search-bar
			:focus="true"
			@confirm="searchRequest"
			v-model="searchText"
			placeholder="1000+海报任意搜索"
			bgColor="#eeeeee"
		></uni-search-bar>

		<view class="blank30"></view>
		<!-- 列表 -->
		<view class="list">
			<view
				class="list_item"
				v-for="(item, index) in 8"
				:key="index"
				@tap="navigateTo('/pages/sub3/posterInfo/posterInfo')"
			>
				<image
					class="image"
					src="https://imgs.fenxiangzl.com/tooth/product/0e4dc240-93c2-4de9-af63-3029cf954ffe.jpg"
					mode="aspectFill"
				></image>
			</view>
		</view>
		<view class="blank40"></view>
		<view class="blank40"></view>
	</view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { navigateTo, showToastText } from '@/aTemp/utils/uniAppTools.js'

const searchText = ref('')
const searchRequest = () => {
	showToastText(searchText.value)
}
</script>

<style scoped lang="scss">
:deep(.uni-searchbar) {
	padding: 0 !important;
}
.box {
	width: 100%;
	padding: 0rpx 20rpx;
	background-color: #fff;
}

.list {
	@include mFlex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-top: -30rpx;
	&_item {
		width: 340rpx;
		.image {
			margin-top: 30rpx;
			width: 100%;
			height: 606rpx;
			border-radius: 8rpx;
		}
	}
}
</style>
