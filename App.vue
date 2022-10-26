<script setup>
import { _wxLogin } from '@/aTemp/apis/login.js'
import { onLaunch, onShow } from '@dcloudio/uni-app'
import { init } from '@/aTemp/index.js'
import router from '@/aTemp/router/index.js'
import { showToastText } from '@/aTemp/utils/uniAppTools.js'
import { getCurrentInstance, ref } from 'vue'
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
	console.log('onLaunch', options)

	// 获取vue3全局对象
	const { proxy } = getCurrentInstance()

	// 初始化,检查是否更新
	init(options)

	/*
	 * 获取进入小程序参数
	 * invitationCode 邀请人id
	 * storeId 店铺ID
	 * Mscene 0直接邀请 1活动 2商品 3服务 4海报 5员工邀请 6店铺入驻邀请 7预约分享
	 * const Mscene = ["直接邀请","活动邀请","商品邀请","服务邀请","海报邀请","员工邀请","店铺入驻邀请","预约分享"]
	 * targetId 场景来源ID
	 */
	// console.log(options.query)
	let { invitationCode, storeId, Mscene, targetId, scene } = options.query

	/*
	 * 扫描小程序码，进入小程序
	 * scene 字符串参数值 i=2&sd=1&s=0&t=0  因为生成小程序码 scene长度有限制只能这样写
	 * i 邀请人id
	 * sd 店铺ID
	 * s 场景值
	 * t 场景来源ID
	 */
	if (scene) {
		const codeParams = decodeURIComponent(scene)
		const codeParamsList = codeParams.split('&')
		const codeParamsObj = {}
		codeParamsList.forEach(item => {
			codeParamsObj[item.split('=')[0]] = item.split('=')[1]
		})

		// 覆盖上面几个参数值
		invitationCode = codeParamsObj['i']
		storeId = codeParamsObj['sd']
		Mscene = codeParamsObj['s']
		targetId = codeParamsObj['t']
	}

	// 打印进入小程序参数
	console.log('邀请人ID：' + invitationCode, '店铺id：' + storeId, '场景值：' + Mscene, '目标ID：' + targetId)

	// 设置缓存
	if (storeId) {
		useUserMain.$patch({ storeId: storeId })
	}
	if (invitationCode) {
		useUserMain.$patch({ invitationCode: invitationCode })
	}

	// 兼容朋友圈打开小程序
	// 获取登录的code
	let wxCode = ''
	if (options.scene !== 1154) {
		wxCode = await uni.login()
	}

	// 获取AppID 最低基础库版本2.2.2
	const accountInfo = uni.getAccountInfoSync()
	const appId = accountInfo.miniProgram.appId
	console.log(appId)
	
	// 登录获取
	_wxLogin(
		{
			code: wxCode.code,
			storeId: useUserMain.storeId || 0,
			invitationCode: invitationCode || 0,
			scene: Mscene,
			targetId,
			appId: appId
		},
		{
			storeId: useUserMain.storeId || 0
		}
	)
		.then(resData => {
			const { code, data, msg } = resData
			const { openid, unionid, token, mobile, power, avatar, nickname, remarkname, user } = data
			// 清理缓存
			// uni.clearStorageSync()

			// 获取到数据后赋值给全局变量
			useUserMain.$patch({
				openId: openid,
				unionId: unionid,
				token: token,
				mobile: mobile,
				power: power,
				avatar: avatar,
				nickname: nickname,
				remarkname: remarkname,
				userid: user.id,
				storeId: user.storeId
			})

			// 路由拦截
			// router(options)

			// 放行同步方法
			proxy.$isResolve()
			// 设置onLaunch加载完成
			onLaunched.value = true
		})
		.catch(err => {
			// 路由拦截
			// router(options)
			
			// 放行同步方法
			// proxy.$isResolve()
			// 设置onLaunch加载完成
			// onLaunched.value = true
		})
})

// onLaunch中方法是否加载完成
const onLaunched = ref(false)
onShow(options => {
	// const accountInfo = uni.getAccountInfoSync();
	// console.log(accountInfo.miniProgram.appId) // 小程序 appId
	if (onLaunched.value) {
		// console.log('onShow', options)
		// 冷启动拦截
		// router(options)

		// 初始化,检查是否更新
		init(options)
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
