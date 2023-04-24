<template>
	<!-- 提示登录组件 -->
	<m-authorized-login ref="mLogin"></m-authorized-login>

	<!-- 加载提示 -->
	<m-page-loading v-if="loading"></m-page-loading>

	<!-- 顶部背景 -->
	<view class="pageBg">
		<image class="image" src="/static/images/bg.png" mode="aspectFill"></image>
	</view>

	<z-paging
		ref="paging"
		use-page-scroll
		@query="getData"
		:auto="false"
		hide-empty-view
		:loading-more-enabled="false"
		min-delay="1000"
	>
		<!-- 固定顶部 -->
		<template #top>
			<!-- #ifndef H5 -->
			<!-- 标题栏 -->
			<uni-nav-bar
				fixed
				statusBar
				:title="storeInfo.name"
				color="#ffffff"
				:border="false"
			></uni-nav-bar>
			<view class="blank20"></view>
			<!-- #endif -->
		</template>

		<view class="container">
			<!-- 轮播 -->
			<m-carousel :listData="bannerListData" v-if="bannerListData.length > 0"></m-carousel>
			<view class="blank30" v-if="bannerListData.length > 0"></view>

			<!-- 门诊信息 -->
			<m-info :info="storeInfo"></m-info>
			<view class="blank30"></view>

			<!-- 门诊活动 -->
			<view class="box_activity" v-if="activityListData.length > 0">
				<m-title2 title="热门活动" path="/pages/sub1/activityList/activityList"></m-title2>
				<m-activity-list :listData="activityListData" :more="true"></m-activity-list>
			</view>

			<!-- 服务入口 -->
			<view class="box_serveList">
				<!-- m-fuwu start  -->
				<m-title2 title="门诊服务">
					<template v-slot:icon>
						<image
							class="shijian1"
							src="/static/images/shijian1.png"
							mode="aspectFill"
						></image>
					</template>
				</m-title2>
				<m-fuwu :info="storeInfo"></m-fuwu>
				<view class="blank40"></view>
				<!-- m-fuwu end -->

				<m-serve-list2
					more
					:listData="serveListData"
					v-if="serveListData.length > 0"
				></m-serve-list2>
			</view>

			<!-- 技术支持 -->
			<m-technical-support></m-technical-support>
			<view class="blank40"></view>
		</view>
	</z-paging>

	<!-- 在线客服 -->
	<!-- <m-online-service style="display: none;"></m-online-service> -->
</template>

<script setup>
// 组件
import mInfo from './components/m-info/m-info.vue';
import mFuwu from './components/m-fuwu/m-fuwu.vue';

// 模块
import { ref, reactive, computed, getCurrentInstance } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { _bannerList } from '@/aTemp/apis/banner';
import { _storeGetinfo } from '@/aTemp/apis/store.js';
import { _enrollformGetlist } from '@/aTemp/apis/activity.js';
import { _serveGetlist } from '@/aTemp/apis/service.js';
import { navigateTo } from '@/aTemp/utils/uniAppTools.js';
import { _wxLogin } from '@/aTemp/apis/login.js';

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js';
const useUserMain = _useUserMain();

// 分享 (onShareAppMessage,onShareTimeline) 不能删,必要 https://github.com/dcloudio/uni-app/issues/3097
import useShare from '@/aTemp/mixins/useShare.js';
const shareInfo = reactive({
	title: '',
	path: '',
	imageUrl: '',
	query: ''
});
// 设置分享
useShare(shareInfo);

// z-ping插件对象
const paging = ref(null);

// 登录组件
const mLogin = ref(null);

// 加载中
const loading = ref(true);
// 拉取banner数据信息
const bannerListData = ref([]);
// 拉取门诊信息
const storeInfo = ref({});
// 拉取活动信息
const activityListData = ref([]);
// 拉取服务信息
const serveListData = ref([]);

const getData = () => {
	let ListData = Promise.all([
		_bannerList({
			sfuse: 0,
			exhibition: 0
		}),
		_storeGetinfo(),
		_enrollformGetlist({
			status: 0
		}),
		_serveGetlist()
	]);

	//全部加载成功
	ListData.then(res => {
		bannerListData.value = res[0].data;
		storeInfo.value = res[1].data;
		uni.setStorageSync('storeInfo', res[1].data);
		activityListData.value = res[2].data.filter(item => item.productId != '1');
		serveListData.value = res[3].data.slice(0, 6);

		// 设置页面分享参数
		shareInfo.title = computed(
			() => `${useUserMain.nickname} - 邀请您进入【${storeInfo.value.name}】`
		);
		// 分享图片
		shareInfo.imageUrl =
			storeInfo.value.sharePic ||
			storeInfo.value.pics ||
			`https://imgs.lechiwl.com/store/tooth/invitbg.png`;

		// 分享到聊天框用到
		shareInfo.path = computed(
			() =>
				`/pages/main/index/index?invitationCode=${useUserMain.userid}&storeId=${
					useUserMain.storeId
				}&Mscene=0&targetId=0`
		);
		// 分享到朋友圈用到
		shareInfo.query = computed(
			() =>
				`invitationCode=${useUserMain.userid}&storeId=${
					useUserMain.storeId
				}&Mscene=0&targetId=0`
		);

		// 加载完成
		loading.value = false;
		paging.value.complete();
	});
};

