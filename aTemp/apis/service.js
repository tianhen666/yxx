import http from '@/aTemp/request';

/* 
 * 服务接口
 * 
 */

// 获取单个服务详情
export function _serveGetinfo(data) {
	return http.get({
		url: '/serve/getinfo',
		data
	})
}

// 获取服务列表
export function _serveGetlist(data) {
	return http.get({
		url: '/serve/getlist',
		data
	})
}

// 删除服务
export function _serveDelete(data) {
	return http.post({
		url: '/serve/delete',
		data
	})
}

// 新增修改服务
export function _serveSave(data) {
	return http.post({
		url: '/serve/save',
		data
	})
}
