<template>
	<view class="container">
		<z-paging
			ref="pagingObj"
			v-model="dataList"
			@query="queryList"
			min-delay="1000"
			created-reload
			show-refresher-when-reload
			safe-area-inset-bottom
			use-safe-area-placeholder
		>
			<!-- 顶部固定 -->
			<template v-slot:top>
				<view class="box">
					<uni-search-bar
						placeholder="输入手机号码搜索"
						radius="50"
						v-model="searchText"
						bgColor="#EEEEEE"
						@confirm="search"
					/>
				</view>
				<!-- tab切换 -->
				<uni-segmented-control :current="tabIndex" :values="tabList" style-type="text" @clickItem="onClickItem" />
			</template>

			<!-- 切换列表内容 -->
			<view class="blank20"></view>
			<view class="content"><mTabContent :listData="dataList"></mTabContent></view>
		</z-paging>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { _orderAllOrderStore } from '@/aTemp/apis/order.js'
import mTabContent from './components/m-tab-content/m-tab-content.vue'
// 全局登录信息
// import { _useUserMain } from '@/aTemp/store/userMain.js'
// const useUserMain = _useUserMain()

// 页面加载
onLoad(option => {
	tabIndex.value = parseInt(option.current || 0)
})

// 数据列表
const dataList = ref([])
// tab选项列表
const tabList = ref(['未使用', '已完成'])
// 当前选择的索引
const tabIndex = ref(0)
// 插件对象
const pagingObj = ref(null)
// 搜索值
const searchText = ref('')

// tab切换
const onClickItem = e => {
	tabIndex.value = e.currentIndex
	// 重新加载数据列表
	pagingObj.value.reload(true)
}

// 搜索
const search = () => {
	// 重新加载数据列表
	pagingObj.value.reload(true)
}

// 后台获取数据
const queryList = (pageNo, pageSize) => {
	const params = {
		pageNum: pageNo,
		pageSize: pageSize,
		status: tabIndex.value + 2,
		mobile: searchText.value || null
	}
	_orderAllOrderStore(params)
		.then(res => {
			pagingObj.value.complete(res.data.records)
		})
		.catch(res => {
			pagingObj.value.complete(false)
		})
}
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #f5f5f5;
}
:deep(.segmented-control--text) {
	height: 92rpx !important;
	background-color: #ffffff;
}
.container {
	.box {
		background-color: #ffffff;
	}
}
</style>
