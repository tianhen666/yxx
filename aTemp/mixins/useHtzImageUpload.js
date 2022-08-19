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

// 获取请求地址
import config from '@/global-config.js'



// 不需要裁剪直接上传

const picList2 = computed({
	get: () => (formData.value.postPic ? formData.value.postPic.split(',') : []),
	set: val => {
		formData.value.postPic = val.join(',')
	}
})


export default function(paramsObj) {
	const {
		ratio,
		url,
		refData,
		param,
		selectNum
	} = paramsObj


	/* 
		逗号分割的字符串转图片列表
	 */
	const picList = computed({
		get: () => (refData.value[param] ? refData.value[param].split(',') : []),
		set: val => {
			refData.value[param] = val.join(',')
		}
	})


	/*
	 * 选择图片,不自动上传,需要裁剪图片
	 */
	if (ratio && url) {
		const chooseSuccess = res => {
			// 判断是否为视频
			if (isVideo(res[0])) {
				refData.value[param].push(res[0])
				return
			}
			// 去裁剪图片页面
			// res需要裁剪图片地址列表
			// ratio 比例
			// url 服务器上传地址
			uni.navigateTo({
				url: `/pages/sub2/cropper/cropper?imgUrls=${res}&ratio=${ratio}&url=${url}&param=${param}`
			})
		}

		// 裁剪完成的图片列表
		const storeCropper = _storeCropper()
		// 监听裁剪后storeCropper的变化
		watch(
			() => storeCropper[param],
			(newValue, oldValue) => {

				if (refData.value[param]) {
					refData.value[param] += ',' + newValue.join(',')
				} else {
					refData.value[param] = newValue.join(',')
				}
			}
		)

		return {
			chooseSuccess, //图片选择函数
			picList, //图片选择的的列表
			selectNum, // 选择图片的数量
		}

	}


	/*
	 * 自动上传图片
	 */
	const uploadimageURL = config.BASE_URL + url

	const uploadSuccess = res => {
		console.log(res)
		if (refData.value[param]) {
			refData.value[param] += ',' + JSON.parse(res.data).data
		} else {
			refData.value[param] = JSON.parse(res.data).data
		}
	}

	return {
		picList, //图片选择的的列表
		selectNum, // 选择图片的数量
		uploadSuccess, //图片自动上传成功的函数
		uploadimageURL //上传图片的地址
	}
}
