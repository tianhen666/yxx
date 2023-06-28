<template>
	<!-- 收益 -->
	<m-profit :statistics="statistics"></m-profit>
	<view class="blank30"></view>

	<!-- 模块 -->
	<m-fun :listData="myOrder"></m-fun>
	<view class="blank30"></view>

	<!-- 选项 -->
	<m-option :listData="myFunItems"></m-option>
	<view class="blank40"></view>
</template>

<script setup>
import mFun from './m-fun/m-fun.vue';
import mOption from './m-option/m-option.vue';
import mProfit from './m-profit/m-profit.vue';
import { reactive, ref, onMounted, getCurrentInstance } from 'vue';
import { _userPersonagedata } from '@/aTemp/apis/user.js';

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js';
const useUserMain = _useUserMain();

// 收益统计
const statistics = ref({});
onMounted(async options => {
	// 等待onLaunch中放行后执行
	const { proxy } = getCurrentInstance();
	await proxy.$onLaunched;

	// 个人邀请数据统计
	_userPersonagedata({ inviteUserId: useUserMain.userid }).then(res => {
		const { msg, data, code } = res;
		statistics.value = data;
	});
});

const myFunItems = {
	title: '其他选项',
	sub: [
		{
			imgUrl: '/static/images/u-yuangong.png',
			name: '我邀请的好友',
			path: '/pages/sub1/invitationList/invitationList'
		},
		{
			imgUrl: '/static/images/u-huiyuan.png',
			name: '我邀请的人购买的订单',
			path: '/pages/sub2/mySales/mySales'
		},
		{
			imgUrl: '/static/images/u-wddingdan.png',
			name: '我的推广收益',
			path: '/pages/sub1/profitList/profitList'
		},
		{
			imgUrl: '/static/images/u-qhmenzhen.png',
			name: '切换门店',
			path: '/pages/sub2/switchStore/switchStore'
		}
	]
};

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
});
</script>

<style lang="scss" scoped></style>
