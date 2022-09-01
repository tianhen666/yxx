<template>
	<view class="container">
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
		<view class="goods_img" @tap="previewImage(dataObj.detail)">
			<m-title1 title="商品详情"></m-title1>
			<image v-for="(item, index) in dataObj.detail"  :key="index" class="image" :src="item" mode="widthFix"></image>
		</view>

		<!-- 底部按钮 -->
		<m-shop-btn-bottom @clickBuy="navigateTo(`/pages/sub1/confirmOrder/confirmOrder?id=${dataId}`)"></m-shop-btn-bottom>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { _storeproductGetinfo } from '@/aTemp/apis/shop.js'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { navigateTo,previewImage } from '@/aTemp/utils/uniAppTools.js'

// 数据ID
const dataId = ref(0)
// 数据对象
const dataObj = ref({})

onLoad(options => {
	dataId.value = options.id || 0
	_storeproductGetinfo({ id: dataId.value }).then(res => {
		const { code, data, msg } = res
		;(data.detail = data.detail ? data.detail.split(',') : []), (data.pics = data.pics ? data.pics.split(',') : [])
		dataObj.value = data
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
