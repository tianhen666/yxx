import http from '@/aTemp/request';

// 获取文章列表
export function _freePublishGetFreePublish(params) {
	return http.post({
		url: '/freePublish/getFreePublish',
		params
	})
}
// 获取文章列表
export function _freePublishGetInfo(params) {
	return http.post({
		url: '/freePublish/getInfo',
		params
	})
}