import http from '@/aTemp/request';

/* 
 * 店铺相关接口
 */

// 更新店铺信息
export function _storeSave(data) {
	return http.post({
		url: '/store/save',
		data
	})
}

// 新建入驻店铺信息
export function _storeSaveStore(data) {
	return http.post({
		url: '/store/saveStore',
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

// 获取连锁门诊
export function _storeGetinfolist(data) {
	return http.get({
		url: '/store/getinfolist',
		data
	})
}


// 获取进入的门诊
export function _storeLogGetinfo(data) {
	return http.get({
		url: '/storeLog/getinfo',
		data
	})
}

// 商品支付
export function _wxpayPayment(data) {
	return http.post({
		url: '/wxpay/payment',
		data
	})
}

// 商品支付成功回调，并且分账
export function _wxpayWxNotifys(params) {
	return http.post({
		url: '/wxpay/wxNotifys',
		params
	})
}

// 店铺会员列表
export function _storeVipOrderOrderlist(data) {
	return http.post({
		url: '/store-vip-order/orderlist',
		data
	})
}

// 店铺会员付款
export function _storeVipOrderPayment(data) {
	return http.post({
		url: '/store-vip-order/payment',
		data
	})
}

// 店铺会员，支付成功回调，并且分账
export function _storeVipOrderWxNotifys(data) {
	return http.post({
		url: '/store-vip-order/wxNotifys',
		data
	})
}


// 店铺收益数据统计
export function _storeproductStatistics(params) {
	return http.post({
		url: '/storeproduct/statistics',
		params
	})
}

// 活动收益数据统计
export function _storeproductActivitystatistics(params) {
	return http.post({
		url: '/storeproduct/activitystatistics',
		params
	})
}

// 活动收益详情
export function _storeproductParticulars(params) {
	return http.post({
		url: '/storeproduct/particulars',
		params
	})
}


//  门诊收益详情查询
export function _enrollformEarningsport(params) {
	return http.get({
		url: '/enrollform/earningsport',
		params
	})
}

//  门诊收益导出
export function _enrollformEarningsportexport(params) {
	return http.get({
		url: '/enrollform/earningsportexport',
		params
	})
}

// 会员数据导出
export function _userInviteUserEx(params) {
	return http.get({
		url: '/userInvite/userEx',
		params
	})
}
