<template>
	<!-- 提示登录组件 -->
	<m-authorized-login ref="mLogin"></m-authorized-login>

	<!-- 加载提示 -->
	<m-page-loading v-if="loading"></m-page-loading>

	<z-paging
		ref="pagingObj"
		v-model="mdataList"
		@query="getListData"
		created-reload
		show-loading-more-when-reload
		loading-full-fixed
	>
		<!-- 固定顶部 -->
		<template v-slot:top>
			<!-- 背景 -->
			<view class="pageBg">
				<image class="image" src="/static/images/bg.png" mode="aspectFill"></image>
			</view>
			<!-- #ifndef H5 -->
			<!-- 标题栏 -->
			<uni-nav-bar
				statusBar
				fixed
				:title="'口腔知识'"
				color="#ffffff"
				:border="false"
			></uni-nav-bar>
			<view class="blank20"></view>
			<!-- #endif -->
		</template>

		<view class="mybox123">
			<!-- 搜索框 -->
			<view class="search">
				<uni-search-bar
					v-model="searchVal"
					@confirm="search"
					placeholder="输入关键字搜索文章"
					cancelButton="none"
				></uni-search-bar>
			</view>

			<!-- 列表 -->
			<view class="item" v-for="(item, index) in mdataList" :key="index">
				<view
					class="item-inner"
					@tap="
						navigateTo(
							`/pages/sub1/newsDetails/newsDetails?targetId=${encodeURIComponent(
								item.id
							)}`
						)
					"
				>
					<view class="img_box">
						<image class="img" :src="item.thumbUrl" mode="aspectFill"></image>
					</view>
					<view class="right_box">
						<view class="title">{{ item.title }}</view>
						<view class="digest">{{ item.digest || item.title }}</view>
					</view>
				</view>
			</view>
		</view>
	</z-paging>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { _freePublishGetFreePublish } from '@/aTemp/apis/wx.js';
import { navigateTo } from '@/aTemp/utils/uniAppTools.js';

// z-ping对象
const pagingObj = ref(null);

// 加载中
const loading = ref(true);
// 数据列表
const mdataList = ref([]);

const searchVal = ref('');
const search = val => {
	pagingObj.value.reload();
};

// 获取文章列表
const getListData = (pageNo, pageSize) => {
	const params = {
		pageNum: pageNo,
		pageSize: pageSize,
		searchVal: searchVal.value
	};
	_freePublishGetFreePublish(params)
		.then(res => {
			setTimeout(() => {
				loading.value = false;
			}, 1000);
			pagingObj.value.complete(res.data?.records || []);
		})
		.catch(error => {
			pagingObj.value.complete(false);
		});
};
</script>

<style lang="scss" scoped>
.search {
	margin: 0 32rpx;
	:deep(.uni-searchbar) {
		padding-left: 0;
		padding-right: 0;
	}
}
.item {
	.item-inner {
		@include mFlex;
		align-items: flex-start;
		justify-content: space-between;
		margin: 32rpx;
		background-color: #fff;
		margin-top: 0;
		border-radius: 10rpx;
		overflow: hidden;
		padding: 24rpx;
		.img_box {
			width: 240rpx;
			padding-top: 240rpx * 0.25 * 3;
			position: relative;
			flex: none;
			border-radius: 10rpx;
			overflow: hidden;
			background-color: #f1f1f1;
			.img {
				top: 0;
				left: 0;
				position: absolute;
				height: 100%;
				width: 100%;
				border-radius: 10rpx;
			}
		}
		.right_box {
			flex: none;
			width: 350rpx;
			.title {
				font-size: 30rpx;
				@include textOverHidden;
				line-height: 1.8;
				color: #000;
				font-weight: 400;
			}
			.digest {
				color: #999;
				font-size: 26rpx;
				@include singleLineTextOverHidden;
				margin-top: 20rpx;
			}
		}
	}
}
</style>
