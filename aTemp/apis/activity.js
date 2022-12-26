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
export function _enrollformEnable(data) {
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

// 活动支付
export function _enrollformEnpayment(data) {
	return http.post({
		url: '/enrollform/enpayment',
		data
	})
}

// 活动支付回调
export function _enrollformWxNotifys(params) {
	return http.post({
		url: '/enrollform/enrollformWxNotifys',
		params,
	})
}

// 获取个人邀请统计
export function _storeproductActivityPopup(params) {
	return http.post({
		url: '/storeproduct/activityPopup',
		params,
	})
}


// 活动数据导出
export function _enrollformExport(params) {
	return http.get({
		url: '/enrollform/export',
		params,
	})
}

// 获取活动模板详情
export function _enrollFormTemplateGetinfo(params) {
	return http.get({
		url: '/enrollFormTemplate/getinfo',
		params,
	})
}

// 获取活动模板列表
export function _enrollFormTemplateGetlist(params) {
	return http.get({
		url: '/enrollFormTemplate/getlist',
		params,
	})
}

// 添加、修改活动模板
export function _enrollFormTemplateSave(data, params) {
	return http.post({
		url: '/enrollFormTemplate/save',
		data,
		params,
	})
}
// 删除活动模板
export function _enrollFormTemplateDeleteEnrollFormTemplate(params) {
	return http.get({
		url: 'enrollFormTemplate/deleteEnrollFormTemplate',
		params,
	})
}

// 使用活动模板
export function _enrollFormTemplateSaveEnrollForm(data,params) {
	return http.post({
		url: '/enrollFormTemplate/saveEnrollForm',
		data,
		params,
	})
}


// 获取模板分类
export function _enrollFormTemplateGetTemplateTypeList(params) {
	return http.get({
		url: '/enrollFormTemplate/getTemplateTypeList',
		params,
	})
}
