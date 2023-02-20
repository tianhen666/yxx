<template>
	<view class="activity">
		<template v-for="(item, index) in listData" :key="index">
			<view
				class="activity_item"
				@tap.stop="navigateTo(`/pages/sub1/activityInfo/activityInfo?targetId=${item.id}`)"
				v-if="index > 2 ? showStatus : true"
			>
				<!-- 封面图 -->
				<view class="activity_item_img">
					<video
						:id="`myVideo${index}`"
						class="myVideo"
						:src="item.imgs"
						:poster="item.mainPic"
						controls
						object-fit="cover"
						@tap.stop="videoTap(index)"
						v-if="item.imgs"
					></video>
					<image v-else class="image" :src="item.mainPic" mode="aspectFill"></image>

					<!-- 活动类型 -->
					<view class="type">
						<image
							class="image"
							:src="`/static/images/type${(index % 2) + 1}.png`"
							mode="aspectFill"
						></image>
						<text class="text">
							{{
								item.type === 0
									? '免费活动'
									: item.type === 1
									? '爆款活动'
									: item.type === 2
									? '限量秒杀'
									: ''
							}}
						</text>
					</view>
				</view>

				<!-- 带有背景区域 -->
				<view class="a_wrapper">
					<view class="title">{{ item.title }}</view>
					<!-- 价格,时间 -->
					<view class="b_wrapper">
						<view class="time">
							{{
								dayjs(item.startDt).format('M月D日') +
									'——' +
									dayjs(item.endDt).format('M月D日')
							}}
						</view>
						<view class="price_wrapper" v-if="parseFloat(item.price) > 0">
							<!-- 划线价格 -->
							<view class="originalPrice" v-if="item.alonePrice">
								<text class="through">￥{{ item.alonePrice }}</text>
							</view>
							<!-- 出售价格 -->
							<view class="price">
								<text class="price_cn">￥</text>
								<text>{{ item.price }}</text>
							</view>
						</view>
					</view>

					<!-- 参与 -->
					<view class="add_wrapper">
						<view class="left">
							<view class="img_wrapper" v-if="item.infoList.length > 0">
								<template
									v-for="(subItem, subIndex) in item.infoList"
									:key="subIndex"
								>
									<view
										class="image_box"
										:style="{ zIndex: subIndex + 1 }"
										v-if="subItem && subIndex < 5"
									>
										<image
											class="image"
											:src="
												subItem.avatar ||
													'/static/images/default_avatar.png'
											"
											mode="aspectFill"
										></image>
									</view>
								</template>
							</view>
							<view class="text">
								已有{{ (item.infocount || 0) + (item.views || 0) }}人参与
							</view>
						</view>
						<view class="jion" :class="`style${(index % 2) + 1}`">
							<text>参与活动</text>
							<image
								class="image"
								:src="`/static/images/right${(index % 2) + 1}.png`"
								mode="aspectFill"
							></image>
						</view>
					</view>
				</view>
			</view>
		</template>
	</view>

	<view class="more" @tap.stop="showStatus = !showStatus" v-if="listData.length > 2 && more">
		<text class="text">{{ showStatus ? '收起更多' : '展开更多' }}</text>
		<uni-icons :type="showStatus ? 'top' : 'bottom'" size="16" color="#bbb"></uni-icons>
	</view>
</template>

<script setup>
import dayjs from 'dayjs';
import { navigateTo } from '@/aTemp/utils/uniAppTools.js';
import { ref, watch } from 'vue';
import { onPageScroll } from '@dcloudio/uni-app';

const showStatus = ref(false);

import { getCurrentInstance } from 'vue';
const instance = getCurrentInstance(); // 获取组件实例

const props = defineProps({
	listData: {
		required: true,
		type: Array,
		default() {
			return [];
		}
	},
	more: {
		type: Boolean,
		default: false
	}
});

const { windowHeight } = uni.getSystemInfoSync();
// 页面滚动监听
onPageScroll(options => {
	// 计算当前播放视频位置
	const query = uni.createSelectorQuery().in(instance);
	query.select(`#myVideo${payIndex.value}`).boundingClientRect();
	query.exec(rect => {
		if (!rect[0]) {
			return;
		}

		const { top, height } = rect[0];

		if (top < windowHeight && top + height - 100 > 0) {
			const videoObj = uni.createVideoContext(`myVideo${payIndex.value}`, instance);
			videoObj.play();
			// console.log('元素在可视区域出现')
		} else {
			const videoObj = uni.createVideoContext(`myVideo${payIndex.value}`, instance);
			videoObj.pause();
			// console.log('元素在可视区域消失')
		}
	});
});

