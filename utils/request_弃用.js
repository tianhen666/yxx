import * as _ from 'lodash-es'

class Request {
	constructor() {
		this.config = {
			baseUrl: '', // 请求的根域名
			header: {}, // 默认的请求头
			method: 'POST', // 请求方式
			timeout: 60000, // 超时时间
			dataType: 'json', // 设置为json，返回后uni.request会对数据进行一次JSON.parse
			responseType: 'text', // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
		}

		/**
		 * 请求拦截, 响应拦截
		 */
		this.interceptor = {
			// 请求拦截
			request(config) {
				return config || {}
			},
			// 响应拦截
			response(response) {
				return response.data || {}
			}
		}
	}

	/**
	 * setConfig接收一个自定义的配置对象，将类中的config对象和它进行深度合并。
	 * @param {Object} customConfig  深度合并对象，否则会造成对象深层属性丢失
	 */
	setConfig(customConfig) {
		this.config = _.merge({}, this.config, customConfig);
	}

	/**
	 * 主要请求部分,使用uni.request进行请求，并实现请求和响应的拦截
	 */
	request(options = {}) {
		// 属性赋值
		options.dataType = options.dataType || this.config.dataType;
		options.responseType = options.responseType || this.config.responseType;
		options.url = this.config.baseUrl + options.url || '';
		options.timeout = options.timeout || this.config.timeout
		options.data = options.data || {};
		options.header = _.assign({}, this.config.header, options.header);
		options.method = options.method || this.config.method;

		return new Promise((resolve, reject) => {
			// 请求拦截
			let resOptions = this.interceptor.request(options)
			if (typeof resOptions !== "object" || !resOptions) {
				return //reject(options)
			}
			uni.request(options).then(val => {
				// 响应拦截
				let res = this.interceptor.response(val)
				if (typeof res !== "object" || !res) {
					return //reject(val.data)
				}
				resolve(val)
			}).catch(err => {
				// 请求失败
				let res = this.interceptor.response(err)
				if (typeof res !== "object" || !res) {
					return //reject(err)
				}
			})
		})
	}
}
export default new Request()
