<script setup>
import { _wxLogin } from '@/aTemp/apis/login.js'
import { onLaunch, onShow } from '@dcloudio/uni-app'
import { init } from '@/aTemp/index.js'
import router from '@/aTemp/router/index.js'
import { showToastText } from '@/aTemp/utils/uniAppTools.js'
import { getCurrentInstance, ref } from 'vue'
import { _userChangeUserId } from '@/aTemp/apis/user.js'
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
	// 获取vue3全局对象
	const { proxy } = getCurrentInstance()

	// 初始化,检查是否更新
	init(options)

	/*
	 * 获取进入小程序参数
	 * invitationCode 邀请人id
	 * storeId 店铺ID
	 * Mscene 0直接邀请 1活动 2商品 3服务 4海报 5员工邀请 6店铺入驻邀请 7预约分享 8文章邀请
	 * const Mscene = ["直接邀请","活动邀请","商品邀请","服务邀请","海报邀请","员工邀请","店铺入驻邀请","预约分享","文章邀请"]
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

	// 兼容朋友圈打开小程序
	if (options.scene == 1154) {
		useUserMain.$patch({ storeId: storeId })
		// 放行同步方法
		proxy.$isResolve()
	} else if (options.scene == 1155 && options.path != 'pages/main/index/index') {
		// 从朋友圈进入小程序

		// 获取登录的code
		let wxCode = ''
		wxCode = await uni.login()

		// 获取AppID 最低基础库版本2.2.2
		const accountInfo = uni.getAccountInfoSync()
		const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {}
		// console.log(accountInfo)
		// console.log(extConfig)
		const appId = extConfig.appId || accountInfo.miniProgram.appId
		console.log(appId)

		// 调用登录接口
		const resData = await _wxLogin(
			{
				code: wxCode.code,
				storeId: storeId || 0,
				invitationCode: invitationCode || 0,
				scene: Mscene,
				targetId,
				appId: appId
			},
			{
				storeId: storeId || 0
			}
		)
		const { code, data, msg } = resData
		const { power, token, user } = data

		// 获取到数据后赋值给全局变量
		useUserMain.$patch({
			openId: user.openid,
			unionId: user.unionid,
			token: token,
			mobile: user.mobile,
			power: power,
			avatar: user.avatar,
			nickname: user.nickname,
			remarkname: user.remarkname,
			userid: user.id,
			storeId: user.storeId
		})

		// 路由拦截
		// router(options)

		// 放行同步方法
		proxy.$isResolve()
	} else {
		// 路由拦截
		// router(options)

		// 放行同步方法
		proxy.$isResolve()
	}
})

onShow(options => {
	// 初始化,检查是否更新
	init(options)
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
