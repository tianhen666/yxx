<template>
	<!-- 背景 -->
	<view class="pageBg">
		<image class="image" src="/static/images/bg.png" mode="aspectFill"></image>
	</view>
	<!-- #ifndef H5 -->
	<!-- 标题栏 -->
	<uni-nav-bar
		@clickLeft="navigateBack"
		left-icon="left"
		statusBar
		fixed
		:title="'我的收益'"
		color="#ffffff"
		:border="false"
	></uni-nav-bar>
	<!-- #endif -->

	<view class="box1 box">
		<view class="box1_item">
			<view class="text">累计收益</view>
			<view class="text_num">{{ statistics.earningSum }}元</view>
		</view>
		<view class="box1_item">
			<view class="text">本月收益</view>
			<view class="text_num">{{ statistics.earningCurdate }}元</view>
		</view>
		<view class="box1_item">
			<view class="text">今日收益</view>
			<view class="text_num">{{ statistics.earningdays }}元</view>
		</view>
	</view>
	<view class="blank40"></view>
	<view class="blank20"></view>
	<view class="box"><m-title2 title="收益明细"></m-title2></view>

	<view class="box2 box">
		<z-paging
			ref="pagingObj"
			v-model="dataList"
			@query="queryList"
			:fixed="false"
			min-delay="1000"
			created-reload
			show-loading-more-when-reload
		>
			<view class="box2_item" v-for="(item, index) in dataList" :key="index">
				<view class="left">
					<view class="wrapper">
						<image class="image" :src="item.avatar" mode="aspectFill"></image>
						<text class="name">{{ item.nickname }}</text>
					</view>
				</view>
				<view class="right">
					<text class="money">+ {{ item.shareparicenum }}</text>
					<text class="time">{{ dayjs(item.pay_Dt).format('YYYY-M-D HH:mm:ss') }}</text>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { _userEarningData } from '@/aTemp/apis/user.js'
import dayjs from 'dayjs'
import { navigateBack } from '@/aTemp/utils/uniAppTools.js'
// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 数据列表
const dataList = ref([])
// 当前选择的索引
const tabIndex = ref(0)
// 插件对象
const pagingObj = ref(null)
// 收益统计
const statistics = ref({})

// 后台获取数据
const queryList = (pageNo, pageSize) => {
	const params = {
		pageNum: pageNo,
		pageSize: pageSize,
		userId: useUserMain.userid
	}
	_userEarningData(params)
		.then(res => {
			statistics.value = res.data

			// 列表赋值
			pagingObj.value.complete(res.data?.earningsrecord?.userlist || [])
		})
		.catch(error => {
			pagingObj.value.complete(false)
		})
}
</script>

<style lang="scss" scoped>
.box {
	width: $main-width;
	margin: auto;
	position: relative;
	z-index: 2;
}

.box1 {
	background-color: #ffffff;
	@include mFlex;
	justify-content: space-between;
	border-radius: 16rpx;
	padding: 32rpx 24rpx;
	.box1_item {
		color: $text-color;
		font-size: 28rpx;
		width: 33.3%;
		flex: none;
		overflow: hidden;
		text-align: center;
		> .text {
			margin-bottom: 30rpx;
		}
		> .text_num {
			color: #999;
		}
	}
}

.box2 {
	background-color: #ffffff;
	padding: $padding;
	border-radius: 16rpx;
	height: #{calc(100vh - 280px)};
	box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);

	.box2_item {
		@include mFlex;
		justify-content: space-between;
		text-align: center;
		border-bottom: 1px solid #eee;
		padding-bottom: 20rpx;
		margin-bottom: 20rpx;
		font-size: 28rpx;
		&:last-of-type {
			border: none;
			padding-bottom: 0;
			margin-bottom: 0;
		}
		.left {
			width: 50%;
			flex: none;
			overflow: hidden;
			> .wrapper {
				@include mFlex;
				justify-content: left;
				> .image {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					flex: none;
				}
				> .name {
					flex: auto;
					margin-left: 20rpx;
					color: $text-color-grey;
					@include singleLineTextOverHidden;
					font-size: 28rpx;
					text-align: left;
				}
			}
		}
		.right {
			width: 40%;
			flex: none;
			overflow: hidden;
			text-align: right;
			> .money {
				color: $sub-color;
				font-size: 28rpx;
				font-weight: bold;
				font-size: 32rpx;
			}
			> .time {
				margin-top: 20rpx;
				color: #aaa;
				font-size: 26rpx;
			}
		}
	}
}
</style>
