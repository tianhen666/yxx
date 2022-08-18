import {
	computed,
	watch,
	ref
} from 'vue'
import {
	_storeCropper
} from '@/aTemp/store/storeCropper.js'

import {
	isVideo
} from '@/aTemp/utils/tools'

// 裁剪完成的图片列表
const storeCropper = _storeCropper()

export default function(ratio = (1 / 1), url = "", refData = ref({}), params = '', _selectNum = 1) {
	// 选择数量
	const selectNum = _selectNum

	// 图片地址字符串转列表
	const pics = computed({
		get: () => (refData.value[params] ? refData.value[params].split(',') : []),
		set: val => {
			refData.value[params] = val.join(',')
		}
	})

	const chooseSuccess = res => {
		// 判断是否为视频
		if (isVideo(res[0])) {
			refData.value[params].push(res[0])
			return
		}
		// 去裁剪图片页面
		// res需要裁剪图片地址列表
		// ratio 比例
		// url 服务器上传地址
		uni.navigateTo({
			url: `/pages/sub2/cropper/cropper?imgUrls=${res}&ratio=${ratio}&url=${url}`
		})
	}

	// 监听裁剪后storeCropper的变化
	watch(
		() => storeCropper.imgUrls,
		(newValue, oldValue) => {
			
			// 如果只选择一个直接替换
			if (selectNum === 1) {
				refData.value[params] = newValue[0]
				return
			}
			
			// 如果选选择多个拼接字符串
			if (refData.value[params]) {
				refData.value[params] += ',' + newValue.join(',')
			} else {
				refData.value[params] = newValue.join(',')
			}

		}
	)

	return {
		chooseSuccess,
		pics,
		selectNum
	}
}
