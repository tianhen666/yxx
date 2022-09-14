<template>
	<!-- 海报分类 -->
	<view class="box box1">
		<!-- 搜索 -->
		<uni-search-bar
			placeholder="1000+海报任意搜索"
			bgColor="#eeeeee"
			readonly
			@tap="navigateTo('/pages/sub3/searchPosterList/searchPosterList')"
		></uni-search-bar>
		<view class="blank30"></view>

		<view class="box1_item_wrapper">
			<view class="box1_item" v-for="(item, index) in 4" :key="index">
				<view class="img_box">
					<image class="image" src="/static/htz-image-upload/play.png" mode="aspectFill"></image>
				</view>
				<text class="text">营销海报</text>
			</view>
		</view>
	</view>

	<view class="blank30"></view>
	<!-- 分类列表 -->
	<view class="box box2">
		<m-title2 title="营销海报" path="/pages/sub3/posterListSub/posterListSub"></m-title2>
		<!-- 子分类 -->
		<m-sub-fenlei></m-sub-fenlei>
		<!-- 列表  -->
		<m-poster-list></m-poster-list>
	</view>

	<view class="blank30"></view>
	<!-- 分类列表 -->
	<view class="box box2">
		<m-title2 title="营销海报" path="/pages/sub3/posterListSub/posterListSub"></m-title2>
		<!-- 子分类 -->
		<m-sub-fenlei></m-sub-fenlei>
		<!-- 列表  -->
		<m-poster-list></m-poster-list>
	</view>

	<view class="blank30"></view>
	<!-- 分类列表 -->
	<view class="box box2">
		<m-title2 title="营销海报" path="/pages/sub3/posterListSub/posterListSub"></m-title2>
		<!-- 子分类 -->
		<m-sub-fenlei></m-sub-fenlei>
		<!-- 列表  -->
		<m-poster-list></m-poster-list>
	</view>

	<view class="blank30"></view>
	<!-- 分类列表 -->
	<view class="box box2">
		<m-title2 title="营销海报" path="/pages/sub3/posterListSub/posterListSub"></m-title2>
		<!-- 子分类 -->
		<m-sub-fenlei></m-sub-fenlei>
		<!-- 列表  -->
		<m-poster-list></m-poster-list>

		<view class="blank40"></view>
		<view class="blank40"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'
import { mSubFenlei } from '../components/m-sub-fenlei/m-sub-fenlei.vue'
import { mPosterList } from '../components/m-poster-list/m-poster-list.vue'
</script>

<style lang="scss">
:deep(.uni-searchbar) {
	padding: 0 !important;
}
.box {
	width: 100%;
	padding: 35rpx 20rpx;
	background-color: #fff;
}

.box1 {
	&_item_wrapper {
		@include mFlex;
		justify-content: space-between;
		.box1_item {
			width: 20%;
			flex: none;
			@include mFlex;
			flex-direction: column;
			> .img_box {
				width: 80rpx;
				height: 80rpx;
				.image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			> .text {
				margin-top: 20rpx;
				font-size: 26rpx;
			}
		}
	}
}

.box2 {
}
</style>
