<template>
	<view class="btn_fix_wrapper">
		<view class="btn_fix">
			<view class="btn_container">
				<view class="left">
					<button class="btn" v-if="!useUserMain.isLogin" @tap="tapShare">
						<view class="text">分享{{ dataObj.myType === '活动' ? '活动' : '商品' }}</view>
						<view class="price" v-if="dataObj.showShare === 0 && dataObj.sharePrice > 0">
							赚￥{{ dataObj.sharePrice }}
						</view>
					</button>

					<button class="btn" open-type="share" v-else>
						<view class="text">分享{{ dataObj.myType === '活动' ? '活动' : '商品' }}</view>
						<view class="price" v-if="dataObj.showShare === 0 && dataObj.sharePrice > 0">
							赚￥{{ dataObj.sharePrice }}
						</view>
					</button>
				</view>
				<view class="center" @tap="tapCreateImg">
					<button class="btn">
						<view class="text">分享海报</view>
						<view class="price" v-if="dataObj.showShare === 0 && dataObj.sharePrice > 0">
							赚￥{{ dataObj.sharePrice }}
						</view>
					</button>
				</view>
				<view class="right">
					<button class="right_btn" @tap="payConfirm">
						<view class="text" v-if="dataObj.myType === '活动'">
							{{ dataObj.myJionCount > 0 ? '已参与' : '参与活动' }}
						</view>
						<view class="text" v-else>立即购买</view>
						<view class="price" v-if="dataObj.price > 0">￥{{ dataObj.price }}</view>
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

const emits = defineEmits(['payConfirm', 'tapCreateImg', 'tapShare'])
const props = defineProps({
	dataObj: {
		required: true,
		type: Object,
		default() {
			return []
		}
	}
})

const payConfirm = () => {
	emits('payConfirm')
}
const tapCreateImg = () => {
	emits('tapCreateImg')
}
const tapShare = () => {
	emits('tapShare')
}
</script>

<style lang="scss" scoped>
/* 底部按钮 */
.btn_fix_wrapper {
	height: 160rpx;
	padding-bottom: 40rpx;
	.btn_fix {
		position: fixed;
		z-index: 88;
		bottom: 0;
		width: 100%;
		height: 160rpx;
		background: #fff;
		padding-bottom: 40rpx;
		border-top: 1px solid #ddd;
		.btn_container {
			height: 100%;
			@include mFlex;
			justify-content: space-around;
			align-items: stretch;
			text-align: center;
			.left {
				@include mFlex;
				flex-direction: column;
				flex: none;
				.btn {
					padding: 10rpx;
					font-weight: bold;
					font-size: 32rpx;
					border-radius: 0;
					color: $main-color;
					background-color: transparent;
					line-height: 1;
					&:after {
						border: none;
					}
				}
				.price {
					color: $main-color;
					padding-top: 15rpx;
					font-weight: normal;
					font-size: 26rpx;
				}
			}
			.center {
				@include mFlex;
				flex-direction: column;
				flex: none;
				color: $main-color;
				font-size: 32rpx;
				.btn {
					padding: 10rpx;
					font-weight: bold;
					font-size: 32rpx;
					border-radius: 0;
					color: $main-color;
					background-color: transparent;
					line-height: 1;
					&:after {
						border: none;
					}
				}
				.text {
					font-size: 32rpx;
					font-weight: bold;
				}
				.price {
					padding-top: 15rpx;
					font-weight: normal;
					font-size: 26rpx;
				}
			}
			.right {
				@include mFlex;
				flex: none;
				width: 33.3%;
				color: #fff;
				.right_btn {
					width: 100%;
					height: 100rpx;
					@include mFlex;
					flex-direction: column;
					background-color: $main-color;
					border-radius: 16rpx;
					color: #fff;
					line-height: 1;
					&:after {
						border: none;
					}
					.text {
						font-size: 32rpx;
						font-weight: bold;
					}
					.price {
						padding-top: 15rpx;
						font-weight: normal;
						font-size: 28rpx;
					}
				}
			}
		}
	}
}
</style>
