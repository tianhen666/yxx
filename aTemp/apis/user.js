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
	return http.get({
		url: '/user/delete',
		data
	})
}

// 设置员工权限
export function _userPower(data) {
	return http.post({
		url: '/user/power',
		data
	})
}

// 修改员工信息
export function _userUpdate(data) {
	return http.post({
		url: '/user/update',
		data
	})
}

// 添加用户所属门诊
export function _userChangeUserId(data) {
	return http.post({
		url: '/user/changeUserId',
		data
	})
}

// 用户统计列表
export function _userDataStatistics(data) {
	return http.post({
		url: '/user/dataStatistics',
		data
	})
}
