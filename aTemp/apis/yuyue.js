import http from '@/aTemp/request';

/* 
 预约表单提交
 */

// 表单提交保存
export function _outpatientAppointmentMenuSave(data) {
	return http.post({
		url: '/outpatient-appointment/menuSave',
		data
	})
}


// 预约列表
export function _outpatientAppointmentMenuList(params) {
	return http.get({
		url: '/outpatient-appointment/menuList',
		params
	})
}

//标识已处理
export function _outpatientAppointmentDispose(params) {
	return http.post({
		url: '/outpatient-appointment/dispose',
		params
	})
}
