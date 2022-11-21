import http from '@/aTemp/request';

/* 
 * 海报管理接口
 */
// 获取全局海报分类
export function _posterGetPostType(data) {
	return http.post({
		url: 'poster/getPostType',
		data
	})
}

// 根据分类获取海报列表6条
export function _posterGetPostTypeId(data) {
	return http.post({
		url: 'poster/getPostTypeId',
		data
	})
}


// 根据海报分类ID获取子分类
export function _posterGetPostTypeChild(data) {
	return http.post({
		url: '/poster/getPostTypeChild',
		data
	})
}

// 根据海报分类ID 获取海报列表
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

// 删除海报
export function _posterDeletePosterImg(params) {
	return http.post({
		url: '/poster/deletePosterImg',
		params
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

// 删除草稿箱
export function _posterDeleteTemplate(params) {
	return http.post({
		url: '/poster/deleteTemplate',
		params
	})
}