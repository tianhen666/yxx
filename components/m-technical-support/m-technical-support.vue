<!-- 技术支持组件 -->
<template>
	<view class="boxContent">
		<text class="text">牙小新提供技术支持</text>
		<button class="btn" @click="goToPage">我也要创建小程序</button>
	</view>
</template>

<script setup>
	const goToPage = ()=>{
		uni.navigateTo({
			url: '/pages/sub4/aboutInfo/aboutInfo'
		});
	}
</script>

<style lang="scss">
	.boxContent {
		margin-top: 40rpx;
		text-align: center;

		.text {
			font-size: 22rpx;
			color: $main-color;
		}

		.btn {
			margin-top: 20rpx;
			color: #fff;
			background-color: $main-color;
			font-size: 24rpx;
			width: 260rpx;
			line-height: 2.6;
			border-radius: 50rpx;
		}
	}
</style>
