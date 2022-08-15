import http from '@/api/index.js';

/* 
	登录相关接口
 */
// 微信登录接口，获取openID
export function _wxLogin(data) {
	return http.get({
		url: '/wx/login',
		data
	})
}

/* 
 *banner接口
 */
// 保存banner
export function _bannerSave(data) {
	return http.post({
		url: '/banner/save',
		data
	})
}
// 查询指定门诊banner
export function _bannerList(data) {
	return http.get({
		url: '/banner/list',
		data
	})
}
// 删除指定的门诊banner图
export function _bannerDelete(data) {
	return http.post({
		url: '/banner/delete',
		data
	})
}
// 禁用
export function _bannerDisable(data) {
	return http.post({
		url: '/banner/disable',
		data
	})
}
// 启用
export function _bannerEnable(data) {
	return http.post({
		url: '/banner/enable',
		data
	})
}


/* 
 商品接口
 */
// 获取商品详情
export function _storeproductGetinfo(data) {
	return http.get({
		url: '/storeproduct/getinfo',
		data
	})
}
// 获取商品列表
export function _storeproductGetlist(data) {
	return http.get({
		url: '/storeproduct/getlist',
		data
	})
}
// 获取商品评论
export function _storeproductGetreview(data) {
	return http.get({
		url: '/storeproduct/getreview',
		data
	})
}

// 编辑商品
export function _storeproductSave(data) {
	return http.post({
		url: '/storeproduct/save',
		data
	})
}
// 上架
export function _storeproductEnable(data) {
	return http.post({
		url: '/storeproduct/enable',
		data
	})
}
// 下架
export function _storeproductDisable(data) {
	return http.post({
		url: '/storeproduct/disable',
		data
	})
}
// 删除
export function _storeproductDelete(data) {
	return http.post({
		url: '/storeproduct/delete',
		data
	})
}