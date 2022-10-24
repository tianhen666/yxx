<template>
	<view class="container">
		<view class="serve_list">
			<!-- 列表 -->
			<template v-for="(item, index) in listData" :key="index">
				<view
					class="serve_list_item"
					:class="'bg' + (1 + (index % 4))"
					:style="{ background: `url('${item.background}') no-repeat` }"
					@tap="navigateTo(`/pages/sub1/serveInfo/serveInfo?targetId=${item.id}`)"
				>
					<view class="title">{{ item.title }}</view>
					<view class="peculiarity">{{ item.peculiarity || '门诊首推' }}</view>
				</view>
			</template>
		</view>
		<view class="more" @click="navigateTo('/pages/sub1/serveList/serveList')" v-if="listData.length > 5 && more">
			<text class="text">查看更多</text>
			<uni-icons type="bottom" size="16" color="#bbb"></uni-icons>
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
	},
	more: {
		type: Boolean,
		default: false
	}
})
</script>

<style lang="scss" scoped>
.more {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: auto;
	margin-top: 30rpx;
	.text {
		color: #bbb;
		font-size: 26rpx;
		padding-right: 3px;
	}
}

.container {
	.serve_list {
		@include mFlex;
		justify-content: space-between;
		flex-wrap: wrap;
		.serve_list_item {
			overflow: hidden;
			width: 343rpx;
			height: 132rpx;
			flex: none;
			box-sizing: border-box;
			margin-bottom: 30rpx;
			border-radius: 16rpx;
			padding: 30rpx 28rpx;
			background-size: cover !important;
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
			.peculiarity {
				color: #4b8eff88;
			}
		}
		.bg2 {
			color: #34c251;
			.peculiarity {
				color: #34c25188;
			}
		}
		.bg3 {
			color: #ff6464;
			.peculiarity {
				color: #ff646488;
			}
		}
		.bg4 {
			color: #ff8e47;
			background-size: cover;
			.peculiarity {
				color: #ff8e4788;
			}
		}
	}
}
</style>
