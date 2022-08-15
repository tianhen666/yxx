import {
	defineStore
} from 'pinia';


export const useMainStore = defineStore('main', {
	state: () => {
		return {}
	}
});



// 图片裁剪
export const useCropperStore = defineStore('cropper', {
	state: () => {
		return {
			imgUrls: [],
			cc: 1
		}
	}
});
