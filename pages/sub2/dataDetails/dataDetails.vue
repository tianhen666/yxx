<template>
	<m-page-loading v-if="loading"></m-page-loading>
	<z-paging-swiper safe-area-inset-bottom>
		<template #top>
			<!-- 搜索框 -->
			<view class="search-box">
				<uni-search-bar readonly placeholder="请输入手机号或用户名" bgColor="#EEEEEE" />
			</view>

			<!-- 分类按钮 -->
			<view class="box scroll-view-box" v-if="tabListObj.length > 0">
				<scroll-view
					scroll-x="true"
					class="scroll-view_H"
					:scroll-into-view="scrollIntoView"
					scroll-with-animation
				>
					<template v-for="(item, index) in tabListObj" :key="index">
						<view
							v-if="item"
							:id="'scrollViewItem' + index"
							:class="{ current: tabIndex === index }"
							class="scroll-view-item uni-bg-red"
							@tap="onClickItem(index)"
						>
							{{ item.name }}
						</view>
					</template>
				</scroll-view>
			</view>
			<view class="blank30"></view>
		</template>

		<!-- 分类内容 -->
		<swiper
			class="swiper"
			:current="tabIndex"
			@transition="swiperTransition"
			@animationfinish="swiperAnimationfinish"
		>
			<swiper-item class="swiper-item" v-for="(item, index) in tabListObj" :key="index">
				<!-- z-paging start -->
				<swiper-list-item
					v-if="item"
					:currentTabIndex="tabIndex"
					:tabIndex="index"
					:tabListObj="tabListObj"
				></swiper-list-item>
				<!-- z-paging end -->
			</swiper-item>
		</swiper>
	</z-paging-swiper>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import swiperListItem from './components/swiper-list-item/swiper-list-item.vue';
import { navigateTo } from '@/aTemp/utils/uniAppTools.js';

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js';
const useUserMain = _useUserMain();

// 原始数据tab列表
const tabListObj = ref([
	{
		id: 1,
		name: '员工数据'
	},
	{
		id: 2,
		name: '用户数据'
	}
]);
// 当前选择的索引
const tabIndex = ref(0);
// tab滚动条位置
const scrollIntoView = ref('');
// 加载中
const loading = ref(false);

//swiper滑动中
const swiperTransition = e => {};
//swiper滑动结束
const swiperAnimationfinish = e => {
	tabIndex.value = e.detail.current;
	scrollIntoView.value = 'scrollViewItem' + (e.detail.current - 1 < 0 ? 0 : e.detail.current - 1);
};

onLoad(options => {
	// console.log(options)
});

// 点击切换按钮
const onClickItem = index => {
	tabIndex.value = index;
	scrollIntoView.value = 'scrollViewItem' + (index - 1 < 0 ? 0 : index - 1);
};
</script>

<style lang="scss" scoped>
.add {
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

.box {
	position: relative;
	z-index: 2;
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
	background-color: #eeeeee;
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
