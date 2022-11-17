<template>
	<!-- 加载中 -->
	<m-page-loading v-if="loading"></m-page-loading>

	<view class="container" v-else>
		<!-- 封面图 -->
		<view class="banner_img"><image class="image" :src="dataObj.mainPic" mode="aspectFill"></image></view>
		<view class="blank24"></view>

		<!-- 模块一 -->
		<view class="box1 box">
			<!-- 倒计时 -->
			<view class="count_down">
				<image class="image" src="/static/images/time.png" mode="aspectFill"></image>
				<text>距离结束还剩</text>
				<text class="text1">{{ djs }}</text>
			</view>
			<!-- 标题 -->
			<view class="title">{{ dataObj.title }}</view>
			<!-- 时间 -->
			<view class="time">
				时间：{{
					dayjs().format('YYYY年M月D日') + '  至  ' + dayjs().add(30,'days').format('YYYY年M月D日')
				}}
			</view>
			<!-- 参与人 -->
			<view class="join">
				<view class="join_left">
					<view class="num">已有{{ (dataObj.count || 0) + (dataObj.views || 0) }}人参与活动</view>
					<view class="img_wrapper">
						<template v-for="(item, index) in dataObj.activityListObj" :key="index">
							<view
								class="image_box"
								:style="{ zIndex: index + 1, left: index * 40 + 'rpx' }"
								v-if="item && index < 10"
							>
								<image
									class="image"
									:src="item.avatar || '/static/images/default_avatar.png'"
									mode="aspectFill"
								></image>
							</view>
						</template>
					</view>
				</view>
				<button class="jion_right" @tap="preview">{{ dataObj.myJionCount > 0 ? '已参与' : '参与活动' }}</button>
			</view>

			<!-- 购买须知 -->
			<view class="gmxz">购买须知：此活动为特惠活动，售后请联系门诊</view>
		</view>
		<view class="blank24"></view>

		<!-- 活动内容 -->
		<view class="box2 box">
			<m-title2 title="活动内容"></m-title2>
			<view class="content_text">
				<text class="text">{{ dataObj.content }}</text>
			</view>
			<view class="content_img" v-if="dataObj.details">
				<image
					class="image"
					v-for="(item, index) in dataObj.details.split(',')"
					:key="index"
					:src="item"
					@tap="previewImage(dataObj.details.split(','), index)"
					mode="widthFix"
				></image>
			</view>
		</view>
	</view>
	<view class="blank24"></view>

	<view class="btn_fix_wrapper">
		<view class="btn_fix">
			<!-- 按钮区 -->
			<view class="btn_container">
				<view class="left">
					<button class="btn" @tap="preview">
						<view class="text">分享{{ dataObj.myType === '活动' ? '活动' : '商品' }}</view>
						<view class="price" v-if="dataObj.showShare === 0 && dataObj.sharePrice > 0">
							赚￥{{ dataObj.sharePrice }}
						</view>
					</button>
				</view>
				<view class="center" @tap="preview">
					<button class="btn">
						<view class="text">分享海报</view>
						<view class="price" v-if="dataObj.showShare === 0 && dataObj.sharePrice > 0">
							赚￥{{ dataObj.sharePrice }}
						</view>
					</button>
				</view>
				<view class="right">
					<button class="right_btn" @tap="preview">
						<view class="text" v-if="dataObj.myType === '活动'">
							{{ dataObj.myJionCount > 0 ? '已参与' : '参与活动' }}
						</view>
						<view class="text" v-else>立即购买</view>
						<view class="price" v-if="dataObj.price > 0">￥{{ dataObj.price }}</view>
					</button>
				</view>
			</view>

			<view
				class="useM"
				@tap.stop="navigateTo(`/pages/sub2/addActivityTemplate/addActivityTemplate?addTemplate=1&id=${dataId}`)"
			>
				使用此模板，马上制作活动>
			</view>
		</view>
	</view>

	<!-- 普通弹窗 -->
	<m-popup ref="popupObj" :content="dataObj.description"></m-popup>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { _enrollFormTemplateGetinfo } from '@/aTemp/apis/activity.js'
import { _countDown } from '@/aTemp/utils/tools.js'
import dayjs from 'dayjs'
import { showToastText, previewImage, navigateTo } from '@/aTemp/utils/uniAppTools.js'
// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 弹出层
const popupObj = ref(null)

// 加载中
const loading = ref(true)
// 数据ID
const dataId = ref('')
// 数据对象
const dataObj = ref({ myType: '活动' })

// 页面开始加载
onLoad(async options => {
	let { targetId } = options
	dataId.value = parseInt(targetId) || ''
	// 获取活动详情
	enrollformGetinfo()
})

// 获取活动详情
const enrollformGetinfo = () => {
	// 加载中
	loading.value = true
	_enrollFormTemplateGetinfo({ id: dataId.value }).then(res => {
		const { data, code, msg } = res

		// 活动详情
		dataObj.value = data.getinfo
		// 已参加活动人数
		dataObj.value['count'] = data.count
		// 已参与活动人的信息列表
		dataObj.value['activityListObj'] = data.activitynumber
		// 自己参与活动次数
		dataObj.value['myJionCount'] = data.purchasecount

		// 标识活动商品
		dataObj.value['myType'] = '活动'

		// 倒计时
		const timeDjs = dayjs(dayjs().add(30,'days'))
		djsFun(timeDjs)

		// 数据加载结束
		loading.value = false

		// 弹出提示
		popupObj.value.popupfun()
	})
}

