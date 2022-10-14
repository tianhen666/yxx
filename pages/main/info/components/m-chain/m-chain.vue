<template>
	<view class="container">
		<slot name="title"></slot>
		<view class="box2_item_box" v-for="(item, index) in infoList" :key="index">
			<view class="box2_item_box_left">
				<image class="image" :src="item.pics || '/static/images/no_img.jpg'" mode="aspectFill"></image>
			</view>
			<view class="box2_item_box_right">
				<view class="name">{{ item.name }}</view>
				<view class="address">
					{{ `${item.address}${item.addressDetail}` }}
					<text class="btn" v-if="info.storeId != item.storeId" @tap.stop="switchStore(item)">切换门店</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { reLaunch } from '@/aTemp/utils/uniAppTools.js'
import { _wxLogin } from '@/aTemp/apis/login.js'

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

const props = defineProps({
	// 当前店铺信息
	infoList: {
		type: Array,
		required: true,
		default: () => []
	},
	// 当前店铺信息
	info: {
		type: Object,
		required: true,
		default: () => {}
	}
})

const switchStore = async item => {
	// 微信授权登录
	const wxCode = await uni.login()

	// 登录获取
	_wxLogin(
		{
			code: wxCode.code,
			storeId: item.storeId
		},
		{ storeId: item.storeId }
	)
		.then(resData => {
			const { code, data, msg } = resData
			const { openid, unionid, token, mobile, userid, power, avatar, nickname, remarkname } = data
			// 清理缓存
			// uni.clearStorageSync()

			// 获取到数据后赋值给全局变量
			useUserMain.$patch({
				openId: openid,
				unionId: unionid,
				token: token,
				mobile: mobile,
				userid: userid,
				power: power,
				avatar: avatar,
				nickname: nickname,
				remarkname: remarkname
			})

			// 跳转到首页
			reLaunch(`/pages/main/index/index?storeId=${item.storeId}`)
		})
		.catch(err => {})
}
</script>

<style lang="scss" scoped>
.container {
	width: $main-width;
	padding: $padding;
	background-color: #fff;
	overflow: hidden;
	margin: auto;
	position: relative;
	z-index: 2;
	border-radius: 16rpx;
	overflow: hidden;
}
.box2_item_box {
	@include mFlex;
	justify-content: space-between;
	align-items: stretch;
	margin-bottom: 32rpx;
	&:last-of-type {
		margin-bottom: 0;
	}
	&_left {
		flex: none;
		.image {
			width: 200rpx;
			height: 200rpx * 0.25 * 3;
			border: 1px solid $uni-border-1;
			border-radius: 10rpx;
			overflow: hidden;
		}
	}
	&_right {
		flex: auto;
		padding-left: 40rpx;
		overflow: hidden;
		.name {
			font-size: 32rpx;
		}
		.address {
			padding-top: 24rpx;
			color: #999999;
			font-size: 26rpx;
			line-height: 1.8;
			@include textOverHidden;
			.btn {
				background-color: $main-color;
				color: #fff;
				padding: 0 18rpx;
				margin-left: 10rpx;
				border-radius: 5rpx;
			}
		}
	}
}
</style>
