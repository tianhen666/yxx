<template>
	<!-- 头部 -->
	<m-header></m-header>

	<!-- 收益 -->
	<m-profit></m-profit>

	<!-- 模块 -->
	<view class="bg"></view>
	<m-fun style="margin-top: -100rpx;display: block;" :listData="myOrder"></m-fun>
	<view class="blank30"></view>

	<!-- 选项 -->
	<m-option :listData="myFunItems"></m-option>
	<view class="blank40"></view>
</template>

<script setup>
import mFun from './m-fun/m-fun.vue'
import mHeader from './m-header/m-header.vue'
import mOption from './m-option/m-option.vue'
import mProfit from './m-profit/m-profit.vue'
import { reactive } from 'vue'

const myFunItems = reactive([
	{
		icon: '/static/order/yaoqing.png',
		title: '我邀请的好友',
		path: '/pages-sub1/invitationList/invitationList'
	},
	{
		icon: '/static/order/shouyi.png',
		title: '我的推广收益',
		path: '/pages-sub1/profitList/profitList'
	}
])

const myOrder = reactive({
	title: '我的订单',
	path: '/pages-sub1/orderList/orderList?current=0',
	sub: [
		{
			imgUrl: '/static/order/fukuan.png',
			name: '待付款',
			path: '/pages-sub1/orderList/orderList?current=1'
		},
		{
			imgUrl: '/static/order/shiyong.png',
			name: '待使用',
			path: '/pages-sub1/orderList/orderList?current=2'
		},
		{
			imgUrl: '/static/order/pingjia.png',
			name: '待评价',
			path: '/pages-sub1/orderList/orderList?current=3'
		}
	]
})
</script>

<style lang="scss" scoped></style>
