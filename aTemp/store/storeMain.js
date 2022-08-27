import {
	defineStore
} from 'pinia'

// 主要全局变量
export const _useMainStore = defineStore('main', {
	state: () => {
		return {
			storeId: 1, //店铺ID
			openId: '', //openId
			unionId: '', //unionId
			token: '' //token秘钥
		}
	},
	getters: {
		isLogin: (state) => state.token ? true : false,
	},
})
