<template>
	<!-- 背景 -->
	<view class="pageBg uni-navbar--fixed"><image class="image" src="/static/images/bg.jpg" mode="aspectFill"></image></view>
	<!-- #ifndef H5 -->
	<!-- 标题栏 -->
	<uni-nav-bar statusBar fixed :title="'我的'" color="#ffffff" :border="false"></uni-nav-bar>
	<!-- #endif -->

	<!-- 头部 -->
	<m-header></m-header>

	<!-- 用户端显示 -->
	<p-user v-if="useUserMain.power === -1"></p-user>

	<!-- 商家端显示 -->
	<s-user v-else></s-user>
</template>
<script setup>
import mHeader from './components/m-header/m-header.vue'
import pUser from './components/p-user.vue'
import sUser from './components/s-user.vue'
import { onLoad } from '@dcloudio/uni-app'
import { reactive, computed } from 'vue'
import { _storeGetinfo } from '@/aTemp/apis/store.js'

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 分享 (onShareAppMessage,onShareTimeline) 不能删,必要 https://github.com/dcloudio/uni-app/issues/3097
import useShare from '@/aTemp/mixins/useShare.js'
const shareInfo = reactive({ title: '', path: '', imageUrl: '', query: '' })
// 设置分享
useShare(shareInfo)

//  设置分享参数
onLoad(options => {
	wx.hideShareMenu()

	// 获取店铺信息
	_storeGetinfo().then(res => {
		const { code, msg, data } = res
		shareInfo.title = `邀请您进入【${data.name}】`
		shareInfo.path = computed(
			() =>
				`/pages/main/index/index?invitationCode=${useUserMain.openId}&storeId=${useUserMain.storeId}&scene=0&targetId=0`
		)
		shareInfo.imageUrl = `https://imgs.fenxiangzl.com/store/tooth/invitbg.png`
	})
})
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #f9f9f9;
}
</style>
