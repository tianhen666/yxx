<template>
	<view class="blank32"></view>

	<!-- 数据列表 -->
	<pinapp-empty-page v-if="listData.length === 0" />
	<view class="tab_content" v-else>
		<view v-for="(item, index) in listData" :key="index" class="tab_content_item">
			<image
				class="image"
				:src="item.avatar?item.avatar[0]:''"
				mode="aspectFit"
				@tap="navigateTo(`/pages/sub1/dentistInfo/dentistInfo?targetId=${item.id}`)"
			></image>
			<view class="right">
				<view class="name">姓名：{{ item.name }}</view>
				<view class="post">职务：{{ item.post }}</view>
				<view class="descData">简介：{{ item.descData }}</view>
				<view class="btn">
					<view
						class="btn_item style1"
						@tap="navigateTo(`/pages/sub2/manageDoctorInput/manageDoctorInput?id=${item.id}`)"
					>
						编辑
					</view>
					<view class="btn_item style3" @tap="mDelete(item, index)">删除</view>
				</view>
			</view>
		</view>
	</view>

	<!-- 添加医生 -->
	<m-btn-fix-bottom text="添加医生" @btnClick="navigateTo(`/pages/sub2/manageDoctorInput/manageDoctorInput`)" />
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { _storedoctorGetlist, _storedoctorDelete } from '@/aTemp/apis/doctor.js'
import { showModal, previewImage, navigateTo } from '@/aTemp/utils/uniAppTools'

// 数据列表
const listData = ref([])

// 拉取拉取数据列表
const getList = () => {
	_storedoctorGetlist().then(res => {
		const { code, data, msg } = res
		data.map((item, index) => {
			item.avatar = item.avatar.split(',')
			return item
		})
		listData.value = data
	})
}

// 页面加载
onLoad(option => {
	getList()
})

// 删除
const mDelete = (item, index) => {
	showModal('是否删除？').then(res => {
		if (res.confirm) {
			_storedoctorDelete({ id: item.id }).then(() => {
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
		@include mFlex;
		background-color: #ffffff;
		padding: $padding;
		justify-content: space-between;
		margin-bottom: 30rpx;
		border-radius: 16rpx;
		overflow: hidden;
		&:last-child {
			margin-bottom: 0;
		}
		> .image {
			height: 280rpx;
			width: 280rpx;
			flex: none;
			border-radius: 8rpx;
		}
		> .right {
			flex: auto;
			margin-left: 30rpx;
			overflow: hidden;
			color: $text-color-grey;
			font-size: 28rpx;
			> .post {
				margin: 32rpx 0;
			}
			> .descData {
				line-height: 1.6;
				padding-left: 3em;
				text-indent: -3em;
				@include textOverHidden;
			}
			> .btn {
				margin-top: 32rpx;
				text-align: right;
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
