<template>
	<!-- tab内容 -->
	<pinapp-empty-page v-if="listData.length === 0" />
	<view class="tab_content" v-else>
		<view class="blank32"></view>
		<view v-for="(item, index) in listData" :key="index" class="tab_content_item">
			<!-- 文字信息 -->
			<view class="tab_content_item_wrapper">
				<view class="image_box">
					<image class="image" :src="item.mainPic" mode="scaleToFill" @tap="previewImage([item.mainPic])"></image>
				</view>
				<view class="center">
					<!-- 标题 -->
					<view class="title">{{ item.title }}</view>
				</view>
			</view>

			<!-- 按钮 -->
			<view class="box">
				<view class="sales">浏览量{{ item.views || 0 }}</view>

				<view class="btn">
					<view
						class="btn_item style1"
						@tap="navigateTo(`/pages/sub2/manageCaseInput/manageCaseInput?id=${item.id}`)"
					>
						编辑
					</view>
					<view class="btn_item style3" @tap="storecaseDelete(item, index)">删除</view>
				</view>
			</view>
		</view>
	</view>

	<!-- 添加案例 -->
	<m-btn-fix-bottom-category
		text1="管理分类"
		text2="添加案例"
		@btnClick1="navigateTo(`/pages/sub2/manageCaseCategoryList/manageCaseCategoryList`)"
		@btnClick2="navigateTo(`/pages/sub2/manageCaseInput/manageCaseInput`)"
	/>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { _storecaseGetlist, _storecaseDelete } from '@/aTemp/apis/case'
import { showModal, previewImage, navigateTo } from '@/aTemp/utils/uniAppTools.js'
// 数据列表
const listData = ref([])

// 拉取列表数据
const getListData = data => {
	_storecaseGetlist(data).then(res => {
		const { code, data, msg } = res
		// 返回的数据赋值
		listData.value = data
	})
}

// 页面加载
onLoad(option => {
	// 拉取商品列表
	getListData()
})

// 删除
const storecaseDelete = (item, index) => {
	showModal('是否删除？').then(res => {
		if (res.confirm) {
			_storecaseDelete({ id: item.id }).then(() => {
				listData.value.splice(index, 1)
			})
		}
	})
}
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: $uni-bg-color;
}
.tab_content {
	&_item {
		background-color: #ffffff;
		margin: 0 $padding;
		border-radius: 16rpx;
		overflow: hidden;
		margin-bottom: 32rpx;
		&:last-child {
			margin-bottom: 0;
		}
		&_wrapper {
			> .image_box {
				width: 100%;
				padding-top: 50%;
				position: relative;
				overflow: hidden;
				> .image {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}
			}
			> .center {
				overflow: hidden;
				margin: $padding;
				> .title {
					font-weight: bold;
					color: $uni-main-color;
					font-size: 30rpx;
					@include singleLineTextOverHidden;
				}
			}
		}
		> .box {
			margin: $padding;
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
