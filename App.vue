<script setup>
import { _wxLogin } from '@/aTemp/apis/login.js'
import { onLaunch } from '@dcloudio/uni-app'
import { init } from '@/aTemp/index.js'

import a_router from '@/aTemp/router/index.js'
onLaunch(options => {
	init(options) // 初始化,检查是否更新
	// a_router(options) // 路由拦截

	const openId = uni.getStorageSync('openId')
	// 微信授权登录
	if (!openId) {
		uni.login().then(val => {
			_wxLogin({
				code: val.code
			})
				.then(res => {
					uni.setStorageSync('storeId', 1)
					uni.setStorageSync('openId', res.data.openid)
					uni.setStorageSync('unionId', res.data.unionid)
				})
				.catch(err => {
					console.log(err)
				})
		})
	}
})

// 设置全局系统信息
const globalData = {
	systemInfo: {
		...uni.getSystemInfoSync()
	}
}
</script>

<style lang="scss">
@import '@/common/style/global.scss';
</style>

<style>
/*colorui css */
@import '@/common/colorui/main.css';
@import '@/common/colorui/icon.css';
</style>
