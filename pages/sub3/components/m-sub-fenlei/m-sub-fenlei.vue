<template>
	<view class="sub" v-if="listData.length">
		<scroll-view scroll-x="true" class="scroll_X" :class="packUp ? '' : 'packUp'">
			<view
				class="scroll-view-item"
				:class="index === currentIndex ? 'active' : ''"
				v-for="(item, index) in listData"
				:key="index"
				@tap.stop="scrollViewItemTap(item, index)"
			>
				{{ item.posterName }}
			</view>
		</scroll-view>

		<view class="sub_arrow" @tap.prevent.stop="packUp = !packUp">
			<uni-icons :type="packUp ? 'bottom' : 'top'" size="15" color="#333"></uni-icons>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'

const props = defineProps({
	listData: {
		// 子分类数据
		required: true,
		type: Array,
		default: () => []
	},
	parentClassId: {
		// 父分类ID
		type: Number,
		default: 0
	},
	parentClassName: {
		// 父分类名称
		type: String,
		default: '海报列表'
	},
	currentIndex: {
		// 当前选中索引
		type: Number,
		default: 0
	}
})

const emits = defineEmits(['modifyCurrentIndex'])

// 是否收起
const packUp = ref(true)

const scrollViewItemTap = (item, index) => {
	const pages = getCurrentPages()
	if (pages[pages.length - 1].route === 'pages/sub3/posterListSub/posterListSub') {
		emits('modifyCurrentIndex', index)
	} else {
		navigateTo(
			`/pages/sub3/posterListSub/posterListSub?parentClassId=${props.parentClassId}&currentIndex=${index}&parentClassName=${
				props.parentClassName
			}`
		)
	}
}
</script>

<style scoped lang="scss">
.sub {
	padding: 20rpx 0;
	position: relative;
	.packUp {
		white-space: normal !important;
		height: auto !important;
	}
	.scroll_X {
		white-space: nowrap;
		width: 100%;
		.scroll-view-item {
			display: inline-block;
			font-size: 26rpx;
			padding-right: 40rpx;
			height: 60rpx;
			text-align: center;
		}
		.active {
			font-weight: bold;
			color: #000;
			font-size: 26rpx;
			&:after {
				display: block;
				content: '';
				margin: auto;
				height: 4px;
				width: 28rpx;
				margin-top: 14rpx;
				background-color: $main-color;
				border-radius: 20rpx;
			}
		}
	}
	.sub_arrow {
		position: absolute;
		right: 0;
		height: 60rpx;
		top: 22rpx;
		font-size: 0;
		background-color: #fff;
		padding-left: 10rpx;
	}
}
</style>
