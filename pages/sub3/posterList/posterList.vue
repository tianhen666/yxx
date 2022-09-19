<template>
	<!-- 海报分类 -->
	<view class="box box1">
		<!-- 搜索 -->
		<uni-search-bar
			placeholder="1000+海报任意搜索"
			bgColor="#eeeeee"
			readonly
			radius="30"
			@tap="navigateTo('/pages/sub3/searchPosterList/searchPosterList')"
		></uni-search-bar>
		<view class="blank30"></view>

		<view class="box1_item_wrapper">
			<view
				class="box1_item"
				v-for="(item, index) in posterList"
				:key="index"
				@tap="
					navigateTo('/pages/sub3/posterListSub/posterListSub?parentId=' + item.id + '&parentName=' + item.posterName)
				"
			>
				<view class="img_box">
					<image class="image" src="/static/htz-image-upload/play.png" mode="aspectFill"></image>
				</view>
				<text class="text">{{ item.posterName }}</text>
			</view>

			<view class="box1_item" @tap="navigateTo('/pages/sub3/posterDrafts/posterDrafts')">
				<view class="img_box">
					<image class="image" src="/static/htz-image-upload/play.png" mode="aspectFill"></image>
				</view>
				<text class="text">门诊素材</text>
			</view>
		</view>
	</view>
	<view class="blank30"></view>

	<!-- 分类列表 -->
	<view class="box box2" v-for="(item, index) in posterList" :key="index">
		<m-title2
			:title="item.posterName"
			:path="'/pages/sub3/posterListSub/posterListSub?parentId=' + item.id + '&parentName=' + item.posterName"
		></m-title2>
		<!-- 子分类 -->
		<m-sub-fenlei :listData="item.children" :parentId="item.id" :parentName="item.posterName"></m-sub-fenlei>
		<!-- 列表  -->
		<m-poster-list :listData="item?.children[0]?.posterImgList"></m-poster-list>
	</view>

	<view class="blank30"></view>
	<view class="blank30"></view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'
import { mSubFenlei } from '../components/m-sub-fenlei/m-sub-fenlei.vue'
import { mPosterList } from '../components/m-poster-list/m-poster-list.vue'

import { _posterGetPostAll } from '@/aTemp/apis/poster.js'

const posterList = ref([])
onLoad(options => {
	_posterGetPostAll().then(res => {
		const { code, data, msg } = res
		posterList.value = data
	})
})
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
				font-size: 24rpx;
				color: #666;
			}
		}
	}
}

.box2 {
	margin-bottom: 30rpx;
}
</style>
