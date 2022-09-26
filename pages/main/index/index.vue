<template>
	<m-page-loading v-if="loading"></m-page-loading>
	<view class="container" v-else>
		<!-- 背景 -->
		<view class="pageBg"><image class="image" src="/static/images/bg.jpg" mode="aspectFill"></image></view>
		<!-- #ifndef H5 -->
		<!-- 标题栏 -->
		<uni-nav-bar fixed statusBar :title="storeInfo.name" color="#ffffff" :border="false"></uni-nav-bar>
		<!-- #endif -->

		<!-- 轮播 -->
		<view class="blank32"></view>
		<m-carousel :listData="bannerListData"></m-carousel>
		<view class="blank30"></view>

		<!-- 门诊信息 -->
		<m-info :info="storeInfo"></m-info>
		<view class="blank30"></view>

		<!-- 门诊活动 -->
		<view class="box_activity">
			<m-title2 title="热门活动" path="/pages/sub1/activityList/activityList"></m-title2>
			<m-activity-list :listData="activityListData"></m-activity-list>
		</view>

		<!-- 服务入口 -->
		<view class="box_serveList">
			<m-title2 title="门诊服务">
				<template v-slot:icon>
					<image class="shijian1" src="/static/images/shijian1.png" mode="aspectFill"></image>
				</template>
			</m-title2>
			<m-fuwu :info="storeInfo"></m-fuwu>
			<view class="blank20"></view>
			<mServe-list2 :listData="serveListData"></mServe-list2>
		</view>
		<view class="blank40"></view>
	</view>
</template>

<script setup>
// 组件
import mInfo from './components/m-info/m-info.vue'
// import mServeList from './components/m-serveList/m-serveList.vue'
import mServeList2 from './components/m-serveList2/m-serveList2.vue'
import mFuwu from './components/m-fuwu/m-fuwu.vue'

// 模块
import { ref, reactive, computed } from 'vue'
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

// 加载中
const loading = ref(true)
// 拉取banner数据信息
const bannerListData = ref([])
// 拉取门诊信息
const storeInfo = ref([])
// 拉取活动信息
const activityListData = ref([])
// 拉取服务信息
const serveListData = ref([])

// onLoad中请求是否加载完成了
const onLoadStatus = ref(false)

const getData = () => {
	let ListData = Promise.all([
		_bannerList({ sfuse: 0 }),
		_storeGetinfo(),
		_enrollformGetlist({ status: 0 }),
		_serveGetlist()
	])

	//全部加载成功
	ListData.then(res => {
		// 加载完成
		loading.value = false
		onLoadStatus.value = true
		bannerListData.value = res[0].data
		storeInfo.value = res[1].data
		activityListData.value = res[2].data
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
	})
}

onLoad(options => {
	// console.log(options)
	loading.value = true
	getData()
})

onShow(() => {
	if (onLoadStatus.value) {
		getData()
	}
})
</script>
<style lang="scss" scoped>
.box_activity {
	position: relative;
	z-index: 2;
	padding: 32rpx 32rpx;
	border-radius: 24rpx;
	/* background: url('@/static/default/huodongbg.png') #2f5ae6 no-repeat; */
	background-size: 100% auto;

	/*:deep(.container) {
		 .title {
			color: #fff;
		}
		.right {
			color: #fff;
			.uniui-forward {
				color: #fff !important;
			}
		} 
	}*/
}
.box_serveList {
	position: relative;
	z-index: 2;
	padding: 32rpx 32rpx 32rpx 32rpx;
	border-radius: 24rpx;
	.shijian1 {
		width: 32rpx;
		height: 32rpx;
		margin-right: 8rpx;
	}
}
</style>
