import http from '@/aTemp/request';

/* 
 订单接口
 */

// 获取全部订单

export function _orderAllorder(data) {
	return http.get({
		url: '/order/allorder',
		data
	})
}

// 获取完成订单
export function _orderComplete(data) {
	return http.get({
		url: '/order/complete',
		data
	})
}

// 订单核销
export function _orderGetcode(data) {
	return http.get({
		url: '/order/getcode',
		data
	})
}

// 获取订单详情
export function _orderGetinfo(data) {
	return http.get({
		url: '/order/getinfo',
		data
	})
}

// 订单未使用
export function _orderNotused(data) {
	return http.get({
		url: '/order/notused',
		data
	})
}

// 订单待付款
export function _orderUnpaid(data) {
	return http.get({
		url: '/order/unpaid',
		data
	})
}