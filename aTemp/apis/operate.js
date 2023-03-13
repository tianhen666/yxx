import http from '@/aTemp/request';

// 浏览记录
export function _browseInfo(params) {
	return http.post({
		url: '/user-behavior/browseInfo',
		params
	})
}


// 分享记录
export function _shareInfo(params) {
	return http.post({
		url: '/user-behavior/shareInfo',
		params
	})
}
