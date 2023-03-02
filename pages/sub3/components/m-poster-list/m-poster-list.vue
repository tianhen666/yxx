<template>
	<view :class="`list${column}`">
		<template v-for="(item, index) in listData" :key="index">
			<view
				class="item"
				@tap.stop="
					useStoreWenAn.isChosePoster
						? chosePosterTap(item)
						: navigateTo(`/pages/sub3/posterInfo/posterInfo?id=${item.id}`)
				"
				v-if="maxNumber === -1 ? true : index < maxNumber"
			>
				<image class="image" :src="item.posterurl" mode="aspectFill"></image>
				<button
					class="edit"
					@tap.stop="
						navigateTo(
							`/pages/sub3/addPoster/addPoster?id=${
								item.id
							}&parentClassId=${parentClassId}`
						)
					"
					v-if="
						(useUserMain.storeId == 1 || useUserMain.storeId == 11) &&
							useUserMain.power != -1
					"
				>
					编辑
				</button>
			</view>
		</template>
		<view class="item" v-if="listData.length % column === column - 1"></view>
	</view>
</template>

<script setup>
import { navigateTo, navigateBack } from '@/aTemp/utils/uniAppTools.js';

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js';
const useUserMain = _useUserMain();

// 选择海报
import { _useStoreWenAn } from '@/aTemp/store/storeWenAn.js';
const useStoreWenAn = _useStoreWenAn();

const props = defineProps({
	listData: {
		required: true,
		type: Array,
		default: () => []
	},
	parentClassId: {
		// 父分类ID
		type: Number,
		default: 0
	},
	maxNumber: {
		type: Number,
		default: 6
	},
	column: {
		type: Number,
		default: 3
	}
});

const chosePosterTap = item => {
	const posterImg = JSON.parse(item.posterImg);
	useStoreWenAn.$patch({
		isChosePoster: false,
		posterID: item.id,
		posterCover: posterImg.background
	});
	const pages = getCurrentPages();
	navigateBack(pages.length - 3);
};
</script>

<style lang="scss">
.list3 {
	@include mFlex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-top: -25rpx;
	.item {
		width: 220rpx;
		position: relative;
		.image {
			margin-top: 25rpx;
			width: 100%;
			height: 392rpx;
			border-radius: 8rpx;
		}
	}
}

.edit {
	position: absolute;
	top: 40rpx;
	right: 10rpx;
	font-size: 24rpx;
	color: #fff;
	background-color: $main-color;
	line-height: 1.4;
	padding: 0 10rpx;
}

.list2 {
	@include mFlex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-top: -30rpx;
	.item {
		width: 340rpx;
		position: relative;
		.image {
			margin-top: 30rpx;
			width: 100%;
			height: 606rpx;
			border-radius: 8rpx;
		}
	}
}
</style>
