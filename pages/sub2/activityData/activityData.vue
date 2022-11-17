<template>
	<!-- 禁止页面滚动 -->
	<page-meta :page-style="'overflow:' + (popupStatus ? 'hidden' : 'visible')"></page-meta>
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

			<view class="time">
				{{
					`(统计时间：${dayjs(categoryOption1[activityId]?.startDt).format('YYYY年MM月DD日')} - ${dayjs(
						categoryOption1[activityId]?.endDt
					).format('YYYY年MM月DD日')})`
				}}
			</view>
			<view class="blank32"></view>

			<view class="box2_total">
				<!-- 总收益 -->
				<view class="box2_total_item">
					<text class="text">总收益</text>
					<view class="num">
						{{ totleData.spocoalesce || 0 }}
						<text>元</text>
					</view>
				</view>
				<!-- 浏览次数 -->
				<view class="box2_total_item border">
					<text class="text">浏览次数</text>
					<view class="num">
						{{ totleData.eicount || 0 }}
						<text>次</text>
					</view>
				</view>
				<!-- 参与人数 -->
				<view class="box2_total_item">
					<text class="text">参与人数</text>
					<view class="num">
						{{ totleData.stcount || 0 }}
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
					:errorReload="false"
					:errorMessage="errorMessage1"
					@complete="chartsComplete1"
					@error="chartsError1"
				/>
			</view>
		</view>
		<view class="blank40"></view>

		<!-- 数据分析 -->
		<view class="box3 box">
			<!-- 标题 -->
			<m-title2
				title="数据分析"
				moreText="查看详情"
				:path="`/pages/sub2/activityDataDetails/activityDataDetails?targetId=${productid}`"
			/>

			<view class="time">
				{{
					`(统计时间：${dayjs(categoryOption1[activityId]?.startDt).format('YYYY年MM月DD日')} - ${dayjs(
						categoryOption1[activityId]?.endDt
					).format('YYYY年MM月DD日')})`
				}}
			</view>

			<!-- 漏斗图 -->
			<view class="charts-box">
				<qiun-data-charts
					type="funnel"
					:opts="opts2"
					:chartData="chartData2"
					:canvas2d="true"
					canvasId="cKBfAErggEvpwVTWLRPQcfwcZxDrbULO"
					:errorReload="false"
					:errorMessage="errorMessage2"
					@complete="chartsComplete2"
				/>
			</view>
		</view>
		<view class="blank40"></view>

		<!-- 邀请排行榜 -->
		<view class="box3 box">
			<!-- 标题 -->
			<m-title2
				title="邀请排行榜"
				moreText="查看详情"
				:path="`/pages/sub2/activityDataDetails/activityDataDetails?targetId=${productid}`"
			/>

			<view class="time">
				{{
					`(统计时间：${dayjs(categoryOption1[activityId]?.startDt).format('YYYY年MM月DD日')} - ${dayjs(
						categoryOption1[activityId]?.endDt
					).format('YYYY年MM月DD日')})`
				}}
			</view>
			<view class="blank32"></view>

			<!-- 排行榜数据 -->
			<m-ranking-list :listData="yaoqingpaihang" @popFun="storeproductActivityPopup"></m-ranking-list>
		</view>
		<view class="blank40"></view>
		<view class="blank40"></view>
	</view>

	<!-- 普通弹窗 -->
	<uni-popup ref="popupRef" type="center" @change="popupRefChange">
		<view class="popup-content">
			<view class="close" @tap.stop="popupRef.close()">
				<image class="img" src="@/static/images/close1.png" mode="aspectFill"></image>
			</view>
			<m-user-list activityShow :listData="popupRefListData"></m-user-list>
		</view>
	</uni-popup>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import qiunDataCharts from '@/pages/sub2/components/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'
import dayjs from 'dayjs'
import { _enrollformGetlist, _storeproductActivityPopup } from '@/aTemp/apis/activity.js'
import { _storeproductActivitystatistics } from '@/aTemp/apis/store.js'
import { showToastText } from '@/aTemp/utils/uniAppTools.js'

// 活动数据列表
const categoryOption1 = ref([])
// 当前活动索引
const activityId = ref(0)
// 当前活动id
const productid = computed(() =>
	categoryOption1.value[activityId.value] ? categoryOption1.value[activityId.value].id : ''
)
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
// 漏斗数据
const zLouDouData = ref([])

const yaoqingpaihang = ref([])

onLoad(options => {
	getListData()
})

// 获取活动列表
const getListData = data => {
	_enrollformGetlist(data).then(res => {
		const { code, data, msg } = res
		categoryOption1.value = data.map((item, index) => {
			return {
				value: index,
				text: item.title,
				id: item.id,
				startDt: item.startDt,
				endDt: item.endDt
			}
		})
		// 获取数据统计
		storeproductActivitystatistics()
	})
}

// 获取统计数据
const storeproductActivitystatistics = () => {
	pageLoadStatus.value = 'loading'

	_storeproductActivitystatistics({ productid: productid.value })
		.then(res => {
			const { code, msg, data } = res

			totleData.value = {
				eicount: data[0].activityStatistics[0].eicount,
				spocoalesce: data[0].activityStatistics[0].spocoalesce,
				stcount: data[0].activityStatistics[0].stcount
			}
			// 折线图
			zLineData.value = data[0].activityCount || []
			// 漏斗图
			zLouDouData.value = data[0].activityEnrollInfoNum[0] || {}
			// 邀请排行
			yaoqingpaihang.value = data[0].activityNum || {}

			pageLoadStatus.value = 'noMore'
		})
		.catch(err => {
			zLineData.value.length = 0
			zLouDouData.value.length = 0
			pageLoadStatus.value = 'noMore'
		})
}

// 监听选择活动的变化,重新获取数据
watch(activityId, (newVal, oldVal) => {
	if (newVal >= 0) {
		zLineData.value.length = 0
		zLouDouData.value.length = 0
		storeproductActivitystatistics()
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
 * 漏斗图
 */
import UseFunnelChart from './UseFunnelChart.js'
const {
	chartData: chartData2,
	opts: opts2,
	errorMessage: errorMessage2,
	chartsComplete: chartsComplete2,
	chartsError: chartsError2
} = UseFunnelChart({ zData: zLouDouData })

/**
 * 获取排行榜详情数据
 * */
const popupRef = ref(null)
const popupRefListData = ref([])
const popupStatus = ref(false)
const storeproductActivityPopup = (userId, index) => {
	_storeproductActivityPopup({ productid: productid.value, userId: userId }).then(res => {
		if (index === 0) {
			popupRefListData.value = res.data.activityPopupAllUser
		} else if (index === 1) {
			popupRefListData.value = res.data.activityPopup
		} else if (index === 2) {
			popupRefListData.value = res.data.activityPopupParticipate
		}

		if (popupRefListData.value.length === 0) {
			showToastText('没有数据')
			return
		}
		popupRef.value.open()
	})
}
const popupRefChange = e => {
	popupStatus.value = e.show
}
</script>

<style lang="scss" scoped>
.popup-content {
	background-color: #fff;
	overflow-y: auto;
	width: 710rpx;
	max-height: 1000rpx;
	padding: $padding;
	border-radius: 16rpx;
	padding: 48rpx;
	position: relative;
	.close {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		.img {
			width: 35rpx;
			height: 35rpx;
		}
	}
}
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
