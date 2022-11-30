<template>
	<!-- 提示登录组件 -->
	<m-authorized-login ref="mLogin"></m-authorized-login>
	<!-- 加载提示 -->
	<m-page-loading v-if="loading"></m-page-loading>
	<view class="title">{{ articleObj.title }}</view>
	<mp-html
		:content="articleObj.content"
		:container-style="containerStyle"
		@load="mpLoad"
		lazy-load
		scroll-table
		selectable
		use-anchor
		:tag-style="tagStyle"
	/>
	<view class="blank40"></view>
	<view class="blank40"></view>

	<!-- 分享 -->
	<button class="inviteStore" open-type="share">
		<text>分享</text>
		<text>文章</text>
	</button>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref, computed, reactive } from 'vue'
import { _freePublishGetInfo } from '@/aTemp/apis/wx.js'

// 分享 (onShareAppMessage,onShareTimeline) 不能删,必要 https://github.com/dcloudio/uni-app/issues/3097
import useShare from '@/aTemp/mixins/useShare.js'
const shareInfo = reactive({ title: '', path: '', imageUrl: '', query: '' })
// 设置分享
useShare(shareInfo)

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

const articleId = ref('')
const articleObj = ref({})
const loading = ref(true)

const containerStyle = `background-color:rgb(255, 255, 255);line-height:1.6;font-size: 15px;overflow: hidden;display: inline;white-space: pre-wrap;white-space: pre-line;`
const tagStyle = {
	table: 'box-sizing: border-box; border-top: 1px solid #dfe2e5; border-left: 1px solid #dfe2e5;',
	th: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
	td: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
	li: 'margin: 5px 0;'
}
onLoad(options => {
	articleId.value = decodeURIComponent(options.targetId || '')

	_freePublishGetInfo({
		freeId: articleId.value
	}).then(res => {
		articleObj.value = res.data

		// 设置页面分享参数
		shareInfo.title = computed(() => `${articleObj.value.title}`)
		// 分享图片
		shareInfo.imageUrl = articleObj.value.thumbUrl || `https://imgs.fenxiangzl.com/store/tooth/invitbg.png`

		// 分享到聊天框用到
		shareInfo.path = computed(
			() =>
				`/pages/main/index/index?invitationCode=${useUserMain.userid}&storeId=${
					useUserMain.storeId
				}&Mscene=8&targetId=${articleObj.value.id}`
		)
		// 分享到朋友圈用到
		shareInfo.query = computed(
			() =>
				`invitationCode=${useUserMain.userid}&storeId=${useUserMain.storeId}&Mscene=8&targetId=${articleObj.value.id}`
		)
	})
})

const mpLoad = () => {
	// console.log('dom加载完成')
	setTimeout(()=>{
		loading.value = false
	},300)
}
</script>
<style lang="scss" scoped>
.inviteStore {
	padding: 0;
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
:global(page) {
	background-color: rgb(255, 255, 255);
}
.title {
	padding: 40rpx 30rpx;
	font-size: 38rpx;
	font-weight: 500;
	line-height: 1.8;
}
</style>
