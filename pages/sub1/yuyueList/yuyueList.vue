<template>
	<z-paging
		ref="paging"
		v-model="dataList"
		@query="queryList"
		use-page-scroll
		created-reload
		min-delay="1000"
		show-loading-more-when-reload
	>
		<view class="container">
			<view
				class="item_box"
				v-for="(item, index) in dataList"
				:key="index"
				@tap="
					setClipboardData(
						`${item.doctorname},${item.doctorphone},${item.doctortime},${item.doctorproject},${item.remark}`
					)
				"
			>
				<view class="item">
					<view class="left">预约姓名：</view>
					<view class="right">{{ item.doctorname }}</view>
				</view>
				<view class="item">
					<view class="left">预约电话：</view>
					<view class="right">
						<text>{{ item.doctorphone }}</text>
						<button class="btn" size="mini" @tap.stop="makePhoneCall(item.doctorphone)">拨打电话</button>
					</view>
				</view>
				<view class="item">
					<view class="left">预约时间：</view>
					<view class="right">{{ item.doctortime }}</view>
				</view>
				<view class="item">
					<view class="left">预约项目：</view>
					<view class="right">{{ item.doctorproject }}</view>
				</view>
				<view class="item">
					<view class="left">客户备注：</view>
					<view class="right">{{ item.remark }}</view>
				</view>
			</view>
		</view>
	</z-paging>
</template>

<script setup>
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { _outpatientAppointmentMenuList } from '@/aTemp/apis/yuyue.js'
import { makePhoneCall, setClipboardData } from '@/aTemp/utils/uniAppTools.js'
// 数据列表
const dataList = ref([])
// 插件对象
const paging = ref(null)

onLoad(options => {
	console.log(options)
})

// 获取预约列表
const queryList = (pageNo, pageSize) => {
	const params = {
		pageNum: pageNo,
		pageSize: pageSize
	}
	_outpatientAppointmentMenuList(params)
		.then(res => {
			const { data, code, msg } = res
			// 数据赋值
			paging.value.complete(data.records)
		})
		.catch(res => {
			paging.value.complete(false)
		})
}
</script>

<style lang="scss" scoped>
.item_box {
	width: $main-width;
	margin: auto;
	margin-top: 32rpx;
	background-color: #fff;
	border-radius: 16rpx;
	overflow: hidden;
	padding: 42rpx;
}
.item {
	@include mFlex;
	justify-content: space-between;
	padding-bottom: 50rpx;
	&:last-of-type {
		padding-bottom: 0;
	}
	.left {
		width: 180rpx;
		flex: none;
		font-size: 26rpx;
		font-weight: bold;
	}
	.right {
		flex: auto;
		font-size: 26rpx;
		color: #999;
		@include mFlex;
		justify-content: flex-start;
	}
	.btn {
		background-color: $main-color;
		color: #fff;
		padding: 10rpx 15rpx;
		border-radius: 10rpx;
		margin-left: 20rpx;
		line-height: 1;
	}
}
</style>
