<template>
	<view class="container">
		<view class="container_item" v-for="(item, index) in list" :key="index" @tap="jumpClick">
			<!-- 头像，名称 -->
			<view class="a_wrapper">
				<image class="image" :src="item.nImg" mode="aspectFill"></image>
				<view class="right">
					<view class="name">{{ item.name }}</view>
					<view class="time">{{ item.time }}</view>
				</view>
			</view>
			<!-- 描述 -->
			<view class="text">{{ item.desc }}</view>
			<!-- 图片 -->
			<view
				class="image_wrapper"
				:class="
					item.imgs.length <= 2
						? 'grid1'
						: item.imgs.length === 3
						? 'grid2'
						: item.imgs.length <= 5
						? 'grid3'
						: item.imgs.length <= 8
						? 'grid4'
						: item.imgs.length >= 9
						? 'grid5'
						: ''
				"
			>
				<view class="image_item" v-for="(subItem, subIndex) in item.imgs" :key="subIndex">
					<image class="image" :src="subItem" mode="aspectFill"></image>
				</view>
			</view>

			<view class="views">阅读 {{ item.views }}</view>
		</view>
	</view>
</template>

<script setup>
	
const jumpClick = ()=>{
	uni.navigateTo({
		url:'/pages-sub1/caseInfo/caseInfo'
	})
}	
const list = [
	{
		nImg: '/static/default/banner.png',
		name: '你的姓名',
		time: '2022-07-13',
		desc:
			'探索了5种改善移动用户体验的绝佳做法种改善移动用户体验的种改善移动用户体验的绝佳做法种改善移动用户体验的绝佳做法种改善移动用户体验的绝佳做法种改善移动用户体验的绝佳做法种改善移动用户体验的绝佳做法种改善移动用户体验的绝佳做法绝佳做法种改善移动用户体验的绝佳做法，进来学！探索了5种改善移动用户体验的绝佳做法，进来学',
		imgs: ['/static/default/banner.png', '/static/default/banner.png'],
		views: 8888
	},
	{
		nImg: '/static/default/banner.png',
		name: '你的姓名',
		time: '2022-07-13',
		desc:
			'探索了5种改善移动用户体验的绝佳做法种改善移动用户体验的种改善移动用户体验的绝佳做法种改善移动用户体验的绝佳做法种改善移动用户体验的绝佳做法种改善移动用户体验的绝佳做法种改善移动用户体验的绝佳做法种改善移动用户体验的绝佳做法绝佳做法种改善移动用户体验的绝佳做法，进来学！探索了5种改善移动用户体验的绝佳做法，进来学',
		imgs: [
			'/static/default/banner.png',
			'/static/default/banner.png',
			'/static/default/banner.png',
			'/static/default/banner.png',
			'/static/default/banner.png',
			'/static/default/banner.png',
			'/static/default/banner.png',
			'/static/default/banner.png',
			'/static/default/banner.png'
		],
		views: 8888
	}
]
</script>

<style lang="scss" scoped>
.container {
	width: 750rpx;
	box-sizing: border-box;
	overflow: hidden;
}
.container_item {
	margin-bottom: 30rpx;
	background-color: #fff;
	padding: $padding;
	&:last-child {
		margin-bottom: 0;
	}
	.a_wrapper {
		@include mFlex;
		justify-content: left;
		> .image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			flex: none;
			margin-right: 20rpx;
		}
		.right {
			width: 500rpx;
			flex: none;
			.name {
				color: $main-color;
				font-size: 30rpx;
				margin-bottom: 15rpx;
			}
			.time {
				font-size: 24rpx;
				color: $text-color-grey;
			}
		}
	}

	.text {
		color: $text-color;
		font-size: 26rpx;
		line-height: 1.8;
		text-align: justify;
		@include textOverHidden(3);
		margin: 20rpx 0;
	}

	.image_wrapper {
		display: grid;
		gap: 20rpx 20rpx;
		.image_item {
			border-radius: 16rpx;
			overflow: hidden;
			> .image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.grid1 {
		grid-template-columns: repeat(1, 1fr);
		grid-template-rows: repeat(1, 430rpx);
		gap: 0;
	}
	.grid2 {
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(2, 164rpx);
		.image_item:first-child {
			grid-column: 1 / 3;
			grid-row: 1 / 3;
		}
	}
	.grid3 {
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 164rpx);
	}
	.grid4 {
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(2, 164rpx);
	}
	.grid5 {
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 164rpx);
	}

	.views {
		font-size: 26rpx;
		color: $text-color-grey;
		margin-top: 20rpx;
	}
}
</style>
