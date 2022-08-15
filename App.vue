<script setup>
import { _wxLogin } from '@/api/yxxApi.js'
import { onLaunch } from '@dcloudio/uni-app'

onLaunch(option => {
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
@import '/common/global.scss';
</style>
