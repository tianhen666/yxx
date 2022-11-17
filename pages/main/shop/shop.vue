<template>
	<!-- 提示登录组件 -->
	<m-authorized-login ref="mLogin"></m-authorized-login>
	<z-paging
		ref="paging"
		v-model="listData"
		@query="queryList"
		:loading-full-fixed="true"
		created-reload
		min-delay="1000"
	>
		<!-- 加载状态 -->
		<template v-slot:loading>
			<m-page-loading></m-page-loading>
		</template>

		<!-- 固定顶部 -->
		<template v-slot:top>
			<!-- 背景 -->
			<view class="pageBg"><image class="image" src="/static/images/bg.png" mode="aspectFill"></image></view>
			<!-- #ifndef H5 -->
			<!-- 标题栏 -->
			<uni-nav-bar statusBar fixed :title="'商城'" color="#ffffff" :border="false"></uni-nav-bar>
			<view class="blank20"></view>
			<!-- #endif -->
		</template>

		<view class="container">
			<!-- 轮播 -->
			<m-carousel :listData="bannerListData" v-if="bannerListData.length > 0"></m-carousel>
			<view class="blank40" v-if="bannerListData.length > 0"></view>
			<!-- 商品列表 -->
			<!-- <m-shop-list :listData="listData" showBtn></m-shop-list> -->
			<m-shop-list-1 :listData="listData"></m-shop-list-1>
		</view>
	</z-paging>
</template>

<script setup>
import { _storeproductGetlist } from '@/aTemp/apis/shop.js'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import mShopList1 from './components/m-shop-list-1/m-shop-list-1.vue'
import { _bannerList } from '@/aTemp/apis/banner'

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 插件对象
const paging = ref(null)
// 数据列表
const listData = ref([])

// 轮播图
const bannerListData = ref([])

onLoad(options => {
	_bannerList({ sfuse: 0, exhibition: 1 }).then(res => {
		bannerListData.value = res.data
	})
})

// 后台获取数据
const queryList = (pageNo, pageSize) => {
	const params = {
		pageNum: pageNo,
		pageSize: pageSize,
		status: 0
	}
	_storeproductGetlist(params)
		.then(res => {
			const { code, data, msg } = res
			// 将返回数据中的商品图片转化为数组
			const resData = data.map((item, index, arr) => {
				item.pics = item.pics ? item.pics.split(',') : []
				return item
			})
			paging.value.complete(resData)
		})
		.catch(res => {
			paging.value.complete(false)
		})
}
</script>
<style lang="scss" scoped>
:global(page) {
	background-color: #f9f9f9;
}
</style>
