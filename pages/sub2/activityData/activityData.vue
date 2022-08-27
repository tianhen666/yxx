<template>
	<view class="container">
		<view class="blank40"></view>

		<view class="box1">
			<view class="box1_options">
				<!-- 活动选择 -->
				<view class="box1_options_item" style="width: 60%;">
					<uni-data-select
						v-model="activityId"
						:clear="false"
						:localdata="categoryOption1"
						placeholder="选择活动"
						emptyText="暂无活动"
					></uni-data-select>
				</view>

				<!-- 数据导出 -->
				<view class="box1_options_item"><button class="button">数据导出</button></view>
			</view>
		</view>
		<view class="blank40"></view>

		<!-- 金额统计图表分析 -->
		<view class="box2 box">
			<!-- 标题 -->
			<m-title2 title="活动收益" />
			
			<view class="time">(统计时间：2022年8月23--2022年8月30)</view>
			<view class="blank32"></view>
			
			<view class="box2_total">
				<!-- 总收益 -->
				<view class="box2_total_item">
					<text class="text">总收益</text>
					<view class="num">
						{{ 10334 }}
						<text>元</text>
					</view>
				</view>
				<!-- 浏览人数 -->
				<view class="box2_total_item border">
					<text class="text">浏览人数</text>
					<view class="num">
						{{ 66666 }}
						<text>人</text>
					</view>
				</view>
				<!-- 参与人数 -->
				<view class="box2_total_item">
					<text class="text">参与人数</text>
					<view class="num">
						{{ 1234 }}
						<text>人</text>
					</view>
				</view>
			</view>

			<!-- 折线图表 -->
			<view class="charts-box">
				<qiun-data-charts
					type="area"
					:opts="opts1"
					:chartData="chartData1"
					:ontouch="true"
					:canvas2d="true"
					canvasId="YgBRQEqhjzgZiUNLcQHAEjuiydoujlta"
					tooltipFormat="tooltipMy"
					:errorMessage="errorMessage1"
					@complete="chartsComplete1"
				/>
			</view>
		</view>
		<view class="blank40"></view>

		<!-- 数据分析 -->
		<view class="box3 box">
			<!-- 标题 -->
			<m-title2 title="数据分析" moreText="查看详情" path="/pages/sub2/activityDataDetails/activityDataDetails" />

			<view class="time">(统计时间：2022年8月23--2022年8月30)</view>

			<!-- 漏斗图 -->
			<view class="charts-box">
				<qiun-data-charts
					type="funnel"
					:opts="opts2"
					:chartData="chartData2"
					:canvas2d="true"
					canvasId="cKBfAErggEvpwVTWLRPQcfwcZxDrbULO"
					:errorMessage="errorMessage2"
					@complete="chartsComplete2"
				/>
			</view>
		</view>
		<view class="blank40"></view>

		<!-- 邀请排行榜 -->
		<view class="box3 box">
			<!-- 标题 -->
			<m-title2 title="邀请排行榜" moreText="查看详情" path="/pages/sub2/activityDataDetails/activityDataDetails" />
			
			<view class="time">(统计时间：2022年8月23--2022年8月30)</view>
			<view class="blank32"></view>
			
			<!-- 排行榜数据 -->
			<m-ranking-list></m-ranking-list>
		</view>
		<view class="blank40"></view>
		<view class="blank40"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { _enrollformGetlist } from '@/aTemp/apis/activity.js'

// 活动数据列表
const categoryOption1 = ref([])
// 当前活动ID
const activityId = ref(1)

onLoad(() => {
	_enrollformGetlist({ status: 0 }).then(res => {
		const { code, data, msg } = res
		categoryOption1.value = data
	})
})

/*
 * 折线图
 */
import UseLineChart from './UseLineChart.js'
const {
	chartData: chartData1,
	opts: opts1,
	errorMessage: errorMessage1,
	chartsComplete: chartsComplete1
} = UseLineChart({
	errorMessage: '数据加载失败'
})

/*
 * 漏斗图
 */
import UseFunnelChart from './UseFunnelChart.js'
const {
	chartData: chartData2,
	opts: opts2,
	errorMessage: errorMessage2,
	chartsComplete: chartsComplete2
} = UseFunnelChart({ errorMessage: '数据加载失败' })
</script>

<style lang="scss" scoped>
.container {
	.charts-box {
		height: 480rpx;
		width: 100%;
		margin-top: 40rpx;
	}
	.box {
		width: $main-width;
		padding: $padding;
		margin: auto;
		box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.2);
		border-radius: 16rpx;
		background-color: #fff;
		> .time {
			font-size: 24rpx;
			color: #999;
		}
	}
	.box1 {
		width: $main-width;
		margin: auto;
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

	.box2 {
		&_total {
			@include mFlex;
			&_item {
				> .text {
					color: #999;
					font-size: 24rpx;
				}
				text-align: center;
				flex: none;
				width: 33.3%;
				> .num {
					padding-top: 20rpx;
					color: #333;
					> text {
						font-size: 24rpx;
						padding-left: 3rpx;
					}
				}
			}
			> .border {
				border-left: 1px solid $uni-border-2;
				border-right: 1px solid $uni-border-2;
			}
		}
	}
}
</style>
