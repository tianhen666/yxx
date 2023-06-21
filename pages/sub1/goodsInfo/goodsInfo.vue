<template>
	<!-- 提示登录组件 -->
	<m-authorized-login ref="mLogin"></m-authorized-login>
	<m-page-loading v-if="loading"></m-page-loading>
	<view class="container" v-else>
		<!-- 轮播图片 -->
		<m-carousel-goods :listData="dataObj.pics"></m-carousel-goods>

		<!-- 标题 -->
		<view class="title">{{ dataObj.title }}</view>

		<!-- 价格销量 -->
		<view class="box1">
			<!-- 价格 -->
			<view class="price_wrapper">
				<view class="price">
					<text class="price_cn">￥</text>
					<text>{{ dataObj.price }}</text>
				</view>
				<view class="originalPrice">
					<text>￥</text>
					<text class="through">{{ dataObj.priceNormal || dataObj.price }}</text>
				</view>
			</view>
			<!-- 销售量 -->
			<view class="sale">已售：{{ dataObj.sold + dataObj.virtualCount || 0 }}件</view>
		</view>
		<view class="blank20"></view>

		<!-- 商品介绍 -->
		<view class="box2">
			<m-title2 title="商品介绍"></m-title2>

			<text class="descData">{{ dataObj.descData }}</text>
		</view>
		<view class="blank20"></view>

		<!-- 评论 -->
		<!-- 	<m-comment-list>
			<template #title>
				<m-title2
					title="商品评价"
					moreText="查看全部"
					path="/pages-sub1/commentList/commentList"
				></m-title2>
			</template>
		</m-comment-list>
		<view class="blank20"></view> -->

		<!-- 商品详情 -->
		<view class="goods_img" v-if="dataObj.detail.length > 0">
			<m-title1 title="商品详情"></m-title1>
			<image
				v-for="(item, index) in dataObj.detail"
				:key="index"
				class="image"
				:src="item"
				mode="widthFix"
				@tap="previewImage(dataObj.detail, index)"
			></image>
		</view>

		<!-- 技术支持 -->
		<m-technical-support></m-technical-support>
		<view class="blank40"></view>

		<!-- 底部按钮 -->
		<m-shop-btn-bottom
			:dataObj="dataObj"
			@tapCreateImg="tapCreateImg"
			@tapShare="tapShare"
			@payConfirm="goPayPage"
		></m-shop-btn-bottom>
	</view>

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
import { ref, reactive, computed, getCurrentInstance } from 'vue';
import { _storeproductGetinfo } from '@/aTemp/apis/shop.js';
import { onLoad, onShow } from '@dcloudio/uni-app';
// base64转图片路径
import { base64ToPath } from 'image-tools';
import {
	navigateTo,
	previewImage,
	saveImageToPhotosAlbum,
	showLoading,
	showToastText,
	getImageInfo
} from '@/aTemp/utils/uniAppTools.js';
import { _wxWxqrCode } from '@/aTemp/apis/login.js';
import { _browseInfo, _shareInfo } from '@/aTemp/apis/operate.js';

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js';
const useUserMain = _useUserMain();
// 登录弹出对象
const mLogin = ref(null);

// 分享 (onShareAppMessage,onShareTimeline) 不能删,必要 https://github.com/dcloudio/uni-app/issues/3097
import useShare from '@/aTemp/mixins/useShare.js';
const shareInfo = reactive({ title: '', path: '', imageUrl: '', query: '' });
// 设置分享
useShare(shareInfo);

// 数据ID
const dataId = ref(0);
// 数据对象
const dataObj = ref({ myType: '商品' });
// 加载中
const loading = ref(true);

