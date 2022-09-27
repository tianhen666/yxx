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
import {
	showToastText
} from '@/aTemp/utils/uniAppTools.js'

// 获取请求地址
import config from '@/global-config.js'

// 裁剪完成的图片列表
const storeCropper = _storeCropper()


export default function(paramsObj) {
	const {
		ratio,
		url,
		refData,
		param,
		selectNum,
		baseDir
	} = paramsObj




	/* 
		逗号分割的字符串转图片列表
	 */
	const picList = computed({
		get: () => {
			let list = []
			if (refData.value[param]) {
				list = refData.value[param].split(',')
			}
			return list
		},
		set: val => {
			refData.value[param] = val.join(',')
		}
	})


	/*
	 * 选择图片,不自动上传,需要裁剪图片
	 */
	if (ratio && url) {

		// 初始storeCropper
		storeCropper.$patch(state => {
			state.imgUrls[param] = []
		})

		// 监听裁剪的变化
		watch(storeCropper.imgUrls[param], (newVal, oldVal) => {
			if (refData.value[param]) {
				refData.value[param] = refData.value[param] + ',' + newVal.join(',')
			} else {
				refData.value[param] = newVal.join(',')
			}
		})


		// 选择图片完成
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
			// param上传字段
			uni.navigateTo({
				url: `/pages/sub2/cropper/cropper?imgUrls=${res}&ratio=${ratio}&url=${url}&param=${param}&baseDir=${baseDir}`
			})
		}

		return {
			chooseSuccess, //图片选择函数
			picList, //图片选择的的列表
			selectNum, // 选择图片的数量
		}

	}


	/*
	 * 自动上传图片,不需要裁剪
	 */
	const uploadimageURL = config.BASE_URL + url
	// 自动上传成功回调
	const uploadSuccess = res => {
		const {
			code,
			data,
			msg
		} = JSON.parse(res.data)

		if (code !== 0) {
			showToastText("上传失败~")
			return
		}

		if (refData.value[param]) {
			refData.value[param] = refData.value[param] + ',' + data
		} else {
			refData.value[param] = data
		}
	}

	return {
		picList, //图片选择的的列表
		selectNum, // 选择图片的数量
		uploadSuccess, //图片自动上传成功的函数
		uploadimageURL, //上传图片的地址
		baseDir // 文件前缀
	}
}
