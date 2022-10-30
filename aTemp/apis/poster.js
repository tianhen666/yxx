import http from '@/aTemp/request';

/* 
 * 海报管理接口
 */

// 获取所有分类海报接口
export function _posterGetPostAll(data) {
	return http.post({
		url: '/poster/getPostAll',
		data
	})
}

// 根据父ID查询子分类
export function _posterGetIdPostAll(data) {
	return http.post({
		url: '/poster/getIdPostAll',
		data
	})
}

// 根据分类查询海报内容
export function _posterGetIdPost(data) {
	return http.post({
		url: '/poster/getIdPost',
		data
	})
}


// 查询海报内容
export function _posterGetPostercontent(data) {
	return http.post({
		url: '/poster/getPostercontent',
		data
	})
}

// 新增海报
export function _posterSavePostLog(data) {
	return http.post({
		url: '/poster/savePostLog',
		data
	})
}

// 添加到门诊草稿箱
export function _posterRenewalPosterImg(data) {
	return http.post({
		url: '/poster/renewalPosterImg',
		data
	})
}

// 查询草稿箱列表
export function _posterDrafts(data) {
	return http.post({
		url: '/poster/drafts',
		data
	})
}

// 获取门诊草稿箱海报
export function _posterDraftsOne(data) {
	return http.post({
		url: '/poster/draftsOne',
		data
	})
}
