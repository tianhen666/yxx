<!-- 在这个文件对每个tab对应的列表进行渲染 -->
<template>
	<view class="content">
		<z-paging
			ref="pagingObj"
			v-model="dataList"
			@query="queryList"
			:fixed="false"
			:auto="false"
			:empty-view-center="false"
			min-delay="1000"
		>
			<view class="container_wrapper">
				<view class="select_time"></view>

				<view class="container_item" v-for="(item, index) in dataList" :key="index">
					<view class="top">
						<image class="img1" :src="item.aa2"></image>
						<view class="right">
							<text class="name">{{ item.aa1 }}</text>
							<text class="phone">{{ item.aa3 }}</text>
						</view>
					</view>

					<view class="data_item">
						<text class="text1">活动：</text>
						<text class="text2">
							分享活动次数：
							<text class="text2_1">{{ item.aa4 }}</text>
							次
						</text>
						<text class="text3">
							邀请参与活动人数：
							<text class="text3_1">{{ item.aa5 }}</text>
							人
						</text>
						<text class="text4">
							活动总消费金额：
							<text class="text4_1">{{ item.aa6 }}</text>
							元
						</text>
						<text
							class="text5"
							@tap="navigateTo('/pages/sub2/dataDetailsItem/dataDetailsItem')"
						>
							详情>>
						</text>
					</view>
					<view class="data_item">
						<text class="text1">商品：</text>
						<text class="text2">
							分享活动次数：
							<text class="text2_1">{{ item.aa4 }}</text>
							次
						</text>
						<text class="text3">
							邀请参与活动人数：
							<text class="text3_1">{{ item.aa5 }}</text>
							人
						</text>
						<text class="text4">
							活动总消费金额：
							<text class="text4_1">{{ item.aa6 }}</text>
							元
						</text>
						<text class="text5">详情>></text>
					</view>
					<view class="data_item">
						<text class="text1">海报：</text>
						<text class="text2">
							分享活动次数：
							<text class="text2_1">{{ item.aa4 }}</text>
							次
						</text>
						<text class="text3">
							邀请参与活动人数：
							<text class="text3_1">{{ item.aa5 }}</text>
							人
						</text>
						<text class="text4">
							活动总消费金额：
							<text class="text4_1">{{ item.aa6 }}</text>
							元
						</text>
						<text class="text5">详情>></text>
					</view>
					<view class="data_item">
						<text class="text1">文章：</text>
						<text class="text2">
							分享活动次数：
							<text class="text2_1">{{ item.aa4 }}</text>
							次
						</text>
						<text class="text3">
							邀请参与活动人数：
							<text class="text3_1">{{ item.aa5 }}</text>
							人
						</text>
						<text class="text4">
							活动总消费金额：
							<text class="text4_1">{{ item.aa6 }}</text>
							元
						</text>
						<text class="text5">详情>></text>
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script setup>
import { ref, watch } from 'vue';
import dayjs from 'dayjs';
import { navigateTo, showModal, setClipboardData } from '@/aTemp/utils/uniAppTools.js';

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js';
const useUserMain = _useUserMain();

// 第一次加载完成
const firstLoaded = ref(false);
// 数据列表
const dataList = ref([]);
// 插件对象
const pagingObj = ref(null);

// 搜索关键词
const searchName = ref('');

const props = defineProps({
	tabListObj: {
		type: Array,
		default() {
			return [];
		}
	},
	tabIndex: {
		type: Number,
		default: 0
	},
	currentTabIndex: {
		type: Number,
		default: 0
	}
});

watch(
	() => props.currentTabIndex,
	(newVal, oldVal) => {
		if (newVal === props.tabIndex) {
			//懒加载，当滑动到当前的item时，才去加载
			if (!firstLoaded.value) {
				setTimeout(() => {
					pagingObj.value.reload(true);
				}, 100);
			}
		}
	},
	{ immediate: true }
);

// 后台获取数据
const queryList = (pageNo, pageSize) => {
	const params = {
		pageNum: pageNo,
		pageSize: pageSize
	};
	pagingObj.value.complete([
		{
			aa1: '用户名',
			aa2: 'https://imgs.lechiwl.com/fileyxx/imgs/thIcon.png',
			aa3: '13800000000',
			aa4: '12',
			aa5: '60',
			aa6: '300'
		}
	]);
};
</script>

<style scoped lang="scss">
/* 注意:父节点需要固定高度，z-paging的height:100%才会生效 */
.content {
	height: 100%;
}

.container_wrapper {
}

.container_item {
	width: $main-width;
	margin: auto;
	background-color: #fff;
	overflow: hidden;
	margin-bottom: 30rpx;
	padding: 30rpx 30rpx;
	position: relative;
	&:last-of-type {
		margin-bottom: 0;
	}

	.top {
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
		.img1 {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			flex: none;
		}
		.right {
			flex: auto;
			padding-left: 30rpx;
			.name {
				font-size: 30rpx;
				display: block;
				margin-bottom: 20rpx;
			}
			.phone {
				font-size: 30rpx;
				display: block;
			}
		}
	}

	.data_item {
		color: #666;
		border-bottom: 1px solid #ddd;
		padding: 20rpx 0;
		font-size: 0;
		line-height: 38rpx;
		padding-left: 90rpx;
		.text1 {
			font-size: 30rpx;
			color: #000;
			text-indent: -90rpx;
		}
		.text2 {
			font-size: 26rpx;
			margin-right: 10rpx;
		}
		.text3 {
			font-size: 26rpx;
			margin-right: 10rpx;
		}
		.text4 {
			font-size: 26rpx;
			margin-right: 30rpx;
		}
		.text5 {
			font-size: 26rpx;
			color: $main-color;
		}
	}
}
</style>
