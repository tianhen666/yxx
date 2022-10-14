<template>
	<m-page-loading v-if="loading"></m-page-loading>
	<view class="container" v-else>
		<!-- 内容 -->
		<view class="box2">
			<m-title2 :title="dataObj.title"></m-title2>
			<view class="cycle">
				<text class="text1">治疗周期：</text>
				<text>
					{{ dayjs(dataObj.startDt).format('YYYY年M月D日') }} - {{ dayjs(dataObj.endDt).format('YYYY年M月D日') }}
				</text>
			</view>
			<view class="desc">
				<text class="text1">案例描述：</text>
				<text>{{ dataObj.detail }}</text>
			</view>
			<view class="blank20"></view>
			<view class="content_img"><image class="image" :src="dataObj.mainPic" mode="aspectFill"></image></view>
		</view>
		<view class="blank30"></view>

		<!-- 治疗前 -->
		<view class="box3">
			<m-title1 title="治疗前"></m-title1>
			<view class="content_text">{{ dataObj.beforeDesc }}</view>
			<view class="content_img" v-if="dataObj.beforePics">
				<image
					class="image"
					v-for="(item, index) in dataObj.beforePics.split(',')"
					:key="index"
					:src="item"
					@tap="previewImage(dataObj.beforePics.split(','), index)"
					mode="widthFix"
				></image>
			</view>
		</view>
		<view class="blank20"></view>

		<view class="box4">
			<!-- 治疗后 -->
			<m-title1 title="治疗后"></m-title1>
			<view class="content_text">{{ dataObj.afterDesc }}</view>
			<view class="content_img" v-if="dataObj.afterPics">
				<image
					class="image"
					v-for="(item, index) in dataObj.afterPics.split(',')"
					:key="index"
					:src="item"
					@tap="previewImage(dataObj.afterPics.split(','), index)"
					mode="widthFix"
				></image>
			</view>
		</view>
		<view class="blank40"></view>
		<view class="blank40"></view>
	</view>
</template>

<script setup>
import { ref, reactive, computed, getCurrentInstance } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { _storecaseGetinfo } from '@/aTemp/apis/case.js'
import dayjs from 'dayjs'
import { navigateTo, previewImage } from '@/aTemp/utils/uniAppTools.js'

// 加载中
const loading = ref(true)
// 数据ID
const dataId = ref(0)
// 数据对象
const dataObj = ref({})

// 页面开始加载
onLoad(async options => {
	// console.log(options)
	const { proxy } = getCurrentInstance()
	// 等待onLaunch中放行后执行
	await proxy.$onLaunched

	dataId.value = parseInt(options.targetId) || 0

	// 获取活动详情
	storecaseGetinfo()
})

const storecaseGetinfo = () => {
	_storecaseGetinfo({ id: dataId.value }).then(res => {
		const { msg, data, code } = res
		dataObj.value = data
		loading.value = false
	})
}
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #ffffff;
}
.container {
	width: $main-width;
	margin: auto;
	padding-top: 32rpx;
}

.box2 {
	font-size: 26rpx;
	.text1 {
		color: $text-color-grey;
	}
	.cycle {
		margin-top: 32rpx;
	}
	.desc {
		margin-top: 20rpx;
		text-align: justify;
		line-height: 1.5;
	}
	.content_img {
		.image {
			width: 686rpx;
			height: 368rpx;
		}
	}
}

.box3 {
	.content_text {
		text-align: justify;
		line-height: 1.5;
		font-size: 26rpx;
	}
	.content_img {
		.image {
			width: 100%;
		}
	}
}
.box4 {
	.content_text {
		text-align: justify;
		line-height: 1.5;
		font-size: 26rpx;
	}
	.content_img {
		.image {
			width: 100%;
		}
	}
}
</style>
