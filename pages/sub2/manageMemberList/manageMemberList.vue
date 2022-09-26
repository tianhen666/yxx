<template>
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

	<view class="box1">
		<view class="box1_item">
			<view class="text">全部邀请</view>
			<view class="text_num">588080</view>
		</view>
		<view class="box1_item">
			<view class="text">今日新增</view>
			<view class="text_num">588080</view>
		</view>
		<view class="box1_item">
			<view class="text">本月新增</view>
			<view class="text_num">588080</view>
		</view>
	</view>

	<!-- 背景 -->
	<view class="pageBg"></view>

	<!-- 用户列表 -->
	<view class="box2 box" style="margin-top: -100rpx;">
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
				<uni-data-select
					v-model="time"
					:localdata="categoryOption1"
					placeholder="邀请人"
				></uni-data-select>
			</view>
			
			<view class="select_item">
				<uni-data-select
					v-model="time"
					:localdata="categoryOption2"
					placeholder="选择时间"
				></uni-data-select>
			</view>
		</view>
		<!-- 日期选择 -->
		<view class="box2_p" v-show="time===3">
			<uni-datetime-picker :clearIcon="false" v-model="rangeTime" :end="Date.now()" type="daterange" />
		</view>
		<view class="blank32"></view>
		<!-- 搜索 -->
		<uni-search-bar v-model="search.title" placeholder="输入手机号/用户名搜索" cancelButton="none"></uni-search-bar>
		<view class="blank40"></view>

		<!-- 用户列表 -->
		<m-user-list></m-user-list>
	</view>

	<view class="blank40"></view>
	<view class="blank40"></view>
	
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { navigateBack } from '@/aTemp/utils/uniAppTools.js'



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
:deep(.placeholder){
	color: #B3B3B3 !important;
	font-size: 28rpx !important;
}
.bg {
	height: 100rpx;
	width: 750rpx;
	background-image: linear-gradient($main-color 0%, transparent);
}

.box {
	width: $main-width;
	padding: $padding;
	margin: auto;
	box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.2);
	border-radius: 16rpx;
	background-color: #fff;
	overflow: hidden;
}
.box1 {
	width: 750rpx;
	padding: $padding;
	@include mFlex;
	justify-content: space-between;
	padding-bottom: 40rpx;
	background-color: $main-color;
	color: #ffffff;
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
		&_item{
			width: 30%;
			flex: none;
		}
	}
	&_p{
		margin-top: 32rpx;
	}
}
</style>
