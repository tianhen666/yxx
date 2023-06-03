<template>
	<view>
		<view class="blank30"></view>
		<m-fun :listData="module1"></m-fun>
	</view>
</template>

<script setup>
import mFun from '@/pages/main/user/components/m-fun/m-fun.vue';
const module1 = {
	title: '门诊管理',
	sub: [
		{
			imgUrl: '/static/images/u-dingdan.png',
			name: '全部订单',
			path: '/pages/sub2/orderList/orderList?current=0',
			power: [1, 2, 5],
			expiredAvailable: true
		},
		{
			imgUrl: '/static/images/u-huodong.png',
			name: '活动管理',
			path: '/pages/sub2/manageActivityList/manageActivityList',
			power: [1, 2, 4]
		},
		{
			imgUrl: '/static/images/u-shangpin.png',
			name: '商品管理',
			path: '/pages/sub2/manageShopList/manageShopList',
			power: [1, 2, 3]
		},
		{
			imgUrl: '/static/images/u-fuwu.png',
			name: '服务项目',
			path: '/pages/sub2/manageServiceList/manageServiceList',
			power: [1, 2]
		},
		// {
		// 	imgUrl: '/static/images/u-anli.png',
		// 	name: '案例管理',
		// 	path: '/pages/sub2/manageCaseList/manageCaseList',
		// 	power: [1, 2]
		// },
		{
			imgUrl: '/static/images/u-lunbo.png',
			name: '轮播图管理',
			path: '/pages/sub2/manageBannerList/manageBannerList',
			power: [1, 2]
		},
		{
			imgUrl: '/static/images/u-mzxinxi.png',
			name: '门诊信息',
			path: '/pages/sub2/manageInfoInput/manageInfoInput',
			power: [1, 2]
		},
		{
			imgUrl: '/static/images/u-yisheng.png',
			name: '医生管理',
			path: '/pages/sub2/manageDoctorList/manageDoctorList',
			power: [1, 2]
		}
	]
};
</script>

<style lang="scss">
page {
	background-color: #fff;
}
</style>
