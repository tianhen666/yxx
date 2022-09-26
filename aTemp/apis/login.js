import http from '@/aTemp/request';

/* 
	登录相关接口
 */
// 微信登录接口，获取openID
export function _wxLogin(data) {
	return http.post({
		url: '/wx/login',
		data
	})
}

// 获取手机号
export function _wxMobile(data) {
	return http.post({
		url: '/wx/mobile',
		data
	})
}