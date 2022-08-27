<template>
	<pinapp-empty-page v-if="props.listData.length === 0" />
	<view class="container" v-else>
		<!-- 标题插槽 -->
		<slot name="title"></slot>

		<!-- 详情列表 -->
		<view class="container_item" v-for="(item, index) in props.listData" :key="index">
			<!-- 勾选选项 -->
			<view
				class="select_option"
				v-if="selectOption"
				:class="props.selectListId.includes(item.id + '') ? 'select_option_color' : ''"
			>
				<image
					class="image"
					v-if="props.selectListId.includes(item.id + '')"
					src="/static/default/duigou.png"
					mode="aspectFill"
				></image>
				<view class="select_cover" @tap.stop="selectClick(item)"></view>
			</view>

			<!-- 图片 -->
			<image
				class="image"
				:src="item.pics[0]"
				mode="aspectFill"
				@tap.stop="navigateTo(`/pages/sub1/goodsInfo/goodsInfo?id=${item.id}`)"
			></image>

			<!-- 商品数据 -->
			<view class="right">
				<view class="title">{{ item.title }}</view>
				<view class="desc">{{ item.descData }}</view>

				<!-- 价格 -->
				<view class="box">
					<view class="price_wrapper">
						<view class="price">
							<text class="price_cn">￥</text>
							<text>{{ item.price }}</text>
						</view>
						<view class="originalPrice">
							<text>￥</text>
							<text class="originalPrice_through">{{ item.priceNormal || item.price }}</text>
						</view>
					</view>

					<!-- 购买按钮 -->
					<button
						class="btn"
						@tap.stop="navigateTo(`/pages/sub1/goodsInfo/goodsInfo?id=${item.id}`)"
						v-if="props.showBtn"
					>
						购买
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'

const emits = defineEmits(['selectClick'])

const props = defineProps({
	/*
	 * 是否显示购买按钮
	 */
	showBtn: {
		type: Boolean,
		default: false
	},
	/*
	 * 是否开启选项
	 */
	selectOption: {
		type: Boolean,
		default: false
	},
	/*
	 * 选中的列表
	 */
	selectListId: {
		type: Array,
		default: () => []
	},
	/*
	 * 数据列表
	 */
	listData: {
		type: Array,
		default: () => []
	}
})

/*
 *选中事件
 */
const selectClick = item => {
	emits('selectClick', item)
}
</script>

<style lang="scss" scoped>
.container {
	width: $main-width;
	margin: auto;
	&_item {
		overflow: hidden;
		background-color: #ffffff;
		border-radius: 16rpx;
		@include mFlex;
		justify-content: space-between;
		margin-bottom: 25rpx;
		padding: $padding;
		position: relative;
		&:last-child {
			margin-bottom: 0;
		}
		> .select_option {
			width: 38rpx;
			height: 38rpx;
			background-color: $uni-extra-color;
			flex: none;
			border-radius: 5rpx;
			margin-right: 20rpx;
			@include mFlex;
			> .image {
				width: 80%;
				height: 80%;
			}
			> .select_cover {
				position: absolute;
				z-index: 100;
				width: 100%;
				height: 100%;
				left: 0;
				right: 0;
			}
		}
		> .select_option_color {
			background-color: $main-color;
		}
		> .image {
			width: 180rpx;
			height: 180rpx;
			flex: none;
			border-radius: 8rpx;
		}
		> .right {
			flex: auto;
			padding-left: 30rpx;
			overflow: hidden;
			> .title {
				color: $uni-main-color;
				text-align: justify;
				font-size: 30rpx;
				@include singleLineTextOverHidden;
			}
			> .desc {
				font-size: 26rpx;
				line-height: 1.5;
				color: $uni-secondary-color;
				text-align: justify;
				margin-top: 15rpx;
				min-height: 72rpx;
				@include textOverHidden;
			}
			> .box {
				@include mFlex;
				justify-content: space-between;
				margin-top: 15rpx;
				> .price_wrapper {
					flex: auto;
					white-space: nowrap;
					overflow: hidden;
					@include mFlex;
					justify-content: left;
					flex-wrap: wrap;
					> .price {
						color: $sub-color;
						font-size: 36rpx;
						margin-right: 15rpx;
						.price_cn {
							font-size: 26rpx;
						}
					}
					> .originalPrice {
						margin-top: 15rpx;
						color: $uni-secondary-color;
						font-size: 26rpx;
						.originalPrice_through {
							text-decoration: line-through;
						}
					}
				}
				> .btn {
					margin-left: 20rpx;
					line-height: 1;
					flex: none;
					color: #ffffff;
					font-size: 24rpx;
					width: 80rpx;
					text-align: center;
					background-color: $sub-color;
					padding: 15rpx 0;
					border-radius: 8rpx;
				}
			}
		}
	}
}
</style>