onLoad(async options => {
	const { proxy } = getCurrentInstance();
	// 等待onLaunch中放行后执行
	await proxy.$onLaunched;

	// 获取商品ID
	let { targetId } = options;
	dataId.value = parseInt(targetId) || 0;

	// 浏览数据埋点  1/文案宣发 2/活动 3/商品 4/海报 /5科普文章
	// _browseInfo({ scene: 3, sceneId: dataId.value });

	// 发起商品详情请求
	_storeproductGetinfo({ id: dataId.value }).then(res => {
		const { code, data, msg } = res;

		// 图片详情转列表
		(data.detail = data.detail ? data.detail.split(',') : []),
			// 主图转列表
			(data.pics = data.pics ? data.pics.split(',') : []);
		// 商品信息赋值
		dataObj.value = data;
		// 标识商品
		dataObj.value['myType'] = '商品';

		// 加载结束
		loading.value = false;

		// 设置分享参数
		shareInfo.title = computed(
			() => `${useUserMain.nickname}-给您分享了【${dataObj.value.title}】`
		);
		// 分享到聊天框
		shareInfo.path = computed(
			() =>
				`/pages/main/index/index?invitationCode=${useUserMain.userid}&storeId=${
					useUserMain.storeId
				}&Mscene=2&targetId=${dataObj.value.id}`
		);
		// 分享图片
		shareInfo.imageUrl =
			dataObj.value.sharePic ||
			dataObj.value.pics[0] ||
			`https://imgs.lechiwl.com/store/tooth/invitbg.png`;

		// 分享到朋友圈用到
		shareInfo.query = computed(
			() =>
				`invitationCode=${useUserMain.userid}&storeId=${
					useUserMain.storeId
				}&Mscene=2&targetId=${dataObj.value.id}`
		);

		// 设置场景
		shareInfo.scene = 3;
		shareInfo.sceneId = dataObj.value.id;
	});

	// 弹出登录组件
	// if (!useUserMain.isLogin) {
	// 	mLogin.value.popupfun();
	// }
});

/**
 * 去支付页面
 *
 * */
const goPayPage = () => {
	// 判断是否授权登录
	// if (!useUserMain.isLogin) {
	// 	mLogin.value.popupfun();
	// 	return;
	// }
	navigateTo(`/pages/sub1/confirmOrder/confirmOrder?id=${dataId.value}`);
};

// 海报数据
const posterData = reactive({
	value: {}
});

const storeInfo = uni.getStorageSync('storeInfo');
// 生成海报函数
const tapCreateImg = async () => {
	// 判断是否授权登录
	// if (!useUserMain.isLogin) {
	// 	mLogin.value.popupfun();
	// 	return;
	// }

	showLoading('海报数据加载中');

	// 获取小程序码
	const wxWxqrCode = await _wxWxqrCode({
		page: 'pages/main/index/index',
		scene: `i=${useUserMain.userid}&sd=${useUserMain.storeId}&s=2&t=${dataObj.value.id}`,
		width: 430
	});
	const imgPath = await base64ToPath('data:image/png;base64,' + wxWxqrCode.data);

	// 如果有海报
	if (dataObj.value.postPic) {
		// 获取海报图片尺寸
		const resImgInfo = await getImageInfo(dataObj.value.postPic);
		//  海报基础宽度310px
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
						right: '13px',
						bottom: '13px',
						width: baseWidth * 0.2 + 'px',
						height: baseWidth * 0.2 + 'px'
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
		const h_2_height = h_2_width;

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
					url: dataObj.value.pics[0],
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
	// 	scene: 3,
	// 	sceneId: dataObj.value.id,
	// 	type: 3
	// });
	saveImageToPhotosAlbum(e.detail.path).then(() => {
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
:global(page) {
	background-color: #f5f5f5;
}
.container {
	> .title {
		color: $text-color;
		background-color: #fff;
		padding: $padding;
		line-height: 1.6;
	}
	> .box1 {
		@include mFlex;
		justify-content: space-between;
		padding: 0 32rpx 32rpx;
		background-color: #fff;
		.price_wrapper {
			flex: none;
			width: 400rpx;
			overflow: hidden;
			flex-wrap: wrap;
			white-space: nowrap;
			@include mFlex;
			justify-content: left;
			.price {
				color: $sub-color;
				font-size: 40rpx;
				&_cn {
					font-size: 26rpx;
				}
				margin-right: 10rpx;
			}
			.originalPrice {
				margin-top: 10rpx;
				color: $text-color-grey;
				font-size: 26rpx;
				.through {
					text-decoration: line-through;
				}
			}
		}
		.sale {
			font-size: 26rpx;
			color: $text-color-grey;
		}
	}

	> .box2 {
		padding: $padding;
		background-color: #fff;
		.descData {
			font-size: 30rpx;
			color: #666;
			line-height: 1.6;
		}
	}

	> .goods_img {
		background-color: #fff;
		width: 750rpx;
		padding-top: 32rpx;
		> .image {
			width: 100%;
			height: auto;
		}
	}
}
</style>
