<template>
	<view class="container">
		<view class="serve_list">
			<!-- 列表 -->
			<view
				class="serve_list_item"
				v-for="(item, index) in props.listData"
				:key="index"
				:class="'bg' + (1 + index)"
				@tap="navigateTo(`/pages/sub1/serveInfo/serveInfo?id=${item.id}`)"
			>
				<view class="title">{{ item.title }}</view>
				<view class="peculiarity">{{ item.peculiarity || '门诊首推' }}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'
const props = defineProps({
	listData: {
		required: true,
		type: Array,
		default: () => []
	}
})
</script>

<style lang="scss" scoped>
.container {
	.serve_list {
		@include mFlex;
		justify-content: space-between;
		flex-wrap: wrap;
		.serve_list_item {
			overflow: hidden;
			width: 333rpx;
			height: 132rpx;
			flex: none;
			box-sizing: border-box;
			margin-bottom: 30rpx;
			border-radius: 16rpx;
			padding: 30rpx 28rpx;
			&:nth-last-child(2) {
				margin-bottom: 0;
			}
			&:nth-last-child(1) {
				margin-bottom: 0;
			}
			.title {
				font-size: 28rpx;
				font-weight: 500;
				line-height: 28rpx;
				@include singleLineTextOverHidden;
			}
			.peculiarity {
				font-size: 24rpx;
				font-weight: 400;
				line-height: 24rpx;
				padding-top: 20rpx;
			}
		}
		.bg1 {
			color: #4b8eff;
			background: url('@/static/images/fw1.png') no-repeat;
			background-size: cover;
			.peculiarity {
				color: #4b8eff88;
			}
		}
		.bg2 {
			color: #34c251;
			background: url('@/static/images/fw2.png') no-repeat;
			background-size: cover;
			.peculiarity {
				color: #34c25188;
			}
		}
		.bg3 {
			color: #ff6464;
			background: url('@/static/images/fw3.png') no-repeat;
			background-size: cover;
			.peculiarity {
				color: #ff646488;
			}
		}
		.bg4 {
			color: #ff8e47;
			background: url('@/static/images/fw4.png') no-repeat;
			background-size: cover;
			.peculiarity {
				color: #ff8e4788;
			}
		}
	}
}
</style>
