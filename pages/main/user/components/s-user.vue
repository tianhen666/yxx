<template>
	<!-- 头部 -->
	<m-header></m-header>

	<!-- vip -->
	<view class="bg"></view>
	<m-vip style="margin-top: -100rpx;display: block;"></m-vip>
	<view class="blank30"></view>

	<!-- 模块一 -->
	<m-fun :listData="module1"></m-fun>
	<view class="blank30"></view>

	<!-- 模块二 -->
	<m-fun></m-fun>
	<view class="blank30"></view>

	<!-- 模块三 -->
	<m-fun></m-fun>
	<view class="blank30"></view>

	<!-- 选项 -->
	<m-option></m-option>
	<view class="blank40"></view>
</template>

<script setup>
import mFun from './m-fun/m-fun.vue'
import mHeader from './m-header/m-header.vue'
import mOption from './m-option/m-option.vue'
import mVip from './m-vip/m-vip.vue'

import { reactive } from 'vue'
const module1 = reactive({
	title: '门诊管理',
	sub: [
		{
			imgUrl: '/static/default/menzhen.png',
			name: '活动管理',
			path: '/pages/sub2/manageActivityList/manageActivityList'
		},
		{
			imgUrl: '/static/default/huodong.png',
			name: '商品管理',
			path: '/pages/sub2/manageShopList/manageShopList'
		},
		{
			imgUrl: '/static/default/haibao.png',
			name: '服务项目',
			path: '/page/index/index'
		},
		{
			imgUrl: '/static/default/haibao.png',
			name: '案例管理',
			path: '/page/index/index'
		},
		{
			imgUrl: '/static/default/haibao.png',
			name: 'banner管理',
			path: '/pages/sub2/manageBannerList/manageBannerList'
		},
		{
			imgUrl: '/static/default/haibao.png',
			name: '门诊信息',
			path: '/page/index/index'
		},
		{
			imgUrl: '/static/default/haibao.png',
			name: '门诊照片',
			path: '/page/index/index'
		},
		{
			imgUrl: '/static/default/haibao.png',
			name: '医生管理',
			path: '/page/index/index'
		}
	]
})
</script>

<style lang="scss" scoped></style>
