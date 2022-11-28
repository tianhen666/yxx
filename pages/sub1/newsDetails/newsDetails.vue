<template>
	<!-- 提示登录组件 -->
	<m-authorized-login ref="mLogin"></m-authorized-login>
	<!-- 加载提示 -->
	<m-page-loading v-if="loading"></m-page-loading>

	<view class="container">
		<view class="title">{{ articleObj.title }}</view>
		<view class="time_box">
			<text class="text1">{{ dayjs(articleObj.createDt).format('YYYY年MM月DD日') }}</text>
			<text class="text2"  v-if="articleObj.classify==='鸭鸭课堂'">{{ articleObj.classify }}</text>
			<text class="text3"  v-if="articleObj.classify==='公益活动'">{{ articleObj.classify }}</text>
		</view>
		<view class="content">
			<mp-html
				:content="articleObj.content"
				@load="loading = false"
				container-style="background-color:rgb(255, 255, 255);line-height:1.6;font-size: 15px;overflow: hidden;display: inline;white-space: pre-wrap;white-space: pre-line;"
			/>
		</view>
		<view class="blank40"></view>
		<!-- 相关商品 -->
		<view class="related_goods" v-if="articleObj.storeProductList && articleObj.storeProductList?.length > 0">
			<m-shop-list :listData="articleObj.storeProductList" showBtn>
				<template #title>
					<m-title2 title="相关商品" />
				</template>
			</m-shop-list>
		</view>
		<view class="blank20"></view>
	</view>
	<!-- 分享 -->
	<button class="inviteStore" open-type="share">
		<text>分享</text>
		<text>文章</text>
	</button>
</template>

<script setup>
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref, computed, reactive } from 'vue'
import { _freePublishGetInfo } from '@/aTemp/apis/wx.js'
import dayjs from 'dayjs'

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
onLoad(options => {
	articleId.value = decodeURIComponent(options.targetId || '')

	_freePublishGetInfo({
		freeId: articleId.value
	}).then(res => {
		try {
			if (res.data.storeProductList) {
				res.data.storeProductList.map((item, index, arr) => {
					item.pics = item.pics ? item.pics.split(',') : []
					return item
				})
			}
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
		} catch (e) {
			console.log(e)
		}
	})
})
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
	&:after {
		border: none;
	}
}
:global(page) {
	background-color: rgb(255, 255, 255);
}
.container{
	width: $main-width;
	margin: auto;
}
.title {
	padding: 40rpx 0;
	font-size: 40rpx;
	font-weight: 500;
}
.time_box {
	padding: 40rpx 0;
	padding-top: 0;
	font-size: 26rpx;
	.text1 {
		color: #999;
	}
	.text2 {
		color: #000;
		background-color: $main-color;
		border-radius: 100rpx;
		padding: 15rpx 20rpx;
		margin-left: 20rpx;
	}
	.text3{
		color: #fff;
		background-color: $sub-color;
		border-radius: 100rpx;
		padding: 15rpx 20rpx;
		margin-left: 20rpx;
	}
}
.content {
}
</style>
