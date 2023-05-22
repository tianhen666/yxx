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
		@query="queryall"
		hide-empty-view
		:loading-more-enabled="false"
		:auto="false"
		min-delay="1000"
	>
		<!-- 固定顶部 -->
		<template #top>
			<!-- #ifndef H5 -->
			<!-- 标题栏 -->
			<uni-nav-bar
				statusBar
				fixed
				:title="'门诊信息'"
				color="#ffffff"
				:border="false"
			></uni-nav-bar>
			<view class="blank20"></view>
			<!-- #endif -->
		</template>

		<view class="container">
			<!-- 当前店铺 -->
			<m-address :info="info"></m-address>
			<view class="blank30"></view>

			<!-- 连锁门店 -->
			<m-chain :infoList="infoList" :info="info" v-if="infoList.length > 1">
				<template #title>
					<m-title3 title="连锁门店"></m-title3>
				</template>
			</m-chain>
			<view class="blank30" v-if="infoList.length > 1"></view>

			<!-- 关于我们 -->
			<m-about :info="info">
				<template #title>
					<m-title3 title="关于我们"></m-title3>
				</template>
			</m-about>
			<view class="blank30"></view>

			<!-- 专家团队 -->
			<m-dentist :listData="docotorList">
				<template #title>
					<m-title3 title="专家团队"></m-title3>
				</template>
			</m-dentist>
			<view class="blank30"></view>
		</view>
	</z-paging>
</template>

<script setup>
import mChain from './components/m-chain/m-chain.vue';
import mAddress from './components/m-address/m-address.vue';
import mAbout from './components/m-about/m-about.vue';
import mDentist from './components/m-dentist/m-dentist.vue';
import { ref, reactive, computed, getCurrentInstance } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { _storedoctorGetlist } from '@/aTemp/apis/doctor.js';
import { _storeGetinfolist, _storeGetinfo } from '@/aTemp/apis/store.js';

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

// 加载中
const loading = ref(true);
// 医生列表
const docotorList = ref([]);
// 相关联店铺列表
const infoList = ref([]);
// 当前店铺列表
const info = ref([]);
// z-ping插件对象
const paging = ref(null);

// 拉取后台信息
const queryall = () => {
	let ListData = Promise.all([_storedoctorGetlist(), _storeGetinfolist(), _storeGetinfo()]);
	//全部加载成功
	ListData.then(res => {
		docotorList.value = res[0].data;
		infoList.value = res[1].data;
		info.value = res[2].data;

		// 设置页面分享参数
		shareInfo.title = computed(
			() => `${useUserMain.nickname} - 邀请您进入【${info.value.name}】`
		);
		// 分享图片
		shareInfo.imageUrl =
			info.value.sharePic ||
			info.value.pics ||
			`https://imgs.lechiwl.com/store/tooth/invitbg.png`;

		// 分享到聊天框用到
		shareInfo.path = computed(
			() =>
				`/pages/main/info/info?invitationCode=${useUserMain.userid}&storeId=${
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

		setTimeout(() => {
			loading.value = false;
			paging.value.complete();
		}, 1000);
	});
};

onLoad(async options => {
	// 等待onLaunch中放行后执行
	const { proxy } = getCurrentInstance();
	await proxy.$onLaunched;

	paging.value.reload();
});
</script>
<style lang="scss" scoped></style>
