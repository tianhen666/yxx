import App from './App'
import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin.js'
// // #ifndef VUE3
// import Vue from 'vue'
// Vue.config.productionTip = false
// App.mpType = 'app'
// const app = new Vue({
// 	...App
// })
// app.$mount()
// // #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import * as Pinia from 'pinia';
export function createApp() {
	const app = createSSRApp(App)
	// 处理onLaunch和onLoad 异步变成同步问题
	app.config.globalProperties.$onLaunched = new Promise((resolve, reject) => {
		app.config.globalProperties.$isResolve = resolve
	})

	// z-ping 页面下拉
	app.mixin(ZPMixin)

	// 状态仓库
	app.use(Pinia.createPinia())
	return {
		app,
		Pinia
	}
}
// #endif
