import {
	defineStore
} from 'pinia'

// 相关商品选择
export const _storeSelectShop = defineStore('selectShop', {
	state: () => {
		return {
			selectQuantity: 1,
			selectListId: [],
			selectListData: {},
		}
	}
})
