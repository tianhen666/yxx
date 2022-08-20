<template>
	<!-- 选项 -->
	<view class="shop_list" v-for="(item, key) in selectListData" :key="key">
		<!-- 图片 -->
		<image class="image" :src="item.pics[0]" mode="aspectFill"></image>

		<!-- 标题价格 -->
		<view class="center">
			<!-- 标题 -->
			<view class="title">{{ item.title }}</view>

			<!-- 价格 -->
			<view class="price_wrapper">
				<view class="price">
					<text class="price_cn">￥</text>
					<text>{{ item.price }}</text>
				</view>
				<view class="originalPrice">
					<text>￥</text>
					<text class="originalPrice_through">{{ item.priceNormal || item.price }}</text>
				</view>
			</view>
		</view>

		<!-- 删除 -->
		<view class="right" @click="delClick(item, key)">删除</view>
	</view>

	<!-- 提示 -->
	<view class="xiangguang" v-if="Object.keys(selectListData).length === 0">
		<view class="xiangguang_tips">{{ props.text }}</view>
	</view>

	<!-- 去选择页面按钮 -->
	<view class="xiangguang_box1" @tap="navigateTo(`/pages/sub2/selectShopItem/selectShopItem`)">
		<image class="image" src="/static/default/add.png" mode="aspectFill"></image>
		<view class="text">添加相关商品</view>
	</view>
</template>

<script setup>
import { toRefs } from 'vue'
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'
import { _storeSelectShop } from '@/aTemp/store/storeSelectShop.js'
// 商品选择的列表
const storeSelectShop = toRefs(_storeSelectShop())
// 选着数量,选中列表ID,选中列表数据
const { selectListData, selectListId } = storeSelectShop

const props = defineProps({
	text: {
		type: String,
		default: '添加相关商品'
	}
})
const delClick = (item, key) => {
	const index = selectListId.value.indexOf(item.id + '')
	selectListId.value.splice(index, 1)
	delete selectListData.value[key]
}
</script>

<style lang="scss" scoped>
.xiangguang {
	text-align: center;
	&_tips {
		color: $text-color-grey;
		margin-bottom: 15rpx;
	}
}
.xiangguang_box1 {
	@include mFlex;
	margin-top: 52rpx;
	> .image {
		width: 40rpx;
		height: 40rpx;
	}
	> .text {
		color: $main-color;
		margin-left: 15rpx;
	}
}
.shop_list {
	@include mFlex;
	justify-content: space-between;
	border-bottom: 1px solid $uni-border-3;
	padding-bottom: 30rpx;
	overflow: hidden;
	margin-bottom: 30rpx;
	&:last-child {
		border-bottom: none;
		margin-bottom: 0;
		padding-bottom: 0;
	}
	> .image {
		width: 100rpx;
		height: 100rpx;
		flex: none;
	}
	> .center {
		flex: auto;
		margin: 0 20rpx;
		overflow: hidden;
		> .title {
			@include singleLineTextOverHidden;
			font-size: 28rpx;
			margin-bottom: 25rpx;
			color: $uni-main-color;
		}
		> .price_wrapper {
			white-space: nowrap;
			overflow: hidden;
			@include mFlex;
			justify-content: left;
			flex-wrap: wrap;
			> .price {
				color: $sub-color;
				font-size: 36rpx;
				margin-right: 15rpx;
				.price_cn {
					font-size: 26rpx;
				}
			}
			> .originalPrice {
				margin-top: 15rpx;
				color: $uni-secondary-color;
				font-size: 26rpx;
				.originalPrice_through {
					text-decoration: line-through;
				}
			}
		}
	}
	> .right {
		width: 100rpx;
		flex: none;
		color: $sub-color;
		font-size: 30rpx;
		text-align: center;
		border: 1px solid $sub-color;
		padding: 10rpx;
		border-radius: 100rpx;
	}
}
</style>
