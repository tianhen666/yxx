// 引入 uni-ajax 模块
import ajax from '@/uni_modules/u-ajax/js_sdk/index'
// 全局基础配置
import config from '@/global-config.js'
import {
	showToastText
} from '@/aTemp/utils/uniAppTools.js';

// 创建请求实例
const instance = ajax.create({
	// 初始配置
	baseURL: config.BASE_URL
})

// 添加请求拦截器
instance.interceptors.request.use(
	// 在发送请求前做些什么
	config => {
		// 当前页面显示导航条加载动画
		uni.showNavigationBarLoading()

		// config.data如果是undefined 赋值为对象
		if (!config.data) {
			config.data = {}
		}

		// 获取第三方平台自定义的数据字段
		// console.log(uni.getExtConfigSync())

		// 获取用户信息
		const mainStore = uni.getStorageSync("mainStore")
		const {
			storeId,
			token
		} = mainStore
		
		// 如果有店铺ID
		if (storeId) {
			config.data.storeId = storeId
		}
		
		
		// 设置token
		if (token) {
			config.header.authorization = token
		}
		return config
	},
	error => {
		// 对请求错误做些什么
		return Promise.reject(error)
	}
)

// 添加响应拦截器
instance.interceptors.response.use(
	// 对响应数据做些什么
	response => {
		// 当前页面隐藏导航条加载动画
		uni.hideNavigationBarLoading()

		const {
			code,
			data,
			msg
		} = response.data
		
		// 判断code是否正确
		if (parseInt(code) === 200) {
			return response.data
		} else {
			return Promise.reject(response.data)
		}
	},
	error => {
		// 当前页面隐藏导航条加载动画
		uni.hideNavigationBarLoading()
		showToastText("请求出错了,请稍后重试~")


		// 对响应错误做些什么
		return Promise.reject(error)
	}
)
// 导出 create 创建后的实例
export default instance
