<template>
	<!-- tab切换 -->
	<uni-segmented-control :current="currentIndex" :values="items" style-type="text" @clickItem="onClickItem" />
	<view class="blank20"></view>

	<!-- tab内容 -->
	<pinapp-empty-page v-if="listData.length === 0" />
	<view class="tab_content" v-else>
		<view v-for="(item, index) in listData" :key="index" class="tab_content_item">
			<!-- 商品信息 -->
			<view class="tab_content_item_wrapper">
				<image class="image" :src="item.pics[0]" mode="scaleToFill" @tap="previewImage(item.pics)"></image>
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
				<view class="right">
					<view class="inventory">库存{{ item.avaliableCount || 0 }}</view>
				</view>
			</view>

			<!-- 按钮 -->
			<view class="box">
				<view class="sales">已售{{ item.sold || 0 }}</view>

				<view class="btn">
					<view class="btn_item style1" @tap="storeproductDisable(item, index)" v-if="item.status === 0">
						下架
					</view>
					<view
						v-if="item.status === 1"
						class="btn_item style1"
						@tap="
							navigateTo(`/pages/sub2/manageShopInput/manageShopInput?id=${item.id}&prevCurrentIndex=${currentIndex}`)
						"
					>
						编辑
					</view>
					<view class="btn_item style2" @tap="storeproductEnable(item, index)" v-if="item.status === 1">上架</view>
					<view class="btn_item style3" @tap="storeproductDelete(item, index)" v-if="item.status === 1">删除</view>
				</view>
			</view>
		</view>
	</view>

	<!-- 添加商品 -->
	<m-btn-fix-bottom
		text="添加商品"
		@btnClick="navigateTo(`/pages/sub2/manageShopInput/manageShopInput?prevCurrentIndex=1`)"
	/>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import {
	_storeproductGetlist,
	_storeproductEnable,
	_storeproductDisable,
	_storeproductDelete
} from '@/aTemp/apis/shop.js'
import { showModal, previewImage, navigateTo } from '@/aTemp/utils/uniAppTools.js'

// 商品列表
const listData = ref([])
// tab选项
const items = ref(['出售中', '仓库'])
//tab当前索引，0:出售中，1:仓库
const currentIndex = ref(0)

// 拉取商品列表数据
const storeproductGetlist = data => {
	_storeproductGetlist(data).then(res => {
		const { code, data, msg } = res
		// 将返回数据中的商品图片转化为数组
		listData.value = data.map((item, index, arr) => {
			item.pics = item.pics ? item.pics.split(',') : []
			return item
		})
	})
}

// 页面加载
onLoad(option => {
	// 设置tab索引
	currentIndex.value = parseInt(option.currentIndex) || 0
	// 拉取商品列表
	storeproductGetlist({ status: currentIndex.value })
})

// tab切换
const onClickItem = e => {
	if (currentIndex.value !== e.currentIndex) {
		currentIndex.value = e.currentIndex
		// 切换后重新获取商品数据
		storeproductGetlist({ status: currentIndex.value })
	}
}

// 放入仓库
const storeproductDisable = (item, index) => {
	showModal('是否放入仓库？').then(res => {
		if (res.confirm) {
			_storeproductDisable({ id: item.id }).then(() => {
				listData.value.splice(index, 1)
			})
		}
	})
}
// 删除
const storeproductDelete = (item, index) => {
	showModal('是否删除？').then(res => {
		if (res.confirm) {
			_storeproductDelete({ id: item.id }).then(() => {
				listData.value.splice(index, 1)
			})
		}
	})
}
// 启用
const storeproductEnable = (item, index) => {
	showModal('是否启用？').then(res => {
		if (res.confirm) {
			_storeproductEnable({ id: item.id }).then(() => {
				listData.value.splice(index, 1)
			})
		}
	})
}
</script>

<style lang="scss" scoped>
.tab_content {
	width: $main-width;
	margin: auto;
	
	&_item {
		background-color: #ffffff;
		padding: $padding;
		border-radius: 16rpx;
		overflow: hidden;
		margin-bottom: 30rpx;
		&_wrapper {
			@include mFlex;
			align-items: stretch;
			justify-content: space-between;
			> .image {
				width: 120rpx;
				height: 120rpx;
				flex: none;
				border-radius: 8rpx;
			}
			> .center {
				flex: auto;
				margin: 0 30rpx;
				overflow: hidden;
				@include mFlex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;
				> .title {
					color: $uni-main-color;
					font-size: 30rpx;
					@include singleLineTextOverHidden;
				}
				> .price_wrapper {
					white-space: nowrap;
					@include mFlex;
					justify-content: left;
					flex-wrap: wrap;
					overflow: hidden;
					> .price {
						color: $sub-color;
						font-size: 36rpx;
						margin-right: 15rpx;
						font-weight: bold;
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
				width: 150rpx;
				flex: none;
				overflow: hidden;
				@include mFlex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-end;
				> .inventory {
					color: $uni-secondary-color;
					font-size: 26rpx;
				}
			}
		}
		> .box {
			margin-top: 15rpx;
			padding-top: 15rpx;
			border-top: 1px solid $uni-border-1;
			@include mFlex;
			justify-content: space-between;
			> .sales {
				color: $uni-secondary-color;
				font-size: 26rpx;
			}
			> .btn {
				> .btn_item {
					padding: 16rpx 30rpx;
					display: inline-block;
					text-align: center;
					border-radius: 100rpx;
					font-size: 26rpx;
					margin-right: 20rpx;
					&:last-child {
						margin-right: 0;
					}
				}
				> .style1 {
					background-color: $main-color;
					color: #ffffff;
				}
				> .style2 {
					color: $uni-secondary-color;
					border: 1px solid $uni-border-3;
				}
				> .style3 {
					background-color: $sub-color;
					color: #ffffff;
				}
			}
		}
	}
}
</style>
