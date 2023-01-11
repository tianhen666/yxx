<template>
	<view class="container">
		<view class="container_item" v-for="(item, index) in listData" :key="index">
			<view class="container_item_left">
				<image class="image" :src="item.avatar || '/static/images/default_avatar.png'" mode="aspectFill"></image>
				<view class="index" :class="'style' + (index + 1)" v-if="index < 10">{{ index + 1 }}</view>
			</view>
			<view class="container_item_right">
				<view class="container_item_right_title">
					{{ item.remarkname || item.nickname }}
					<!-- <text class="style1" v-if="item.type === 1">店内人员</text>
					<text class="style2" v-else-if="item.type === 2">分销员</text>
					<text class="style3" v-else>用户</text> -->
				</view>
				<view class="container_item_right_box">
					<view class="container_item_right_box_item" @tap.stop="popFun(item.id, 0)">
						曝光
						<text>{{ item.activityCount || 0 }}人</text>
					</view>
					<view class="container_item_right_box_item" @tap.stop="popFun(item.id, 1)">
						意向
						<text>{{ item.empower || 0 }}人</text>
					</view>
					<view class="container_item_right_box_item" @tap.stop="popFun(item.id, 2)">
						参与
						<text>{{ item.participate || 0 }}人</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	listData: {
		request: true,
		type: Array,
		default: () => []
	}
})
const emit = defineEmits(['popFun'])

const popFun = (userId, index) => {
	emit('popFun', userId, index)
}
</script>

<style lang="scss" scoped>
.container {
	&_item {
		@include mFlex;
		justify-content: space-between;
		margin-bottom: 32rpx;
		&:last-child {
			margin-bottom: 0;
		}
		&_left {
			width: 90rpx;
			height: 90rpx;
			border-radius: 6rpx;
			overflow: hidden;
			position: relative;
			flex: none;
			.image {
				width: 100%;
				height: 100%;
			}
			.index {
				position: absolute;
				width: 30rpx;
				height: 30rpx;
				color: #fff;
				background-color: rgba(0, 0, 0, 0.5);
				font-size: 24rpx;
				@include mFlex;
				left: 0;
				top: 0;
			}
			.style1 {
				background-color: #1890ff;
			}
			.style2 {
				background-color: #91cb74;
			}
			.style3 {
				background-color: #fac858;
			}
		}
		&_right {
			flex: auto;
			margin-left: 20rpx;
			&_title {
				margin-bottom: 30rpx;
				font-size: 26rpx;
				.style1 {
					color: #1890ff;
				}
				.style2 {
					color: #91cb74;
				}
				.style3 {
					color: #fac858;
				}
			}
			&_box {
				@include mFlex;
				justify-content: flex-start;
				&_item {
					margin-right: 40rpx;
					font-size: 26rpx;
					color: #999;
				}
			}
		}
	}
}
</style>
