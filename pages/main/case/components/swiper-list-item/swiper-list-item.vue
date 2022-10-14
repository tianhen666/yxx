<!-- 在这个文件对每个tab对应的列表进行渲染 -->
<template>
	<view class="content">
		<!--  :enable-back-to-top="currentIndex===tabIndex" 在微信小程序上可以多加这一句，因为默认是允许点击返回顶部的，但是这个页面有多个scroll-view，会全部返回顶部，所以需要控制是当前index才允许点击返回顶部 -->
		<z-paging
			ref="pagingObj"
			v-model="dataList"
			@query="queryList"
			:fixed="false"
			:auto="false"
			:empty-view-center="false"
			min-delay="1000"
		>
			<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
			<view
				class="container_item"
				v-for="(item, index) in dataList"
				:key="index"
				@click="navigateTo(`/pages/sub1/caseInfo/caseInfo?targetId=${item.id}`)"
			>
				<!-- 图片 -->
				<view class="image_wrapper"><image class="image" :src="item.mainPic" mode="aspectFill"></image></view>
				<!-- 标题 -->
				<view class="title">{{ item.title }}</view>
			</view>
		</z-paging>
	</view>
</template>

<script setup>
import { ref, watch } from 'vue'
import { _storecaseGetlist } from '@/aTemp/apis/case.js'
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'

// 第一次加载完成
const firstLoaded = ref(false)
// 数据列表
const dataList = ref([])
// 插件对象
const pagingObj = ref(null)

const props = defineProps({
	tabListObj: {
		type: Array,
		default() {
			return []
		}
	},
	tabIndex: {
		type: Number,
		default: 0
	},
	currentTabIndex: {
		type: Number,
		default: 0
	}
})

watch(
	() => props.currentTabIndex,
	(newVal, oldVal) => {
		// console.log(props.tabIndex)
		// console.log(newVal)
		if (newVal === props.tabIndex) {
			//懒加载，当滑动到当前的item时，才去加载
			if (!firstLoaded.value) {
				setTimeout(() => {
					pagingObj.value.reload(true)
				}, 100)
			}
		}
	},
	{ immediate: true }
)

// 后台获取数据
const queryList = (pageNo, pageSize) => {
	const params = {
		pageNum: pageNo,
		pageSize: pageSize,
		categoryId: props.tabListObj[props.tabIndex].id
	}
	_storecaseGetlist(params)
		.then(res => {
			pagingObj.value.complete(res.data)
			firstLoaded.value = true
		})
		.catch(res => {
			pagingObj.value.complete(false)
		})
}
</script>

<style scoped lang="scss">
/* 注意:父节点需要固定高度，z-paging的height:100%才会生效 */
.content {
	height: 100%;
}

.container_item {
	margin-bottom: 30rpx;
	width: $main-width;
	margin: auto;
	background-color: #fff;
	border-radius: 16rpx;
	overflow: hidden;
	&:last-child {
		margin-bottom: 0;
	}

	.image_wrapper {
		width: 100%;
		padding-top: 50%;
		position: relative;
		overflow: hidden;
		.image {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}
	.title {
		padding: $padding;
		font-weight: bold;
		color: $uni-main-color;
		font-size: 30rpx;
		@include singleLineTextOverHidden;
	}
	.views {
		font-size: 26rpx;
		color: $text-color-grey;
		margin-top: 20rpx;
	}
}
</style>
