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
			return {}
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
		margin: auto;
		border-radius: 16rpx;
		background-color: #ffffff;
		.btn_box {
			@include mFlex;
			justify-content: space-between;
			overflow: hidden;
			flex-wrap: wrap;
			margin-top: -40rpx;
			&_item {
				margin-top: 40rpx;
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
