<template>
	<view class="container">
		<slot name="title"></slot>
		<view class="container_item" v-for="(item, index) in list" :key="index" @tap="jumpClick">
			<image class="image" :src="item.img" mode="aspectFill"></image>
			<view class="right">
				<view class="name">{{ item.name }}</view>
				<view class="type">{{ item.type }}</view>
				<view class="desc">{{ item.desc }}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
const jumpClick = ()=>{
	uni.navigateTo({
		url:'/pages-sub1/dentistInfo/dentistInfo'
	})
}	
	
const list = [
	{
		img: '/static/default/banner.png',
		name: '陈丹彭',
		type: '院长',
		desc:
			'2018-2019年任牙小新口腔医院院长,现任牙小新口腔医院院长,现任牙小新口腔医院院长,现任牙小新口腔医院院长，现任牙小新口腔医院院长，现任牙小新口腔医院院长'
	},
	{
		img: '/static/default/banner.png',
		name: '陈丹彭',
		type: '院长',
		desc:
			'2018-2019,,,，，现任牙小新口腔医院院长'
	},
	{
		img: '/static/default/banner.png',
		name: '陈丹彭',
		type: '院长',
		desc:
			'2018-2019年任牙小新口腔医院院长,现任牙小新口腔医院院长,现任牙小新口腔医院院长,现任牙小新口腔医院院长，现任牙小新口腔医院院长，现任牙小新口腔医院院长'
	},
	{
		img: '/static/default/banner.png',
		name: '陈丹彭',
		type: '院长',
		desc:
			'2018-2019年任牙小新口腔医院院长,现任牙小新口腔医院院长,现任牙小新口腔医院院长,现任牙小新口腔医院院长，现任牙小新口腔医院院长，现任牙小新口腔医院院长'
	}
]
</script>

<style lang="scss" scoped>
.container {
	width: $main-width;
	padding: $padding;
	background-color: #fff;
	&_item {
		box-shadow: $box-shadow;
		border-radius: 16rpx;
		padding: $padding;
		@include mFlex;
		justify-content: space-between;
		margin-bottom: 30rpx;
		&:last-child{
			margin-bottom: 0;
		}
		> .image {
			width: 200rpx;
			height: 200rpx * 1.3;
			flex: none;
			border-radius: 4rpx;
		}
		> .right {
			width: 380rpx;
			flex: none;
			.name {
				color: $text-color;
			}
			.type {
				color: #fff;
				background-color: $main-color;
				min-width: 96rpx;
				text-align: center;
				font-size: 24rpx;
				padding: 10rpx 0;
				display: inline-block;
				border-radius: 8rpx;
				margin: 20rpx 0 25rpx 0;
			}
			.desc {
				color: $text-color-grey;
				line-height: 1.6;
				font-size: 26rpx;
				text-align: justify;
				min-height: 125rpx;
				@include textOverHidden(3);
			}
		}
	}
}
</style>
