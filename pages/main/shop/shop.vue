<template>
	<!-- 标题栏 -->
	<uni-nav-bar title="xxx门诊" statusBar fixed color="#ffffff" :border="false"></uni-nav-bar>
	<view class="blank32"></view>

	<!-- 商品列表 -->
	<m-shop-list :listData="listData" showBtn>
	</m-shop-list>
	<view class="blank32"></view>
	
</template>

<script setup>
// import mThreeColumns from './components/m-three-columns/m-three-columns.vue'
import { _storeproductGetlist } from '@/aTemp/apis/shop.js'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { _useMainStore } from '@/aTemp/store/storeMain.js'
// 全局变量
const useMainStore = _useMainStore()

// 数据列表
const listData = ref([])
// 判断是否首次加载onload
const onLoadStatus = ref(false)

// 获取数据列表
const getListData = (data = {}) => {
	_storeproductGetlist(data).then(res => {
		onLoadStatus.value = true
		const { code, data, msg } = res
		// 将返回数据中的商品图片转化为数组
		listData.value = data.map((item, index, arr) => {
			item.pics = item.pics ? item.pics.split(',') : []
			return item
		})
	})
}

onLoad(options => {
	getListData({ status: 0 })
})

onShow(() => {
	// 首次打开页面避免多次拉取数据
	if (onLoadStatus.value) {
		getListData({ status: 0 })
	}
})
</script>
<style lang="scss" scoped>
:global(page) {
	background-color: #f5f5f5;
}
</style>
