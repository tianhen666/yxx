import http from '@/aTemp/request';

/* 
 员工管理接口
 */

// 获取指定门诊下员工
export function _userList(data) {
	return http.get({
		url: '/user/list',
		data
	})
}

// 移除员工
export function _userDelete(data) {
	return http.psot({
		url: '/user/delete',
		data
	})
}

// 设置员工权限
export function _userPower(data) {
	return http.psot({
		url: '/user/power',
		data
	})
}

// 修改员工信息
export function _userUpdate(data) {
	return http.psot({
		url: '/user/update',
		data
	})
}
