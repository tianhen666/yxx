<template>
	<!-- 提示登录组件 -->
	<m-authorized-login ref="mLogin"></m-authorized-login>

	<!-- 加载提示 -->
	<m-page-loading v-if="loading"></m-page-loading>

	<z-paging
		ref="pagingObj"
		v-model="mdataList"
		@query="getListData"
		min-delay="1000"
		created-reload
		show-loading-more-when-reload
	>
		<!-- 固定顶部 -->
		<template #top>
			<view class="blank40"></view>
		</template>

		<view class="item" v-for="(item, index) in mdataList" :key="index">
			<view
				class="item-inner"
				@tap="navigateTo(`/pages/sub1/newsDetails/newsDetails?targetId=${encodeURIComponent(item.id)}`)"
			>
				<view class="img_box">
					<image class="img" :src="item.thumbUrl" mode="aspectFill"></image>
					<view class="type type0" v-if="item.classify==='鸭鸭课堂'">{{item.classify}}</view>
					<view class="type type1" v-if="item.classify==='公益活动'">{{item.classify}}</view>
				</view>
				<view class="right_box">
					<view class="title">{{ item.title }}</view>
					<view class="time">{{ dayjs(item.createDt).format('YYYY年MM月DD日') }}</view>
					<view class="digest">{{ item.digest || item.title }}</view>
				</view>
			</view>
			<!-- 按钮 -->
			<view class="btn">
				<view
					class="btn_item style4"
					@tap.stop.prevent="navigateTo(`/pages/sub1/newsDetails/newsDetails?targetId=${item.id}`)"
				>
					查看
				</view>
				<view class="btn_item style1" @tap.stop.prevent="wxWxqrCode(item, index)">文章码</view>
				<view
					class="btn_item style2"
					@tap.stop.prevent="navigateTo(`/pages/sub2/manageNewInput/manageNewInput?id=${item.id}`)"
				>
					编辑
				</view>
				<view class="btn_item style3" @tap.stop.prevent="freePublishDelFree(item, index)">删除</view>
			</view>
		</view>

		<!-- 固定底部 -->
		<template #bottom>
			<m-btn-fix-bottom text="添加文章" @btnClick="navigateTo(`/pages/sub2/manageNewInput/manageNewInput`)" />
		</template>
	</z-paging>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { _freePublishGetStoreFree, _freePublishDelFree } from '@/aTemp/apis/wx.js'
import { navigateTo, showModal } from '@/aTemp/utils/uniAppTools.js'
import { showLoading } from '@/aTemp/utils/uniAppTools.js'
import dayjs from 'dayjs'

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

import { _wxWxqrCode } from '@/aTemp/apis/login.js'
// base64转图片路径
import { base64ToPath } from 'image-tools'

// z-ping对象
const pagingObj = ref(null)

// 加载中
const loading = ref(true)
// 数据列表
const mdataList = ref([])
onLoad(options => {})

// 获取文章列表
const getListData = (pageNo, pageSize) => {
	const params = {
		pageNum: pageNo,
		pageSize: pageSize,
		store_Id: useUserMain.storeId
	}
	_freePublishGetStoreFree(params)
		.then(res => {
			loading.value = false
			pagingObj.value.complete(res.data?.records || [])
		})
		.catch(error => {
			pagingObj.value.complete(false)
		})
}

// 生成直接邀请码
const wxWxqrCode = item => {
	showLoading('加载中')
	_wxWxqrCode({
		page: 'pages/main/index/index',
		scene: `i=${useUserMain.userid}&sd=${useUserMain.storeId}&s=8&t=${item.id}`,
		width: 430
	})
		.then(async res => {
			const { msg, data, code } = res
			const imgPath = await base64ToPath('data:image/png;base64,' + data)
			console.log('邀请码', imgPath)
			uni.hideLoading()
			// 分享图片
			uni
				.showShareImageMenu({
					path: imgPath
				})
				.then(res => {
					console.log(res)
				})
				.catch(err => {
					console.log(err)
				})
		})
		.catch(err => {
			console.log(err)
			showToastText('生成失败')
		})
}

// 删除
const freePublishDelFree = (item, index) => {
	showModal('是否删除？').then(res => {
		if (res.confirm) {
			_freePublishDelFree({ freeId: item.id }).then(() => {
				mdataList.value.splice(index, 1)
			})
		}
	})
}
</script>

<style lang="scss" scoped>
.item {
	margin: 32rpx;
	background-color: #fff;
	margin-top: 0;
	border-radius: 10rpx;
	overflow: hidden;
	padding: 24rpx;

	.item-inner {
		@include mFlex;
		align-items: flex-start;
		justify-content: space-between;
		.img_box {
			width: 240rpx;
			padding-top: 240rpx * 0.25 * 3;
			position: relative;
			flex: none;
			border-radius: 10rpx;
			overflow: hidden;
			background-color: #f1f1f1;
			.img {
				top: 0;
				left: 0;
				position: absolute;
				height: 100%;
				width: 100%;
				border-radius: 10rpx;
			}
			.type {
				position: absolute;
				right: 0;
				top: 20rpx;
				border-radius: 10rpx 0 0 10rpx;
				font-size: 24rpx;
				background-color: $main-color;
				padding: 8rpx 12rpx;
			}
			.type1 {
				color: #fff;
				background-color: $sub-color;
			}
		}
		.right_box {
			flex: none;
			width: 350rpx;
			.title {
				font-size: 30rpx;
				@include textOverHidden;
				line-height: 1.8;
				color: #000;
				font-weight: 400;
			}
			.time {
				margin-top: 20rpx;
				color: #999;
				font-size: 26rpx;
			}
			.digest {
				color: #999;
				font-size: 26rpx;
				@include singleLineTextOverHidden;
				margin-top: 20rpx;
			}
		}
	}
	.btn {
		@include mFlex;
		margin-top: 38rpx;

		justify-content: flex-end;
		.btn_item {
			padding: 16rpx 30rpx;
			text-align: center;
			border-radius: 100rpx;
			font-size: 26rpx;
			margin-right: 25rpx;
			&:last-child {
				margin-right: 0;
			}
		}
		.style1 {
			background-color: $main-color;
			color: #000;
		}
		.style2 {
			color: $uni-secondary-color;
			border: 1px solid $uni-border-3;
		}
		.style3 {
			background-color: $sub-color;
			color: #ffffff;
		}
		.style4 {
			background-color: rgb(0, 168, 112);
			color: #ffffff;
		}
	}
}
</style>
