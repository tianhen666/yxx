<template>
	<view class="box">
		<view class="blank30"></view>
		<!-- 列表 -->
		<view class="list">
			<view
				class="list_item"
				v-for="(item, index) in posterList"
				:key="index"
				@tap.stop="navigateTo(`/pages/sub3/posterInfo/posterInfo?id=${item.id}&drafts=1`)"
			>
				<image class="image" :src="item.posterUrl" mode="aspectFill"></image>
				<button class="mDel" @tap.stop="posterDeleteTemplate(item.id, index)" v-if="useUserMain.power != -1">
					删除
				</button>
			</view>
		</view>
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

import { _posterDrafts, _posterDeleteTemplate } from '@/aTemp/apis/poster.js'

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

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
	posterDrafts()
})

// 删除
const posterDeleteTemplate = (id, index) => {
	_posterDeleteTemplate({ TemplateId: id }).then(res => {
		const { msg, data, code } = res
		showToastText('删除成功')
		posterList.value.splice(index,1)
	})
}

// 获取海报数据
const posterDrafts = async () => {
	pageLoadStatus.value = 'loading'
	const posterListResponse = await _posterDrafts({
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

// 触底加载
onReachBottom(() => {
	if (pageLoadStatus.value === 'more') {
		posterDrafts()
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
		position: relative;
		.image {
			margin-top: 30rpx;
			width: 340rpx;
			height: 606rpx;
			border-radius: 8rpx;
		}
	}
}
.mDel {
	position: absolute;
	top: 40rpx;
	right: 10rpx;
	font-size: 24rpx;
	color: #fff;
	background-color: $main-color;
	line-height: 1.4;
	padding: 0 10rpx;
}
</style>
