<template>
	<m-page-loading v-if="loading"></m-page-loading>
	<z-paging-swiper>
		<!-- 背景 -->
		<view class="pageBg">
			<image class="image" src="/static/images/bg.png" mode="aspectFill"></image>
		</view>
		<!-- #ifndef H5 -->
		<!-- 标题栏 -->
		<uni-nav-bar statusBar fixed :title="'门诊案例'" color="#ffffff" :border="false"></uni-nav-bar>
		<view class="blank20"></view>
		<!-- #endif -->

		<view class="box scroll-view-box" v-if="tabListObj.length>0">
			<scroll-view scroll-x="true" class="scroll-view_H" :scroll-into-view="scrollIntoView" scroll-with-animation>
				<view
					:id="'scrollViewItem' + index"
					:class="{ current: tabIndex === index }"
					class="scroll-view-item uni-bg-red"
					v-for="(item, index) in tabListObj"
					:key="index"
					@tap="onClickItem(index)"
				>
					{{ item.name }}
				</view>
			</scroll-view>
		</view>
		<view class="blank30"></view>

		<!-- 滑动切换 -->
		<swiper class="swiper" :current="tabIndex" @transition="swiperTransition" @animationfinish="swiperAnimationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in tabListObj" :key="index">
				<!-- z-paging start -->
				<swiper-list-item :currentTabIndex="tabIndex" :tabIndex="index" :tabListObj="tabListObj"></swiper-list-item>
				<!-- z-paging end -->
			</swiper-item>
		</swiper>
	</z-paging-swiper>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { _storecaseFlist } from '@/aTemp/apis/case.js'
import swiperListItem from './components/swiper-list-item/swiper-list-item.vue'

// 原始数据tab列表
const tabListObj = ref([])
// 当前选择的索引
const tabIndex = ref(0)
// tab滚动条位置
const scrollIntoView = ref('')
// 加载中
const loading = ref(true)

//swiper滑动中
const swiperTransition = e => {}
//swiper滑动结束
const swiperAnimationfinish = e => {
	tabIndex.value = e.detail.current
	scrollIntoView.value = 'scrollViewItem' + (e.detail.current - 1 < 0 ? 0 : e.detail.current - 1)
}

onLoad(options => {
	// console.log(options)
	storecaseGetlist()
})

// 获取分类列表
const storecaseGetlist = () => {
	_storecaseFlist().then(res => {
		const { msg, data, code } = res
		tabListObj.value = data
		setTimeout(() => {
			loading.value = false
		}, 1000)
	})
}

// 点击切换按钮
const onClickItem = index => {
	tabIndex.value = index
	scrollIntoView.value = 'scrollViewItem' + (index - 1 < 0 ? 0 : index - 1)
}
</script>

<style lang="scss" scoped>
.box {
	width: $main-width;
	margin: auto;
	border-radius: 16rpx;
	overflow: hidden;
	background-color: #fff;
}
.scroll-view-box {
	padding: 28rpx 0;
}
.scroll-view_H {
	white-space: nowrap;
	width: 100%;
	padding: 0 30rpx;
}
.scroll-view-item {
	display: inline-block;
	margin-right: 30rpx;
	font-size: 28rpx;
	padding: 18rpx 24rpx;
	border-radius: 100rpx;
	&:last-of-type {
		margin-left: 0;
	}
}
.scroll-view-item.current {
	color: #fff;
	background-color: $main-color;
}
.swiper {
	height: 100%;
}
</style>
