import http from '@/aTemp/request';

// 获取文章列表
export function _freePublishGetFreePublish(params) {
	return http.post({
		url: '/freePublish/getFreePublish',
		params
	})
}
// 获取文章详情
export function _freePublishGetInfo(params) {
	return http.post({
		url: '/freePublish/getInfo',
		params
	})
}

// 获取门诊名下ID
export function _freePublishGetStoreFree(params) {
	return http.post({
		url: '/freePublish/getStoreFree',
		params
	})
}

// 添加文章
export function _freePublishSavaFree(data) {
	return http.post({
		url: '/freePublish/savaFree',
		data
	})
}

// 删除文章
export function _freePublishDelFree(params) {
	return http.post({
		url: '/freePublish/delFree',
		params
	})
}