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
		<view class="banner_img" v-else>
			<image class="image" :src="dataObj.mainPic" mode="aspectFill"></image>
		</view>
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
					dayjs(dataObj.startDt).format('YYYY年M月D日') +
						'  至  ' +
						dayjs(dataObj.endDt).format('YYYY年M月D日')
				}}
			</view>
			<!-- 参与人 -->
			<view class="join">
				<view class="join_left">
					<view class="num">
						已有{{ (dataObj.count || 0) + (dataObj.views || 0) }}人参与活动
					</view>
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
				<button class="jion_right" @tap="payConfirm">
					{{ dataObj.myJionCount > 0 ? '已参与' : '参与活动' }}
				</button>
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

		<!-- 更多信息 -->
		<m-info-a :activitId="dataId"></m-info-a>
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
		:scaleRatio="2"
		customStyle="left: -9999px; top: -9999px;position: absolute;"
	></w-painter>
</template>

<script setup>
import mInfoA from './components/m-info-a/m-info-a.vue';
import { ref, reactive, computed, getCurrentInstance, watch } from 'vue';
import { onLoad, onUnload, onPageScroll } from '@dcloudio/uni-app';
import {
	_enrollformGetinfo,
	_enrollformEnpayment,
	_enrollformWxNotifys
} from '@/aTemp/apis/activity.js';
import { _browseInfo, _shareInfo } from '@/aTemp/apis/operate.js';
import { _debounce, _countDown } from '@/aTemp/utils/tools.js';
import { _wxWxqrCode } from '@/aTemp/apis/login.js';
// base64转图片路径
import { base64ToPath } from 'image-tools';
import {
	navigateTo,
	previewImage,
	saveImageToPhotosAlbum,
	showLoading,
	showToastText,
	getImageInfo,
	showModal
} from '@/aTemp/utils/uniAppTools.js';
import dayjs from 'dayjs';

const instance = getCurrentInstance(); // 获取组件实例

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js';
const useUserMain = _useUserMain();

// 登录弹出对象
const mLogin = ref(null);

// 分享 (onShareAppMessage,onShareTimeline) 不能删,必要 https://github.com/dcloudio/uni-app/issues/3097
import useShare from '@/aTemp/mixins/useShare.js';
const shareInfo = reactive({
	title: '',
	path: '',
	imageUrl: '',
	query: '',
	scene: 2,
	sceneId: 0
});
// 设置分享
useShare(shareInfo);

// 加载中
const loading = ref(true);
// 数据ID
const dataId = ref('');
// 数据对象
const dataObj = ref({ myType: '活动' });

// 页面开始加载
onLoad(async options => {
	const { proxy } = getCurrentInstance();
	// 等待onLaunch中放行后执行
	await proxy.$onLaunched;

	let { targetId } = options;
	dataId.value = parseInt(targetId) || 0;

	enrollformGetinfo();

	// 弹出登录组件
	if (!useUserMain.isLogin) {
		mLogin.value.popupfun();
	}

	// 浏览数据埋点  1/文案宣发 2/活动 3/商品 4/海报 /5科普文章
	// _browseInfo({ scene: 2, sceneId: dataId.value });
});
// 获取活动详情
const enrollformGetinfo = () => {
	// 加载中
	loading.value = true;
	_enrollformGetinfo({ id: dataId.value }).then(res => {
		const { data, code, msg } = res;

		// 活动详情
		dataObj.value = data.getinfo;
		// 已参加活动人数
		dataObj.value['count'] = data.count;
		// 已参与活动人的信息列表
		dataObj.value['activityListObj'] = data.activitynumber;
		// 自己参与活动次数
		dataObj.value['myJionCount'] = data.purchasecount;

		// 标识活动商品
		dataObj.value['myType'] = '活动';

		// 倒计时
		const timeDjs = dayjs(dataObj.value.endDt);
		djsFun(timeDjs);

		// 活动已结束
		if (dayjs(dataObj.value.endDt).valueOf() < Date.now()) {
			showModal('活动已经结束了');
		}

		// 数据加载结束
		loading.value = false;

		// 设置分享参数
		shareInfo.title = computed(
			() => `${useUserMain.nickname || ''} 邀请您参加【${dataObj.value.title}】`
		);
		shareInfo.path = computed(
			() =>
				`/pages/main/index/index?invitationCode=${useUserMain.userid}&storeId=${
					useUserMain.storeId
				}&Mscene=1&targetId=${dataObj.value.id}`
		);
		shareInfo.imageUrl =
			dataObj.value.mainPic || `https://imgs.lechiwl.com/store/tooth/invitbg.png`;
		// 分享到朋友圈用到
		shareInfo.query = computed(
			() =>
				`invitationCode=${useUserMain.userid}&storeId=${
					useUserMain.storeId
				}&Mscene=1&targetId=${dataObj.value.id}`
		);

		// 设置场景
		shareInfo.scene = 2;
		shareInfo.sceneId = dataObj.value.id;
	});
};

