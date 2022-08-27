import {
	onLoad
} from '@dcloudio/uni-app'
import {
	ref
} from 'vue'
import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/config-ucharts.js'
import dayjs from 'dayjs'

export default function(paramsObj) {
	let {
		errorMessage
	} = paramsObj


	//拉取图表数据
	const getServerData = () => {
		setTimeout(() => {
			let res = {
				categories: ['2022-08-01', '2022-08-02', '2022-08-02', '2022-08-03', '2022-08-04',
					'2022-08-05', '2022-08-06'
				],
				series: [{
					name: '金额',
					data: [35.22, 8.32, 25.56, 37.56, 4.56, 20.26, 31.11],
					format: "seriesMy"
				}]
			}
			chartData.value = JSON.parse(JSON.stringify(res))
		}, 3000)
	}

	// 数据开始加载
	onLoad(options => {
		getServerData()
	})

	// 图表数据
	const chartData = ref({})


	// 图表配置
	const opts = {
		padding: [10, 0, 0, 0],
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

	// 数据加载失败提示
	errorMessage = ref(errorMessage || '数据加载失败')

	// 图表加载完成后触发
	const chartsComplete = res => {
		const {
			id
		} = res
		//这里指定了changedTouches的x和y坐标，当指定index索引时，x值会被自动修正到正确位置，给0即可，主要是y的坐标值
		uCharts.instance[id].showToolTip({
			changedTouches: [{
				x: 150,
				y: 80
			}]
		}, {
			index: 2,
			formatter: (item, category, index, opts) => {
				return dayjs(category).format('YYYY年M月D日') + " 收款" + item.data
			}
		})
	}

	return {
		chartData,
		opts,
		errorMessage,
		chartsComplete
	}
}
