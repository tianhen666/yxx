import http from '@/aTemp/request';

/* 
 订单接口
 */

// 获取个人订单
export function _orderAllorder(data) {
	return http.get({
		url: '/order/allorder',
		data
	})
}

//  重新支付
export function _orderPayment(data) {
	return http.post({
		url: '/order/payment',
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

// 订单核销
export function _orderVerificationSheet(params) {
	return http.get({
		url: '/order/verificationSheet',
		params
	})
}

// 获取门诊端订单
  
export function _orderAllOrderStore(params) {
	return http.get({
		url: '/order/allOrderStore',
		params
	})
}
