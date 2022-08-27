import {
	onLoad
} from '@dcloudio/uni-app'
import {
	ref
} from 'vue'

export default function(paramsObj) {
	//拉取图表数据
	const getServerData = () => {
		//模拟从服务器获取数据时的延时
		setTimeout(() => {
			//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
			let res = {
				categories: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
				series: [{
						name: "目标值",
						data: [35, 36, 31, 33, 13, 34, 22]
					},
					{
						name: "完成量",
						data: [18, 27, 21, 24, 6, 28, 50]
					}
				]
			}
			chartData.value = JSON.parse(JSON.stringify(res))
		}, 1000)
	}

	onLoad(options => {
		getServerData()
	})

	// 图表数据
	const chartData = ref({})


	// 图表配置
	const opts = {
		padding: [15, 0, 0, 0],
		legend: {},
		xAxis: {
			calibration: true
		},
		yAxis: {
			gridType: 'dash',
			dashLength: 3
		},
		extra: {
			column: {
				type: "group",
				width: 10,
				barBorderRadius: [16, 16, 0, 0]
			}
		}
	}
	return {
		chartData,
		opts
	}
}
