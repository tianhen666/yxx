import http from '@/aTemp/request';

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
// 获取指定的门诊banner图详情
export function _bannerInfo(data) {
	return http.get({
		url: '/banner/info',
		data
	})
}
// 获取门诊列表
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