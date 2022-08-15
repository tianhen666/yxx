<template>
	<view class="container">
		<view class="item"><image class="image" src="/static/default/banner.png" mode="aspectFill"></image></view>
		<view class="item">
			<m-left-right-layout>
				<template #left>
					<text class="title">医生名称</text>
				</template>
				<template #right>
					<text class="text">牙小新</text>
				</template>
			</m-left-right-layout>
		</view>
		<view class="item">
			<m-left-right-layout>
				<template #left>
					<text class="title">医生职务</text>
				</template>
				<template #right>
					<text class="text">院长</text>
				</template>
			</m-left-right-layout>
		</view>
		<view class="item">
			<view class="title">医生介绍</view>
			<text class="content">
				长期从事正畸临床医疗、教学和科研工作，具有丰富的临床经验，擅长矫治各种牙颌畸形，尤其注重美观和功能相结合，深受病人信赖。致力于数字化技术在正畸领域的应用和发展，为病人带来更加精准的治疗。
			</text>
		</view>
	</view>
</template>

<script setup></script>

<style lang="scss" scoped>
	.container{
		padding: 0 32rpx;
		> .item{
			border-bottom: 1px solid $border-color;
			padding: 32rpx 0;
			&:last-child{
				border-bottom: none;
			}
			>.image{
				width: 200rpx;
				height: 264rpx;
				margin: auto;
			}
			.title{
				font-size: 32rpx;
				color: $text-color;
			}
			.content{
				background: #f5f5f5f5;
				font-size: 28rpx;
				color: $text-color;
				line-height: 60rpx;
				padding: $padding;
				border-radius: 16rpx;
				margin-top: 32rpx;
			}
		}
	}
</style>
