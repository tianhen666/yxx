<template>
	<!-- 背景 -->
	<view class="pageBg"><image class="image" src="/static/images/bg.png" mode="aspectFill"></image></view>
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
		<!-- 加载状态 -->
		<template #loading>
			<m-page-loading></m-page-loading>
		</template>

		<!-- z-ping头部固定 -->
		<template #top>
			<!-- #ifndef H5 -->
			<!-- 标题栏 -->
			<uni-nav-bar statusBar fixed :title="'我的'" color="#ffffff" :border="false"></uni-nav-bar>
			<view class="blank20"></view>
			<!-- #endif -->
		</template>

		<!-- 头部 -->
		<m-header></m-header>

		<!-- 用户端显示 -->
		<p-user v-if="useUserMain.power === -1"></p-user>

		<!-- 商家端显示 -->
		<s-user v-else></s-user>
	</z-paging>
	
	<!-- 邀请门诊入驻 -->
	<view class="inviteStore" v-if="useUserMain.storeId == 1" @tap="navigateTo('/pages/sub1/settleIn/settleIn')">
		<text>店铺</text>
		<text>入驻</text>
	</view>
</template>
<script setup>
import mHeader from './components/m-header/m-header.vue'
import pUser from './components/p-user.vue'
import sUser from './components/s-user.vue'
import { onLoad } from '@dcloudio/uni-app'
import { reactive, computed, ref } from 'vue'
import { _storeGetinfo } from '@/aTemp/apis/store.js'
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'

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
const loading = ref(true)

//  设置分享参数
onLoad(options => {
	wx.hideShareMenu()
})

const storeGetinfo = () => {
	// 获取店铺信息
	_storeGetinfo().then(res => {
		const { code, msg, data } = res
		shareInfo.title = computed(() => `${useUserMain.nickname} - 邀请您进入【${data.name}】`)
		shareInfo.path = computed(
			() =>
				`/pages/main/index/index?invitationCode=${useUserMain.userid}&storeId=${
					useUserMain.storeId
				}&Mscene=0&targetId=0`
		)
		shareInfo.imageUrl = `https://imgs.fenxiangzl.com/store/tooth/invitbg.png`

		// 加载完成
		loading.value = false
		paging.value.complete()
	})
}
</script>

<style lang="scss" scoped>
.inviteStore {
	position: fixed;
	right: 40rpx;
	bottom: 60rpx;
	z-index: 10;
	background-color: $main-color;
	color: #fff;
	box-sizing: content-box;
	font-size: 24rpx;
	line-height: 1.5em;
	border-radius: 50%;
	overflow: hidden;
	width: 100rpx;
	height: 100rpx;
	text-align: justify;
	@include mFlex;
	flex-direction: column;
}
</style>
