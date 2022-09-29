<template>
	<view class="content">
		<!-- tab切换 -->
		<uni-segmented-control
			:current="current"
			:values="items"
			style-type="text"
			@clickItem="onClickItem"
		/>
		<view class="blank20"></view>
		<!-- 切换内容 -->
		<view class="content">
			<mTabContent :listData="orderListData"></mTabContent>
			<!-- 加载更多 -->
			<uni-load-more :status="pageLoadStatus" />

			<view class="blank40"></view>
			<view class="blank40"></view>
		</view>
	</view>
</template>

<script setup>
import mTabContent from './components/m-tab-content/m-tab-content.vue'
import { ref, reactive } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { _orderAllorder, _orderPayment } from '@/aTemp/apis/order.js'

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 每页数量
const pageSize = ref(6)
// 有多少页面
const pageNum = ref(1)
// 是否加载完成
const pageLoadStatus = ref('more')

// 订单状态
const items = reactive(['全部', '待付款', '待使用', '已完成'])
// 订单状态索引
const current = ref(0)
// 订单列表
const orderListData = ref([])

// tab切换
const onClickItem = e => {
	if (current.value !== e.currentIndex) {
		current.value = e.currentIndex

		// 重置数据和分页
		orderListData.value = []
		pageNum.value = 1
		orderGetList()
	}
}

// 页面加载
onLoad(option => {
	// 在传递的参数中获取订单状态索引
	current.value = parseInt(option.current) || 0

	// 获取订单列表
	orderGetList()
})

// 查询完成的订单
const orderGetList = () => {
	pageLoadStatus.value = 'loading'
	_orderAllorder({
		userId: useUserMain.userid,
		status: current.value,
		pageNum: pageNum.value,
		pageSize: pageSize.value
	}).then(res => {
		const { code, msg, data } = res
		// 暂时延时一下
		setTimeout(() => {
			orderListData.value.push(...data.records)

			// 判断是否加载完成
			if (res.data.pages > pageNum.value) {
				pageNum.value++
				pageLoadStatus.value = 'more'
			} else {
				pageLoadStatus.value = 'noMore'
			}
		}, 1000)
	})
}

// 触底加载
onReachBottom(() => {
	if (pageLoadStatus.value === 'more') {
		orderGetList()
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
