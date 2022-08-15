export function getTouchPoints(touchs) {
	return Array.from(touchs).map(ev => {
		return [ev.clientX, ev.clientY]
	})
}
export function debounce(fn, wait = 200) {
	var timer = null;
	console.log('debounce')
	return function() {
		if (timer !== null) {
			clearTimeout(timer);
		}
		timer = setTimeout(fn, wait);
	}
}

/**
 * @description 睡眠
 * @param {number} time 等待时间毫秒数
 */
export function sleep(time = 200) {
	return new Promise(resolve => {
		setTimeout(resolve, time)
	})
}
