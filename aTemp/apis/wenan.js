import http from '@/aTemp/request';

/* 
 文案接口
 */

// 复制文案
export function _storeCopyWriterCopyInfo(params) {
	return http.post({
		url: '/store-copy-writer/copyInfo',
		params
	})
}

// 获取文案列表
export function _storeCopyWriterGetinfo(params) {
	return http.post({
		url: '/store-copy-writer/getinfo',
		params
	})
}

// 获取常搜关键词
export function _storeCopyWriterGetHistory(data) {
	return http.post({
		url: '/store-copy-writer/getHistory',
		data
	})
}

// 修改添加文案
export function _storeCopyWriterSava(data) {
	return http.post({
		url: '/store-copy-writer/sava',
		data
	})
}

// 获取文案分类
export function _storeCopyWriterGetClassify(data) {
	return http.post({
		url: '/store-copy-writer/getClassify',
		data
	})
}

// 获取文案详情
export function _storeCopyWriterGetStoreCopyWriter(params) {
	return http.post({
		url: '/store-copy-writer/getStoreCopyWriter',
		params
	})
}

// 获取文案详情
export function _storeCopyWriterDel(params) {
	return http.post({
		url: '/store-copy-writer/del',
		params
	})
}
