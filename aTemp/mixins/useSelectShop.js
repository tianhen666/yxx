import {
	ref,
	computed
} from "vue";



export default function(formData, _selectShopQuantity = 1) {
	const selectShopQuantity = ref(parseInt(_selectShopQuantity) || 1)
	// 选中的列表数据
	const selectShopListData = ref([])
	// watch(, (now, prev) => {
	// 	const shopUrlObj = queryURLparamsRegEs5(now.banurl)
	// 	setTimeout(() => {
	// 		console.log(shopUrlObj.id)
	// 		selectShopListData.value.push({
	// 			id: 1,
	// 			title: '1测试标题测试标题测试标题测试标题测试标题测试标题',
	// 			desc: '商品描述测试标题测试标题测试标题测试标题测试标题测试标题测试标题',
	// 			time: '2022.08.18-2022.08.28',
	// 			img: '/static/default/banner.png',
	// 			price: 5980,
	// 			originalPrice: 2980,
	// 			jion: 99,
	// 			type: '拼团'
	// 		})
	// 	}, 5000)
	// })

	// // 选中的列表ID
	// const selectShoplist = computed(() => {
	// 	const list = selectShopListData.value.map(item => item.id + '')
	// 	return list
	// })

	// // 删除事件
	// const delSelectShopList = index => {
	// 	selectShopListData.value.splice(index, 1)
	// }
	// // 页面加载
	// onLoad(option => {
	// 	// 注册商品选择完成事件
	// 	uni.$on('shopSelection', data => {
	// 		const {
	// 			selectListId,
	// 			selectListData
	// 		} = data
	// 		// 选择完毕后，获取已有的列表ID和新选择的列表ID交集
	// 		const newList = selectListId.filter(item => {
	// 			return selectShoplist.value.indexOf(item) > -1
	// 		})
	// 		// 遍历已有数据列表判断是否需要添加新的数据列表
	// 		selectShopListData.value.forEach((item, index) => {
	// 			if (newList.includes(item.id + '')) {
	// 				console.log('tt_', selectListData.hasOwnProperty('id_' + item.id))
	// 				if (selectListData.hasOwnProperty('id_' + item.id)) {
	// 					//pass
	// 				} else {
	// 					selectListData['id_' + item.id] = item
	// 				}
	// 			}
	// 		})
	// 		selectShopListData.value = Object.values(selectListData)

	// 		// 设置表单数据
	// 		formData.value.banurl =
	// 			`/pages-sub1/goodsInfo/goodsInfo?id=${selectShopListData.value[0].id}`
	// 	})
	// })

	return {
		selectShopQuantity,
		selectShopListData
	}
}
