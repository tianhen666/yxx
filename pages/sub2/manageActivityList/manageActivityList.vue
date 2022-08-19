<template>
	<!-- tab切换 -->
	<uni-segmented-control :current="currentIndex" :values="items" style-type="text" @clickItem="onClickItem" />
	<view class="blank32"></view>

	<!-- tab内容 -->
	<pinapp-empty-page v-if="listData.length === 0" />
	<view class="tab_content" v-else>
		<view v-for="(item, index) in listData" :key="index" class="tab_content_item">
			<!-- 商品信息 -->
			<view class="tab_content_item_wrapper">
				<view class="image_box">
					<image class="image" :src="item.mainPic" mode="scaleToFill" @tap="previewImage([item.mainPic])"></image>
					<view class="type">
						<view class="type_item">{{ type[item.type].text }}</view>
					</view>
				</view>
				<view class="center">
					<!-- 时间 -->
					<view class="time">
						{{ dayjs(item.startDt).format('YYYY年MM月DD日') + '--' + dayjs(item.endDt).format('YYYY年MM月DD日') }}
						<text class="color1">{{ dayjs(item.endDt).valueOf() < Date.now() ? '(已结束)' : '' }}</text>
					</view>
					<!-- 标题 -->
					<view class="title">{{ item.title }}</view>
				</view>
			</view>

			<!-- 按钮 -->
			<view class="box">
				<view class="sales">已参与{{ item.sold || 0 }}</view>

				<view class="btn">
					<view class="btn_item style2" @tap="enrollformDisable(item, index)" v-if="item.status === 0">
						下架
					</view>
					<view
						v-if="item.status === 1"
						class="btn_item style1"
						@tap="
							navigateTo(
								`/pages/sub2/manageActivityIpnut/manageActivityIpnut?id=${item.id}&prevCurrentIndex=${currentIndex}`
							)
						"
					>
						编辑
					</view>
					<view class="btn_item style2" @tap="enrollformEnable(item, index)" v-if="item.status === 1">启用</view>
					<view class="btn_item style3" @tap="enrollformDelete(item, index)" v-if="item.status === 1">删除</view>
				</view>
			</view>
		</view>
	</view>

	<!-- 添加活动 -->
	<m-btn-fix-bottom
		text="添加活动"
		@btnClick="navigateTo(`/pages/sub2/manageActivityIpnut/manageActivityIpnut?prevCurrentIndex=1`)"
	/>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { _enrollformGetlist, _enrollformDelete, _enrollformEnable, _enrollformDisable } from '@/aTemp/apis/activity.js'
import { showModal, previewImage, navigateTo } from '@/aTemp/utils/uniAppTools.js'
import dayjs from 'dayjs'
// 数据列表
const listData = ref([])
// tab选项
const items = ref(['启用中', '仓库'])
//tab当前索引，0:启用中，1:仓库
const currentIndex = ref(0)
/*
	活动类型
 */
const type = [
	{
		text: '义诊',
		value: 0
	},
	{
		text: '限时',
		value: 1
	},
	{
		text: '拼团',
		value: 2
	}
]

// 拉取列表数据
const getListData = data => {
	_enrollformGetlist(data).then(res => {
		const { code, data, msg } = res
		// 将返回数据中的商品图片转化为数组
		listData.value = data
	})
}

// 页面加载
onLoad(option => {
	// 设置tab索引
	currentIndex.value = parseInt(option.currentIndex) || 0
	// 拉取商品列表
	getListData({ status: currentIndex.value })
})

// tab切换
const onClickItem = e => {
	if (currentIndex.value !== e.currentIndex) {
		currentIndex.value = e.currentIndex
		// 切换后重新获取商品数据
		getListData({ status: currentIndex.value })
	}
}

// 放入仓库
const enrollformDisable = (item, index) => {
	showModal('是否放入仓库？').then(res => {
		if (res.confirm) {
			_enrollformDisable({ id: item.id }).then(() => {
				listData.value.splice(index, 1)
			})
		}
	})
}
// 删除
const enrollformDelete = (item, index) => {
	showModal('是否删除？').then(res => {
		if (res.confirm) {
			_enrollformDelete({ id: item.id }).then(() => {
				listData.value.splice(index, 1)
			})
		}
	})
}
// 启用
const enrollformEnable = (item, index) => {
	showModal('是否启用？').then(res => {
		if (res.confirm) {
			_enrollformEnable({ id: item.id }).then(() => {
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
				> .type {
					position: absolute;
					bottom: 20rpx;
					left: 20rpx;
					> .type_item {
						display: inline-block;
						color: #ffffff;
						background-color: $uni-mask;
						padding: 10rpx 20rpx;
						font-size: 26rpx;
						border-radius: 8rpx;
					}
				}
			}
			> .center {
				overflow: hidden;
				margin: $padding;
				> .time {
					font-size: 28rpx;
					color: $uni-base-color;
					.color1 {
						color: $uni-error;
					}
				}
				> .title {
					margin-top: 32rpx;
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
