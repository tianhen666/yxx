import {
	defineStore
} from 'pinia'

// 主要全局变量
export const _useStoreWenAn = defineStore('wenan', {
	state: () => {
		return {
			isChosePoster: false, // 是否选择海报
			posterID: 0, // 当前选择的海报ID
			posterCover: '' // 当前选择的封面图
		}
	},
})
