<template>
	<!-- tab切换 -->
	<uni-segmented-control :current="currentIndex" :values="items" style-type="text" @clickItem="onClickItem" />
	<view class="blank20"></view>

	<!-- tab内容 -->
	<pinapp-empty-page v-if="listData.length === 0" />
	<view class="tab_content" v-else>
		<view v-for="(item, index) in listData" :key="index" class="tab_content_item">
			<image class="image" :src="item.banner" mode="scaleToFill" @tap="previewImage([item.banner])"></image>
			<view class="right">
				<view class="text1">序号：{{ item.sort || 1 }}</view>
				<view class="btn">
					<view
						class="btn_item style1"
						@tap="
							navigateTo(
								`/pages/sub2/manageBannerInput/manageBannerInput?id=${item.id}&prevCurrentIndex=${currentIndex}`
							)
						"
					>
						编辑
					</view>
					<view class="btn_item style2" @tap="bannerDisable(item, index)" v-if="item.sfuse === 0">放入仓库</view>
					<view class="btn_item style2" @tap="bannerEnable(item, index)" v-if="item.sfuse === 1">启用</view>
					<view class="btn_item style3" @tap="bannerDelete(item, index)" v-if="item.sfuse === 1">删除</view>
				</view>
			</view>
		</view>
	</view>

	<!-- 添加banner -->
	<m-btn-fix-bottom
		text="添加banner"
		@btnClick="navigateTo(`/pages/sub2/manageBannerInput/manageBannerInput?prevCurrentIndex=1`)"
	/>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { _bannerList, _bannerDisable, _bannerDelete, _bannerEnable } from '@/aTemp/apis/banner'
import { showModal, previewImage, navigateTo } from '@/aTemp/utils/uniAppTools'

// tab选项
const items = ref(['启用中', '仓库'])
//tab当前索引，0:启用中，1:仓库
const currentIndex = ref(0)
// 数据列表
const listData = ref([])

// 拉取banner列表数据
const bannerList = data => {
	_bannerList(data).then(res => {
		const { code, data, msg } = res
		listData.value = data
	})
}

// 页面加载
onLoad(option => {
	// 设置tab索引
	currentIndex.value = parseInt(option.currentIndex) || 0
	// 拉取banner列表
	bannerList({ sfuse: currentIndex.value })
})

// tab切换
const onClickItem = e => {
	if (currentIndex.value !== e.currentIndex) {
		currentIndex.value = e.currentIndex
		// 切换后重新获取banner数据
		bannerList({ sfuse: currentIndex.value })
	}
}

// 放入仓库
const bannerDisable = (item, index) => {
	showModal('是否放入仓库？').then(res => {
		if (res.confirm) {
			_bannerDisable({ id: item.id }).then(() => {
				listData.value.splice(index, 1)
			})
		}
	})
}
// 删除
const bannerDelete = (item, index) => {
	showModal('是否删除？').then(res => {
		if (res.confirm) {
			_bannerDelete({ id: item.id }).then(() => {
				listData.value.splice(index, 1)
			})
		}
	})
}
// 启用
const bannerEnable = (item, index) => {
	showModal('是否启用？').then(res => {
		if (res.confirm) {
			_bannerEnable({ id: item.id }).then(() => {
				listData.value.splice(index, 1)
			})
		}
	})
}
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #f5f5f5;
}
.tab_content {
	&_item {
		@include mFlex;
		background-color: #ffffff;
		padding: $padding;
		justify-content: space-between;
		border-bottom: 1px solid $uni-border-4;
		&:last-child {
			border: none;
		}
		> .image {
			width: 240rpx;
			height: 240rpx * 3 * 0.2;
			flex: none;
			border-radius: 8rpx;
		}
		> .right {
			flex: auto;
			margin-left: 30rpx;
			overflow: hidden;
			> .text1 {
				color: $text-color-grey;
				font-size: 28rpx;
			}
			> .btn {
				margin-top: 40rpx;
				.btn_item {
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
				.style1 {
					background-color: $main-color;
					color: #ffffff;
				}
				.style2 {
					color: $uni-secondary-color;
					border: 1px solid $uni-border-3;
				}
				.style3 {
					background-color: $sub-color;
					color: #ffffff;
				}
			}
		}
	}
}
</style>
