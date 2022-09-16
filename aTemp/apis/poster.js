import http from '@/aTemp/request';

/* 
 * 海报管理接口
 */

// 根据父ID查询子分类
export function _posterGetPostAll(data) {
	return http.post({
		url: '/poster/getPostAll',
		data
	})
}

// 获取海报接口
export function _posterGetIdPostAll(data) {
	return http.post({
		url: '/poster/getIdPostAll',
		data
	})
}


// 删除用户自己的海报
export function _posterDelete(data) {
	return http.get({
		url: '/poster/delete',
		data
	})
}

// 获取营销海报详情
export function _posterInfo(data) {
	return http.get({
		url: '/poster/info',
		data
	})
}

// 获取营销海报仓库
export function _posterList(data) {
	return http.get({
		url: '/poster/list',
		data
	})
}

// 获取用户自己保存的海报
export function _posterPosterlist(data) {
	return http.get({
		url: '/poster/posterlist',
		data
	})
}

// 保存海报
export function _posterSave(data) {
	return http.get({
		url: '/poster/save',
		data
	})
}

// 修改自己保存海报
export function _posterUpdate(data) {
	return http.get({
		url: '/poster/update',
		data
	})
}
