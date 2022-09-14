<template>
	<view class="container">
		<view class="blank40"></view>

		<!-- 收益总计 -->
		<view class="box1 box">
			<m-title2 title="累计收益" moreText="查看明细" path="11" />

			<!-- 累计收益 -->
			<view class="total"><view class="num">66666.66</view></view>

			<!-- 按时间分类 -->
			<view class="date">
				<!-- 今日收益 -->
				<view class="date_item">
					<text class="text">今日收益</text>
					<view class="num">66666.66</view>
				</view>
				<!-- 本周收益 -->
				<view class="date_item border">
					<text class="text">本周收益</text>
					<view class="num">66666.66</view>
				</view>
				<!-- 本月收益 -->
				<view class="date_item">
					<text class="text">本月收益</text>
					<view class="num">66666.66</view>
				</view>
			</view>
		</view>
		<view class="blank40"></view>

		<!-- 金额统计图表分析 -->
		<view class="box2 box">
			<!-- 图表选项 -->
			<view class="box2_options">
				<view class="box2_options_item">
					<uni-data-select
						v-model="storeId"
						:clear="false"
						:localdata="categoryOption1"
						placeholder="选择门诊"
					></uni-data-select>
				</view>
				<view class="box2_options_item">
					<uni-data-select
						v-model="time"
						:clear="false"
						:localdata="categoryOption2"
						placeholder="选择时间"
					></uni-data-select>
				</view>
				<view class="box2_options_item"><button class="button">数据导出</button></view>
			</view>

			<!-- 日期选择 -->
			<view class="box2_p" v-show="time === 3">
				<uni-datetime-picker :clearIcon="false" v-model="rangeTime" :end="Date.now()" type="daterange" />
			</view>

			<!-- 图表显示 -->
			<view class="charts-box">
				<qiun-data-charts
					type="line"
					:opts="opts1"
					:chartData="chartData1"
					:canvas2d="true"
					canvasId="YgBRQEqhjzgZiUALcQHAEjuiydoujlta"
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
					canvasId="MxCLuawuSlvjDQWYWQVzjzgcUgUMrZya"
				/>
			</view>
		</view>

		<view class="blank40"></view>
		<view class="blank40"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import qiunDataCharts from '@/pages/sub2/components/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'
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
const time = ref(1)
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

// 店铺选择
const storeId = ref(1)
// 自定义时间
const rangeTime = ref([])
/*
 * 折线图
 */
import UseLineChart from './UseLineChart.js'
const { chartData: chartData1, opts: opts1 } = UseLineChart()

/*
 * 柱状图
 */
import UseColumnChart from './UseColumnChart.js'
const { chartData: chartData2, opts: opts2 } = UseColumnChart()
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
