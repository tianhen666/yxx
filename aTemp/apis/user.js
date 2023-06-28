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

// 邀请员工加入
export function _userChangeUserStoreId(data) {
	return http.post({
		url: '/user/changeUserStoreId',
		data
	})
}

// 修改员工信息,用户信息
export function _userUpdate(data) {
	return http.post({
		url: '/user/update',
		data
	})
}

// 修改用户所属门诊
export function _userChangeUserId(data, params) {
	return http.post({
		url: '/user/changeUserId',
		data,
		params
	})
}

// 用户统计列表
export function _userDataStatistics(params) {
	return http.post({
		url: '/user/dataStatistics',
		params
	})
}

// 个人邀请数据统计
export function _userPersonagedata(params) {
	return http.post({
		url: '/user/personagedata',
		params
	})
}

// 个人邀请记录列表
export function _userInviteGetinfo(params) {
	return http.get({
		url: '/userInvite/getinfo',
		params
	})
}

// 个人邀请记录数据统计
export function _userInviteGetlist(params) {
	return http.get({
		url: '/userInvite/getlist',
		params
	})
}

// 个人推广收益统计
export function _userEarningData(params) {
	return http.post({
		url: '/user/earningData',
		params
	})
}

// 获取我邀请的人,购买的订单
export function _userMySell(params) {
	return http.get({
		url: '/user/mySell',
		params
	})
}