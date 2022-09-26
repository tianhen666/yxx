import http from '@/aTemp/request';

/* 
 订单接口
 */

// 获取订单
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