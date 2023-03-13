<template>
	<button class="onService" open-type="contact" @contact="handleContact">
		<image class="img" src="../../static/images/kefu1.png" mode="aspectFill"></image>
		<text class="txt">在线客服</text>
	</button>
</template>

<script>
export default {
	name: 'm-online-service',
	data() {
		return {};
	}
};
</script>

<style lang="scss">
.onService {
	position: fixed;
	margin: 0;
	padding: 0;
	width: 100rpx;
	height: 100rpx;
	bottom: 60rpx;
	border-radius: 50%;
	right: 20rpx;
	z-index: 100;
	background-color: $main-color;
	&:after {
		border: none;
	}
	.img {
		width: 50rpx;
		height: 50rpx;
		display: block;
		margin: auto;
		margin-top: 5rpx;
	}
	.txt {
		color: #fff;
		font-size: 18rpx;
		display: block;
		line-height: 1;
		margin-top: 5rpx;
	}
}
</style>
