<template>
	<!-- 收益 -->
	<m-profit></m-profit>
	<view class="blank30"></view>

	<!-- 模块 -->
	<m-fun :listData="myOrder"></m-fun>
	<view class="blank30"></view>

	<!-- 选项 -->
	<m-option :listData="myFunItems"></m-option>
	<view class="blank40"></view>
</template>

<script setup>
import mFun from './m-fun/m-fun.vue'
import mOption from './m-option/m-option.vue'
import mProfit from './m-profit/m-profit.vue'
import { reactive } from 'vue'

const myFunItems = {
	title: '其他选项',
	sub: [
		{
			imgUrl: '/static/images/u-yuangong.png',
			title: '我邀请的好友',
			path: '/pages/sub1/invitationList/invitationList'
		},
		{
			imgUrl: '/static/images/u-wddingdan.png',
			title: '我的推广收益',
			path: '/pages/sub1/profitList/profitList'
		},
		{
			imgUrl: '/static/images/u-qhmenzhen.png',
			title: '切换门店',
			path: '/pages/sub2/switchStore/switchStore'
		}
	]
}

const myOrder = reactive({
	title: '我的订单',
	path: '/pages/sub1/orderList/orderList?current=0',
	sub: [
		{
			imgUrl: '/static/images/u-mzxinxi.png',
			name: '全部订单',
			path: '/pages/sub1/orderList/orderList?current=0'
		},
		{
			imgUrl: '/static/images/u-huodong.png',
			name: '待付款',
			path: '/pages/sub1/orderList/orderList?current=1'
		},
		{
			imgUrl: '/static/images/u-anli.png',
			name: '待使用',
			path: '/pages/sub1/orderList/orderList?current=2'
		},
		{
			imgUrl: '/static/images/u-yisheng.png',
			name: '已完成',
			path: '/pages/sub1/orderList/orderList?current=3'
		}
	]
})
</script>

<style lang="scss" scoped></style>
