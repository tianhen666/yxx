import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

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

// 防抖，在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
export function _debounce(fun, delay, loading = {}) {
	return function(args) {
		if (!loading.value) {
			loading.value = true
		}
		let that = this
		let _args = args
		clearTimeout(fun.id)
		fun.id = setTimeout(function() {
			fun.call(that, _args)
		}, delay)
	}
}

// 节流，规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效
export function _throttle(fun, delay) {
	let last, deferTimer
	return function(args) {
		let that = this
		let _args = arguments
		let now = +new Date()
		if (last && now < last + delay) {
			clearTimeout(deferTimer)
			deferTimer = setTimeout(function() {
				last = now
				fun.apply(that, _args)
			}, delay)
		} else {
			last = now
			fun.apply(that, _args)
		}
	}
}

// 倒计时
export function _countDown(time, payTimer) {

	let duration = dayjs.duration(dayjs(time) - dayjs())
	let days = duration.days() < 10 ? '0' + duration.days() : duration.days()
	let hours = duration.hours() < 10 ? '0' + duration.hours() : duration.hours()
	let minutes = duration.minutes() < 10 ? '0' + duration.minutes() : duration.minutes()
	let seconds = duration.seconds() < 10 ? '0' + duration.seconds() : duration.seconds()
	let milliseconds = duration.milliseconds() < 10 ? '00' + duration.milliseconds() : duration
		.milliseconds() < 100 ? '0' + duration.milliseconds() : duration.milliseconds()
		
	if (parseInt(days) <= 0 && parseInt(hours) <= 0 && parseInt(minutes) <= 0 && parseInt(seconds) <= 0) {
		// console.log("定时器移除")
		clearInterval(payTimer)
		return `${days}天${hours}时${minutes}分${seconds}秒 000`
	} else {
		return `${days}天${hours}时${minutes}分${seconds}秒 ${milliseconds}`
	}
}

// 根据毫秒获取分钟倒计时
export function _getMinutes(time, addMinute) {
	let duration = dayjs.duration(dayjs(time).add(addMinute, 'minute') - dayjs())
	return parseInt(duration.asMinutes())
}
