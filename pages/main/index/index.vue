<template>
	<m-page-loading v-if="loading"></m-page-loading>
	<!-- 背景 -->
	<view class="pageBg"><image class="image" src="/static/images/bg.png" mode="aspectFill"></image></view>
	<z-paging
		ref="paging"
		use-page-scroll
		@query="getData"
		:auto="false"
		hide-empty-view
		:loading-more-enabled="false"
		min-delay="1000"
	>
		<!-- 加载状态 -->
		<!-- <template #loading>
			<m-page-loading></m-page-loading>
		</template> -->

		<!-- 固定顶部 -->
		<template #top>
			<!-- #ifndef H5 -->
			<!-- 标题栏 -->
			<uni-nav-bar fixed statusBar :title="storeInfo.name" color="#ffffff" :border="false"></uni-nav-bar>
			<view class="blank20"></view>
			<!-- #endif -->
		</template>

		<view class="container">
			<!-- 轮播 -->
			<m-carousel :listData="bannerListData"></m-carousel>
			<view class="blank30"></view>

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
						<image class="shijian1" src="/static/images/shijian1.png" mode="aspectFill"></image>
					</template>
				</m-title2>
				<m-fuwu :info="storeInfo"></m-fuwu>
				<view class="blank20"></view>
				<!-- m-fuwu end -->

				<m-serve-list2 :listData="serveListData" v-if="serveListData.length > 0"></m-serve-list2>
			</view>
			<view class="blank40"></view>
		</view>
	</z-paging>
</template>

<script setup>
// 组件
import mInfo from './components/m-info/m-info.vue'
// import mServeList from './components/m-serveList/m-serveList.vue'
// import mServeList2 from './components/m-serveList2/m-serveList2.vue'
import mFuwu from './components/m-fuwu/m-fuwu.vue'

// 模块
import { ref, reactive, computed, getCurrentInstance } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { _bannerList } from '@/aTemp/apis/banner'
import { _storeGetinfo } from '@/aTemp/apis/store.js'
import { _enrollformGetlist } from '@/aTemp/apis/activity.js'
import { _serveGetlist } from '@/aTemp/apis/service.js'

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 分享 (onShareAppMessage,onShareTimeline) 不能删,必要 https://github.com/dcloudio/uni-app/issues/3097
import useShare from '@/aTemp/mixins/useShare.js'
const shareInfo = reactive({ title: '', path: '', imageUrl: '', query: '' })
// 设置分享
useShare(shareInfo)

// z-ping插件对象
const paging = ref(null)

// 加载中
const loading = ref(true)
// 拉取banner数据信息
const bannerListData = ref([])
// 拉取门诊信息
const storeInfo = ref({})
// 拉取活动信息
const activityListData = ref([])
// 拉取服务信息
const serveListData = ref([])

const getData = () => {
	let ListData = Promise.all([
		_bannerList({ sfuse: 0 }),
		_storeGetinfo(),
		_enrollformGetlist({ status: 0 }),
		_serveGetlist()
	])

	//全部加载成功
	ListData.then(res => {
		bannerListData.value = res[0].data
		storeInfo.value = res[1].data
		activityListData.value = res[2].data.slice(0, 3)
		serveListData.value = res[3].data

		// 设置页面分享参数
		shareInfo.title = storeInfo.value.name
		shareInfo.imageUrl = storeInfo.value.sharePic
		shareInfo.path = computed(
			() =>
				`/pages/main/index/index?invitationCode=${useUserMain.openId}&storeId=${useUserMain.storeId}&scene=0&targetId=0`
		)
		shareInfo.query = computed(
			() => `invitationCode=${useUserMain.openId}&storeId=${useUserMain.storeId}&scene=0&targetId=0`
		)

		// 加载完成
		loading.value = false
		paging.value.complete()
	})
}

onLoad(async options => {
	// console.log(options)

	// 等待onLaunch中放行后执行
	const { proxy } = getCurrentInstance()
	await proxy.$onLaunched

	// 开始加载
	loading.value = true
	proxy.$refs.paging.reload()
})
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
	padding: 32rpx 0;
	border-radius: 24rpx;
	.shijian1 {
		width: 32rpx;
		height: 32rpx;
		margin-right: 8rpx;
	}
}
</style>
