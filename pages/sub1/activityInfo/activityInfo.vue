<template>
	<!-- 提示登录组件 -->
	<m-authorized-login ref="mLogin"></m-authorized-login>

	<!-- 加载中 -->
	<m-page-loading v-if="loading"></m-page-loading>

	<view class="container" v-else>
		<!-- 视频 -->
		<view class="video_box" v-if="dataObj.imgs">
			<video
				id="myVideo0"
				class="myVideo"
				:src="dataObj.imgs"
				:poster="dataObj.mainPic"
				controls
				@tap.stop.prevent="videoTap(0)"
				object-fit="cover"
			></video>
		</view>

		<!-- 封面图 -->
		<view class="banner_img" v-else><image class="image" :src="dataObj.mainPic" mode="aspectFill"></image></view>
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
					dayjs(dataObj.startDt).format('YYYY年M月D日') + '  至  ' + dayjs(dataObj.endDt).format('YYYY年M月D日')
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
				<button class="jion_right" @tap="payConfirm">{{ dataObj.myJionCount > 0 ? '已参与' : '参与活动' }}</button>
			</view>

			<!-- 购买须知 -->
			<view class="gmxz">购买须知：此活动为特惠活动，售后请联系门诊</view>
		</view>
		<view class="blank24"></view>

		<!-- 相关商品 -->
		<view class="box3 box" v-if="dataObj.storeProductList && dataObj.storeProductList?.length > 0">
			<view class="related_goods">
				<m-shop-list :listData="dataObj.storeProductList" showBtn>
					<template #title>
						<m-title2 title="相关商品" />
					</template>
				</m-shop-list>
			</view>
		</view>
		<view class="blank24" v-if="dataObj.storeProductList && dataObj.storeProductList?.length > 0"></view>

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
	<!-- 底部按钮 -->
	<m-shop-btn-bottom
		@payConfirm="payConfirm"
		@tapCreateImg="tapCreateImg"
		@tapShare="tapShare"
		:dataObj="dataObj"
	></m-shop-btn-bottom>

	<!-- 海报生成 -->
	<w-painter
		:palette="posterData.value"
		@imgOK="createImgOk"
		@imgErr="imgErr"
		:use2D="true"
		:dirty="false"
		:LRU="false"
		customStyle="left: -9999px; top: -9999rpx;position: absolute;"
	></w-painter>
</template>

<script setup>
import { ref, reactive, computed, getCurrentInstance, watch } from 'vue'
import { onLoad, onUnload, onPageScroll } from '@dcloudio/uni-app'
import { _enrollformGetinfo, _enrollformEnpayment, _enrollformWxNotifys } from '@/aTemp/apis/activity.js'
import { _debounce, _countDown } from '@/aTemp/utils/tools.js'
import { _wxWxqrCode } from '@/aTemp/apis/login.js'
// base64转图片路径
import { base64ToPath } from 'image-tools'
import {
	navigateTo,
	previewImage,
	saveImageToPhotosAlbum,
	showLoading,
	showToastText,
	getImageInfo
} from '@/aTemp/utils/uniAppTools.js'
import dayjs from 'dayjs'

const instance = getCurrentInstance() // 获取组件实例

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 分享 (onShareAppMessage,onShareTimeline) 不能删,必要 https://github.com/dcloudio/uni-app/issues/3097
import useShare from '@/aTemp/mixins/useShare.js'
const shareInfo = reactive({ title: '', path: '', imageUrl: '', query: '' })
// 设置分享
useShare(shareInfo)

// 加载中
const loading = ref(true)
// 数据ID
const dataId = ref('')
// 数据对象
const dataObj = ref({ myType: '活动' })