let payIndex = ref('');
watch(payIndex, (newVal, preVal) => {
	// console.log(preVal)
	// console.log(newVal)
	const preVideoObj = uni.createVideoContext(`myVideo${preVal}`, instance);
	const videoObj = uni.createVideoContext(`myVideo${newVal}`, instance);
	preVideoObj.pause();
	videoObj.play();
});

// 当前视频播放切关闭
const videoTap = index => {
	if (payIndex.value === index) {
		payIndex.value = '';
	} else {
		payIndex.value = index;
	}
};
</script>

<style lang="scss" scoped>
.more {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 30rpx;
	.text {
		color: #bbb;
		font-size: 26rpx;
		padding-right: 3px;
	}
}

.activity {
	&_item {
		border-radius: 20rpx;
		padding: 20rpx;
		background-color: #fff;
		overflow: hidden;
		margin-bottom: 32rpx;
		&:last-child {
			margin-bottom: 0;
		}
		> .activity_item_img {
			width: 100%;
			padding-top: 80%;
			position: relative;
			border-radius: 20rpx;
			overflow: hidden;
			> .image {
				border-radius: 20rpx;
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
			}
			> .myVideo {
				border-radius: 20rpx;
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
			}
			.type {
				position: absolute;
				right: 0;
				top: 0;
				width: 154rpx;
				height: 64rpx;
				font-size: 24rpx;
				font-weight: 600;
				color: #fff;
				padding: 0 0 12rpx 12rpx;
				text-align: center;
				> .image {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					right: 0;
					z-index: 1;
				}
				> .text {
					width: 100%;
					height: 100%;
					@include mFlex;
					position: relative;
					z-index: 2;
				}
			}
		}

		.a_wrapper {
			border-radius: 0 0 8rpx 8rpx;
			overflow: hidden;
			.title {
				padding: 40rpx 0 30rpx;
				font-size: 38rpx;
				font-weight: 500;
				color: $text-color;
				@include singleLineTextOverHidden;
				text-align: justify;
			}
			.b_wrapper {
				@include mFlex;
				justify-content: space-between;

				> .time {
					width: 288rpx;
					height: 40rpx;
					background: #d5e6ff;
					border-radius: 21px;
					flex: none;
					font-weight: 400;
					color: #4b8eff;
					line-height: 24px;
					@include mFlex;
					font-size: 24rpx;
				}

				.price_wrapper {
					flex: auto;
					overflow: hidden;
					flex-wrap: wrap;
					white-space: nowrap;
					@include mFlex;
					justify-content: flex-end;

					.price {
						color: $sub-color;
						font-size: 36rpx;
						font-weight: 600;
						&_cn {
							font-size: 24rpx;
							font-weight: normal;
						}
					}
					.originalPrice {
						margin-top: 8rpx;
						margin-right: 8rpx;
						color: #cdcdcd;
						font-size: 24rpx;
						font-weight: 400;
						.through {
							text-decoration: line-through;
						}
					}
				}
			}
			.add_wrapper {
				@include mFlex;
				justify-content: space-between;
				padding-top: 28rpx;
				> .left {
					@include mFlex;
					justify-content: flex-start;
					flex: auto;
					margin-right: 20rpx;
					.img_wrapper {
						flex: none;
						position: relative;
						overflow: hidden;
						height: 54rpx;
						display: flex;
						> .image_box {
							position: relative;
							border-radius: 50%;
							width: 54rpx;
							height: 54rpx;
							padding: 2rpx;
							background-color: #efefef;
							overflow: hidden;
							margin-left: -20rpx;
							&:first-of-type {
								margin-left: 0;
							}
							> .image {
								width: 100%;
								height: 100%;
								border-radius: 50%;
							}
						}
					}
					> .text {
						flex: auto;
						overflow: hidden;
						font-size: 24rpx;
						color: $text-color-grey;
						font-size: 24rpx;
						color: #cdcdcd;
						margin-left: 20rpx;
					}
				}
				> .jion {
					@include mFlex;
					width: 156rpx;
					height: 48rpx;
					flex: none;
					border-radius: 48rpx;
					font-size: 24rpx;
					font-weight: 400;

					> .image {
						margin-left: 6rpx;
						width: 24rpx;
						height: 24rpx;
					}
				}
				> .style1 {
					color: #4685fb;
					background: linear-gradient(to right, transparent, rgba(70, 133, 251, 0.3));
				}
				> .style2 {
					color: #fb4646;
					background: linear-gradient(to right, transparent, rgba(251, 70, 70, 0.3));
				}
				> .style3 {
					color: #4685fb;
					background: linear-gradient(to right, transparent, rgba(70, 133, 251, 0.3));
				}
			}
		}
	}
}
</style>
