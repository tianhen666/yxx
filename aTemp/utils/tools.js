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
export function countDown(time1, showTime) {
	const payTimer = setInterval(() => {
		showTime.value = countDownWrapper(time1)
	}, 50)
	const countDownWrapper = () => {
		let duration = dayjs.duration(time1 - dayjs())
		let hours = duration.hours()
		let minutes = duration.minutes() % 60 < 10 ? '0' + (duration.minutes() % 60) : duration.minutes() % 60
		let seconds = duration.seconds() % 60 < 10 ? '0' + (duration.seconds() % 60) : duration.seconds() % 60
		let milliseconds = duration.milliseconds()
		if (hours <= 0 && minutes <= 0 && seconds <= 0) {
			clearInterval(payTimer)
			return false
		} else {
			return `${hours}:${minutes}:${seconds} ${milliseconds} `
		}
	}
}