// 登录弹出对象
const mLogin = ref(null)
// 页面开始加载
onLoad(async options => {
	const { proxy } = getCurrentInstance()
	// 等待onLaunch中放行后执行
	await proxy.$onLaunched

	let { targetId } = options

	dataId.value = parseInt(targetId) || ''

	enrollformGetinfo()
})
// 获取活动详情
const enrollformGetinfo = () => {
	// 加载中
	loading.value = true
	_enrollformGetinfo({ id: dataId.value }).then(res => {
		const { data, code, msg } = res
		try {
			if(data.getinfo.storeProductList){
				data.getinfo.storeProductList.map((item, index, arr) => {
					item.pics = item.pics ? item.pics.split(',') : []
					return item
				})
			}
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
			const timeDjs = dayjs(dataObj.value.endDt)
			djsFun(timeDjs)

			// 数据加载结束
			loading.value = false

			// 设置分享参数
			shareInfo.title = computed(() => `${useUserMain.nickname || ''} 邀请您参加【${dataObj.value.title}】`)
			shareInfo.path = computed(
				() =>
					`/pages/main/index/index?invitationCode=${useUserMain.userid}&storeId=${
						useUserMain.storeId
					}&Mscene=1&targetId=${dataObj.value.id}`
			)
			shareInfo.imageUrl = dataObj.value.mainPic || `https://imgs.fenxiangzl.com/store/tooth/invitbg.png`
			// 分享到朋友圈用到
			shareInfo.query = computed(
				() =>
					`invitationCode=${useUserMain.userid}&storeId=${useUserMain.storeId}&Mscene=1&targetId=${dataObj.value.id}`
			)
		} catch (e) {
			console.log(e)
		}
	})
}

const { windowHeight } = uni.getSystemInfoSync()
// 页面滚动监听
onPageScroll(options => {
	// 计算当前播放视频位置
	const query = uni.createSelectorQuery().in(instance)
	query.select(`#myVideo${payIndex.value}`).boundingClientRect()
	query.exec(rect => {
		if (!rect[0]) {
			return
		}

		const { top, height } = rect[0]
		// console.log('windowHeight', windowHeight)
		// console.log('height', height)
		// console.log('top', top)

		// windowHeight = top（目标元素刚进入可视区域）
		// windowHeight - top = height（目标元素完全进入可视区域）
		// top = 0 (目标元素刚离开可视区域)
		// top + height = 0 （目标元素完全离开可视区域 ）

		if (top < windowHeight && top + height > 0) {
			const videoObj = uni.createVideoContext(`myVideo${payIndex.value}`, instance)
			videoObj.play()
			// console.log('元素在可视区域出现')
		} else {
			const videoObj = uni.createVideoContext(`myVideo${payIndex.value}`, instance)
			videoObj.pause()
			// console.log('元素在可视区域消失')
		}
	})
})

let payIndex = ref('')
watch(payIndex, (newVal, preVal) => {
	// console.log(preVal)
	// console.log(newVal)
	const preVideoObj = uni.createVideoContext(`myVideo${preVal}`, instance)
	const videoObj = uni.createVideoContext(`myVideo${newVal}`, instance)
	preVideoObj.pause()
	videoObj.play()
})

// 当前视频播放切关闭
const videoTap = index => {
	if (payIndex.value === index) {
		payIndex.value = ''
	} else {
		payIndex.value = index
	}
}

// 调用支付函数
const btnLoading = ref(false)
const payConfirm = _debounce(
	() => {
		// 判断是否授权登录
		if (!useUserMain.isLogin) {
			mLogin.value.popupfun()
			btnLoading.value = false
			return
		}

		_enrollformEnpayment({ id: dataId.value })
			.then(res => {
				btnLoading.value = false
				const { data, code, msg } = res
				// 判断是否需要支付
				try {
					// 支付返回信息
					const resDataObj = JSON.parse(data)
					// console.log(resDataObj)

					// 订单编号
					const orderNumExternal = resDataObj.orderNumExternal
					// 支付信息
					const payInfo = JSON.parse(resDataObj.pay_info)
					// console.log(payInfo)

					// 唤醒支付
					uni
						.requestPayment({
							timeStamp: payInfo.timeStamp,
							nonceStr: payInfo.nonceStr,
							package: payInfo.package,
							signType: payInfo.signType,
							paySign: payInfo.sign
						})
						.then(val => {
							showToastText('参与成功~')
							// 设置活动已参与
							dataObj.value['myJionCount'] = (dataObj.value['myJionCount'] || 0) + 1

							// 支付成功回调，并且分账 status: 2 //待使用
							const myParameter = { orderNumExternal: orderNumExternal, status: 2 }
							_enrollformWxNotifys(myParameter).then(resData => {
								console.log('resData')
							})
						})
						.catch(err => {
							showToastText('取消支付~')
						})
				} catch (err) {
					// 错误信息
					console.log(err)

					try {
						// 支付返回信息
						const resDataObj = JSON.parse(data)
						showToastText(resDataObj.result_msg || '参加失败')
					} catch (e) {
						if (data === '参与成功') {
							showToastText(data)
							// 设置活动已参与
							dataObj.value['myJionCount'] = (dataObj.value['myJionCount'] || 0) + 1
						} else {
							showToastText(data || '参加失败')
						}
					}
				}
			})
			.catch(err => {
				btnLoading.value = false
				showToastText(err.msg || '参加失败')
				console.log(err)
			})
	},
	1000,
	btnLoading
)

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

