<template>
	<z-paging
		ref="paging"
		v-model="dataList"
		@query="queryList"
		use-page-scroll
		created-reload
		min-delay="1000"
		show-loading-more-when-reload
	>
		<template #top>
			<div class="box">
				<uni-data-select
					:clear="false"
					v-model="value"
					:localdata="range"
					@change="change"
				></uni-data-select>
			</div>
		</template>
		<view class="container">
			<view
				class="item_box"
				v-for="(item, index) in dataList"
				:key="index"
				@tap="
					setClipboardData(
						`${item.doctorname},${item.doctorphone},${item.doctortime},${
							item.doctorproject
						},${item.remark}`
					)
				"
			>
				<view class="bg" :class="{ s1: item.dispose === 1, s2: item.dispose === 2 }">
					{{ item.dispose === 1 ? '已联系' : '待处理' }}
				</view>
				<view class="item">
					<view class="left">预约姓名：</view>
					<view class="right">{{ item.doctorname }}</view>
				</view>
				<view class="item">
					<view class="left">预约电话：</view>
					<view class="right">
						<text>{{ item.doctorphone }}</text>
					</view>
					<button class="btn" size="mini" @tap.stop="makePhoneCall(item.doctorphone)">
						拨打电话
					</button>
				</view>
				<view class="item">
					<view class="left">预约时间：</view>
					<view class="right">{{ item.doctortime }}</view>
				</view>
				<view class="item">
					<view class="left">预约项目：</view>
					<view class="right">{{ item.doctorproject }}</view>
				</view>
				<view class="item">
					<view class="left">客户备注：</view>
					<view class="right">{{ item.remark }}</view>
				</view>
				<button class="btn2" v-if="item.dispose === 2" @tap.stop="dispose(item, index)">
					点我标识已联系
				</button>
			</view>
		</view>
	</z-paging>
</template>

<script setup>
import { onLoad, onShow } from '@dcloudio/uni-app';
import { ref } from 'vue';
import {
	_outpatientAppointmentMenuList,
	_outpatientAppointmentDispose
} from '@/aTemp/apis/yuyue.js';
import { makePhoneCall, setClipboardData, showModal } from '@/aTemp/utils/uniAppTools.js';
// 数据列表
const dataList = ref([]);
// 插件对象
const paging = ref(null);

const value = ref(2);
const range = ref([
	{ value: 0, text: '全部' },
	{ value: 1, text: '已联系' },
	{ value: 2, text: '待联系' }
]);
const change = e => {
	paging.value.reload(true);
};
onLoad(options => {});

// 获取预约列表
const queryList = (pageNo, pageSize) => {
	const params = {
		pageNum: pageNo,
		pageSize: pageSize,
		disposeId: value.value
	};
	_outpatientAppointmentMenuList(params)
		.then(res => {
			const { data, code, msg } = res;
			// 数据赋值
			paging.value.complete(data.records);
		})
		.catch(res => {
			paging.value.complete(false);
		});
};

const dispose = async (item, index) => {
	const showRes = await showModal(`是否确定已联系`);
	if (showRes.cancel) {
		return;
	}

	_outpatientAppointmentDispose({
		disposeId: 1,
		id: item.id
	}).then(res => {
		item.dispose = 1;
	});
};
</script>

<style lang="scss" scoped>
.box {
	width: $main-width;
	margin: auto;
	background-color: #fff;
	margin-top: 40rpx;
}

.item_box {
	width: $main-width;
	margin: auto;
	margin-top: 32rpx;
	background-color: #fff;
	border-radius: 16rpx;
	overflow: hidden;
	padding: 42rpx;
	position: relative;
	.bg {
		color: #fff;
		position: absolute;
		top: 0;
		right: 0;
		font-size: 20rpx;
		padding: 8rpx 16rpx;
		border-radius: 0 16rpx 0 16rpx;
	}
	.s1 {
		background-color: $uni-success;
	}
	.s2 {
		background-color: $uni-warning;
	}
	.btn2 {
		font-size: 28rpx;
		margin-top: 40rpx;
		color: #fff;
		background-color: $main-color;
	}
}
.item {
	@include mFlex;
	justify-content: space-between;
	padding-bottom: 50rpx;
	&:last-of-type {
		padding-bottom: 0;
	}
	.left {
		width: 180rpx;
		flex: none;
		font-size: 26rpx;
		font-weight: bold;
	}
	.right {
		flex: auto;
		font-size: 26rpx;
		color: #999;
		@include mFlex;
		justify-content: flex-start;
	}
	.btn {
		font-size: 24rpx;
		background-color: $main-color;
		color: #fff;
		padding: 10rpx 15rpx;
		border-radius: 10rpx;
		margin-left: 20rpx;
		line-height: 1;
	}
}
</style>
