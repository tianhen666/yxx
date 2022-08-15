<template>
	<view class="container">
		<view class="c_wrapper">
			<!-- 更多 -->
			<m-title2 :title="props.listData.title" moreText="查看全部" :path="props.listData.path"></m-title2>

			<!-- 按钮 -->
			<view class="btn_box">
				<view class="btn_box_item" v-for="(item, index) in props.listData.sub" :key="index" @tap="itemClick(item)">
					<image class="image" :src="item.imgUrl" mode="aspectFill"></image>
					<text>{{ item.name }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	listData: {
		type: Object,
		required: true,
		default() {
			return {
				title: '管理工具',
				path: '/pages-sub1/orderList/orderList',
				sub: [
					{
						imgUrl: '/static/order/fukuan.png',
						name: '待付款',
						path: '/page/index/index'
					},
					{
						imgUrl: '/static/order/shiyong.png',
						name: '待使用',
						path: '/page/index/index'
					},
					{
						imgUrl: '/static/order/pingjia.png',
						name: '待评价',
						path: '/page/index/index'
					}
				]
			}
		}
	}
})
const itemClick = item => {
	uni.navigateTo({
		url: item.path
	})
}
</script>

<style lang="scss" scoped>
.container {
	.c_wrapper {
		width: $main-width;
		padding: $padding;
		box-sizing: border-box;
		margin: auto;
		border-radius: 16rpx;
		background-color: #ffffff;
		> .more {
			@include mFlex;
			justify-content: space-between;
			.title {
				color: $text-color;
			}
			.right {
				@include mFlex;
				color: $text-color-grey;
				font-size: 26rpx;
			}
		}
		.btn_box {
			@include mFlex;
			justify-content: space-between;
			overflow: hidden;
			flex-wrap: wrap;
			&_item {
				@include mFlex(column);
				width: 25%;
				font-size: 26rpx;
				color: #666666;
				flex: none;
				> .image {
					width: 56rpx;
					height: 56rpx;
					margin-bottom: 10rpx;
				}
			}
		}
	}
}
</style>
