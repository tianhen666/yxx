<template>
	<!-- 头部 -->
	<m-header></m-header>

	<!-- vip -->
	<view class="bg"></view>
	<m-vip style="margin-top: -100rpx;display: block;"></m-vip>
	<view class="blank30"></view>

	<!-- 模块一 -->
	<m-fun :listData="module1"></m-fun>
	<view class="blank30"></view>

	<!-- 模块二 -->
	<m-fun :listData="module2"></m-fun>
	<view class="blank30"></view>

	<!-- 模块三 -->
	<m-fun :listData="module3" @moduleFun="module3Fun"></m-fun>
	<view class="blank30"></view>

	<!-- 模块四 -->
	<m-fun :listData="module4"></m-fun>
	<view class="blank30"></view>

	<!-- 选项 -->
	<m-option :listData="module5"></m-option>
	<view class="blank40"></view>

	<!-- 弹出框 -->
	<uni-popup ref="popup" type="center" :safe-area="false">
		<view class="popup_box">
			<image class="close" @tap="popup.close" src="/static/default/close.png"></image>
			<uni-forms :rules="rules" ref="formObj" v-model="formData" label-width="220rpx" label-position="top">
				<!-- 订单秘钥 -->
				<uni-forms-item :label="rules.orderSecretKey.label" name="orderSecretKey" label-position="top">
					<uni-easyinput
						v-model="formData.orderSecretKey"
						:placeholder="rules.orderSecretKey.rules[0].errorMessage"
					></uni-easyinput>
				</uni-forms-item>
			</uni-forms>

			<button class="btn" :loading="loading" @tap="secretKeyClick">订单核销</button>
		</view>
	</uni-popup>
</template>

<script setup>
import mFun from './m-fun/m-fun.vue'
import mHeader from './m-header/m-header.vue'
import mOption from './m-option/m-option.vue'
import mVip from './m-vip/m-vip.vue'
import { showToastText } from '@/aTemp/utils/uniAppTools.js'
import { _debounce } from '@/aTemp/utils/tools.js'
import { ref } from 'vue'

const module1 = {
	title: '门诊管理',
	sub: [
		{
			imgUrl: '/static/default/menzhen.png',
			name: '活动管理',
			path: '/pages/sub2/manageActivityList/manageActivityList'
		},
		{
			imgUrl: '/static/default/huodong.png',
			name: '商品管理',
			path: '/pages/sub2/manageShopList/manageShopList'
		},
		{
			imgUrl: '/static/default/haibao.png',
			name: '服务项目',
			path: '/pages/sub2/manageServiceList/manageServiceList'
		},
		{
			imgUrl: '/static/default/haibao.png',
			name: '案例管理',
			path: '/pages/sub2/manageCaseList/manageCaseList'
		},
		{
			imgUrl: '/static/default/haibao.png',
			name: '轮播图管理',
			path: '/pages/sub2/manageBannerList/manageBannerList'
		},
		{
			imgUrl: '/static/default/haibao.png',
			name: '门诊信息',
			path: '/pages/sub2/manageInfoInput/manageInfoInput'
		},
		{
			imgUrl: '/static/default/haibao.png',
			name: '医生管理',
			path: '/pages/sub2/manageDoctorList/manageDoctorList'
		}
	]
}

const module2 = {
	title: '数据统计',
	sub: [
		{
			imgUrl: '/static/default/menzhen.png',
			name: '门诊收益',
			path: '/pages/sub2/storeProfit/storeProfit'
		},
		{
			imgUrl: '/static/default/huodong.png',
			name: '活动数据',
			path: '/pages/sub2/activityData/activityData'
		},
		{
			imgUrl: '/static/default/haibao.png',
			name: '会员管理',
			path: '/pages/sub2/manageMemberList/manageMemberList'
		}
	]
}

const module4 = {
	title: '营销助手',
	sub: [
		{
			imgUrl: '/static/default/haibao.png',
			name: '活动模板',
			path: '/pages/sub2/manageServiceList/manageServiceList'
		},
		{
			imgUrl: '/static/default/menzhen.png',
			name: '精美海报',
			path: '/pages/sub2/manageActivityList/manageActivityList'
		},
		{
			imgUrl: '/static/default/huodong.png',
			name: '文案宣发',
			path: '/pages/sub2/manageShopList/manageShopList'
		},
		{
			imgUrl: '/static/default/haibao.png',
			name: '科普文章',
			path: '/pages/sub2/manageServiceList/manageServiceList'
		}
	]
}

const module3 = {
	title: '订单管理',
	sub: [
		{
			imgUrl: '/static/default/menzhen.png',
			name: '扫码核销',
			fun: true
		},
		{
			imgUrl: '/static/default/huodong.png',
			name: '手动核销',
			fun: true
		},
		{
			imgUrl: '/static/default/haibao.png',
			name: '全部订单',
			path: '/pages/sub2/orderList/orderList?current=0'
		}
	]
}

// 表单校验
const rules = {
	orderSecretKey: {
		rules: [{ required: true, errorMessage: '请输入订单秘钥' }],
		label: '订单秘钥'
	}
}
// 弹出层
const popup = ref(null)
// 表单数据
const formData = ref({})
// 获取表单对象
const formObj = ref(null)
// 加载中
const loading = ref(false)

const module3Fun = listIndex => {
	// 扫码核销
	if (listIndex === 0) {
		uni
			.scanCode({
				onlyFromCamera: true
			})
			.then(res => {
				if (res.scanType !== 'QR_CODE') {
					showToastText('请扫描核销码~')
					return
				}

				// 核销请求
				console.log('条码内容：' + res.result)
			})
	}
	// 手动核销
	if (listIndex === 1) {
		popup.value.open()
	}
}

const secretKeyClick = _debounce(
	() => {
		formObj.value
			.validate()
			.then(formRes => {
				// _apiSave(dataObj.value).then(res => {
				// 	loading.value = false
				// })
				// 关闭弹出框
				popup.value.close()
				loading.value = false
			})
			.catch(err => {
				loading.value = false
				showToastText(err[0].errorMessage)
				console.log('表单错误信息：', err)
			})
	},
	500,
	loading
)

const module5 = [
	{
		icon: '/static/order/yaoqing.png',
		title: '员工管理',
		path: '/pages/sub2/manageStaffList/manageStaffList'
	},
	{
		icon: '/static/order/yaoqing.png',
		title: '我的订单',
		path: '/pages/sub1/orderList/orderList'
	},
	{
		icon: '/static/order/yaoqing.png',
		title: '切换门店',
		path: '/pages/sub2/switchStore/switchStore'
	}
]
</script>

<style lang="scss" scoped>
.popup_box {
	position: relative;
	background-color: #fff;
	overflow: hidden;
	border-radius: 16rpx;
	width: 750rpx * 0.9;
	margin: auto;
	.btn {
		margin: 32rpx;
		font-size: 30rpx;
		color: #fff;
		background-color: $main-color;
	}
	.close {
		position: absolute;
		right: 20rpx;
		top: 20rpx;
		width: 40rpx;
		height: 40rpx;
		z-index: 10;
	}
}
</style>
