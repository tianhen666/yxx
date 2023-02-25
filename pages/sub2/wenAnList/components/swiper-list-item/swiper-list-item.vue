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
			<view class="container_item" v-for="(item, index) in dataList" :key="index">
				<!-- 头像,时间 -->
				<view class="top">
					<image
						class="image"
						:src="item.avatar || 'https://imgs.lechiwl.com/fileyxx/imgs/thIcon.png'"
						mode="aspectFill"
					></image>
					<view class="top_right">
						<text class="name">{{ item.userName || '微信用户' }}</text>
						<text class="time">
							{{ dayjs(item.createDt).format('YYYY-MM-DD HH:mm') }}
						</text>
					</view>
				</view>

				<!-- 文案内容 -->
				<view class="center">
					<text>{{ item.content }}</text>
				</view>

				<!-- 图片 -->
				<view class="image_wrapper">
					<image class="image" :src="item.mainPic" mode="aspectFill"></image>
				</view>

				<view class="btn">
					<view
						class="btn_item"
						style="margin-right: 40rpx;"
						@tap="setClipboardData(item.content)"
					>
						<uni-icons customPrefix="iconfont" type="icon-fuzhi" size="18"></uni-icons>
						<text class="text">复制文案({{ item.views }})</text>
					</view>

					<view class="btn_item">
						<uni-icons customPrefix="iconfont" type="icon-xiazai" size="18"></uni-icons>
						<text class="text">一键保存图片</text>
					</view>
				</view>

				<!-- 编辑 -->
				<view
					class="edit"
					v-if="
						(useUserMain.storeId == 1 || useUserMain.storeId == 11) &&
							useUserMain.power != -1
					"
				>
					编辑
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script setup>
import { ref, watch } from 'vue';
import dayjs from 'dayjs';
import { _storeCopyWriterGetinfo, _storeCopyWriterDel } from '@/aTemp/apis/wenan.js';
import { navigateTo, showModal, setClipboardData } from '@/aTemp/utils/uniAppTools.js';

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js';
const useUserMain = _useUserMain();

// 第一次加载完成
const firstLoaded = ref(false);
// 数据列表
const dataList = ref([]);
// 插件对象
const pagingObj = ref(null);

const props = defineProps({
	tabListObj: {
		type: Array,
		default() {
			return [];
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
});

watch(
	() => props.currentTabIndex,
	(newVal, oldVal) => {
		if (newVal === props.tabIndex) {
			//懒加载，当滑动到当前的item时，才去加载
			if (!firstLoaded.value) {
				setTimeout(() => {
					pagingObj.value.reload(true);
				}, 100);
			}
		}
	},
	{ immediate: true }
);

// 后台获取数据
const queryList = (pageNo, pageSize) => {
	const params = {
		pageNum: pageNo,
		pageSize: pageSize,
		stoName: '',
		classify: props.tabListObj[props.tabIndex].classify
	};
	_storeCopyWriterGetinfo(params)
		.then(res => {
			pagingObj.value.complete(res.data.records);
			firstLoaded.value = true;
		})
		.catch(res => {
			pagingObj.value.complete(false);
		});
};

// 删除
const Adel = (item, index) => {
	showModal('是否删除？').then(res => {
		if (res.confirm) {
			_storeCopyWriterDel({ id: item.id }).then(() => {
				dataList.value.splice(index, 1);
			});
		}
	});
};

// 复制
const copy = text => {
	setClipboardData(text);
};
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
	overflow: hidden;
	margin-bottom: 30rpx;
	padding: 30rpx 30rpx;
	position: relative;
	&:last-of-type {
		margin-bottom: 0;
	}
	.top {
		display: flex;
		align-items: center;
		.image {
			width: 90rpx;
			height: 90rpx;
			flex: none;
			border-radius: 10rpx;
		}
		.top_right {
			flex: auto;
			margin-left: 30rpx;
			.name {
				display: block;
				color: #333;
				font-size: 28rpx;
				margin-bottom: 30rpx;
			}
			.time {
				display: block;
				color: #ccc;
				font-size: 25rpx;
			}
		}
	}

	.center {
		padding-left: 120rpx;
		font-size: 28rpx;
		color: #333;
		margin-top: 30rpx;
		line-height: 1.8;
	}
	.btn {
		display: flex;
		padding-left: 120rpx;
		font-size: 25rpx;
		margin-top: 30rpx;
		color: #666;
		.btn_item {
			display: flex;
			align-items: center;
			.text {
				padding-left: 10rpx;
			}
		}
	}
	.edit {
		position: absolute;
		background-color: $main-color;
		color: #fff;
		border-radius: 10rpx;
		font-size: 22rpx;
		padding: 8rpx 12rpx;
		top: 10rpx;
		right: 10rpx;
	}
}
</style>
