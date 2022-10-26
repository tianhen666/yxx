<template>
	<view class="container">
		<view class="box1">
			<uni-search-bar placeholder="搜索店铺名称" radius="50" v-model="searchText" bgColor="#EEEEEE" @confirm="search" />
		</view>
		<view class="blank20"></view>

		<view class="box2 box" v-for="(item, index) in dataList" :key="index">
			<!-- 门诊列表 -->
			<view class="box2_item">
				<view class="box2_item_box">
					<view class="box2_item_box_left">
						<image class="image" :src="item.pics || '/static/images/no_img.jpg'" mode="aspectFill"></image>
					</view>
					<view class="box2_item_box_right">
						<view class="name">{{ item.name }}</view>
						<view class="address">{{ `${item.address}${item.addressDetail}` }}</view>
					</view>
				</view>

				<!-- 按钮 -->
				<view class="box2_btn">
					<!-- <button class="box2_btn_item style1">删除</button> -->
					<button class="box2_btn_item style2" @tap="switchStore(item)">进入门诊</button>
				</view>
			</view>
		</view>

		<view class="blank40"></view>
		<view class="blank40"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { _storeGetinfolist } from '@/aTemp/apis/store.js'
import { _wxLogin } from '@/aTemp/apis/login.js'
import { reLaunch } from '@/aTemp/utils/uniAppTools.js'
import { _userChangeUserId } from '@/aTemp/apis/user.js'
// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 搜索文字
const searchText = ref('')
// 数据列表
const dataList = ref([])

// 页面加载，获取数据
onLoad(options => {
	storeGetinfolist()
})

// 搜索确认搜索
const search = () => {
	storeGetinfolist()
}

// 获取店铺连锁店铺
const storeGetinfolist = () => {
	_storeGetinfolist({ searchText: searchText.value }).then(res => {
		dataList.value = res.data
	})
}

// 切换店铺
const switchStore = async infoObj => {
	_userChangeUserId({ userid: infoObj.storeId })
		.then(res => {
			const { data, msg, code } = res
			// 设置缓存和全局中的店铺id
			useUserMain.$patch({ storeId: infoObj.storeId })
			reLaunch(`/pages/main/index/index?storeId=${infoObj.storeId}`)
		})
		.catch(err => {
			console.log(err)
		})
}
</script>

<style scoped lang="scss">
:global(.uni-searchbar) {
	padding: 0 !important;
}
.container {
	.box {
		width: $main-width;
		padding: $padding;
		background-color: #fff;
		margin: auto;
		border-radius: 16rpx;
	}

	.box1 {
		background-color: #fff;
		padding: $padding;
	}

	.box2 {
		margin-bottom: 32rpx;
		&:after {
			margin-bottom: 0;
		}
		&_item {
			&_box {
				@include mFlex;
				justify-content: space-between;
				align-items: stretch;
				&_left {
					flex: none;
					.image {
						width: 180rpx;
						height: 180rpx * 0.2 * 4;
						border: 1px solid $uni-border-1;
						border-radius: 10rpx;
						overflow: hidden;
					}
				}
				&_right {
					flex: auto;
					padding-left: 30rpx;
					overflow: hidden;
					.name {
						font-size: 32rpx;
						margin-top: 10rpx;
					}
					.address {
						padding-top: 24rpx;
						color: #999999;
						font-size: 26rpx;
						line-height: 1.4;
						@include textOverHidden;
					}
				}
			}
		}

		&_btn {
			@include mFlex;
			justify-content: flex-end;
			border-top: 1px solid $uni-border-2;
			padding-top: 26rpx;
			margin-top: 26rpx;
			&_item {
				font-size: 28rpx;
				line-height: 2.2;
				margin: 0;
				margin-left: 20rpx;
				background-color: #fff;
				&:after {
					border: 1px solid $uni-border-4;
				}
			}
			> .style1 {
			}
			> .style2 {
				background-color: $main-color;
				color: #fff;
			}
		}
	}
}
</style>
