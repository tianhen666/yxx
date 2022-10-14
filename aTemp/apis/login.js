import http from '@/aTemp/request';

/* 
	登录相关接口
 */
// 微信登录接口，获取openID
export function _wxLogin(data,params) {
	return http.post({
		url: '/wx/login',
		data,
		params
	})
}

// 获取手机号
export function _wxMobile(data) {
	return http.post({
		url: '/wx/mobile',
		data
	})
}

// 获取个人码
export function _wxWxqrCode(params) {
	return http.post({
		url: '/wx/wxqrCode',
		params
	})
}
