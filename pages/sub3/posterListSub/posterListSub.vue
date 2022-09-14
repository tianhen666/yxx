<template>
	<view class="box">
		<!-- 子分类 -->
		<m-sub-fenlei></m-sub-fenlei>

		<!-- 列表 -->
		<view class="list">
			<view
				class="list_item"
				v-for="(item, index) in 8"
				:key="index"
				@tap="navigateTo('/pages/sub3/posterInfo/posterInfo')"
			>
				<image
					class="image"
					src="https://imgs.fenxiangzl.com/tooth/product/0e4dc240-93c2-4de9-af63-3029cf954ffe.jpg"
					mode="aspectFill"
				></image>
			</view>
		</view>
		<view class="blank40"></view>
		<view class="blank40"></view>
	</view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { mSubFenlei } from '../components/m-sub-fenlei/m-sub-fenlei.vue'
import { navigateTo, showToastText } from '@/aTemp/utils/uniAppTools.js'
onLoad(options => {
	uni.setNavigationBarTitle({
		title: '新的标题'
	})
})
</script>

<style scoped lang="scss">
.box {
	width: 100%;
	padding: 0rpx 20rpx;
	background-color: #fff;
}

.list {
	@include mFlex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-top: -30rpx;
	&_item {
		width: 340rpx;
		.image {
			margin-top: 30rpx;
			width: 100%;
			height: 606rpx;
			border-radius: 8rpx;
		}
	}
}
</style>
