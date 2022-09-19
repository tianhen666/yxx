<template>
	<view class="content">
		<!-- tab切换 -->
		<uni-segmented-control :current="current" :values="items" style-type="text" @clickItem="onClickItem" />
		<view class="blank20"></view>
		<!-- 切换内容 -->
		<view class="content">
			<mTabContent></mTabContent>
			<!-- 加载更多 -->
			<uni-load-more :status="pageLoadStatus" />
		</view>
	</view>
</template>

<script setup>
import mTabContent from './components/m-tab-content/m-tab-content.vue'
import { ref, reactive } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { _orderComplete } from '@/aTemp/apis/order.js'
// 全局登录信息
import { _useMainStore } from '@/aTemp/store/storeMain.js'
const useMainStore = _useMainStore()


// 每页数量
const pageSize = ref(6)
// 有多少页面
const pageNum = ref(1)
// 是否加载完成
const pageLoadStatus = ref('more')

// 订单状态
const items = reactive(['全部', '待付款', '待使用', '已完成'])
// 当前选中的状态
const current = ref(0)
// tab切换
const onClickItem = e => {
	if (current.value !== e.currentIndex) {
		current.value = e.currentIndex
	}
}

// 页面加载
onLoad(option => {
	// 在传递的参数中获取订单状态索引
	current.value = parseInt(option.current) || 0

	if (current.value === 0) {
		orderComplete()
	}
})

// 查询完成的订单
const orderComplete = () => {
	_orderComplete({userId:useMainStore.userid}).then(res => {
		console.log(res)
	})
}

// 触底加载
onReachBottom(() => {
	if (pageLoadStatus.value === 'more') {
		posterGetIdPost()
	}
})
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #f5f5f5;
}
.content {
	:deep(.segmented-control--text) {
		height: 92rpx !important;
		background-color: #ffffff;
	}
}
</style>
