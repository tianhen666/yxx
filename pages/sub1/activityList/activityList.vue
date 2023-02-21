<template>
	<m-page-loading v-if="loading"></m-page-loading>
	<view class="container" v-else>
		<m-activity-list :listData="activityListData"></m-activity-list>
		<view class="blank40"></view>
		<view class="blank40"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { _enrollformGetlist } from '@/aTemp/apis/activity.js';
// 拉取活动信息
const activityListData = ref([]);

// 加载中
const loading = ref(true);

onLoad(options => {
	// console.log(options)
	_enrollformGetlist({ status: 0 }).then(res => {
		const { code, msg, data } = res;
		activityListData.value = data.filter(item => item.productId != '1');
		loading.value = false;
	});
});
</script>

<style lang="scss" scoped>
.container {
	width: $main-width;
	margin: auto;
	padding: 32rpx 0;
}
</style>
