<script setup>
import { _wxLogin } from '@/aTemp/apis/login.js'
import { onLaunch } from '@dcloudio/uni-app'
import { init } from '@/aTemp/index.js'
import router from '@/aTemp/router/index.js'
import { showToastText } from '@/aTemp/utils/uniAppTools.js'

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 监听每当userMain发生变化时，将整个状态持久化到本地存储
useUserMain.$subscribe(
	(mutation, state) => {
		// console.log(mutation, state)
		// 登录信息
		uni.setStorageSync('userMain', state)
		// 缓存是否登录
		uni.setStorageSync('isLogin', useUserMain.isLogin)
	},
	{ detached: true }
)

// 获取静态存储userMain
const old = uni.getStorageSync('userMain')
if (old) {
	useUserMain.$patch({ ...old })
}

// 小程序启动时执行
onLaunch(async options => {
	console.log(options)
	// 初始化,检查是否更新
	init(options)

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
		useUserMain.$patch({ storeId: storeId })
	}
	if (invitationCode) {
		useUserMain.$patch({ invitationCode: invitationCode })
	}

	/*
	 * 直接进入小程序
	 * 如果缓存中还是没有店铺ID,设置一个默认店铺ID
	 */
	const userMain = uni.getStorageSync('userMain')
	const storageStoreId = userMain.storeId
	if (!storageStoreId) {
		useUserMain.$patch({ storeId: 1 })
	}

	// 微信授权登录
	const wxCode = await uni.login()

	// 登录获取
	const resData = await _wxLogin({
		code: wxCode.code,
		invitationCode,
		scene,
		targetId
	})

	const { code, data, msg } = resData
	const { openid, unionid, token, mobile, userid, power, avatar, nickname } = data

	// 获取到数据后赋值给全局变量
	useUserMain.$patch({
		openId: openid,
		unionId: unionid,
		token: token,
		mobile: mobile,
		userid: userid,
		power: power,
		avatar: avatar,
		nickname: nickname
	})

	// 路由拦截
	router(options)
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
