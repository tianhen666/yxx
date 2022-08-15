<template>
	<view class="container">
		<!-- 标题插槽 -->
		<slot name="title"></slot>

		<view class="serve_list">
			<!-- 列表 -->
			<view class="serve_list_item" :class="'bg' + (index % 6)" v-for="(item, index) in list" :key="index" @tap="jumpClick">
				<view class="title">{{ item.title }}</view>
				<view class="desc">{{ item.desc }}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
const list = [
	{
		title: '测试标题',
		desc: '描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息',
		img: '/static/default/banner.png',
		views: '1000'
	},
	{
		title: '测试标题',
		desc: '描述信息描述信',
		img: '/static/default/banner.png',
		views: '1000'
	},
	{
		title: '测试标题',
		desc: '描述信息描述信息描述信息描述信息',
		img: '/static/default/banner.png',
		views: '1000'
	},
	{
		title: '测试标题',
		desc: '描述信息描述信息描述信息描述信息',
		img: '/static/default/banner.png',
		views: '1000'
	},
	{
		title: '测试标题',
		desc: '描述信息描述信息描述信息描述信息',
		img: '/static/default/banner.png',
		views: '1000'
	},
	{
		title: '测试标题',
		desc: '描述信息描述信息描述信息描述信息',
		img: '/static/default/banner.png',
		views: '1000'
	},
	{
		title: '测试标题',
		desc: '描述信息描述信息描述信息描述信息',
		img: '/static/default/banner.png',
		views: '1000'
	},
	{
		title: '测试标题',
		desc: '描述信息描述信息描述信息描述信息',
		img: '/static/default/banner.png',
		views: '1000'
	}
]
const jumpClick = ()=>{
	uni.navigateTo({
		url:'/pages-sub1/serveInfo/serveInfo'
	})
}
</script>

<style lang="scss" scoped>
.bg0 {
	background-image: linear-gradient(to right, #7870fe, #9c96fe);
}
.bg1 {
	background-image: linear-gradient(to right, #5aadfe, #76befe);
}
.bg2 {
	background-image: linear-gradient(to right, #5189fe, #6a9afe);
}
.bg3 {
	background-image: linear-gradient(to right, #fe729c, #fea1c4);
}
.bg4 {
	background-image: linear-gradient(to right, #fe9999, #fe6868);
}
.bg5 {
	background-image: linear-gradient(to right, #77befe, #5aadfe);
}
.container {
	width: $main-width;
	padding: $padding;
	background-color: #fff;
	box-sizing: border-box;
	margin: auto;
	border-radius: 16rpx;
	.serve_list {
		@include mFlex;
		justify-content: space-between;
		flex-wrap: wrap;
		&_item {
			overflow: hidden;
			width: (($main-width)- ($padding * 2)-26) * 0.5;
			flex: none;
			color: #fff;
			padding: 32rpx 24rpx;
			box-sizing: border-box;
			border-radius: 8rpx;
			margin-bottom: 26rpx;
			&:nth-last-child(2) {
				margin-bottom: 0;
			}
			&:nth-last-child(1) {
				margin-bottom: 0;
			}
			.title {
				font-weight: bold;
				margin-bottom: 20rpx;
			}
			.desc {
				font-size: 26rpx;
				line-height: 1.5;
				min-height: 80rpx;
				text-align: justify;
				@include textOverHidden(2);
			}
		}
	}
}
</style>
