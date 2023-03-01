<!-- 在这个文件对每个tab对应的列表进行渲染 -->
<template>
	<view class="content">
		<z-paging
			ref="pagingObj"
			v-model="dataList"
			@query="queryList"
			:fixed="false"
			:auto="false"
			:empty-view-center="false"
			min-delay="1000"
		>
			<template #top v-if="search">
				<div class="blank30"></div>
				<!-- 搜索框 -->
				<view class="search-box">
					<uni-search-bar
						v-model="searchName"
						placeholder="输入关键字搜索文案"
						bgColor="#EEEEEE"
						focus
						@confirm="searchHandle"
					/>
				</view>

				<view class="hot_name">
					<view class="box1">热搜榜单</view>
					<view class="box2">
						<view
							class="box2_item"
							@tap="tapHotSearch(item)"
							v-for="(item, index) in hotSearchList"
							:key="index"
						>
							{{ item }}
						</view>
					</view>
				</view>
			</template>
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
				<view class="image_wrapper" @tap="downPoster(item)">
					<image class="image" :src="JSON.parse(item.icon).url" mode="aspectFit"></image>
				</view>

				<view class="btn">
					<view class="btn_item" style="margin-right: 40rpx;" @tap="copy(item)">
						<uni-icons customPrefix="iconfont" type="icon-fuzhi" size="18"></uni-icons>
						<text class="text">复制文案({{ item.views || 0 }})</text>
					</view>

					<view class="btn_item" @tap="downPoster(item)">
						<uni-icons customPrefix="iconfont" type="icon-xiazai" size="18"></uni-icons>
						<text class="text">制作海报</text>
					</view>
				</view>

				<!-- 编辑 -->
				<view
					class="edit"
					@tap="navigateTo(`/pages/sub2/AddWenAnList/AddWenAnList?id=${item.id}`)"
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
import {
	_storeCopyWriterGetinfo,
	_storeCopyWriterDel,
	_storeCopyWriterCopyInfo,
	_storeCopyWriterGetStoreCopyWriter,
	_storeCopyWriterGetHistory
} from '@/aTemp/apis/wenan.js';
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

// 搜索关键词
const searchName = ref('');

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
	},
	search: {
		type: Boolean,
		default: false
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
		stoName: searchName.value,
		classify: props.tabListObj[props.tabIndex].id
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
const copy = item => {
	_storeCopyWriterCopyInfo({
		userId: useUserMain.userid,
		sceneId: item.id
	}).then(res => {
		setClipboardData(item.content);
		item.views++;
	});
};
// 选择海报
import { _useStoreWenAn } from '@/aTemp/store/storeWenAn.js';
const useStoreWenAn = _useStoreWenAn();

// 去制作海报页面
const downPoster = item => {
	const { id, url } = JSON.parse(item.icon);
	useStoreWenAn.$patch({ posterID: id, posterCover: url });
	navigateTo('/pages/sub3/wenAnPosterInfo/wenAnPosterInfo');
};

// 搜索事件
const searchHandle = () => {
	pagingObj.value.reload(true);
};

const hotSearchList = ref([]);
// 搜索历史记录
const storeCopyWriterGetHistory = () => {
	_storeCopyWriterGetHistory().then(res => {
		hotSearchList.value = res.data;
	});
};
if (props.search) {
	storeCopyWriterGetHistory();
}

// 点击热搜榜单
const tapHotSearch = item => {
	searchName.value = item;
	pagingObj.value.reload(true);
};
</script>

<style scoped lang="scss">
.hot_name {
	padding: 20rpx;
	margin: 20rpx;
	margin-top: 0;
	background: #fff;
	.box1 {
		color: #666;
		font-size: 26rpx;
		margin-bottom: 30rpx;
	}
	.box2 {
		display: flex;
		.box2_item {
			background-color: #eee;
			font-size: 22rpx;
			color: #666;
			padding: 10rpx 20rpx;
			margin-right: 20rpx;
		}
	}
}
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

	.image_wrapper {
		width: 350rpx;
		height: 623rpx;
		margin-left: 120rpx;
		margin-top: 30rpx;
		border: 1px dotted #ddd;
		.image {
			width: 100%;
			height: 100%;
		}
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
