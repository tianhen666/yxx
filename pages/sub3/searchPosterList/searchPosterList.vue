<template>
	<view class="box">
		<view class="blank30"></view>
		<!-- 搜索 -->
		<uni-search-bar
			@input="searchInputRequest"
			v-model="searchText"
			radius="30"
			placeholder="1000+海报任意搜索"
			bgColor="#eeeeee"
		></uni-search-bar>

		<view class="blank30"></view>
		<!-- 列表 -->
		<m-poster-list :listData="posterList" :maxNumber="-1" :column="2"></m-poster-list>
	</view>
	<view class="blank30"></view>

	<!-- 加载更多 -->
	<uni-load-more :status="pageLoadStatus" />

	<view class="blank40"></view>
	<view class="blank40"></view>
</template>

<script setup>
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { navigateTo, showToastText } from '@/aTemp/utils/uniAppTools.js'
import { _debounce } from '@/aTemp/utils/tools.js'
import { mPosterList } from '../components/m-poster-list/m-poster-list.vue'
import { _posterGetIdPost } from '@/aTemp/apis/poster.js'

// 每页数量
const pageSize = ref(6)
// 有多少页面
const pageNum = ref(1)
// 是否加载完成
const pageLoadStatus = ref('more')

// 搜索参数
const searchText = ref('')
// 海报内容
const posterList = ref([])
onLoad(options => {
	posterGetIdPost()
})

// 获取海报数据
const posterGetIdPost = async () => {
	pageLoadStatus.value = 'loading'
	const posterListResponse = await _posterGetIdPost({
		postercampaign: searchText.value,
		pageSize: pageSize.value,
		pageNum: pageNum.value
	})

	posterList.value.push(...posterListResponse.data.poster)
	// 判断是否加载完成
	if (posterListResponse.data.poster.length >= pageSize.value) {
		pageNum.value++
		pageLoadStatus.value = 'more'
	} else {
		pageLoadStatus.value = 'noMore'
	}
}

// 动态搜索
const searchInputRequest = _debounce(val => {
	searchText.value = val
	posterList.value = []
	pageNum.value = 1
	posterGetIdPost()
}, 500)

// 完成时搜索
const searchConfirmRequest = val => {
	posterList.value = []
	pageNum.value = 1
	posterGetIdPost()
}

// 触底加载
onReachBottom(() => {
	if (pageLoadStatus.value === 'more') {
		posterGetIdPost()
	}
})
</script>

<style scoped lang="scss">
:global(page) {
	background-color: #fff;
}
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
