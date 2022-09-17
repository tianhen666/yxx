<template>
	<view class="box">
		<!-- 子分类 -->
		<m-sub-fenlei
			:listData="posterCategoryList"
			:currentIndex="currentIndex"
			@modifyCurrentIndex="modifyCurrentIndex"
		></m-sub-fenlei>

		<!-- 列表 -->
		<view class="list">
			<view
				class="list_item"
				v-for="(item, index) in posterList"
				:key="index"
				@tap="navigateTo(`/pages/sub3/posterInfo/posterInfo?id=${item.id}`)"
			>
				<image class="image" :src="item.posterurl" mode="aspectFill"></image>
			</view>
		</view>
		<view class="blank30"></view>
		
		
		<!-- 加载更多 -->
		<uni-load-more :status="pageLoadStatus" />
	</view>
	<view class="blank40"></view>
	<view class="blank40"></view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { mSubFenlei } from '../components/m-sub-fenlei/m-sub-fenlei.vue'
import { navigateTo, showToastText } from '@/aTemp/utils/uniAppTools.js'

import { _posterGetIdPostAll, _posterGetIdPost } from '@/aTemp/apis/poster.js'

// 二级分类列表
const posterCategoryList = ref([])
// 当前索引
const currentIndex = ref(0)
// 当前选中的二级分类ID
const posterCategoryId = computed(() => posterCategoryList.value[currentIndex.value]?.id)
// 海报内容
const posterList = ref([])

// 每页数量
const pageSize = ref(6)
// 有多少页面
const pageNum = ref(1)
// 是否加载完成
const pageLoadStatus = ref('more')
onLoad(async options => {
	// console.log(options)

	// 设置索引
	currentIndex.value = parseInt(options.currentIndex) || 0

	// 设置页面标题
	let pageName = options.parentName || '海报列表'
	uni.setNavigationBarTitle({
		title: pageName
	})

	// 获取海报分类数据
	const parentId = parseInt(options.parentId || 0)
	const posterCategoryListResponse = await _posterGetIdPostAll({
		id: parentId
	})
	posterCategoryList.value = posterCategoryListResponse.data

	// 获取海报内容
	posterList.value = []
	pageNum.value = 1
	posterGetIdPost()
})

// 获取海报数据
const posterGetIdPost = async () => {
	pageLoadStatus.value = 'loading'
	const posterListResponse = await _posterGetIdPost({
		id: posterCategoryId.value || 0,
		pageSize: pageSize.value,
		pageNum: pageNum.value
	})

	// 暂时延时一下
	setTimeout(() => {
		posterList.value.push(...posterListResponse.data.poster)

		// 判断是否加载完成
		if (posterListResponse.data.pageindex > pageNum.value) {
			pageNum.value++
			pageLoadStatus.value = 'more'
		} else {
			pageLoadStatus.value = 'noMore'
		}
	}, 1000)
}

// 修改当前索引
const modifyCurrentIndex = async index => {
	if (currentIndex.value !== index) {
		currentIndex.value = index
		posterList.value = []
		pageNum.value = 1
		posterGetIdPost()
	}
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
