<template>
	<!-- 背景 -->
	<view class="bg"><image class="image" src="@/static/default/bg.png" mode="aspectFill"></image></view>
	<!-- #ifndef H5 -->
	<!-- 标题栏 -->
	<uni-nav-bar title="xxx门诊" statusBar color="#ffffff" :border="false"></uni-nav-bar>
	<!-- #endif -->

	<!-- 轮播 -->
	<view class="blank32"></view>
	<m-carousel></m-carousel>
	<view class="blank30"></view>

	<!-- 门诊信息 -->
	<m-info></m-info>
	<view class="blank30"></view>

	<!-- 门诊活动 -->
	<view class="box_activity">
		<m-title2 title="热门活动" path="/pages-sub1/activityList/activityList"></m-title2>
		<m-activity-list></m-activity-list>
	</view>

	<!-- 服务入口 -->
	<view class="box_serveList">
		<m-title2 title="门诊服务">
			<template v-slot:icon>
				<image class="shijian1" src="/static/default/shijian1.png" mode="aspectFill"></image>
			</template>
		</m-title2>
		<m-fuwu></m-fuwu>
		<view class="blank20"></view>
		<mServe-list2></mServe-list2>
	</view>
	<view class="blank40"></view>
</template>

<script setup>
import mInfo from './components/m-info/m-info.vue'
// import mServeList from './components/m-serveList/m-serveList.vue'
import mServeList2 from './components/m-serveList2/m-serveList2.vue'
import mFuwu from './components/m-fuwu/m-fuwu.vue'
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app'

onShareAppMessage(() => {
	return {
		title: 'xxx口腔门诊',
		path: '/pages/index/index'
	}
})
</script>
<style lang="scss" scoped>
:global(page) {
	background-color: #f9f9f9;
	position: relative;
}
/* 背景颜色 */
.bg {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 0;
	width: 750rpx;
	height: 514rpx;
	> .image {
		width: 100%;
		height: 100%;
	}
}
.box_activity {
	padding: 32rpx 32rpx;
	border-radius: 24rpx;
	/* background: url('@/static/default/huodongbg.png') #2f5ae6 no-repeat; */
	background-size: 100% auto;
	:deep(.container) {
		/* .title {
			color: #fff;
		}
		.right {
			color: #fff;
			.uniui-forward {
				color: #fff !important;
			}
		} */
	}
}
.box_serveList {
	padding: 32rpx 32rpx 32rpx 32rpx;
	border-radius: 24rpx;
	.shijian1 {
		width: 32rpx;
		height: 32rpx;
		margin-right: 8rpx;
	}
}
</style>
