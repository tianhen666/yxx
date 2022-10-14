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
			@payConfirm="navigateTo(`/pages/sub1/confirmOrder/confirmOrder?id=${dataId}`)"
		></m-shop-btn-bottom>
	</view>
</template>

<script setup>
import { ref, reactive, computed, getCurrentInstance } from 'vue'
import { _storeproductGetinfo } from '@/aTemp/apis/shop.js'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { navigateTo, previewImage } from '@/aTemp/utils/uniAppTools.js'

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
const dataObj = ref({})
// 加载中
const loading = ref(true)

onLoad(async options => {
	const { proxy } = getCurrentInstance()
	// 等待onLaunch中放行后执行
	await proxy.$onLaunched

	// 获取商品ID
	dataId.value = parseInt(options.targetId) || 0

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
		shareInfo.title = computed(() => `${useUserMain.nickname}-邀请您参加【${dataObj.value.title}】`)
		shareInfo.path = computed(
			() =>
				`/pages/sub1/goodsInfo/goodsInfo?invitationCode=${useUserMain.openId}&storeId=${
					useUserMain.storeId
				}&scene=2&targetId=${dataObj.value.id}`
		)
		shareInfo.imageUrl =
			dataObj.value.sharePic || dataObj.value.pics[0] || `https://imgs.fenxiangzl.com/store/tooth/invitbg.png`
	})
})
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
