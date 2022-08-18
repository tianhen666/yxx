/**
 *  全局配置文件
 */

export default {
	BASE_URL: process.env.NODE_ENV === 'development' ? 'http://192.168.5.116:8089' : 'https://demo.com', //后台根域名
	debug: false, //是否是调试,调试输出console.log
	
	// 路由相关begin====================================>

	// 黑白名单只能二选一，可配置页面路径 或 正则表达式规则
	// 白名单，不需要登录的页面路径
	whiteList: [
		'/',
		'/pages/index/index',
		'/pages/me/index',
		'/pages/login/login',
		'/pages/login/reg',
		'/pages/login/forget',
		'/pages/login/agreement',
		{
			'pattern': RegExp(/register/)
		}
	],
	// 黑名单，需要登录的页面路径
	// blackList: [
	// 	'/pages/tabPage/center',
	// 	{
	// 		'pattern': RegExp(/detail/)
	// 	}
	// ],

	// setStorageSync 设置本地存储的用户登录标识
	userInfo: 'userInfo',

	// 登录页面地址，用于未登录时跳转
	loginPath: '/pages/login/login',

	// 点击跳转到需要登录的页面时，未登录状态下是否跳转到登录页面，true | false
	toLogin: true

	// 路由相关end<====================================
}
