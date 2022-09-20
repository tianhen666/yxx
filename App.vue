<script setup>
import { _wxLogin } from '@/aTemp/apis/login.js'
import { onLaunch } from '@dcloudio/uni-app'
import { init } from '@/aTemp/index.js'
import router from '@/aTemp/router/index.js'
import { showToastText } from '@/aTemp/utils/uniAppTools.js'

// 全局登录信息
import { _useMainStore } from '@/aTemp/store/storeMain.js'
const useMainStore = _useMainStore()

// 监听每当mainStore发生变化时，将整个状态持久化到本地存储
useMainStore.$subscribe(
	(mutation, state) => {
		// console.log(mutation, state)
		// 登录信息
		uni.setStorageSync('mainStore', state)
		// 缓存是否登录
		uni.setStorageSync('isLogin', useMainStore.isLogin)
	},
	{ detached: true }
)

// 获取静态存储mainStore
const old = uni.getStorageSync('mainStore')
if (old) {
	useMainStore.$patch({ ...old })
}

// 小程序冷启动执行,只会执行一次
onLaunch(async options => {
	// console.log(options)
	init(options) // 初始化,检查是否更新
	router(options) // 路由拦截
	
	/*
	 * 邀请进入小程序
	 * invitationCode 邀请人code
	 * storeId 店铺ID
	 * scene 0直接邀请 1活动 2商品 3服务 4海报 5其他
	 * targetId 场景来源ID
	 * 获取启动参数并设置店铺ID,邀请人code 并且缓存
	 */
	// console.log(options.query)
	const { invitationCode, storeId, scene, targetId } = options.query
	if (storeId) {
		useMainStore.$patch({ storeId: storeId })
	}
	if (invitationCode) {
		useMainStore.$patch({ invitationCode: invitationCode })
	}

	/*
	 * 直接进入小程序
	 * 如果缓存中还是没有店铺ID,设置一个默认店铺ID
	 */
	const mainStore = uni.getStorageSync('mainStore')
	const storageStoreId = mainStore.storeId
	if (!storageStoreId) {
		useMainStore.$patch({ storeId: 1 })
	}

	// 微信授权登录
	if (false) {
		const wxCode = await uni.login()

		// 登录获取
		const resData = await _wxLogin({
			code: wxCode.code,
			invitationCode,
			scene,
			targetId
		})

		const { code, data, msg } = resData
		const { openid, unionid, token, mobile, userid } = data
		// 获取到数据后赋值给全局变量
		useMainStore.$patch({
			openId: openid,
			unionId: unionid,
			token: token,
			mobile: mobile,
			userid: userid
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
