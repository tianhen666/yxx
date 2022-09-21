import {
	defineStore
} from 'pinia'

// 主要全局变量
export const _useMainStore = defineStore('main', {
	state: () => {
		return {
			storeId: '', //店铺ID
			openId: '', //openId
			unionId: '', //unionId
			token: '', //token秘钥
			mobile: '' ,// 手机号
			userid:'' // 用户ID
		}
	},
	getters: {
		// 是否进行了手机号授权
		isLogin: (state) => state.mobile ? true : false,
	},
})
