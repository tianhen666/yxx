import {
	ref,
	watch
} from 'vue'
import uCharts from '@/pages/sub2/components/qiun-data-charts/js_sdk/u-charts/config-ucharts.js'
import dayjs from 'dayjs'

export default function(paramsObj) {
	let {
		zData
	} = paramsObj

	// 加载失败时设置值
	const errorMessage = ref('')

	// 折线图数据格式
	const chartData = ref({
		categories: [],
		series: []
	})


	watch(zData, (newVal, oldVal) => {
		// console.log(newVal)
		// console.log(oldVal)
		chartData.value = {
			categories: [],
			series: []
		}
		errorMessage.value = ""

		setTimeout(() => {
			if (newVal.length > 0) {
				const dataObj = {
					categories: [],
					series: [{
						name: '收益',
						data: []
					}]
				}
				newVal.forEach(item => {
					dataObj.categories.unshift(item.custom)
					dataObj.series[0].data.unshift(item.price)
				})
				chartData.value = dataObj

			} else {
				errorMessage.value = "加载失败"
			}
		}, 500)
	})

	// 图表配置
	const opts = {
		padding: [20, 0, 0, 0],
		enableScroll: true,
		dataPointShapeType: "hollow",
		xAxis: {
			calibration: true,
			itemCount: 5,
			scrollShow: true,
			format: 'xAxisTimeCN'
		},
		yAxis: {
			data: [{
				calibration: true,
				min: 0,
				tofix: 2,
				unit: "元",
			}]
		},
		legend: {
			show: false,
		},
		extra: {
			area: {
				type: 'curve',
			}
		}
	}

	// 图表加载完成后触发
	const chartsComplete = res => {
		const {
			id
		} = res
		//这里指定了changedTouches的x和y坐标，当指定index索引时，x值会被自动修正到正确位置，给0即可，主要是y的坐标值
		uCharts.instance[id].showToolTip({
			changedTouches: [{
				x: 0,
				y: 120
			}]
		}, {
			index: 0,
			formatter: (item, category, index, opts) => {
				return dayjs(category).format('YYYY年M月D日') + " 收款" + item.data
			}
		})
	}


	//  图表加载失败后触发
	const chartsError = (e) => {
		console.log(e)
	}
	return {
		chartData,
		opts,
		errorMessage,
		chartsComplete,
		chartsError
	}
}
