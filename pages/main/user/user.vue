<template>
	<!-- 提示登录组件 -->
	<m-authorized-login ref="mLogin"></m-authorized-login>

	<!-- 加载提示 -->
	<m-page-loading v-if="loading"></m-page-loading>

	<!-- 背景 -->
	<view class="pageBg">
		<image class="image" src="/static/images/bg.png" mode="aspectFill"></image>
	</view>
	<z-paging
		ref="paging"
		use-page-scroll
		@query="storeGetinfo"
		:loading-full-fixed="true"
		hide-empty-view
		:loading-more-enabled="false"
		created-reload
		min-delay="1000"
	>
		<!-- z-ping头部固定 -->
		<template #top>
			<!-- #ifndef H5 -->
			<!-- 标题栏 -->
			<uni-nav-bar
				statusBar
				fixed
				:title="'我的'"
				color="#ffffff"
				:border="false"
			></uni-nav-bar>
			<view class="blank20"></view>
			<!-- #endif -->
		</template>

		<!-- 头部 -->
		<m-header></m-header>

		<!-- 用户端显示 -->
		<p-user v-if="useUserMain.power < 0"></p-user>

		<!-- 商家端显示 -->
		<s-user v-if="useUserMain.power >= 0"></s-user>
	</z-paging>
</template>
<script setup>
import mHeader from './components/m-header/m-header.vue';
import pUser from './components/p-user.vue';
import sUser from './components/s-user.vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { reactive, computed, ref, provide } from 'vue';
import { _storeGetinfo } from '@/aTemp/apis/store.js';
import { navigateTo, showModal } from '@/aTemp/utils/uniAppTools.js';

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js';
const useUserMain = _useUserMain();

// 分享 (onShareAppMessage,onShareT1111111imeline) 不能删,必要 https://github.com/dcloudio/uni-app/issues/3097
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

// 加载中
const loading = ref(true);

// 店铺数据
const storeInfo = ref({});
provide('storeInfo', storeInfo);

onLoad(options => {});
onShow(() => {
	if (!useUserMain.avatar || !useUserMain.nickname) {
		showModal('请完善用户头像，和昵称').then(res => {
			const { confirm } = res;
			if (confirm) {
				navigateTo('/pages/sub2/manageUserInfo/manageUserInfo');
			}
		});
	}
});

const storeGetinfo = () => {
	// 获取店铺信息
	_storeGetinfo().then(res => {
		const { code, msg, data } = res;
		// 设置用户信息
		storeInfo.value = data;

		// 设置全局店铺信息
		useUserMain.$patch({
			power: data.userPower ? data.userPower.power : -1
		});

		// 设置分享参数
		shareInfo.title = computed(() => `${useUserMain.nickname} - 邀请您进入【${data.name}】`);
		shareInfo.imageUrl = `https://imgs.lechiwl.com/store/tooth/invitbg.png`;
		shareInfo.path = computed(
			() =>
				`/pages/main/index/index?invitationCode=${useUserMain.userid}&storeId=${
					useUserMain.storeId
				}&Mscene=0&targetId=0`
		);

		// 加载结束
		loading.value = false;
		paging.value.complete();
	});
};
</script>

<style lang="scss" scoped></style>