// 海报数据
const posterData = reactive({
	value: {}
})
// 生成海报函数
const tapCreateImg = async () => {
	// 判断是否授权登录
	if (!useUserMain.isLogin) {
		mLogin.value.popupfun()
		return
	}

	showLoading('海报数据加载中')

	// 获取小程序码
	const wxWxqrCode = await _wxWxqrCode({
		page: 'pages/main/index/index',
		scene: `i=${useUserMain.userid}&sd=${useUserMain.storeId}&s=1&t=${dataObj.value.id}`,
		width: 430
	})
	// console.log('data:image/png;base64,' + wxWxqrCode.data)
	const imgPath = await base64ToPath('data:image/png;base64,' + wxWxqrCode.data)

	// 如果有海报
	if (dataObj.value.postPic) {
		// 获取海报图片尺寸
		const resImgInfo = await getImageInfo(dataObj.value.postPic)
		// console.log(resImgInfo)

		//  海报宽度为500px高度，自动
		posterData.value = {
			width: '500px',
			height: resImgInfo.height / (resImgInfo.width / 500) + 'px',
			background: resImgInfo.path,
			views: [
				{
					id: '1',
					type: 'image',
					url: imgPath,
					css: {
						right: '13px',
						bottom: '13px',
						width: '106px',
						height: '106px'
					}
				}
			]
		}
	} else {
		posterData.value = {
			width: '750px',
			height: '940px',
			background: '#FFF',
			views: [
				{
					id: '1_1',
					type: 'image',
					url: useUserMain.avatar || '/static/images/default_avatar.png',
					css: {
						top: '30px',
						left: '30px',
						width: '60px',
						height: '60px',
						borderRadius: '50%'
					}
				},
				{
					id: '1_2',
					type: 'inlineText',
					textList: [
						{
							text: useUserMain.nickname,
							css: { fontSize: '28px', color: '#333' }
						},
						{
							text: '  为您推荐',
							css: { fontSize: '28px', color: '#999' }
						}
					],
					css: {
						width: '610px',
						top: '45px',
						left: '110px'
					}
				},
				{
					id: '2',
					type: 'image',
					url: dataObj.value.mainPic,
					css: {
						top: '120px',
						left: '30px',
						width: '690px',
						height: '552px'
					}
				},
				{
					id: '3',
					type: 'text',
					text: dataObj.value.title,
					css: { top: '710px', left: '30px', fontSize: '32px', color: '#333' }
				},
				{
					id: '4',
					type: 'text',
					text: dataObj.value.price ? '￥' + dataObj.value.price : '免费活动',
					css: { top: '840px', left: '30px', fontSize: '38px', color: '#f73639' }
				},
				{
					id: '5',
					type: 'image',
					url: imgPath,
					css: {
						top: '710px',
						right: '30px',
						width: '160px',
						height: '160px'
					}
				},
				{
					id: '6',
					type: 'text',
					text: '长按识别',
					css: { top: '880px', right: '58px', fontSize: '26px', color: '#999' }
				}
			]
		}
	}
}
// 图片生成完成
const createImgOk = e => {
	uni.hideLoading()

	saveImageToPhotosAlbum(e.detail.path).then(res => {
		// 分享图片
		uni
			.showShareImageMenu({
				path: e.detail.path
			})
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	})

	console.log(e.detail.path)
}
// 图片生成失败
const imgErr = e => {
	uni.hideLoading()
	showToastText('海报加载失败~')
}

// 没有登录禁止分享
const tapShare = () => {
	// 判断是否授权登录
	if (!useUserMain.isLogin) {
		mLogin.value.popupfun()
		return
	}
}
</script>

<style lang="scss" scoped>
.video_box {
	.myVideo {
		width: 750rpx;
		height: 750rpx * 0.8;
	}
}
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
			color: #000;
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
</style>
