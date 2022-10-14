import http from '@/aTemp/request';

/* 
 * 案例接口
 */

// 删除指定案例
export function _storecaseDelete(data) {
	return http.post({
		url: '/storecase/delete',
		data
	})
}

// 获取案例详情
export function _storecaseGetinfo(data) {
	return http.get({
		url: '/storecase/getinfo',
		data
	})
}

// 获取案例列表
export function _storecaseGetlist(data) {
	return http.get({
		url: '/storecase/getlist',
		data
	})
}

// 添加/编辑案例
export function _storecaseSave(data) {
	return http.post({
		url: '/storecase/save',
		data
	})
}


/* 
 * 案例分类接口
 */

// 案例分类删除
export function _storecaseFdelete(data) {
	return http.post({
		url: '/storecase/fdelete',
		data
	})
}

// 获取案例分类列表
export function _storecaseGetcategory(data) {
	return http.get({
		url: '/storecase/getcategory',
		data
	})
}

// 获取案例分类列表
export function _storecaseFlist(data) {
	return http.get({
		url: '/storecase/flist',
		data
	})
}

// 案例分类新增/修改
export function _storecaseFsave(data) {
	return http.post({
		url: '/storecase/fsave',
		data
	})
}