onLoad(async options => {
	// 等待onLaunch中放行后执行
	const { proxy } = getCurrentInstance();
	await proxy.$onLaunched;

	let { invitationCode, storeId, Mscene, targetId, scene } = options;
	// 解析二维码中参数
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
	console.log(invitationCode, storeId, Mscene, targetId);
	console.log(
		'首页---' + '邀请人ID：' + Number(invitationCode),
		'店铺id：' + Number(storeId),
		'场景值：' + Number(Mscene),
		'目标ID：' + Number(targetId)
	);

	try {
		// 获取登录的code
		let wxCode = '';
		wxCode = await uni.login();

		// 获取AppID 最低基础库版本2.2.2
		const accountInfo = uni.getAccountInfoSync();
		const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {};
		console.log(extConfig);
		const appId = accountInfo.miniProgram.appId || extConfig.appId;
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
		const { power, token, user, store } = data;

		// 获取到数据后赋值给全局变量
		useUserMain.$patch({
			openId: user.openid,
			unionId: user.unionid,
			token: token,
			mobile: user.mobile,
			// mobile: '',
			power: power,
			avatar: user.avatar,
			nickname: user.nickname,
			remarkname: user.remarkname,
			userid: user.id,
			storeId: user.storeId,
			// headPortrait: store.headPortrait  // 登陆授权组件是否需要头像昵称，0，需要 1，不需要
			headPortrait: 1
		});

		// 弹出登录组件
		if (!useUserMain.isLogin) {
			mLogin.value.popupfun();
		}
	} catch (e) {
		console.log('登录请求出错', e);
	}

	// 开始加载
	loading.value = true;
	// 解决onLoad不能通过 vue3中ref获取对象
	// proxy.$refs.paging.reload();
	paging.value.reload();

	/*
	 * 获取进入小程序参数
	 * invitationCode 邀请人id
	 * storeId 店铺ID
	 * Mscene 0直接邀请 1活动 2商品 3服务 4海报 5员工邀请 6店铺入驻邀请 7预约分享 8文章邀请
	 * const Mscene = ["直接邀请","活动邀请","商品邀请","服务邀请","海报邀请","员工邀请","店铺入驻邀请","预约分享","文章邀请"]
	 * targetId 场景来源ID
	 */

	Mscene = Number(Mscene);
	const parmsStr = `invitationCode=${invitationCode}&storeId=${storeId}&Mscene=${Mscene}&targetId=${targetId}`;
	if (Mscene === 0) {
		// 跳转到目标--首页--页面
	} else if (Mscene === 1) {
		// 跳转到目标--活动--页面
		navigateTo(`/pages/sub1/activityInfo/activityInfo?${parmsStr}`);
	} else if (Mscene === 2) {
		// 跳转到目标--商品--页面
		navigateTo(`/pages/sub1/goodsInfo/goodsInfo?${parmsStr}`);
	} else if (Mscene === 3) {
		// 跳转到目标--服务--页面
		navigateTo(`/pages/sub1/serveInfo/serveInfo?${parmsStr}`);
	} else if (Mscene === 4) {
		// 跳转到目标--海报--页面
	} else if (Mscene === 5) {
		// 跳转到目标--员工邀请--页面
		navigateTo(`/pages/sub2/manageStaffListLogin/manageStaffListLogin?${parmsStr}`);
	} else if (Mscene === 6) {
		// 跳转到目标--店铺入驻--页面
		navigateTo(`/pages/sub1/settleIn/settleIn?${parmsStr}`);
	} else if (Mscene === 7) {
		// 跳转到目标--预约分享--页面
		navigateTo(`/pages/sub1/yuyue/yuyue?${parmsStr}`);
	} else if (Mscene === 8) {
		// 跳转到目标--文章邀请--页面
		navigateTo(`/pages/sub1/newsDetails/newsDetails?${parmsStr}`);
	}
});
</script>
<style lang="scss" scoped>
.box_activity {
	position: relative;
	z-index: 2;
	width: $main-width;
	margin: auto;
	padding: 32rpx 0;
	border-radius: 24rpx;
	background-size: 100% auto;
}

.box_serveList {
	position: relative;
	z-index: 2;
	width: $main-width;
	margin: auto;
	padding-top: 32rpx;
	border-radius: 24rpx;

	.shijian1 {
		width: 32rpx;
		height: 32rpx;
		margin-right: 8rpx;
	}
}
</style>
