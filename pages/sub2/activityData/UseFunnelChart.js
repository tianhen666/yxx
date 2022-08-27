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

	//拉取图表数据
	const getServerData = () => {
		//模拟从服务器获取数据时的延时
		setTimeout(() => {
			//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
			let res = {
				series: [{
					data: [{
						"name": "浏览人数",
						"value": 100,
						legendShape: 'triangle'
					}, {
						"name": "授权人数",
						"value": 70,
						legendShape: 'circle'
					}, {
						"name": "参与人数",
						"value": 30,
						legendShape: 'diamond'
					}]
				}]
			};
			chartData.value = JSON.parse(JSON.stringify(res));
		}, 500);
	}

	onLoad(options => {
		getServerData()
	})

	// 图表数据
	const chartData = ref({})


	// 图表配置
	const opts = {
		padding:[0,0,0,0],
		legend: {
			// show: false,
		},
		extra: {
			funnel: {}
		}
	}

	return {
		chartData,
		opts,
		errorMessage,
		chartsComplete
	}
}
