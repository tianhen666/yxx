// 引入 uni-ajax 模块
import ajax from '@/uni_modules/u-ajax/js_sdk/index'
// 全局基础配置
import config from '@/global-config.js'

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
		
		// 配置门诊ID请求参数
		const storeId = uni.getStorageSync("storeId")
		if (storeId) {
			config.data.storeId = storeId
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
		if (code === 0) {
			return response.data
		} else {
			return Promise.reject(response.data)
		}
	},
	error => {
		// 对响应错误做些什么
		return Promise.reject(error)
	}
)
// 导出 create 创建后的实例
export default instance
