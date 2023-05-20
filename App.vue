<script setup>
import { _wxLogin } from '@/aTemp/apis/login.js';
import { onLaunch, onShow } from '@dcloudio/uni-app';
import { init } from '@/aTemp/index.js';
import router from '@/aTemp/router/index.js';
import { showToastText } from '@/aTemp/utils/uniAppTools.js';
import { getCurrentInstance, ref } from 'vue';
import { _userChangeUserId } from '@/aTemp/apis/user.js';
// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js';
const useUserMain = _useUserMain();

// 监听每当userMain发生变化时，将整个状态持久化到本地存储
useUserMain.$subscribe(
	(mutation, state) => {
		// console.log(mutation, state)
		// 登录信息
		uni.setStorageSync('userMain', state);
		// 缓存是否登录
		uni.setStorageSync('isLogin', useUserMain.isLogin);
	},
	{ detached: true }
);

// 获取静态存储userMain
const old = uni.getStorageSync('userMain');
if (old) {
	useUserMain.$patch({ ...old });
}

// 小程序启动时执行
onLaunch(async options => {
	console.log(options);
	// 获取vue3全局对象
	const { proxy } = getCurrentInstance();

	// 初始化,检查是否更新
	init(options);

	/*
	 * 获取进入小程序参数
	 * invitationCode 邀请人id
	 * storeId 店铺ID
	 * Mscene 0直接邀请 1活动 2商品 3服务 4海报 5员工邀请 6店铺入驻邀请 7预约分享 8文章邀请
	 * const Mscene = ["直接邀请",
	 * "活动邀请","商品邀请","服务邀请","海报邀请","员工邀请","店铺入驻邀请","预约分享","文章邀请"]
	 * targetId 场景来源ID
	 */
	// console.log(options.query)
	let { invitationCode, storeId, Mscene, targetId, scene } = options.query;

	/*
	 * 扫描小程序码，进入小程序
	 * scene 字符串参数值 i=2&sd=1&s=0&t=0  因为生成小程序码 scene长度有限制只能这样写
	 * i 邀请人id
	 * sd 店铺ID
	 * s 场景值
	 * t 场景来源ID
	 */
	if (scene) {
		const codeParams = decodeURIComponent(scene);
		const codeParamsList = codeParams.split('&');
		const codeParamsObj = {};
		codeParamsList.forEach(item => {
			codeParamsObj[item.split('=')[0]] = item.split('=')[1];
		});

		// 覆盖上面几个参数值
		invitationCode = codeParamsObj['i'];
		storeId = codeParamsObj['sd'];
		Mscene = codeParamsObj['s'];
		targetId = codeParamsObj['t'];
	}

	// 打印进入小程序参数
	console.log(invitationCode, storeId, Mscene, targetId);
	console.log(
		'app---' + '邀请人ID：' + Number(invitationCode),
		'店铺id：' + Number(storeId),
		'场景值：' + Number(Mscene),
		'目标ID：' + Number(targetId)
	);

	// 设置全局变量中的值
	useUserMain.$patch({
		storeId: Number(storeId) || 0
	});

	try {
		if (options.path != 'pages/main/index/index') {
			// 直接打开页面 别的页面

			// 获取登录的code
			let wxCode = '';
			wxCode = await uni.login();

			// 获取AppID 最低基础库版本2.2.2
			const accountInfo = uni.getAccountInfoSync();
			// 获取小程序自定义的配置ext信息
			const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {};
			// 获取当前小程序的APPID
			const appId = extConfig.appId || accountInfo.miniProgram.appId;
			console.log('appId', appId);

			// 调用登录接口
			const resData = await _wxLogin(
				{
					code: wxCode.code,
					storeId: Number(storeId) || 0,
					invitationCode: Number(invitationCode) || 0,
					scene: Number(Mscene) || 0,
					targetId: Number(targetId) || 0,
					appId: appId
				},
				{
					storeId: Number(storeId) || 0
				}
			);
			const { code, data, msg } = resData;
			const { overdue, power, token, user, store } = data;

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
				storeId: user.storeId,
				// headPortrait: store.headPortrait  // 登陆授权组件是否需要头像昵称，0，需要 1，不需要
				headPortrait: 1,
				overdue: overdue
			});
		}
	} catch (e) {
		console.log(e);
	} finally {
		// 路由拦截
		// router(options)
		// 放行同步方法
		proxy.$isResolve();
	}
});

onShow(options => {
	// 初始化,检查是否更新
	init(options);
});
</script>

<style lang="scss">
@import '@/common/style/global.scss';
</style>

<style>
/*colorui css */
@import '@/common/colorui/main.css';
@import '@/common/colorui/icon.css';

/* 自定义图片 */
@import '@/common/font/iconfont.css';
</style>
