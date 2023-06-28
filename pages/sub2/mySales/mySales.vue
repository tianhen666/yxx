<template>
	<view class="box">
		<!-- tab切换 -->
		<uni-segmented-control
			:current="current"
			:values="items"
			style-type="text"
			@clickItem="onClickItem"
		/>
		<view class="blank20"></view>

		<m-tab-content :listData="orderListData"></m-tab-content>
	</view>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { _userMySell } from '@/aTemp/apis/user.js';
import mTabContent from './components/m-tab-content/m-tab-content.vue';
// 订单状态
const items = reactive(['全部', '未支付', '待使用', '已完成']);
// 订单状态索引
const current = ref(0);
// 订单列表
const orderListData = ref([]);
const orderListDataC = ref([]);
onLoad(async () => {
	// 等待onLaunch中放行后执行
	const { proxy } = getCurrentInstance();
	await proxy.$onLaunched;

	try {
		const res = await _userMySell();
		orderListData.value = res.data;
		orderListDataC.value = res.data;
		items[0] = '全部 ' + orderListDataC.value.length;
		items[1] =
			'未支付 ' + orderListDataC.value.filter(obj => obj.spo && obj.spo.status === 1).length;
		items[2] =
			'待使用 ' + orderListDataC.value.filter(obj => obj.spo && obj.spo.status === 2).length;
		items[3] =
			'已完成 ' + orderListDataC.value.filter(obj => obj.spo && obj.spo.status === 3).length;
	} catch (e) {
		console.log('获取订单报错了', e);
	}
});

// tab切换
const onClickItem = e => {
	if (e.currentIndex == 0) {
		orderListData.value = orderListDataC.value;
	} else {
		orderListData.value = orderListDataC.value.filter(
			obj => obj.spo && obj.spo.status === e.currentIndex
		);
	}

	current.value = e.currentIndex;
};
</script>

<style lang="scss" scoped>
.box {
	padding: 0rpx 0 60rpx;
}
</style>
