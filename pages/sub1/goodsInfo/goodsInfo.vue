<template>
	<m-page-loading v-if="loading"></m-page-loading>
	<view class="container" v-else>
		<!-- 轮播图片 -->
		<m-carousel-goods :listData="dataObj.pics"></m-carousel-goods>

		<!-- 标题 -->
		<view class="title">{{ dataObj.title }}</view>

		<!-- 价格销量 -->
		<view class="box1">
			<!-- 价格 -->
			<view class="price_wrapper">
				<view class="price">
					<text class="price_cn">￥</text>
					<text>{{ dataObj.price }}</text>
				</view>
				<view class="originalPrice">
					<text>￥</text>
					<text class="through">{{ dataObj.priceNormal || dataObj.price }}</text>
				</view>
			</view>
			<!-- 销售量 -->
			<view class="sale">已售：{{ dataObj.sold || 0 }}件</view>
		</view>
		<view class="blank20"></view>

		<!-- 商品介绍 -->
		<view class="box2">
			<m-title2 title="商品介绍"></m-title2>

			<text class="descData">{{ dataObj.descData }}</text>
		</view>
		<view class="blank20"></view>

		<!-- 评论 -->
		<!-- 	<m-comment-list>
			<template #title>
				<m-title2 title="商品评价" moreText="查看全部" path="/pages-sub1/commentList/commentList"></m-title2>
			</template>
		</m-comment-list>
		<view class="blank20"></view> -->

		<!-- 商品详情 -->
		<view class="goods_img">
			<m-title1 title="商品详情"></m-title1>
			<image
				v-for="(item, index) in dataObj.detail"
				:key="index"
				class="image"
				:src="item"
				mode="widthFix"
				@tap="previewImage(dataObj.detail, index)"
			></image>
		</view>

		<!-- 底部按钮 -->
		<m-shop-btn-bottom
			:dataObj="dataObj"
			@tapCreateImg="tapCreateImg"
			@payConfirm="navigateTo(`/pages/sub1/confirmOrder/confirmOrder?id=${dataId}`)"
		></m-shop-btn-bottom>
	</view>

	<!-- 海报生成 -->
	<w-painter
		:palette="posterData.value"
		@imgOK="createImgOk"
		@imgErr="imgErr"
		:use2D="true"
		:dirty="false"
		:LRU="false"
		customStyle="left: -9999px; top: -9999rpx;position: absolute;"
	></w-painter>
</template>

<script setup>
import { ref, reactive, computed, getCurrentInstance } from 'vue'
import { _storeproductGetinfo } from '@/aTemp/apis/shop.js'
import { onLoad, onShow } from '@dcloudio/uni-app'
// base64转图片路径
import { base64ToPath } from 'image-tools'
import {
	navigateTo,
	previewImage,
	saveImageToPhotosAlbum,
	showLoading,
	showToastText,
	getImageInfo
} from '@/aTemp/utils/uniAppTools.js'
import { _wxWxqrCode } from '@/aTemp/apis/login.js'

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 分享 (onShareAppMessage,onShareTimeline) 不能删,必要 https://github.com/dcloudio/uni-app/issues/3097
import useShare from '@/aTemp/mixins/useShare.js'
const shareInfo = reactive({ title: '', path: '', imageUrl: '', query: '' })
// 设置分享
useShare(shareInfo)

// 数据ID
const dataId = ref(0)
// 数据对象
const dataObj = ref({ myType: '商品' })
// 加载中
const loading = ref(true)

onLoad(async options => {
	const { proxy } = getCurrentInstance()
	// 等待onLaunch中放行后执行
	await proxy.$onLaunched

	let { invitationCode, storeId, Mscene, targetId, scene } = options
	// 解析二维码中参数
	if (scene) {
		const codeParams = decodeURIComponent(scene)
		const codeParamsList = codeParams.split('&')
		const codeParamsObj = {}
		codeParamsList.forEach(item => {
			codeParamsObj[item.split('=')[0]] = item.split('=')[1]
		})

		// 覆盖上面几个参数值
		invitationCode = codeParamsObj['i']
		storeId = codeParamsObj['sd']
		Mscene = codeParamsObj['s']
		targetId = codeParamsObj['t']
	}
	console.log(
		'商品页面---' + '邀请人ID：' + invitationCode,
		'店铺id：' + storeId,
		'场景值：' + Mscene,
		'目标ID：' + targetId
	)

	// 获取商品ID
	dataId.value = parseInt(targetId) || 0

	// 发起商品详情请求
	_storeproductGetinfo({ id: dataId.value }).then(res => {
		const { code, data, msg } = res

		// 图片详情转列表
		;(data.detail = data.detail ? data.detail.split(',') : []),
			// 主图转列表
			(data.pics = data.pics ? data.pics.split(',') : [])
		// 商品信息赋值
		dataObj.value = data
		// 标识商品
		dataObj.value['myType'] = '商品'

		// 加载结束
		loading.value = false

		// 设置分享参数
		shareInfo.title = computed(() => `${useUserMain.nickname}-给您分享了【${dataObj.value.title}】`)
		shareInfo.path = computed(
			() =>
				`/pages/main/index/index?invitationCode=${useUserMain.userid}&storeId=${
					useUserMain.storeId
				}&Mscene=2&targetId=${dataObj.value.id}`
		)
		shareInfo.imageUrl =
			dataObj.value.sharePic || dataObj.value.pics[0] || `https://imgs.fenxiangzl.com/store/tooth/invitbg.png`
	})
})

