<template>
	<view class="box" v-if="storeInfo">
		<view style="height:460rpx">
			<image
				:src="storeInfo.pics"
				mode="aspectFill"
				style="width: 100%;height: 100%;"
			></image>
		</view>

		<view class="box1" style="margin-top: 20px;" v-if="storeInfo.descData">
			<text class="title">关于我们</text>
			<view class="line"></view>
			<text class="desc" user-select>{{ storeInfo.descData }}</text>
		</view>

		<view class="box2" style="margin-top: 30px;" v-if="storeInfo.innerPics">
			<text class="title">舒适温馨的就诊环境</text>
			<view class="line"></view>
			<view class="picList">
				<view class="item" v-for="(item, index) in storeInfo.innerPics.split(',')">
					<image :src="item" mode="aspectFill" style="width: 100%;height: 100%;"></image>
				</view>
			</view>
		</view>

		<view v-if="activityListData.length > 0">
			<view class="title1">门诊其他热门活动推荐</view>
			<view><m-activity-list :listData="activityListData" infoPage></m-activity-list></view>
		</view>
	</view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { _enrollformGetlist } from '@/aTemp/apis/activity.js';
const props = defineProps({
	activitId: {
		required: false,
		type: Number,
		default: 0
	}
});
// 拉取活动信息
const activityListData = ref([]);
// 加载中
const loading = ref(true);
onMounted(() => {
	_enrollformGetlist({ status: 0 }).then(res => {
		const { code, msg, data } = res;
		activityListData.value = data.filter(
			item => item.productId != '1' && item.id != props.activitId
		);
		loading.value = false;
	});
});
const storeInfo = ref();
onMounted(() => {
	storeInfo.value = uni.getStorageSync('storeInfo');
});
</script>

<style scoped lang="scss">
.box {
	padding: $padding;
}
.title {
	text-align: center;
	display: block;
	font-size: 38rpx;
}
.line {
	height: 1px;
	background-color: #333;
	width: 70%;
	margin: auto;
	margin-top: 30rpx;
	position: relative;
	&:after {
		content: '';
		position: absolute;
		left: 50%;
		margin-left: -10px;
		top: 1px;
		display: block;
		width: 0;
		height: 0;
		border-top: 10px solid #333;
		border-right: 10px solid transparent;
		border-bottom: 10px solid transparent;
		border-left: 10px solid transparent;
	}
}
.desc {
	display: block;
	line-height: 1.8;
	font-size: 28rpx;
	margin-top: 50rpx;
	padding: $padding;
	background-color: #f9f9f9;
}
.box1 {
	border-radius: 16rpx;
	padding: 20px;
	background-color: #fff;
}
.box2 {
	.picList {
		margin-top: 30px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
		.item {
			width: 48%;
			height: 100px;
			margin-bottom: 10px;
		}
	}
}
.title1 {
	text-align: left;
	display: block;
	font-size: 38rpx;
	position: relative;
	height: 38rpx;
	line-height: 1;
	margin: 30px 0 20px 0;
	padding-left: 20px;
	&:after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		display: block;
		width: 3px;
		height: 100%;
		background: #f73639;
	}
}
</style>
