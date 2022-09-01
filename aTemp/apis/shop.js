import http from '@/aTemp/request';

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