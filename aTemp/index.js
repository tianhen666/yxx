import wechat from '@/aTemp/wechat/wechat'
const install = app => {
	// 挂载函数
	// app.config.globalProperties.$store = store
	// app.config.globalProperties.$tools = tools
	
	// mixin分享
	// app.mixin(share)
}

export async function init(options) {
	// #ifdef MP-WEIXIN
	// 检测小程序更新(如果从朋友圈场景进入则无此API)
	options.scene !== 1154 && wechat.checkMiniProgramUpdate()
	// #endif
}

export default {
	install
}
