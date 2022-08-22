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
	<m-fun :listData="module2"></m-fun>
	<view class="blank30"></view>

	<!-- 模块三 -->
	<m-fun :listData="module3"></m-fun>
	<view class="blank30"></view>

	<!-- 模块四 -->
	<m-fun :listData="module4"></m-fun>
	<view class="blank30"></view>

	<!-- 选项 -->
	<m-option :listData="module5"></m-option>
	<view class="blank40"></view>
</template>

<script setup>
import mFun from './m-fun/m-fun.vue'
import mHeader from './m-header/m-header.vue'
import mOption from './m-option/m-option.vue'
import mVip from './m-vip/m-vip.vue'

import { reactive } from 'vue'
const module1 = {
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
			path: '/pages/sub2/manageServiceList/manageServiceList'
		},
		{
			imgUrl: '/static/default/haibao.png',
			name: '案例管理',
			path: '/pages/sub2/manageCaseList/manageCaseList'
		},
		{
			imgUrl: '/static/default/haibao.png',
			name: '轮播图管理',
			path: '/pages/sub2/manageBannerList/manageBannerList'
		},
		{
			imgUrl: '/static/default/haibao.png',
			name: '门诊信息',
			path: '/pages/sub2/manageInfoInput/manageInfoInput'
		},
		{
			imgUrl: '/static/default/haibao.png',
			name: '医生管理',
			path: '/pages/sub2/manageDoctorList/manageDoctorList'
		}
	]
}

const module2 = {
	title: '数据统计',
	sub: [
		{
			imgUrl: '/static/default/menzhen.png',
			name: '门诊收益',
			path: '/pages/sub2/manageActivityList/manageActivityList'
		},
		{
			imgUrl: '/static/default/huodong.png',
			name: '活动数据',
			path: '/pages/sub2/manageShopList/manageShopList'
		},
		{
			imgUrl: '/static/default/haibao.png',
			name: '会员管理',
			path: '/pages/sub2/manageServiceList/manageServiceList'
		}
	]
}

const module4 = {
	title: '营销助手',
	sub: [
		{
			imgUrl: '/static/default/haibao.png',
			name: '活动模板',
			path: '/pages/sub2/manageServiceList/manageServiceList'
		},
		{
			imgUrl: '/static/default/menzhen.png',
			name: '精美海报',
			path: '/pages/sub2/manageActivityList/manageActivityList'
		},
		{
			imgUrl: '/static/default/huodong.png',
			name: '文案宣发',
			path: '/pages/sub2/manageShopList/manageShopList'
		},
		{
			imgUrl: '/static/default/haibao.png',
			name: '科普文章',
			path: '/pages/sub2/manageServiceList/manageServiceList'
		}
	]
}

const module3 = {
	title: '订单管理',
	sub: [
		{
			imgUrl: '/static/default/menzhen.png',
			name: '扫码核销',
			path: '/pages/sub2/manageActivityList/manageActivityList'
		},
		{
			imgUrl: '/static/default/huodong.png',
			name: '手动核销',
			path: '/pages/sub2/manageShopList/manageShopList'
		},
		{
			imgUrl: '/static/default/haibao.png',
			name: '全部订单',
			path: '/pages/sub2/manageServiceList/manageServiceList'
		}
	]
}

const module5 = [
	{
		icon: '/static/order/yaoqing.png',
		title: '员工管理',
		path: '/pages-sub1/index/index'
	},
	{
		icon: '/static/order/yaoqing.png',
		title: '我的订单',
		path: '/pages-sub1/index/index'
	},
	{
		icon: '/static/order/yaoqing.png',
		title: '切换门店',
		path: '/pages-sub1/index/index'
	}
]
</script>

<style lang="scss" scoped></style>
