<template>
	<view class="box">
		<!-- 子分类 -->
		<m-sub-fenlei :listData="posterList"></m-sub-fenlei>

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
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { mSubFenlei } from '../components/m-sub-fenlei/m-sub-fenlei.vue'
import { navigateTo, showToastText } from '@/aTemp/utils/uniAppTools.js'

import { _posterGetIdPostAll } from '@/aTemp/apis/poster.js'

const posterList = ref([])
onLoad(options => {
	console.log(options)

	// 设置页面标题
	let pageName = options.name || '海报列表'
	uni.setNavigationBarTitle({
		title: pageName
	})

	// 获取海报分类数据
	const posterId = parseInt(options.id || 0)
	_posterGetIdPostAll({
		id: posterId
	}).then(res => {
		const { code, data, msg } = res
		posterList.value = data
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
