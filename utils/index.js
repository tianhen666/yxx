// 获取当前时间戳
export function currTimestamp() {
	return (new Date()).getTime() + ''
}

// 判断是不是视频
export function isVideo(path) {
	let isPass = false
	if (!/.(gif|jpg|jpeg|png|gif|jpg|png)$/i.test(path)) {
		isPass = true
	}
	return isPass
}

// 解析url  正则方式
export function queryURLparamsRegEs5(url) {
	let obj = {}
	let reg = /([^?=&]+)=([^?=&]+)/g
	url.replace(reg, function() {
		obj[arguments[1]] = arguments[2]
	})
	return obj

}
