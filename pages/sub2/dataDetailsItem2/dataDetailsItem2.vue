<template>
	<view class="pg">
		<!-- 搜索框 -->
		<view class="search-box">
			<uni-search-bar readonly placeholder="请输入手机号或用户名" bgColor="#EEEEEE" />
		</view>

		<!-- tupain -->
		<image
			class="img1"
			mode="aspectFill"
			src="https://imgs.lechiwl.com/fileyxx/imgs/thIcon.png"
		></image>

		<view class="item_box_wrapper">
			<view class="title">参与活动用户（20人）：</view>

			<view class="item_box">
				<view class="top" v-for="index in 10" :key="index">
					<image
						class="img1"
						src="https://imgs.lechiwl.com/fileyxx/imgs/thIcon.png"
					></image>
					<view class="right">
						<text class="name">{{ 'yonghunicheng' }}</text>
						<text class="phone">{{ '17730225541' }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss">
.pg {
	width: $main-width;
	margin: auto;
}

:deep(.search-box .uni-searchbar) {
	padding: 30rpx 0;
}
.img1 {
	width: 100%;
	height: 400rpx;
}
.item_box_wrapper {
	padding-bottom: 40rpx;
	.title {
		padding: 40rpx 0;
		font-size: 28rpx;
		color: #333;
	}
	.item_box {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		.top {
			width: 50%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			margin-bottom: 36rpx;
			.img1 {
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
				flex: none;
			}
			.right {
				flex: auto;
				padding-left: 20rpx;
				.name {
					font-size: 30rpx;
					display: block;
					margin-bottom: 20rpx;
				}
				.phone {
					font-size: 30rpx;
					display: block;
				}
			}
		}
	}
}
</style>
