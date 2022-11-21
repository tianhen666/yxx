<template>
	<!-- 加载中 -->
	<m-page-loading v-if="loading"></m-page-loading>
	<!-- 海报分类 -->
	<view class="box box1" style="padding-bottom: 0;">
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
				v-for="(item, index) in posterTypeList"
				:key="index"
				@tap="
					navigateTo('/pages/sub3/posterListSub/posterListSub?parentClassId=' + item.id + '&parentClassName=' + item.posterName)
				"
			>
				<view class="img_box">
					<image class="image" :src="`/static/images/poster${index}.png`" mode="aspectFill"></image>
				</view>
				<!-- <text class="text">{{ item.posterName }}</text> -->
			</view>

			<view class="box1_item" @tap="navigateTo('/pages/sub3/posterDrafts/posterDrafts')">
				<view class="img_box"><image class="image" src="/static/images/poster3.png" mode="aspectFill"></image></view>
				<!-- <text class="text">门诊素材</text> -->
			</view>
		</view>
		<view class="blank20"></view>
	</view>

	<!-- 分类列表 -->
	<view class="box box2" v-for="(item, index) in posterTypeList" :key="index">
		<m-title2
			:title="item.posterName"
			:path="'/pages/sub3/posterListSub/posterListSub?parentClassId=' + item.id + '&parentClassName=' + item.posterName"
		></m-title2>
		<!-- 子分类 -->
		<m-sub-fenlei :listData="item.children" :parentClassId="item.id" :parentClassName="item.posterName"></m-sub-fenlei>
		<!-- 列表  -->
		<m-poster-list :listData="item.posterDataList" :parentClassId="item.id"></m-poster-list>
	</view>

	<!-- 添加海报 -->
	<view
		class="addPoster"
		v-if="(useUserMain.storeId == 1 || useUserMain.storeId == 11) && useUserMain.power != -1"
		@tap="navigateTo('/pages/sub3/addPoster/addPoster')"
	>
		<text>添加</text>
		<text>海报</text>
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

import { _posterGetPostType, _posterGetPostTypeId } from '@/aTemp/apis/poster.js'

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 海报数据列表
const posterTypeList = ref([])
const loading = ref(true)
onLoad(options => {
	_posterGetPostType().then( async res => {
		const { code, data, msg } = res
		
		for(let i = 0;i<data.length;i++){
			if(data[i].children){
				const posterDataList = await _posterGetPostTypeId({ id: data[i].children[0].id })
				data[i].posterDataList = posterDataList.data[0].posterImgList
			}
		}
		posterTypeList.value = data
		setTimeout(() => {
			loading.value = false
		}, 1000)
	})
})
</script>

<style lang="scss">
.addPoster {
	position: fixed;
	right: 40rpx;
	bottom: 60rpx;
	z-index: 10;
	background-color: $main-color;
	color: #fff;
	box-sizing: content-box;
	font-size: 24rpx;
	line-height: 1.5em;
	border-radius: 50%;
	overflow: hidden;
	width: 100rpx;
	height: 100rpx;
	text-align: justify;
	@include mFlex;
	flex-direction: column;
}

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
				width: 120rpx;
				height: 120rpx;
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
