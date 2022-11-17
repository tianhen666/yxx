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

	// 漏斗图数据格式
	const chartData = ref({
		series: []
	})
	// series: [{
	// 	data: [{
	// 		"name": "浏览人数",
	// 		"value": 100,
	// 		legendShape: 'triangle'
	// 	}, {
	// 		"name": "授权人数",
	// 		"value": 70,
	// 		legendShape: 'circle'
	// 	}, {
	// 		"name": "参与人数",
	// 		"value": 30,
	// 		legendShape: 'diamond'
	// 	}]
	// }]

	watch(zData, (newVal, oldVal) => {
		// console.log(newVal)
		// console.log(oldVal)
		chartData.value = {
			series: []
		}
		errorMessage.value = ""
		
		// console.log(newVal.countNum)
		// console.log(newVal.countNumempower)
		// console.log(newVal.participate)
		setTimeout(() => {
			if (newVal.countNum > 0) {
				const dataObj = {
					series: [{
						data: [{
							name: "曝光人数",
							value: newVal.countNum,
							legendShape: 'triangle'
						}, {
							name: "登录人数",
							value: newVal.countNumempower,
							legendShape: 'circle'
						}, {
							name: "参与人数",
							value: newVal.participate,
							legendShape: 'diamond'
						}]
					}]
				}

				chartData.value = dataObj

			} else {
				errorMessage.value = "暂无数据"
			}
		}, 500)

	})

	// 图表加载完成后触发
	const chartsComplete = res => {
		const {
			id
		} = res
		//这里指定了changedTouches的x和y坐标，当指定index索引时，x值会被自动修正到正确位置，给0即可，主要是y的坐标值
		uCharts.instance[id].showToolTip({
			changedTouches: [{
				x: 110,
				y: 40
			}]
		}, {
			index: 2,
			formatter: (item, category, index, opts) => {
				return item.name + " " + item.data
			}
		})
	}

	// 图表配置
	const opts = {
		padding: [0, 0, 0, 0],
		legend: {
			// show: false,
		},
		extra: {
			funnel: {
				type: "triangle"
			}
		}
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
