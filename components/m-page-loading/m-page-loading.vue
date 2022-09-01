<template>
	<view class="container">
		<view class="loading_box">
			<view class="loading">
				<view class="loading-item"></view>
				<view class="loading-item"></view>
				<view class="loading-item"></view>
				<view class="loading-item"></view>
				<view class="loading-item"></view>
				<view class="loading-item"></view>
				<view class="loading-item"></view>
				<view class="loading-item"></view>
			</view>
			<view class="text">加载中...</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
.container {
	position: fixed;
	height: 100%;
	width: 100%;
	background: #fff;
	z-index: 1000;
	left: 0;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: center;
}
.loading_box {
	.text {
		color: $text-color-grey;
		font-size: 26rpx;
	}
}
/* 设置位置 */
.loading {
	/* 高度 */
	height: 70px;
	width: 40px;
	/* 弹性布局 */
	display: flex;
	/* 设置子项在y轴方向居中，应该是设置起点在中间，非常有用，不然动画很怪 */
	align-items: center;
	justify-content: space-between;
	overflow: hidden;
}

/* 小竖条 */
.loading-item {
	height: 1px !important;
	width: 2px;
	background: $main-color;
	/* 动画：名称、时间、循环 */
	animation: loading 1s ease infinite;
	opacity: 0;
	transform: translateZ(0);
}

/* 设置动画 */
@keyframes loading {
	0% {
		transform: scale(1, 0);
		opacity: 1;
	}

	50% {
		transform: scale(1, 50);
		opacity: 1;
	}

	100% {
		transform: scale(1, 0);
		opacity: 1;
	}
}

/* 为每一个竖条设置延时 */
.loading-item:nth-child(1) {
	animation-delay: 0.1s;
}
.loading-item:nth-child(2) {
	animation-delay: 0.2s;
}

.loading-item:nth-child(3) {
	animation-delay: 0.3s;
}

.loading-item:nth-child(4) {
	animation-delay: 0.4s;
}

.loading-item:nth-child(5) {
	animation-delay: 0.5s;
}

.loading-item:nth-child(6) {
	animation-delay: 0.6s;
}

.loading-item:nth-child(7) {
	animation-delay: 0.7s;
}

.loading-item:nth-child(8) {
	animation-delay: 0.8s;
}
</style>