// 页面滚动监听
const { windowHeight } = uni.getSystemInfoSync();
onPageScroll(options => {
	// 计算当前播放视频位置
	const query = uni.createSelectorQuery().in(instance);
	query.select(`#myVideo${payIndex.value}`).boundingClientRect();
	query.exec(rect => {
		if (!rect[0]) {
			return;
		}
		const { top, height } = rect[0];

		if (top < windowHeight && top + height > 0) {
			const videoObj = uni.createVideoContext(`myVideo${payIndex.value}`, instance);
			videoObj.play();
			// console.log('元素在可视区域出现')
		} else {
			const videoObj = uni.createVideoContext(`myVideo${payIndex.value}`, instance);
			videoObj.pause();
			// console.log('元素在可视区域消失')
		}
	});
});

// 视频播放相关
let payIndex = ref('');
watch(payIndex, (newVal, preVal) => {
	const preVideoObj = uni.createVideoContext(`myVideo${preVal}`, instance);
	const videoObj = uni.createVideoContext(`myVideo${newVal}`, instance);
	preVideoObj.pause();
	videoObj.play();
});

// 当前视频播放切关闭
const videoTap = index => {
	if (payIndex.value === index) {
		payIndex.value = '';
	} else {
		payIndex.value = index;
	}
};

// 调用支付函数
const btnLoading = ref(false);
const payConfirm = _debounce(
	async () => {
		// 判断是否授权登录
		if (!useUserMain.isLogin) {
			mLogin.value.popupfun();
			btnLoading.value = false;
			return;
		}

		// 判断是否限购
		if (dataObj.value.limitCount > 0 && dataObj.value.limitCount <= dataObj.value.myJionCount) {
			showToastText(`此活动最多参与${dataObj.value.limitCount}次`);
			return;
		}

		// 提示购买几次
		if (dataObj.value.myJionCount > 0) {
			const showRes = await showModal(
				`您已经参与${dataObj.value.myJionCount}次，是否继续参与`
			);
			if (showRes.cancel) {
				return;
			}
		}

		// 支付请求
		_enrollformEnpayment({ id: dataId.value })
			.then(res => {
				btnLoading.value = false;
				const { data, code, msg } = res;
				// 判断是否需要支付
				try {
					// 支付返回信息
					const resDataObj = JSON.parse(data);
					// console.log(resDataObj)

					// 订单编号
					const orderNumExternal = resDataObj.orderNumExternal;
					// 支付信息
					const payInfo = JSON.parse(resDataObj.pay_info);
					// console.log(payInfo)

					// 唤醒支付
					uni.requestPayment({
						timeStamp: payInfo.timeStamp,
						nonceStr: payInfo.nonceStr,
						package: payInfo.package,
						signType: payInfo.signType,
						paySign: payInfo.sign
					})
						.then(val => {
							showToastText('参与成功~');
							// 设置活动已参与
							dataObj.value['myJionCount'] = (dataObj.value['myJionCount'] || 0) + 1;

							// 支付成功回调，并且分账 status: 2 //待使用
							const myParameter = { orderNumExternal: orderNumExternal, status: 2 };
							_enrollformWxNotifys(myParameter).then(resData => {
								console.log('resData');
							});
						})
						.catch(err => {
							showToastText('取消支付~');
						});
				} catch (err) {
					// 错误信息
					console.log(err);

					try {
						// 支付返回信息
						const resDataObj = JSON.parse(data);
						showToastText(resDataObj.result_msg || '参加失败');
					} catch (e) {
						console.log(e);
						if (data === '参与成功') {
							showToastText(data);
							// 设置活动已参与
							dataObj.value['myJionCount'] = (dataObj.value['myJionCount'] || 0) + 1;
						} else {
							showToastText(data || '参加失败');
						}
					}
				}
			})
			.catch(err => {
				btnLoading.value = false;
				showToastText(err.msg || '参加失败');
				console.log(err);
			});
	},
	500,
	btnLoading
);

