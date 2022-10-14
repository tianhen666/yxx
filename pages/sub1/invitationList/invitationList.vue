<template>
	<view class="">
		<!-- 背景 -->
		<view class="pageBg">
			<image class="image" src="/static/images/bg.png" mode="aspectFill"></image>
		</view>
		<!-- 标题栏 -->
		<uni-nav-bar
			@clickLeft="navigateBack"
			left-icon="left"
			title="我的邀请"
			fixed
			statusBar
			color="#ffffff"
			:border="false"
		></uni-nav-bar>

		<!-- 邀请统计 -->
		<view class="box1 box">
			<view class="box1_item">
				<view class="text">全部邀请</view>
				<view class="text_num">{{statistics.inviteall}}人</view>
			</view>
			<view class="box1_item">
				<view class="text">本月邀请</view>
				<view class="text_num">{{statistics.invitemonth}}人</view>
			</view>
			<view class="box1_item">
				<view class="text">今日邀请</view>
				<view class="text_num">{{statistics.invitesky}}人</view>
			</view>
		</view>
		<view class="blank40"></view>
		<view class="blank20"></view>
		<view class="box"><m-title2 title="邀请记录"></m-title2></view>
		<view class="blank20"></view>
	</view>
	<!-- 数据列表 -->
	<view class="box2 box">
		<z-paging
			ref="pagingObj"
			v-model="dataList"
			@query="queryList"
			:fixed="false"
			created-reload
			min-delay="1000"
			show-loading-more-when-reload
		>
			<template v-for="(item, index) in dataList" :key="index">
				<view class="box2_item" v-if="item?.user">
					<view class="left">
						<view class="wrapper">
							<image
								class="image"
								:src="item?.user?.avatar || '/static/images/default_avatar.png'"
								mode="aspectFill"
							></image>
							<text class="text" v-if="item?.user?.mobile">{{ item?.user?.nickname }}</text>
							<text class="text" v-else>未授权用户</text>
						</view>
					</view>
					<view class="right">
						<text class="text">{{ dayjs(item.createDt).format('YYYY-M-D HH:mm:ss') }}</text>
					</view>
				</view>
			</template>
		</z-paging>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { _userInviteGetlist, _userInviteGetinfo } from '@/aTemp/apis/user.js'
import dayjs from 'dayjs'
import { navigateBack } from '@/aTemp/utils/uniAppTools.js'

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 数据列表
const dataList = ref([])
// 当前选择的索引
const tabIndex = ref(0)
// 插件对象
const pagingObj = ref(null)
// 邀请统计
const statistics = ref({})

// 页面加载
onLoad(options => {
	// console.log(options)
	userInviteGetinfo()
})

// 获取个人邀请统计数据
const userInviteGetinfo = () => {
	_userInviteGetinfo().then(res => {
		const { msg, data, code } = res
		statistics.value = data
	})
}

// 获取个人邀请列表
const queryList = (pageNo, pageSize) => {
	const params = {
		pageNum: pageNo,
		pageSize: pageSize
	}
	_userInviteGetlist(params)
		.then(res => {
			// 列表赋值
			pagingObj.value.complete(res.data)
		})
		.catch(res => {
			pagingObj.value.complete(false)
		})
}
</script>

<style lang="scss" scoped>
.box {
	width: $main-width;
	margin: auto;
	position: relative;
	z-index: 2;
}
.box1 {
	background-color: #fff;
	padding: $padding;
	border-radius: 16rpx;
	@include mFlex;
	justify-content: space-between;
	padding-bottom: 40rpx;
	color: #333;
	font-size: 28rpx;
	.box1_item {
		width: 33.3%;
		flex: none;
		overflow: hidden;
		text-align: center;
		> .text {
			margin-bottom: 30rpx;
		}
	}
}

.box2 {
	background-color: #ffffff;
	padding: $padding;
	border-radius: 16rpx;
	height: #{calc(100vh - 300px)};
	box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
	.box2_item {
		@include mFlex;
		justify-content: space-between;
		text-align: center;
		border-bottom: 1px solid #eee;
		padding-bottom: 20rpx;
		margin-bottom: 20rpx;
		font-size: 28rpx;
		&:last-of-type {
			border: none;
			padding-bottom: 0;
			margin-bottom: 0;
		}
		.left {
			width: 50%;
			flex: none;
			overflow: hidden;
			> .wrapper {
				@include mFlex;
				justify-content: left;
				> .image {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					flex: none;
				}
				> .text {
					flex: auto;
					margin-left: 20rpx;
					color: $text-color-grey;
					@include singleLineTextOverHidden;
					font-size: 28rpx;
					text-align: left;
				}
			}
		}
		.right {
			width: 40%;
			flex: none;
			overflow: hidden;
			> .text {
				color: $text-color-grey;
				font-size: 26rpx;
			}
		}
	}
}
</style>
