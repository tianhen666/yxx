<template>
	<pinapp-empty-page v-if="props.listData.length === 0" />
	<view class="container" v-else>
		<!-- 标题插槽 -->
		<slot name="title"></slot>

		<!-- 详情列表 -->
		<view class="container_item" v-for="(item, index) in props.listData" :key="index">
			<view
				class="select_option"
				v-if="selectOption"
				:class="props.selectListId.includes(item.id+'') ? 'select_option_color' : ''"
			>
				<image class="image" src="/static/default/duigou.png" mode="aspectFill"></image>
				<view class="select_cover" @tap.stop="selectClick(item)"></view>
			</view>

			<image
				class="image"
				:src="item.img"
				mode="aspectFill"
				@tap.stop="navigateTo('/pages-sub1/goodsInfo/goodsInfo')"
			></image>
			<view class="right" @tap.stop="navigateTo('/pages-sub1/goodsInfo/goodsInfo')">
				<view class="title">{{ item.title }}</view>
				<view class="desc">{{ item.desc }}</view>
				<!-- 价格 -->
				<view class="box">
					<view class="price_wrapper">
						<view class="price">
							<text class="price_cn">￥</text>
							<text>{{ item.price }}</text>
						</view>
						<view class="originalPrice">
							<text>￥</text>
							<text class="originalPrice_through">{{ item.originalPrice }}</text>
						</view>
					</view>

					<view class="right" v-if="props.showBtn">立即购买</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, computed,toRef } from 'vue'
import { navigateTo } from '@/utils/uniApp'

const emits = defineEmits(['selectClick'])

// 选中事件
const selectClick = item => {
	emits('selectClick',item)
}

const props = defineProps({
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

	listData: {
		type: Array,
		default: () => []
	}
})
</script>

<style lang="scss" scoped>
.container {
	width: $main-width;
	margin: 32rpx auto;
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
				font-size: 26rpx;
				@include singleLineTextOverHidden;
			}
			> .desc {
				font-size: 24rpx;
				line-height: 1.5;
				color: $uni-secondary-color;
				text-align: justify;
				margin-top: 20rpx;
				min-height: 72rpx;
				@include textOverHidden;
			}
			> .box {
				@include mFlex;
				justify-content: space-between;
				margin-top: 20rpx;
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
				> .right {
					margin-left: 20rpx;
					flex: none;
					color: #ffffff;
					font-size: 24rpx;
					width: 144rpx;
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
