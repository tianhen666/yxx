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
				@click="navigateTo(`/pages/sub2/activityTemplateDetails/activityTemplateDetails?targetId=${item.id}`)"
			>
				<!-- 图片 -->
				<view class="image_wrapper"><image class="image" :src="item.mainPic" mode="aspectFill"></image></view>
				<!-- 标题 -->
				<view class="title">{{ item.title }}</view>

				<!-- 按钮 -->
				<view class="box">
					<view class="sales">已使用 {{ item.numberOfUse || 0 }} 次</view>
					<view class="btn">
						<view
							class="btn_item style1"
							@tap.stop.prevent="
								navigateTo(`/pages/sub2/activityTemplateDetails/activityTemplateDetails?targetId=${item.id}`)
							"
						>
							预览此模板
						</view>
						<view
							class="btn_item style2"
							v-if="(useUserMain.storeId == 1 || useUserMain.storeId == 11) && useUserMain.power != -1"
							@tap.stop.prevent="navigateTo(`/pages/sub2/addActivityTemplate/addActivityTemplate?id=${item.id}`)"
						>
							编辑
						</view>
						<view
							class="btn_item style3"
							v-if="(useUserMain.storeId == 1 || useUserMain.storeId == 11) && useUserMain.power != -1"
							@tap.stop.prevent="Adel(item, index)"
						>
							删除
						</view>
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script setup>
import { ref, watch } from 'vue'
import { _enrollFormTemplateGetlist, _enrollFormTemplateDeleteEnrollFormTemplate } from '@/aTemp/apis/activity.js'
import { navigateTo, showModal } from '@/aTemp/utils/uniAppTools.js'

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

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
		templateType: props.tabListObj[props.tabIndex]
	}
	_enrollFormTemplateGetlist(params)
		.then(res => {
			pagingObj.value.complete(res.data.userList)
			firstLoaded.value = true
		})
		.catch(res => {
			pagingObj.value.complete(false)
		})
}

// 删除
const Adel = (item, index) => {
	showModal('是否删除？').then(res => {
		if (res.confirm) {
			_enrollFormTemplateDeleteEnrollFormTemplate({ id: item.id }).then(() => {
				dataList.value.splice(index, 1)
			})
		}
	})
}
</script>

<style scoped lang="scss">
/* 注意:父节点需要固定高度，z-paging的height:100%才会生效 */
.content {
	height: 100%;
}

.container_item {
	width: $main-width;
	margin: auto;
	background-color: #fff;
	border-radius: 16rpx;
	overflow: hidden;
	margin-bottom: 30rpx;
	&:last-of-type {
		margin-bottom: 0;
	}

	.image_wrapper {
		width: 100%;
		padding-top: 80%;
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
		padding-bottom: 0;
		font-weight: bold;
		color: $uni-main-color;
		font-size: 30rpx;
		@include singleLineTextOverHidden;
	}
	.box {
		margin: $padding;
		@include mFlex;
		justify-content: space-between;
		> .sales {
			color: $uni-secondary-color;
			font-size: 26rpx;
		}
		> .btn {
			> .btn_item {
				padding: 16rpx 30rpx;
				display: inline-block;
				text-align: center;
				border-radius: 100rpx;
				font-size: 26rpx;
				margin-right: 20rpx;
				&:last-child {
					margin-right: 0;
				}
			}
			> .style1 {
				background-color: $main-color;
				color: #ffffff;
			}
			> .style2 {
				color: $uni-secondary-color;
				border: 1px solid $uni-border-3;
			}
			> .style3 {
				background-color: $sub-color;
				color: #ffffff;
			}
		}
	}
}
</style>
