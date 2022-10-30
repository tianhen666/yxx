<template>
	<view class="container">
		<view class="blank40"></view>
		<!-- 相关活动 -->
		<view class="container_activity box" v-if="dataObj">
			<view class="container_activity_image">
				<image class="image" :src="dataObj.mainPic" mode="aspectFill"></image>
			</view>
			
			<view class="container_activity_title">{{ dataObj.title }}</view>
		</view>
		<view class="blank40"></view>

		<!-- 用户列表 -->
		<view class="box">
			<!-- 选择类别 -->
			<view class="box_options">
				<view class="box_options_item" style="width: 60%;">
					<uni-data-select
						v-model="mStatus"
						:clear="false"
						:localdata="categoryOption1"
						placeholder="选择类别"
						emptyText="暂无活动"
						@change="selectChange"
					></uni-data-select>
				</view>

				<!-- 数据导出 -->
				<!-- <view class="box_options_item"><button class="button">数据导出</button></view> -->
			</view>
			<view class="blank32"></view>

			<!-- 时间 -->
			<view class="time">{{`(统计时间：${dayjs(dataObj.startDt).format('YYYY年MM月DD日')}--${dayjs(dataObj.endDt).format('YYYY年MM月DD日')})`}}</view>
			<view class="blank32"></view>

			<!-- 用户列表 -->
			<m-user-list activityShow :listData="listData"></m-user-list>
		</view>

		<view class="blank40"></view>
		<view class="blank40"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { _enrollformGetinfo } from '@/aTemp/apis/activity.js'
import { _storeproductParticulars } from '@/aTemp/apis/store.js'
import dayjs from 'dayjs'

// 活动数据列表
const categoryOption1 = ref([
	{
		value: -1,
		text: '全部'
	},
	{
		value: 1,
		text: '已参与活动'
	},
	{
		value: 0,
		text: '未参与活动'
	}
])
// 是否参加状态
const mStatus = ref(-1)

// 当前活动ID
const dataId = ref(1)
// 加载中
const loading = ref(false)
// 活动详情
const dataObj = ref('')
// 活动数据列表
const listData = ref([])

// 页面开始加载
onLoad(async options => {
	let { targetId } = options
	dataId.value = parseInt(targetId) || 0
	// 获取活动详情
	enrollformGetinfo()

	// 获取活动数据详情
	storeproductParticulars()
})

// 获取活动详情
const enrollformGetinfo = () => {
	// 加载中
	loading.value = true
	_enrollformGetinfo({ id: dataId.value }).then(res => {
		const { data, code, msg } = res
		// 活动详情
		dataObj.value = data.getinfo
		// 数据加载结束
		loading.value = false
	})
}

// 活动数据详情
const storeproductParticulars = () => {
	// dataId.value
	_storeproductParticulars({ productid: 3038, participate: mStatus.value }).then(res => {
		const { data, code, msg } = res
		// 活动参与人数列表
		listData.value = data
	})
}

// 类别切换
const selectChange = e => {
	mStatus.value = e
	storeproductParticulars()
}
</script>

<style lang="scss" scoped>
.container {
	.box {
		width: $main-width;
		padding: $padding;
		margin: auto;
		box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.2);
		border-radius: 16rpx;
		background-color: #fff;
		overflow: hidden;
		> .time {
			font-size: 24rpx;
			color: #999;
		}

		&_options {
			@include mFlex;
			justify-content: space-between;
			&_item {
				flex: none;
				width: 28%;
				background-color: #fff;
				.button {
					background-color: $main-color;
					color: #fff;
					height: 35px;
					font-size: 14px;
					line-height: 35px;
				}
			}
		}
	}

	/* 相关活动 */
	.container_activity {
		padding: 0;
		&_image {
			width: 100%;
			padding-top: 80%;
			height: 0;
			position: relative;
			.image{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}
		&_title {
			margin: $padding;
			@include textOverHidden;
			line-height: 1.6;
			font-size: 28rpx;
		}
	}
}
</style>
