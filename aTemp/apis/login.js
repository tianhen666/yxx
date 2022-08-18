import http from '@/aTemp/request';

/* 
	登录相关接口
 */
// 微信登录接口，获取openID
export function _wxLogin(data) {
	return http.get({
		url: '/wx/login',
		data
	})
}