// 倒计时
const djs = ref('')
let djsIndex = 0
const djsFun = time => {
	djsIndex = setInterval(() => {
		// console.log("定时器执行",time)
		djs.value = _countDown(time, djsIndex)
	}, 100)
}
//页面卸载执行
onUnload(() => {
	// console.log('页面卸载')
	// 移除定时器
	clearInterval(djsIndex)
})

const preview = () => {
	showToastText('当前在预览中，不能操作')
}
</script>

<style lang="scss" scoped>

.banner_img {
	> .image {
		width: 750rpx;
		height: 750rpx * 0.8;
	}
}

.box {
	padding: 38rpx 24rpx;
	background-color: #fff;
	width: $main-width;
	margin: auto;
	border-radius: 16rpx;
}

.box1 {
	> .count_down {
		background-color: #fff6ea;
		color: #f73639;
		font-size: 28rpx;
		padding: 20rpx;
		@include mFlex;
		justify-content: flex-start;
		border-radius: 16rpx;
		> .image {
			flex: none;
			height: 40rpx;
			width: 40rpx;
			margin-right: 10rpx;
		}
		> .text1 {
			padding-left: 10rpx;
			font-weight: 600;
		}
	}

	> .title {
		color: $text-color;
		@include singleLineTextOverHidden;
		overflow: hidden;
		font-size: 36rpx;
		font-weight: 600;
		padding: 48rpx 0;
	}

	> .time {
		color: $text-color-grey;
		font-size: 28rpx;
	}
	> .join {
		background-color: #fafafa;
		border-radius: 16rpx;
		margin-top: 48rpx;
		padding: $padding;
		@include mFlex;

		.join_left {
			flex: auto;
			overflow: hidden;
			.num {
				font-size: 26rpx;
				color: #666666;
				padding-bottom: 20rpx;
			}
			.img_wrapper {
				position: relative;
				overflow: hidden;
				height: 54rpx;
				width: 100%;
				> .image_box {
					position: absolute;
					top: 0;
					border-radius: 50%;
					width: 54rpx;
					height: 54rpx;
					padding: 2rpx;
					background-color: #fff;
					overflow: hidden;
					> .image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
			}
		}
		.jion_right {
			font-size: 26rpx;
			font-weight: bold;
			color: #fff;
			width: 170rpx;
			background-color: $main-color;
			border-radius: 50rpx;
			line-height: 2.2;
			&:after {
				border: none;
			}
		}
	}

	> .gmxz {
		color: #666666;
		font-size: 26rpx;
		margin-top: 30rpx;
	}
}

.box2 {
	background-color: #fff;
	> .content_text {
		> .text {
			display: block;
			border-radius: 16rpx;
			line-height: 1.6;
			font-size: 28rpx;
			overflow: hidden;
		}
	}
	> .content_img {
		background-color: #fafafa;
		> .image {
			width: 100%;
			height: auto;
		}
	}
}

/* 底部按钮 */
.btn_fix_wrapper {
	height: 280rpx;
	padding-bottom: 40rpx;
	.btn_fix {
		position: fixed;
		z-index: 88;
		bottom: 0;
		width: 100%;
		background: #fff;
		padding-bottom: 40rpx;
		border-top: 1px solid #ddd;
		.btn_container {
			height: 100%;
			@include mFlex;
			padding-top: 20rpx;
			justify-content: space-around;
			align-items: stretch;
			text-align: center;
			.left {
				@include mFlex;
				flex-direction: column;
				flex: none;
				.btn {
					padding: 10rpx;
					font-weight: bold;
					font-size: 32rpx;
					border-radius: 0;
					color: $main-color;
					background-color: transparent;
					line-height: 1;
					&:after {
						border: none;
					}
				}
				.price {
					color: $main-color;
					padding-top: 15rpx;
					font-weight: normal;
					font-size: 26rpx;
				}
			}
			.center {
				@include mFlex;
				flex-direction: column;
				flex: none;
				color: $main-color;
				font-size: 32rpx;
				.btn {
					padding: 10rpx;
					font-weight: bold;
					font-size: 32rpx;
					border-radius: 0;
					color: $main-color;
					background-color: transparent;
					line-height: 1;
					&:after {
						border: none;
					}
				}
				.text {
					font-size: 32rpx;
					font-weight: bold;
				}
				.price {
					padding-top: 15rpx;
					font-weight: normal;
					font-size: 26rpx;
				}
			}
			.right {
				@include mFlex;
				flex: none;
				width: 33.3%;
				color: #fff;
				.right_btn {
					width: 100%;
					height: 100rpx;
					@include mFlex;
					flex-direction: column;
					background-color: $main-color;
					border-radius: 16rpx;
					color: #fff;
					line-height: 1;
					&:after {
						border: none;
					}
					.text {
						font-size: 32rpx;
						font-weight: bold;
					}
					.price {
						padding-top: 15rpx;
						font-weight: normal;
						font-size: 28rpx;
					}
				}
			}
		}
	}
}

.useM {
	margin-top: 40rpx;
	padding: 28rpx 0;
	text-align: center;
	background-color: #{$main-color}99;
}

</style>
