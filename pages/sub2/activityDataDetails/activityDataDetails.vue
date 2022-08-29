<template>
	<view class="container">
		<view class="blank40"></view>
		<!-- 相关活动 -->
		<view class="container_activity box">
			<image class="container_activity_image" src="/static/default/tup4.jpg" mode="aspectFill"></image>
			<view class="container_activity_title">{{ '题活动标题活动标题活动标题活动标题活动标题活动标题活动标题' }}</view>
		</view>
		<view class="blank40"></view>

		<!-- 用户列表 -->
		<view class="box">
			<!-- 选择类别 -->
			<view class="box_options">
				<view class="box_options_item" style="width: 60%;">
					<uni-data-select
						v-model="mStatus"
						:clear="false"
						:localdata="categoryOption1"
						placeholder="选择类别"
						emptyText="暂无活动"
					></uni-data-select>
				</view>

				<!-- 数据导出 -->
				<!-- <view class="box_options_item"><button class="button">数据导出</button></view> -->
			</view>
			<view class="blank32"></view>

			<!-- 时间 -->
			<view class="time">(统计时间：2022年8月23--2022年8月30)</view>
			<view class="blank32"></view>

			<!-- 用户列表 -->
			<m-user-list activityShow></m-user-list>
		</view>

		<view class="blank40"></view>
		<view class="blank40"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
// 活动数据列表
const categoryOption1 = ref([
	{
		value: 1,
		text: '全部'
	},
	{
		value: 2,
		text: '已参与活动'
	},
	{
		value: 3,
		text: '未参与活动'
	}
])
// 当前活动ID
const mStatus = ref(1)
</script>

<style lang="scss" scoped>
.container {
	.box {
		width: $main-width;
		padding: $padding;
		margin: auto;
		box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.2);
		border-radius: 16rpx;
		background-color: #fff;
		overflow: hidden;
		> .time {
			font-size: 24rpx;
			color: #999;
		}

		&_options {
			@include mFlex;
			justify-content: space-between;
			&_item {
				flex: none;
				width: 28%;
				background-color: #fff;
				.button {
					background-color: $main-color;
					color: #fff;
					height: 35px;
					font-size: 14px;
					line-height: 35px;
				}
			}
		}
	}

	/* 相关活动 */
	.container_activity {
		padding: 0;
		&_image {
			width: 100%;
			height: $main-width * 0.5;
		}
		&_title {
			margin: $padding;
			@include textOverHidden;
			line-height: 1.6;
			font-size: 28rpx;
		}
	}
}
</style>
