import {
	defineStore
} from 'pinia'

// 主要全局变量
export const _useUserMain = defineStore('main', {
	state: () => {
		return {
			storeId: '', //店铺ID
			openId: '', //openId
			unionId: '', //unionId
			token: '', //token秘钥
			mobile: '', // 手机号
			userid: '', // 用户ID
			power: -1, //权限 -1普通用户，0普通员工，1创建者，2管理员，3商品管理，4商品管理，5订单核销
			avatar: '', //用户头像
			nickname: '', //用户昵称
			headPortrait: 1, //是否有收集头像弹窗 0收集，1不收集
			overdue: 0, // 1过期 0正常
		}
	},
	getters: {
		// 是否进行了手机号授权
		isLogin: (state) => state.mobile ? true : false,
	},
})