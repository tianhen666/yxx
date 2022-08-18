import http from '@/aTemp/request';

/* 
 商品接口
 */

// 获取单个活动
export function _enrollformGetinfo(data) {
	return http.get({
		url: '/enrollform/getinfo',
		data
	})
}

// 获取活动列表
export function _enrollformGetlist(data) {
	return http.get({
		url: '/enrollform/getlist',
		data
	})
}

// 删除活动
export function _enrollformDelete(data) {
	return http.post({
		url: '/enrollform/delete',
		data
	})
}

// 下架活动
export function _enrollformDisable(data) {
	return http.post({
		url: '/enrollform/disable',
		data
	})
}

// 上架活动
export function _enrollformEnablee(data) {
	return http.post({
		url: '/enrollform/enable',
		data
	})
}

// 保存活动信息
export function _enrollformSave(data) {
	return http.post({
		url: '/enrollform/save',
		data
	})
}