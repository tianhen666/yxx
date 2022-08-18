import {
	defineStore
} from 'pinia'

// 图片裁剪
export const _storeCropper = defineStore('cropper', {
	state: () => {
		return {
			imgUrls: []
		}
	}
})