// 倒计时
const djs = ref('');
let djsIndex = 0;
const djsFun = time => {
	djsIndex = setInterval(() => {
		// console.log("定时器执行",time)
		djs.value = _countDown(time, djsIndex);
	}, 100);
};
//页面卸载执行
onUnload(() => {
	// console.log('页面卸载')
	// 移除定时器
	clearInterval(djsIndex);
});

// 海报数据
const posterData = reactive({
	value: {}
});

const storeInfo = uni.getStorageSync('storeInfo');
// 生成海报函数
const tapCreateImg = async () => {
	// 判断是否授权登录
	if (!useUserMain.isLogin) {
		mLogin.value.popupfun();
		return;
	}
	showLoading('海报数据加载中');

	// 获取小程序码
	const wxWxqrCode = await _wxWxqrCode({
		page: 'pages/main/index/index',
		scene: `i=${useUserMain.userid}&sd=${useUserMain.storeId}&s=1&t=${dataObj.value.id}`,
		width: 430
	});
	// base64转图片地址
	const imgPath = await base64ToPath('data:image/png;base64,' + wxWxqrCode.data);

	// 如果有海报
	if (dataObj.value.postPic) {
		// 获取海报图片尺寸
		const resImgInfo = await getImageInfo(dataObj.value.postPic);
		// console.log(resImgInfo)

		// 基础宽度310px宽度
		const baseWidth = 310;
		posterData.value = {
			width: baseWidth + 'px',
			height: resImgInfo.height / (resImgInfo.width / baseWidth) + 'px',
			background: resImgInfo.path,
			views: [
				{
					id: '1',
					type: 'image',
					url: imgPath,
					css: {
						right: '8px',
						bottom: '8px',
						width: baseWidth * 0.18 + 'px',
						height: baseWidth * 0.18 + 'px'
					}
				}
			]
		};
	} else {
		const h_padding = 16; // 内边距
		const h_width = 310; // 宽度
		let mh_height = 800; //最大高度

		// 头像
		const h_1_1_width = 30;
		const h_1_1_height = 30;
		const h_1_1_left = 0 + h_padding;
		const h_1_1_top = 0 + h_padding;

		// 昵称
		const h_1_2_left = 0 + h_padding + h_1_1_width + 10;
		const h_1_2_top = 0 + h_padding + 7;
		const h_1_2_height = 30;
		const h_1_2_width = h_width - h_1_2_left - h_padding;
		const h_1_2_fz = 14;

		// 图片
		const h_2_top = h_1_1_height + h_1_1_top + 10;
		const h_2_left = h_padding;
		const h_2_width = h_width - h_padding * 2;
		const h_2_height = h_2_width * 0.8;

		//二维码
		const h_3_1_top = h_2_top + h_2_height + 10;
		const h_3_1_right = h_padding + 10;
		const h_3_1_width = h_width * 0.3;
		const h_3_1_height = h_width * 0.3;

		// 商品标题
		const h_3_2_top = h_2_top + h_2_height + 20;
		const h_3_2_left = h_padding;
		const h_3_2_width = h_width - h_padding - h_3_1_right - h_3_1_width - 10;
		const h_3_2_height = 24;
		const h_3_2_fz = 16;

		//商品价格
		const h_4_top = h_3_2_top + h_3_2_height + 10;
		const h_4_left = h_padding;
		const h_4_width = h_width - h_padding * 2;
		const h_4_height = 30;
		const h_4_fz = 24;

		// 电话
		const h_5_1_top = h_4_top + h_4_height + 20;
		const h_5_1_left = h_padding;
		const h_5_1_width = h_width - h_padding * 2;
		const h_5_1_height = 25;
		const h_5_1_fz = 14;

		//地址
		const h_5_2_top = h_5_1_top + h_5_1_height;
		const h_5_2_left = h_padding;
		const h_5_2_width = h_width - h_padding * 2;
		const h_5_2_height = 25;
		const h_5_2_fz = 14;

		//重置高度
		mh_height = h_5_2_top + 60 + h_padding;

		// 没有海报
		posterData.value = {
			width: `${h_width}px`,
			height: `${mh_height}px`,
			background: '#FFF',
			views: [
				{
					id: '1_1',
					type: 'image',
					url: useUserMain.avatar || '/static/images/default_avatar.png',
					css: {
						top: `${h_1_1_top}px`,
						left: `${h_1_1_left}px`,
						width: `${h_1_1_width}px`,
						height: `${h_1_1_height}px`,
						borderRadius: '50%'
					}
				},
				{
					id: '1_2',
					type: 'inlineText',
					textList: [
						{
							text: useUserMain.nickname || '微信用户',
							css: {
								fontSize: `${h_1_2_fz}px`,
								color: '#333',
								lineHeight: `${h_1_2_height}px`
							}
						},
						{
							text: '  为您推荐',
							css: {
								fontSize: `${h_1_2_fz}px`,
								color: '#999',
								lineHeight: `${h_1_2_height}px`
							}
						}
					],
					css: {
						width: `${h_1_2_width}px`,
						top: `${h_1_2_top}px`,
						left: `${h_1_2_left}px`
					}
				},
				{
					id: '2',
					type: 'image',
					url: dataObj.value.mainPic,
					css: {
						top: `${h_2_top}px`,
						left: `${h_2_left}px`,
						width: `${h_2_width}px`,
						height: `${h_2_height}px`,
						borderRadius: '10px'
					}
				},
				{
					id: '3-1',
					type: 'image',
					url: imgPath,
					css: {
						top: `${h_3_1_top}px`,
						right: `${h_3_1_right}px`,
						width: `${h_3_1_width}px`,
						height: `${h_3_1_height}px`
					}
				},
				{
					id: '3-2',
					type: 'text',
					text: dataObj.value.title,
					css: {
						top: `${h_3_2_top}px`,
						left: `${h_3_2_left}px`,
						width: `${h_3_2_width}px`,
						fontSize: `${h_3_2_fz}px`,
						lineHeight: `${h_3_2_height}px`,
						maxLines: 1,
						color: '#333'
					}
				},
				{
					id: '4',
					type: 'text',
					text: dataObj.value.price ? '￥' + dataObj.value.price : '免费活动',
					css: {
						top: `${h_4_top}px`,
						left: `${h_4_left}px`,
						width: `${h_4_width}px`,
						height: `${h_4_height}px`,
						fontSize: `${h_4_fz}px`,
						color: '#f73639'
					}
				},
				{
					id: '5-1',
					type: 'inlineText',
					textList: [
						{
							text: `门诊预约：`,
							css: { fontSize: `${h_5_1_fz}px`, color: '#000' }
						},
						{
							text: `${storeInfo.mobile}`,
							css: { fontSize: `${h_5_1_fz}px`, color: '#666' }
						}
					],
					css: {
						top: `${h_5_1_top}px`,
						left: `${h_5_1_left}px`,
						width: `${h_5_1_width}px`
					}
				},
				{
					id: '5-2',
					type: 'inlineText',
					textList: [
						{
							text: `门诊地址：`,
							css: { fontSize: `${h_5_2_fz}px`, color: '#000' }
						},
						{
							text: `${storeInfo.address}${storeInfo.addressDetail}`,
							css: {
								fontSize: `${h_5_2_fz}px`,
								color: '#666',
								lineHeight: `${h_5_2_height}px`
							}
						}
					],
					css: {
						top: `${h_5_2_top}px`,
						left: `${h_5_2_left}px`,
						width: `${h_5_2_width}px`,
						maxLines: 2
					}
				}
			]
		};
	}
};
// 图片生成完成
const createImgOk = e => {
	// 活动生成海报数据埋点
	// _shareInfo({
	// 	scene: 2,
	// 	sceneId: dataObj.value.id,
	// 	type: 3
	// });
	console.log(e.detail.path);
	saveImageToPhotosAlbum(e.detail.path).then(res => {
		uni.hideLoading();
		// 分享图片
		uni.showShareImageMenu({
			path: e.detail.path
		})
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	});
};
// 图片生成失败
const imgErr = e => {
	uni.hideLoading();
	showToastText('海报加载失败~');
};

// 没有登录禁止分享
const tapShare = () => {
	// 判断是否授权登录
	if (!useUserMain.isLogin) {
		mLogin.value.popupfun();
		return;
	}
};
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
		overflow: hidden;
		font-size: 40rpx;
		font-weight: 600;
		padding: 48rpx 0;
		line-height: 1.8;
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
</style>
