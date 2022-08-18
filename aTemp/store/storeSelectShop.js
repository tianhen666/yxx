import {
	defineStore
} from 'pinia'

// 图片裁剪
export const _storeSelectShop = defineStore('cropper', {
	state: () => {
		return {
			shopList: []
		}
	}
})
