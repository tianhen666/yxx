import {
	ref
} from "vue";
import {
	onLoad
} from '@dcloudio/uni-app'
import {
	navigateBackRefresh,
	showToastText
} from '@/aTemp/utils/uniAppTools'

import {
	_debounce
} from '@/aTemp/utils/tools.js'
/* 
 formObj 表单对象
 _apiSave 保存数据请求函数
 dataObj 数据对象
 */
export default function(formObj, dataObj, _apiSave) {
	const loading = ref(false)

	// 前一个页面索引
	const prevCurrentIndex = ref(0)
	onLoad(optios => {
		prevCurrentIndex.value = parseInt(optios.prevCurrentIndex) || 0
	})

	// 保存函数 防抖
	const saveClick = _debounce(() => {
		formObj.value
			.validate()
			.then(formRes => {
				// 保存商品接口
				_apiSave(dataObj.value).then(res => {
					loading.value = false
					// 返回上一级并且重载noload
					navigateBackRefresh({
						currentIndex: prevCurrentIndex.value
					})
				})
			})
			.catch(err => {
				loading.value = false
				showToastText(err[0].errorMessage)
				console.log('表单错误信息：', err)
			})
	}, 1000, loading)


	return {
		saveClick,
		prevCurrentIndex,
		loading
	}
}
