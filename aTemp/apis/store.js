import http from '@/aTemp/request';

/* 
 * 店铺相关接口
 */

// 保存店铺信息
export function _storeSave(data) {
	return http.post({
		url: '/store/save',
		data
	})
}

// 删除门诊信息
export function _storeDelete(data) {
	return http.post({
		url: '/store/delete',
		data
	})
}

// 获取门诊信息详情
export function _storeGetinfo(data) {
	return http.get({
		url: '/store/getinfo',
		data
	})
}

// 获取门诊列表
export function _storeGetone(data) {
	return http.get({
		url: '/store/getone',
		data
	})
}


// 统一支付
export function _wxpayPayment(data) {
	return http.post({
		url: '/wxpay/payment',
		data
	})
}

// 分账回调
export function _wxpayWxNotify(data) {
	return http.get({
		url: '/wxpay/wxNotify',
		data
	})
}
