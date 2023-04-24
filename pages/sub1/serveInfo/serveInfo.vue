<template>
	<!-- 提示登录组件 -->
	<m-authorized-login ref="mLogin"></m-authorized-login>

	<!-- 加载中 -->
	<m-page-loading v-if="loading"></m-page-loading>

	<view class="container" v-else>
		<!-- 服务图片 -->
		<view class="banner_img">
			<image :src="dataObj.pic" mode="aspectFill" class="image"></image>
		</view>
		<view class="blank20"></view>

		<!-- 介绍 -->
		<view class="serve_text">
			<m-title2 :title="dataObj.title"></m-title2>

			<view class="title">服务介绍</view>

			<view class="serve_item_box">
				<view class="serve_item">
					<!-- <view class="left">适用症状：</view> -->
					<text class="right">{{ dataObj.descData }}</text>
				</view>
			</view>
		</view>
		<view class="blank20"></view>

		<!-- 相关商品 -->
		<view class="related_goods" v-if="dataObj.productList && dataObj.productList?.length > 0">
			<shop-list :listData="dataObj.productList">
				<template #title>
					<m-title2 title="相关商品" />
				</template>
			</shop-list>
		</view>
		<view class="blank20"></view>

		<!-- 图文详情 -->
		<view class="serve_img">
			<m-title1 title="图文详情"></m-title1>
			<view
				class="content_img"
				v-if="dataObj.details"
				@tap="previewImage(dataObj.details.split(','))"
			>
				<image
					class="image"
					v-for="(item, index) in dataObj.details.split(',')"
					:key="index"
					:src="item"
					mode="widthFix"
					lazy-load
				></image>
			</view>
		</view>
		<!-- 技术支持 -->
		<m-technical-support></m-technical-support>
		<view class="blank40"></view>
	</view>
</template>

<script setup>
import shopList from './components/shop-list/shop-list.vue';
import { ref, reactive, computed, watch, getCurrentInstance } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { _serveGetinfo } from '@/aTemp/apis/service';
import { previewImage } from '@/aTemp/utils/uniAppTools.js';
const dataObj = ref({});
const dataId = ref(0);
const loading = ref(true);

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js';
const useUserMain = _useUserMain();

// 分享 (onShareAppMessage,onShareTimeline) 不能删,必要 https://github.com/dcloudio/uni-app/issues/3097
import useShare from '@/aTemp/mixins/useShare.js';
const shareInfo = reactive({
	title: '',
	path: '',
	imageUrl: '',
	query: ''
});
// 设置分享
useShare(shareInfo);

// 登录弹出对象
const mLogin = ref(null);

// 页面开始加载
onLoad(async options => {
	const { proxy } = getCurrentInstance();
	// 等待onLaunch中放行后执行
	await proxy.$onLaunched;

	// 赋值ID
	dataId.value = parseInt(options.targetId) || 0;

	// 是否存在商品ID
	if (dataId.value > 0) {
		// 拉取数据
		_serveGetinfo({ id: dataId.value }).then(res => {
			const { data, msg, code } = res;
			// 数据赋值
			dataObj.value = data;

			loading.value = false;

			// 设置分享参数
			shareInfo.title = computed(
				() => `${useUserMain.nickname || ''} 邀请您体验【${dataObj.value.title}】`
			);
			shareInfo.path = computed(
				() =>
					`/pages/main/index/index?invitationCode=${useUserMain.userid}&storeId=${
						useUserMain.storeId
					}&Mscene=3&targetId=${dataObj.value.id}`
			);
			shareInfo.imageUrl =
				dataObj.value.pic || `https://imgs.lechiwl.com/store/tooth/invitbg.png`;
			// 分享到朋友圈用到
			shareInfo.query = computed(
				() =>
					`invitationCode=${useUserMain.userid}&storeId=${
						useUserMain.storeId
					}&Mscene=3&targetId=${dataObj.value.id}`
			);
		});
	}

	// 弹出登录组件
	if (!useUserMain.isLogin) {
		mLogin.value.popupfun();
	}
});
</script>

<style lang="scss" scoped>
.container {
	.banner_img {
		> .image {
			width: 750rpx;
			height: 750rpx * 3 * 0.2;
		}
	}
	.serve_text {
		padding: $padding;
		background-color: #ffffff;
		.title {
			background-color: #{$main-color}66;
			border-radius: 16rpx 16rpx 0 0;
			font-size: 26rpx;
			color: $text-color;
			height: 80rpx;
			line-height: 80rpx;
			padding: 0 24rpx;
			@include singleLineTextOverHidden;
		}
		.serve_item_box {
			border: 1px solid #f0f0f0;
			border-radius: 0 0 16rpx 16rpx;
			border-top: none;
			padding: 24rpx;
			.serve_item {
				@include mFlex;
				justify-content: left;
				align-items: flex-start;
				font-size: 26rpx;
				margin-bottom: 24rpx;
				line-height: 1.6;
				&:last-child {
					margin-bottom: 0;
				}
				.left {
					flex: none;
					color: $text-color-grey;
				}
				.right {
					flex: 1;
					color: $text-color;
				}
			}
		}
	}
	.related_goods {
		padding: $padding;
		background-color: #ffffff;
	}
	.serve_img {
		padding-top: 32rpx;
		background-color: #ffffff;
		> .content_img {
			width: 750rpx;
			.image {
				width: 100%;
			}
		}
	}
}
</style>