// 海报数据
const posterData = reactive({
	value: {}
})

// 生成海报函数
const tapCreateImg = async () => {
	showLoading('海报数据加载中')

	// 获取小程序码
	const wxWxqrCode = await _wxWxqrCode({
		page: 'pages/main/index/index',
		scene: `i=${useUserMain.userid}&sd=${useUserMain.storeId}&s=2&t=${dataObj.value.id}`,
		width: 430
	})
	// console.log('data:image/png;base64,' + wxWxqrCode.data)
	const imgPath = await base64ToPath('data:image/png;base64,' + wxWxqrCode.data)

	// 如果有海报
	if (dataObj.value.postPic) {
		// 获取海报图片尺寸
		const resImgInfo = await getImageInfo(dataObj.value.postPic)
		console.log(resImgInfo)
		//  海报宽度为500px高度，自动
		posterData.value = {
			width: '500px',
			height: resImgInfo.height / (resImgInfo.width / 500) + 'px',
			background: resImgInfo.path,
			views: [
				{
					id: '1',
					type: 'image',
					url: imgPath,
					css: {
						right: '13px',
						bottom: '13px',
						width: '106px',
						height: '106px'
					}
				}
			]
		}
	} else {
		posterData.value = {
			width: '750px',
			height: '1078px',
			background: '#FFF',
			views: [
				{
					id: '1_1',
					type: 'image',
					url: useUserMain.avatar || '/static/images/default_avatar.png',
					css: {
						top: '30px',
						left: '30px',
						width: '60px',
						height: '60px',
						borderRadius: '50%'
					}
				},
				{
					id: '1_2',
					type: 'inlineText',
					textList: [
						{
							text: useUserMain.nickname,
							css: { fontSize: '28px', color: '#333' }
						},
						{
							text: '  为您推荐',
							css: { fontSize: '28px', color: '#999' }
						}
					],
					css: {
						width: '610px',
						top: '45px',
						left: '110px'
					}
				},
				{
					id: '2',
					type: 'image',
					url: dataObj.value.pics[0],
					css: {
						top: '120px',
						left: '30px',
						width: '690px',
						height: '690px'
					}
				},
				{
					id: '3',
					type: 'text',
					text: dataObj.value.title,
					css: { top: '848px', left: '30px', fontSize: '32px', color: '#333' }
				},
				{
					id: '4',
					type: 'text',
					text: dataObj.value.price ? '￥' + dataObj.value.price : '免费活动',
					css: { top: '978px', left: '30px', fontSize: '38px', color: '#f73639' }
				},
				{
					id: '5',
					type: 'image',
					url: imgPath,
					css: {
						top: '848px',
						right: '30px',
						width: '160px',
						height: '160px'
					}
				},
				{
					id: '6',
					type: 'text',
					text: '长按识别',
					css: { top: '1018px', right: '58px', fontSize: '26px', color: '#999' }
				}
			]
		}
	}
}

// 图片生成完成
const createImgOk = e => {
	uni.hideLoading()
	saveImageToPhotosAlbum(e.detail.path).then(() => {
		// 分享图片
		uni
			.showShareImageMenu({
				path: e.detail.path
			})
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	})

	console.log(e.detail.path)
}
// 图片生成失败
const imgErr = e => {
	uni.hideLoading()
	showToastText('海报加载失败~')
}
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #f5f5f5;
}
.container {
	> .title {
		color: $text-color;
		background-color: #fff;
		padding: $padding;
		line-height: 1.6;
	}
	> .box1 {
		@include mFlex;
		justify-content: space-between;
		padding: 0 32rpx 32rpx;
		background-color: #fff;
		.price_wrapper {
			flex: none;
			width: 400rpx;
			overflow: hidden;
			flex-wrap: wrap;
			white-space: nowrap;
			@include mFlex;
			justify-content: left;
			.price {
				color: $sub-color;
				font-size: 40rpx;
				&_cn {
					font-size: 26rpx;
				}
				margin-right: 10rpx;
			}
			.originalPrice {
				margin-top: 10rpx;
				color: $text-color-grey;
				font-size: 26rpx;
				.through {
					text-decoration: line-through;
				}
			}
		}
		.sale {
			font-size: 26rpx;
			color: $text-color-grey;
		}
	}

	> .box2 {
		padding: $padding;
		background-color: #fff;
		.descData {
			font-size: 30rpx;
			color: #666;
			line-height: 1.6;
		}
	}

	> .goods_img {
		background-color: #fff;
		width: 750rpx;
		padding-top: 32rpx;
		> .image {
			width: 100%;
			height: auto;
		}
	}
}
</style>
