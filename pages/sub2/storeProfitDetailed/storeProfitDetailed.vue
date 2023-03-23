<template>
	<view class="container">
		<z-paging
			ref="paging"
			v-model="dataList"
			@query="queryList"
			use-page-scroll
			created-reload
			min-delay="1000"
			show-loading-more-when-reload
		>
			<view class="item" v-for="(item, index) in dataList" :key="index">
				<view class="touxiang">
					<image
						class="image"
						:src="item.avatar || 'https://imgs.lechiwl.com/fileyxx/imgs/thIcon.png'"
						mode="aspectFill"
					></image>
				</view>
				<view class="item_right">
					<view class="left">
						<view class="name">
							<text>{{ item.nickname || '微信用户' }}</text>
							<text class="text2">{{ item.mobile }}</text>
						</view>
						<view class="source" style="margin-top: 8px;">
							<text>订单来源: {{ item.enrollId === 1 ? '活动' : '商品' }}</text>
						</view>
						<view class="time">
							支付时间: {{ dayjs(item.payDt).format('YYYY-M-D HH:mm:ss') }}
						</view>
						<view class="source" style="margin-top: 2px;">
							<text class="text2">{{ item.productName }}</text>
						</view>
					</view>
					<view class="right">
						<view class="money">+{{ item.payPrice }}</view>
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { _enrollformEarningsport } from '@/aTemp/apis/store.js';
import dayjs from 'dayjs';
// 数据列表
const dataList = ref([]);
// 插件对象
const paging = ref(null);

// 后台获取数据
const queryList = (pageNo, pageSize) => {
	const params = {
		pageNum: pageNo,
		pageSize: pageSize
	};
	_enrollformEarningsport(params)
		.then(res => {
			paging.value.complete(res.data.userlist);
		})
		.catch(res => {
			paging.value.complete(false);
		});
};
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #fff;
}
.container {
}
.item {
	width: $main-width;
	margin: auto;
	padding-top: 32rpx;
	@include mFlex;
	align-items: flex-start;
	justify-content: space-between;
	&:last-child {
		padding-bottom: 0;
	}
	.touxiang {
		flex: none;
		width: 80rpx;
		height: 80rpx;
		overflow: hidden;
		.image {
			border-radius: 50%;
			width: 100%;
			height: 100%;
		}
	}

	.item_right {
		flex: auto;
		@include mFlex;
		justify-content: space-between;
		align-items: flex-start;
		border-bottom: 1px solid #eee;
		padding-bottom: 32rpx;
		margin-left: 32rpx;
		:last-of-type {
			border: none;
		}
		> .left {
			.name {
				color: #333333;
				font-size: 30rpx;
				.text2 {
					display: block;
					font-size: 26rpx;
					color: #aaa;
					padding-top: 20rpx;
				}
			}
			.source {
				color: #aaa;
				font-size: 24rpx;
				margin-top: 10rpx;
				.text2 {
					line-height: 1.8;
				}
			}
			.time {
				font-size: 24rpx;
				color: #aaa;
				margin-top: 14rpx;
			}
		}
		> .right {
			text-align: right;
			flex: none;
			.money {
				font-weight: bold;
				color: $sub-color;
				font-size: 32rpx;
			}
		}
	}
}
</style>
