import http from '@/aTemp/request';

/* 
 * 医生信息接口
 */

// 删除医生信息
export function _storedoctorDelete(data) {
	return http.post({
		url: '/storedoctor/delete',
		data
	})
}
// 获取医生信息
export function _storedoctorGetinfo(data) {
	return http.get({
		url: '/storedoctor/getinfo',
		data
	})
}
// 获取医生列表
export function _storedoctorGetlist(data) {
	return http.get({
		url: '/storedoctor/getlist',
		data
	})
}
// 修改保存
export function _storedoctorSave(data) {
	return http.post({
		url: '/storedoctor/save',
		data
	})
}
