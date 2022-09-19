<template>
	<view class="container">
		<view class="box">
			<uni-search-bar
				placeholder="输入手机号码/名称搜索"
				radius="50"
				v-model="formData.text"
				bgColor="#EEEEEE"
				@confirm="search"
			/>
		</view>
		<!-- tab切换 -->
		<uni-segmented-control :current="current" :values="items" style-type="text" @clickItem="onClickItem" />
		<view class="blank20"></view>
		<!-- 切换内容 -->
		<view class="content"><mTabContent :listData="listData"></mTabContent></view>
	</view>
</template>

<script setup>
import mTabContent from './components/m-tab-content/m-tab-content.vue'
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const items = reactive(['未使用', '已完成'])
const current = ref(0)
// tab切换
const onClickItem = e => {
	if (current.value !== e.currentIndex) {
		current.value = e.currentIndex
		getListData({ state: current.value })
	}
}
const listData = ref([])

const getListData = obj => {
	const { state } = obj
	if (state === 0) {
		listData.value = [
			{
				orderSN: 'PR2022071614245246',
				type: 0,
				title: '金属托槽矫正金属托槽矫正金属托槽矫金属托槽矫正金属托槽矫正金属托槽矫',
				price: 88,
				quantity: 2,
				url: '/static/default/banner.png',
				time: '2022-8-16 12:33:10'
			},
			{
				orderSN: 'PR2022071614245246',
				type: 0,
				title: '金属托槽矫正金属托槽矫正金属托槽矫金属托槽矫正金属托槽矫正金属托槽矫',
				price: 88,
				quantity: 2,
				url: '/static/default/banner.png',
				time: '2022-8-17 12:33:10'
			},
			{
				orderSN: 'PR2022071614245246',
				type: 0,
				title: '金属托槽矫正金属托槽矫正金属托槽矫金属托槽矫正金属托槽矫正金属托槽矫',
				price: 88,
				quantity: 1,
				url: '/static/default/banner.png',
				time: '2022-8-18 12:33:10'
			}
		]
	} else {
		listData.value = [
			{
				orderSN: 'PR2022071614245246',
				type: 1,
				title: '金属托槽矫正金属托槽矫正金属托槽矫金属托槽矫正金属托槽矫正金属托槽矫',
				price: 88,
				quantity: 2,
				url: '/static/default/banner.png',
				time: '2022-8-18 12:33:10'
			},
			{
				orderSN: 'PR2022071614245246',
				type: 1,
				title: '金属托槽矫正金属托槽矫正金属托槽矫金属托槽矫正金属托槽矫正金属托槽矫',
				price: 88,
				quantity: 2,
				url: '/static/default/banner.png',
				time: '2022-8-18 12:33:10'
			},
			{
				orderSN: 'PR2022071614245246',
				type: 1,
				title: '金属托槽矫正金属托槽矫正金属托槽矫金属托槽矫正金属托槽矫正金属托槽矫',
				price: 88,
				quantity: 1,
				url: '/static/default/banner.png',
				time: '2022-8-18 12:33:10'
			}
		]
	}
}

// 页面加载
onLoad(option => {
	current.value = parseInt(option.current || 0)
	getListData({ state: current.value })
})

// 表单数据
const formData = ref({})
// 搜索
const search = () => {
	console.log(formData.value)
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
