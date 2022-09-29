<template>
	<!-- 背景 -->
	<view class="pageBg uni-navbar--fixed"><image class="image" src="/static/images/bg.jpg" mode="aspectFill"></image></view>
	<!-- #ifndef H5 -->
	<!-- 标题栏 -->
	<uni-nav-bar
		@clickLeft="navigateBack"
		left-icon="left"
		title="会员管理"
		fixed
		statusBar
		color="#ffffff"
		:border="false"
	></uni-nav-bar>
	<!-- #endif -->

	<view class="box1">
		<view class="box1_item">
			<view class="text">全部邀请</view>
			<view class="text_num">{{invitationsNumber[0]||0}}</view>
		</view>
		<view class="box1_item">
			<view class="text">今日新增</view>
			<view class="text_num">{{invitationsNumber[1]||0}}</view>
		</view>
		<view class="box1_item">
			<view class="text">本月新增</view>
			<view class="text_num">{{invitationsNumber[2]||0}}</view>
		</view>
	</view>

	<!-- 用户列表 -->
	<view class="box2 box">
		<!-- 数据筛选 -->
		<view class="select">
			<view class="select_item">
				<uni-data-picker
					placeholder="用户来源"
					popup-title="用户来源"
					:localdata="dataTree"
					v-model="classes"
					@change="onchange1"
				/>
			</view>

			<view class="select_item">
				<uni-data-select v-model="time" :localdata="categoryOption1" placeholder="邀请人"></uni-data-select>
			</view>

			<view class="select_item">
				<uni-data-select v-model="time" :localdata="categoryOption2" placeholder="选择时间"></uni-data-select>
			</view>
		</view>
		<!-- 日期选择 -->
		<view class="box2_p" v-show="time === 3">
			<uni-datetime-picker :clearIcon="false" v-model="rangeTime" :end="Date.now()" type="daterange" />
		</view>
		<view class="blank32"></view>
		<!-- 搜索 -->
		<uni-search-bar v-model="search.title" placeholder="输入手机号/用户名搜索" cancelButton="none"></uni-search-bar>
		<view class="blank40"></view>

		<!-- 用户列表 -->
		<m-user-list :listData="userListData"></m-user-list>
		
		<!-- 加载更多 -->
		<uni-load-more :status="pageLoadStatus" />
	</view>

	<view class="blank40"></view>
	<view class="blank40"></view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad,onReachBottom } from '@dcloudio/uni-app'
import { navigateBack } from '@/aTemp/utils/uniAppTools.js'
import { _userDataStatistics } from '@/aTemp/apis/user.js'

// 开始时间
const startTime = ref('')
// 结束时间
const endTime = ref('')
// 邀请渠道
const scene = ref('')
// 邀请人ID
const inviteUserId = ref('')

// 每页数量
const pageSize = ref(6)
// 有多少页面
const pageNum = ref(1)
// 是否加载完成
const pageLoadStatus = ref('more')

const invitationsNumber = ref([])
// 会员列表
const userListData = ref([])

// 获取用户列表
const userDataStatistics = () => {
	pageLoadStatus.value = 'loading'
	_userDataStatistics({
		startTime: startTime.value,
		endTime: endTime.value,
		scene: scene.value,
		inviteUserId: inviteUserId.value,
		pageNum: pageNum.value,
		pageSize: pageSize.value
	}).then(res => {
		const { msg, code, data } = res
		const { customConditionInquire, resultMonthNewly, resultTodayNewly } = data
		
		// 数量统计
		invitationsNumber.value[0] = customConditionInquire.data.count
		invitationsNumber.value[1] = resultTodayNewly.data
		invitationsNumber.value[2] = resultMonthNewly.data
		
		// 暂时延时一下
		setTimeout(() => {
			userListData.value.push(...customConditionInquire.data.userlist)
			// console.log(customConditionInquire.data.userlist)
			// 判断是否加载完成
			if (customConditionInquire.data.pageindex > pageNum.value) {
				pageNum.value++
				pageLoadStatus.value = 'more'
			} else {
				pageLoadStatus.value = 'noMore'
			}
		}, 1000)
	})
}
// 触底加载
onReachBottom(() => {
	if (pageLoadStatus.value === 'more') {
		userDataStatistics()
	}
})

onLoad(options => {
	// console.log(options)
	// 请求参数
	userDataStatistics()
})
// 来源选择
const onchange1 = res => {
	console.log(res)
}
const classes = ref('')
const dataTree = [
	{
		text: '直接邀请',
		value: '1-0'
	},
	{
		text: '活动',
		value: '2-0',
		children: [
			{
				text: '1.1班',
				value: '2-1'
			},
			{
				text: '1.2班11111111111',
				value: '2-2'
			}
		]
	}
]

// 搜索
const search = ref({
	title: ''
})

// 时间选择
const time = ref()
const categoryOption2 = ref([
	{
		value: 1,
		text: '最近7天'
	},
	{
		value: 2,
		text: '最近1月'
	},
	{
		value: 3,
		text: '自定义'
	}
])

// 日期
const rangeTime = ref([])
</script>

<style lang="scss" scoped>
:deep(.uni-searchbar) {
	padding: 0;
}
:deep(.placeholder) {
	color: #b3b3b3 !important;
	font-size: 28rpx !important;
}

.box {
	width: $main-width;
	padding: $padding;
	margin: auto;
	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
	border-radius: 16rpx;
	background-color: #fff;
	overflow: hidden;
}

.box1 {
	width: $main-width;
	@include mFlex;
	justify-content: space-between;
	padding: 40rpx 0 50rpx;
	color: #ffffff;
	margin: auto;
	.box1_item {
		width: 33.3%;
		flex: none;
		overflow: hidden;
		text-align: center;
		> .text_num {
			font-size: 36rpx;
		}
		> .text {
			margin-bottom: 20rpx;
			font-size: 28rpx;
		}
	}
}
.box2 {
	.select {
		@include mFlex;
		justify-content: space-between;
		&_item {
			width: 30%;
			flex: none;
		}
	}
	&_p {
		margin-top: 32rpx;
	}
}
</style>
