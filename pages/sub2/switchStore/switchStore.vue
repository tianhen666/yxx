<template>
	<view class="container">
		<view class="box1">
			<uni-search-bar
				placeholder="输入手机号码/产品名称搜索"
				radius="50"
				v-model="formData.text"
				bgColor="#EEEEEE"
				@confirm="search"
			/>
		</view>
		<view class="blank32"></view>

		<view class="box2 box" v-for="index in 10" :key="index">
			<!-- 门诊列表 -->
			<view class="box2_item">
				<view class="box2_item_box">
					<view class="box2_item_box_left">
						<image class="image" src="/static/default/tup4.jpg" mode="aspectFill"></image>
					</view>
					<view class="box2_item_box_right">
						<view class="name">吴礼贵口诊所</view>
						<view class="address">
							地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址
						</view>
					</view>
				</view>

				<!-- 按钮 -->
				<view class="box2_btn">
					<button class="box2_btn_item style1">删除</button>
					<button class="box2_btn_item style2">进入门诊</button>
				</view>
			</view>
		</view>

		<view class="blank40"></view>
		<view class="blank40"></view>
		<view class="blank40"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
// 表单数据
const formData = ref({})
// 搜索
const search = () => {
	console.log(formData.value)
}
</script>

<style scoped lang="scss">
.container {
	.box {
		width: $main-width;
		padding: $padding;
		background-color: #fff;
		margin: auto;
		border-radius: 16rpx;
	}
	.box1 {
		background-color: #fff;
		padding: 0 $padding;
	}
	.box2 {
		margin-bottom: 32rpx;
		&:after {
			margin-bottom: 0;
		}
		&_item {
			&_box {
				@include mFlex;
				justify-content: space-between;
				align-items: stretch;
				&_left {
					flex: none;
					.image {
						width: 120rpx;
						height: 120rpx;
					}
				}
				&_right {
					flex: auto;
					padding-left: 20rpx;
					overflow: hidden;
					.name {
						font-size: 32rpx;
						padding-bottom: 16rpx;
					}
					.address {
						color: #999999;
						font-size: 26rpx;
						line-height: 1.4;
						@include textOverHidden;
					}
				}
			}
		}

		&_btn {
			@include mFlex;
			justify-content: flex-end;
			border-top: 1px solid $uni-border-2;
			padding-top: 26rpx;
			margin-top: 26rpx;
			&_item {
				font-size: 28rpx;
				line-height: 2.2;
				margin: 0;
				margin-left: 20rpx;
				background-color: #fff;
				&:after {
					border: 1px solid $uni-border-4;
				}
			}
			> .style1 {
			}
			> .style2 {
				background-color: $main-color;
				color: #fff;
			}
		}
	}
}
</style>
