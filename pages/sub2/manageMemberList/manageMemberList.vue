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
			<view class="text_num">{{ invitationsNumber[0] || 0 }}</view>
		</view>
		<view class="box1_item">
			<view class="text">今日新增</view>
			<view class="text_num">{{ invitationsNumber[1] || 0 }}</view>
		</view>
		<view class="box1_item">
			<view class="text">本月新增</view>
			<view class="text_num">{{ invitationsNumber[2] || 0 }}</view>
		</view>
	</view>

	<!-- 用户列表 -->
	<view class="box2 box">
		<!-- 数据筛选 -->
		<view class="select">
			<view class="select_item">
				<uni-data-picker placeholder="用户来源" popup-title="用户来源" :localdata="dataTree" v-model="scene" />
			</view>

			<view class="select_item select_invite">
				<uni-data-select v-model="inviteUserId" :localdata="categoryOption1" placeholder="邀请人"></uni-data-select>
			</view>

			<view class="select_item">
				<uni-data-select
					@change="timeChange"
					v-model="timeType"
					:localdata="categoryOption2"
					placeholder="选择时间"
				></uni-data-select>
			</view>
		</view>
		<!-- 日期选择 -->
		<view class="box2_p" v-if="timeType === 3">
			<uni-datetime-picker
				return-type="string"
				:clearIcon="false"
				v-model="rangeTime"
				:end="Date.now()"
				type="daterange"
			/>
		</view>
		<view class="blank32"></view>
		<!-- 搜索 -->
		<uni-search-bar
			v-model="search"
			placeholder="输入手机号/用户名搜索"
			cancelButton="none"
			@confirm="searchFun"
			@clear="searchFun"
		></uni-search-bar>
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
import { ref, computed, watch } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { navigateBack } from '@/aTemp/utils/uniAppTools.js'
import { _userDataStatistics } from '@/aTemp/apis/user.js'
import dayjs from 'dayjs'

// 开始时间
const startTime = computed(() => rangeTime.value[0])
// 结束时间
const endTime = computed(() => rangeTime.value[1])
// 邀请渠道
const scene = ref('')
// 邀请人ID
const inviteUserId = ref('')
// 搜索
const search = ref('')

// 每页数量
const pageSize = ref(6)
// 有多少页面
const pageNum = ref(1)
// 是否加载完成
const pageLoadStatus = ref('loading')
// 会员列表
const userListData = ref([])
// 数量统计
const invitationsNumber = ref([])

// 获取用户列表
const userDataStatistics = () => {
	pageLoadStatus.value = 'loading'
	_userDataStatistics({
		startTime: startTime.value,
		endTime: endTime.value,
		scene: scene.value,
		inviteUserId: inviteUserId.value,
		pageNum: pageNum.value,
		pageSize: pageSize.value,
		search: search.value
	}).then(res => {
		const { msg, code, data } = res
		const { customConditionInquire, resultMonthNewly, resultTodayNewly, distinctness } = data

		// 数量统计
		invitationsNumber.value[0] = customConditionInquire.data.count
		invitationsNumber.value[1] = resultTodayNewly.data
		invitationsNumber.value[2] = resultMonthNewly.data

		// 邀请人列表赋值
		categoryOption1.value = distinctness.data.map(item=>({text:item.remarkname||item.nickname,value:item.id}))

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
	pageNum.value = 1
	pageLoadStatus.value = 'loading'
	userListData.value.length = 0
	userDataStatistics()
})

// 监听来源选择的变化重新获取数据
watch(scene, (newVal, oldVal) => {
	pageNum.value = 1
	pageLoadStatus.value = 'loading'
	userListData.value.length = 0
	userDataStatistics()
})

// 0直接邀请 1活动 2商品 3服务 4海报 5员工邀请 6店铺入驻邀请 7预约分享 8文章邀请
const dataTree = [
	{
		text: '直接邀请',
		value: '0'
	},
	{
		text: '活动邀请',
		value: '1'
	},
	{
		text: '商品邀请',
		value: '2'
	},
	{
		text: '服务邀请',
		value: '3'
	},
	{
		text: '海报邀请',
		value: '4'
	},
	{
		text: '员工邀请',
		value: '5'
	},
	{
		text: '入驻邀请',
		value: '6'
	},
	{
		text: '预约邀请',
		value: '7'
	},
	{
		text: '文章邀请',
		value: '8'
	}
]

// 时间选择
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
const timeType = ref()
let rangeTime = ref([])
const timeChange = e => {
	const nowTime = dayjs()
	if (e === 1) {
		rangeTime.value = [nowTime.subtract(7, 'day').format('YYYY-MM-DD'), nowTime.format('YYYY-MM-DD')]
	} else if (e === 2) {
		rangeTime.value = [nowTime.subtract(1, 'month').format('YYYY-MM-DD'), nowTime.format('YYYY-MM-DD')]
	} else {
		rangeTime.value = []
	}
}
// 监听选择时间的变化重新获取数据
watch(rangeTime, (newVal, oldVal) => {
	if (newVal.length > 0) {
		pageNum.value = 1
		pageLoadStatus.value = 'loading'
		userListData.value.length = 0
		userDataStatistics()
	}
})

// 邀请人筛选
const categoryOption1 = ref([])
watch(inviteUserId, (newVal, oldVal) => {
	pageNum.value = 1
	pageLoadStatus.value = 'loading'
	userListData.value.length = 0
	userDataStatistics()
})

// 搜索筛选
const searchFun = e => {
	pageNum.value = 1
	pageLoadStatus.value = 'loading'
	userListData.value.length = 0
	setTimeout(() => {
		userDataStatistics()
	}, 500)
}
</script>

<style lang="scss" scoped>
:deep(.uni-select__input-box) {
	overflow: hidden;
}
:deep(.select_invite) {
	.uni-select__selector {
		width: 200%;
		.uni-select__selector-item {
			text {
				overflow: hidden; /*超出隐藏*/
				text-overflow: ellipsis; /*隐藏后添加省略号*/
				white-space: nowrap; /*强制不换行*/
				width: 100%;
			}
		}
	}
}
:deep(.uni-searchbar) {
	padding: 0;
}
:deep(.placeholder) {
	color: #b3b3b3 !important;
	font-size: 28rpx !important;
}

.box {
	position: relative;
	z-index: 4;
	width: $main-width;
	padding: $padding;
	margin: auto;
	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
	border-radius: 16rpx;
	background-color: #fff;
	overflow: hidden;
}

.box1 {
	position: relative;
	z-index: 4;
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
