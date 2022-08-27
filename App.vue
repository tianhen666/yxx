<script setup>
import { _wxLogin } from '@/aTemp/apis/login.js'
import { onLaunch } from '@dcloudio/uni-app'
import { init } from '@/aTemp/index.js'
import router from '@/aTemp/router/index.js'
import { _useMainStore } from '@/aTemp/store/storeMain.js'

// 全局信息变量
const useMainStore = _useMainStore()

// 每当它发生变化时，将整个状态持久化到本地存储
useMainStore.$subscribe(
	(mutation, state) => {
		uni.setStorageSync('loginStore', state)
	},
	{ detached: true }
)

// 获取静态存储loginStore
const old = uni.getStorageSync('loginStore')
if (old) {
	useMainStore.$state = old
}

onLaunch(options => {
	init(options) // 初始化,检查是否更新
	// router(options) // 路由拦截

	console.log()
	// 微信授权登录
	if (!useMainStore.isLogin) {
		uni.login().then(val => {
			_wxLogin({
				code: val.code
			})
				.then(res => {
					const { code, data, msg } = res
					const { storeid, openid, unionid, token } = data
					console.log(storeid)
					// 获取到数据后赋值给全局变量
					useMainStore.$patch({
						storeId: storeid,
						openId: openid,
						unionId: unionid,
						token: token
					})
				})
				.catch(err => {
					console.log(err)
				})
		})
	}
})
</script>

<style lang="scss">
@import '@/common/style/global.scss';
</style>

<style>
/*colorui css */
@import '@/common/colorui/main.css';
@import '@/common/colorui/icon.css';
</style>
