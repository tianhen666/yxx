<template>
	<view class="info_wrapper">
		<!-- 详情信息 -->
		<view class="box1">
			<image class="logo" :src="info.icon" mode="aspectFill"></image>
			<view class="text_wrapper">
				<view class="name">{{ info.name }}</view>
				<view class="address">{{ info.address }}{{ info.addressDetail }}</view>

				<!-- 营业时间 -->
				<view class="text_warpper_box1">
					<view class="work_time" v-if="info.businessDt">
						营业时间：{{
							info.businessDt.split(',')[0] + '-' + info.businessDt.split(',')[1]
						}}
					</view>
					<view class="distance">
						<uni-icons color="#929292" type="location" size="28rpx" />
						<text>距离{{ distance }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 按钮... -->
		<view class="box2">
			<view class="icon-wrapper">
				<image
					class="icon"
					@tap="daohang"
					src="/static/images/daohang.png"
					mode="aspectFill"
				></image>
				<image
					@tap="makePhoneCall(info.mobile)"
					class="icon"
					src="/static/images/dianhua.png"
					mode="aspectFill"
				></image>
			</view>
			<!-- 预约服务  根据业务要求 -->
			<button class="addWx" @tap="makePhoneCall(info.mobile)">
				<image class="image" src="/static/images/shijian.png" mode="aspectFill"></image>
				<text>预约服务</text>
			</button>
		</view>
	</view>
</template>

<script setup>
import { ref, watch } from 'vue';
import { makePhoneCall, navigateTo, openLocation, getLocation } from '@/aTemp/utils/uniAppTools.js';
const props = defineProps({
	info: {
		required: true,
		type: Object,
		default: () => {}
	}
});

//	计算两点之间直线距离
const algorithm = (point1, point2) => {
	let [x1, y1] = point1;
	let [x2, y2] = point2;
	let Lat1 = rad(x1); // 纬度
	let Lat2 = rad(x2);
	let a = Lat1 - Lat2; //	两点纬度之差
	let b = rad(y1) - rad(y2); //	经度之差
	let s =
		2 *
		Math.asin(
			Math.sqrt(
				Math.pow(Math.sin(a / 2), 2) +
					Math.cos(Lat1) * Math.cos(Lat2) * Math.pow(Math.sin(b / 2), 2)
			)
		);
	//	计算两点距离的公式
	s = s * 6378137.0; //	弧长等于弧度乘地球半径（半径为米）
	s = Math.round(s * 10000) / 10000; //	精确距离的数值
	return s;
};
//	角度转换成弧度
const rad = d => {
	return (d * Math.PI) / 180.0;
};

const distance = ref('计算中...');

watch(
	() => props.info,
	(newValue, oldValue) => {
		// 获取当前位置，计算距离
		getLocation()
			.then(res => {
				let distance_a = algorithm(
					[res.latitude, res.longitude],
					[props.info.lat, props.info.lng]
				);
				distance.value = Math.floor((distance_a / 1000) * 100) / 100 + 'km';
			})
			.catch(() => {
				distance.value = '计算失败';
			});
	}
);

// 打开内置地图
const daohang = () => {
	openLocation(props.info.lat, props.info.lng, props.info.addressDetail, props.info.address).then(
		res => {
			console.log(res);
		}
	);
};
</script>

<style lang="scss" scoped>
.info_wrapper {
	position: relative;
	z-index: 2;
	background-color: #ffffff;
	width: $main-width;
	margin: auto;
	padding: 20rpx 20rpx 30rpx 20rpx;
	border-radius: 16rpx;
}
.box1 {
	@include mFlex;
	justify-content: space-between;
	> .logo {
		width: 160rpx;
		height: 160rpx;
		flex: none;
		border-radius: 8rpx;
		border: 1px solid #f0f0f0;
	}
	> .text_wrapper {
		flex: auto;
		overflow: hidden;
		padding-left: 20rpx;
		.name {
			color: $text-color;
			line-height: 44rpx;
			margin-bottom: 12rpx;
			font-weight: 500;
			font-size: 32rpx;
		}
		.address {
			font-size: 26rpx;
			text-align: justify;
			line-height: 34rpx;
			min-height: 68rpx;
			color: $text-color-grey;
			@include textOverHidden();
		}
		.text_warpper_box1 {
			@include mFlex;
			justify-content: space-between;
			margin-top: 12rpx;
			.distance {
				font-size: 24rpx;
				color: $text-color-grey;
			}
			.work_time {
				font-size: 24rpx;
				color: $main-color;
				font-weight: 400;
				font-size: 24rpx;
			}
		}
	}
}

.box2 {
	@include mFlex;
	justify-content: space-between;
	padding-top: 30rpx;
	.icon-wrapper {
		flex: none;
		width: 180rpx;
		overflow: hidden;
		@include mFlex;
		justify-content: space-between;
		> .icon {
			width: 60rpx;
			height: 60rpx;
		}
	}

	.addWx {
		flex: none;
		@include mFlex;
		height: 80rpx;
		width: 396rpx;
		border-radius: 80rpx;
		background-color: $main-color;
		color: $text-color-inverse;
		font-size: 32rpx;
		margin: 0;
		> .image {
			width: 32rpx;
			height: 32rpx;
			margin-right: 10rpx;
		}
	}
}
</style>
