<template>
	<view class="container">
		<view class="blank40"></view>

		<!-- 收益总计 -->
		<view class="box1 box">
			<m-title2 title="累计收益" moreText="查看明细" path="/pages/sub2/storeProfitDetailed/storeProfitDetailed" />

			<!-- 累计收益 -->
			<view class="total">
				<view class="num">{{ totleData.totalRevenue || 0 }}</view>
			</view>

			<!-- 按时间分类 -->
			<view class="date">
				<!-- 今日收益 -->
				<view class="date_item">
					<text class="text">今日收益</text>
					<view class="num">{{ totleData.todayEarnings || 0 }}</view>
				</view>
				<!-- 本周收益 -->
				<view class="date_item border">
					<text class="text">本周收益</text>
					<view class="num">{{ totleData.weekEarnings || 0 }}</view>
				</view>
				<!-- 本月收益 -->
				<view class="date_item">
					<text class="text">本月收益</text>
					<view class="num">{{ totleData.monthEarnings || 0 }}</view>
				</view>
			</view>
		</view>
		<view class="blank40"></view>

		<!-- 金额统计图表分析 -->
		<view class="box2 box">
			<!-- 图表选项 -->
			<view class="box2_options">
				<!-- <view class="box2_options_item">
					<uni-data-select
						v-model="storeId"
						:clear="false"
						:localdata="categoryOption1"
						placeholder="选择门诊"
					></uni-data-select>
				</view> -->
				<view class="box2_options_item">
					<uni-data-select
						v-model="timeType"
						:clear="false"
						:localdata="categoryOption2"
						placeholder="选择时间"
						@change="timeChange"
					></uni-data-select>
				</view>
				<view class="box2_options_item"><button class="button">数据导出</button></view>
			</view>

			<!-- 日期选择 -->
			<view class="box2_p" v-if="timeType === 3">
				<uni-datetime-picker :clearIcon="false" v-model="rangeTime" :end="Date.now()" type="daterange" />
			</view>

			<!-- 图表显示 -->
			<view class="charts-box">
				<qiun-data-charts
					type="area"
					:opts="opts1"
					:chartData="chartData1"
					:canvas2d="true"
					:errorReload="false"
					:ontouch="true"
					canvasId="YgBRQEqhjzgZiUALcQHAEjuiydoujlta"
					tooltipFormat="tooltipMy"
					:errorMessage="errorMessage1"
					@complete="chartsComplete1"
					@error="chartsError1"
				/>
			</view>
		</view>
		<view class="blank40"></view>

		<!-- 订单统计图 -->
		<view class="box3 box">
			<m-title2 title="订单统计" />

			<!-- 图表显示 -->
			<view class="charts-box">
				<qiun-data-charts
					type="column"
					:opts="opts2"
					:chartData="chartData2"
					:canvas2d="true"
					:errorReload="false"
					:ontouch="true"
					canvasId="MxCLuawuSlvjDQWYWQVzjzgcUgUMrZya"
					tooltipFormat="tooltipMy1"
					:errorMessage="errorMessage2"
					@complete="chartsComplete2"
					@error="chartsError2"
				/>
			</view>
		</view>

		<view class="blank40"></view>
		<view class="blank40"></view>
	</view>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import qiunDataCharts from '@/pages/sub2/components/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'
import dayjs from 'dayjs'
import { _storeproductStatistics } from '@/aTemp/apis/store.js'
// 开始时间
const startTime = computed(() => rangeTime.value[0])
// 结束时间
const endTime = computed(() => rangeTime.value[1])

// 每页数量
// const pageSize = ref(6)
// 有多少页面
// const pageNum = ref(1)
// 是否加载完成
const pageLoadStatus = ref('loading')

// 数据统计
const totleData = ref({})
// 折线图表数据
const zLineData = ref([])
// 柱状图表数据
const zColumnData = ref([])

