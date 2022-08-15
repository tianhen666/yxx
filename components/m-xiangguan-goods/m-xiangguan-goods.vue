<template>
	<view class="shop_list" v-for="(item, index) in props.shopListData" :key="index">
		<image class="image" :src="item.img" mode="aspectFill"></image>
		<view class="center">
			<view class="title">{{ item.title }}</view>
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
		</view>
		<view class="right" @click="delClick(index)">删除</view>
	</view>
</template>

<script setup>
const props = defineProps({
	shopListData: {
		type: Object,
		default: () => {}
	}
})
const emits = defineEmits(['delClick'])
const delClick = index => {
	emits('delClick', index)
}
</script>

<style lang="scss" scoped>
.shop_list {
	@include mFlex;
	justify-content: space-between;
	border-bottom: 1px solid $uni-border-3;
	padding-bottom: 30rpx;
	overflow: hidden;
	margin-bottom: 30rpx;
	&:last-child{
		border-bottom: none;
		margin-bottom: 0;
		padding-bottom: 0;
	}
	> .image {
		width: 100rpx;
		height: 100rpx;
		flex: none;
	}
	> .center {
		flex: auto;
		margin: 0 20rpx;
		overflow: hidden;
		> .title {
			@include singleLineTextOverHidden;
			font-size: 28rpx;
			margin-bottom: 25rpx;
			color: $uni-main-color;
		}
		> .price_wrapper {
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
	}
	> .right {
		width: 100rpx;
		flex: none;
		color: $sub-color;
		font-size: 30rpx;
		text-align: center;
		border: 1px solid $sub-color;
		padding: 10rpx;
		border-radius: 100rpx;
	}
}
</style>