const storeproductStatistics = () => {
	pageLoadStatus.value = 'loading'
	_storeproductStatistics({
		startTime: startTime.value,
		endTime: endTime.value
	})
		.then(res => {
			const { code, msg, data } = res
			totleData.value = {
				totalRevenue: data[0].totalRevenue,
				monthEarnings: data[0].monthEarnings,
				todayEarnings: data[0].todayEarnings,
				weekEarnings: data[0].weekEarnings
			}
			zLineData.value = data[0].customTime || []
			zColumnData.value = data[0].customCount || []
			pageLoadStatus.value = 'noMore'
		})
		.catch(err => {
			zLineData.value = []
			zColumnData.value = []
			pageLoadStatus.value = 'noMore'
		})
}

onLoad(options => {
	storeproductStatistics()
})

// 店铺筛选
const storeId = ref(1)
const categoryOption1 = ref([
	{
		value: 1,
		text: '门诊一'
	},
	{
		value: 2,
		text: '门诊二'
	}
])

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

const nowTime = dayjs()
const timeType = ref(1)
let rangeTime = ref([nowTime.subtract(7, 'day').format('YYYY-MM-DD'), nowTime.format('YYYY-MM-DD')])
const timeChange = e => {
	if (e === 1 && timeType.value != 1) {
		rangeTime.value = [nowTime.subtract(7, 'day').format('YYYY-MM-DD'), nowTime.format('YYYY-MM-DD')]
	} else if (e === 2 && timeType.value != 2) {
		rangeTime.value = [nowTime.subtract(1, 'month').format('YYYY-MM-DD'), nowTime.format('YYYY-MM-DD')]
	} else {
		rangeTime.value = []
	}
}
// 监听选择时间的变化重新获取数据
watch(rangeTime, (newVal, oldVal) => {
	if (newVal.length > 0) {
		pageLoadStatus.value = 'loading'
		zLineData.value.length = 0
		zColumnData.value.length = 0
		storeproductStatistics()
	}
})

/*
 * 折线图
 */
import UseLineChart from './UseLineChart.js'
const {
	chartData: chartData1,
	opts: opts1,
	errorMessage: errorMessage1,
	chartsComplete: chartsComplete1,
	chartsError: chartsError1
} = UseLineChart({
	zData: zLineData
})

/*
 * 柱状图
 */
import UseColumnChart from './UseColumnChart.js'
const {
	chartData: chartData2,
	opts: opts2,
	errorMessage: errorMessage2,
	chartsComplete: chartsComplete2,
	chartsError: chartsError2
} = UseColumnChart({
	zData: zColumnData
})
</script>

<style lang="scss" scoped>
.container {
	.box {
		width: $main-width;
		margin: auto;
		box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.2);
		border-radius: 16rpx;
		background-color: #fff;
		padding: $padding;
	}

	.box1 {
		.text {
			color: #999;
			font-size: 24rpx;
		}
		.total {
			> .num {
				text-align: center;
				font-size: 56rpx;
				color: $main-color;
				padding-bottom: 30rpx;
			}
		}
		.date {
			@include mFlex;
			&_item {
				text-align: center;
				flex: none;
				width: 33.3%;
				> .num {
					padding-top: 30rpx;
					color: #333;
				}
			}
			> .border {
				border-left: 1px solid $uni-border-2;
				border-right: 1px solid $uni-border-2;
			}
		}
	}

	.box2 {
		.box2_options {
			@include mFlex;
			justify-content: space-between;
			&_item {
				flex: none;
				width: 28%;
				.button {
					background-color: $main-color;
					color: #fff;
					height: 33px;
					font-size: 14px;
					line-height: 33px;
				}
			}
		}
		.box2_p {
			margin-top: 30rpx;
		}
		.charts-box {
			height: 480rpx;
			width: 100%;
			margin-top: 40rpx;
		}
	}

	.box3 {
		.charts-box {
			height: 480rpx;
			width: 100%;
		}
	}
}
</style>
