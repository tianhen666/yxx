<template>
	<!-- vip -->
	<m-vip></m-vip>
	<view class="blank30"></view>

	<!-- 门诊管理 -->
	<m-fun :listData="module1"></m-fun>
	<view class="blank30"></view>

	<!-- 数据统计 -->
	<m-fun :listData="module2"></m-fun>
	<view class="blank30"></view>

	<!-- 订单管理 -->
	<m-fun :listData="module3" @moduleFun="module3Fun"></m-fun>
	<view class="blank30"></view>

	<!-- 营销助手 -->
	<view class="box">
		<m-title2 :title="module4.title"></m-title2>
		<view class="yxzs">
			<template v-for="(item, index) in module4.sub" :key="index">
				<view class="yxzs_item" @tap.stop="yxzsTap(item, index)">
					<image class="image" :src="item.imgUrl" mode="aspectFill"></image>
					<text class="text">{{ item.name }}</text>
				</view>
			</template>
		</view>
	</view>
	<view class="blank30"></view>

	<!-- 选项 -->
	<m-option :listData="module5"></m-option>
	<view class="blank40"></view>

	<!-- 邀请门诊入驻 -->
	<view
		class="inviteStore"
		v-if="useUserMain.storeId == 1 || useUserMain.storeId == 11"
		@tap="navigateTo('/pages/sub1/settleIn/settleIn')"
	>
		<text>店铺</text>
		<text>入驻</text>
	</view>

	<!-- 弹出框 -->
	<uni-popup ref="popup" type="center" :safe-area="false">
		<view class="popup_box">
			<image class="close" @tap="popup.close" src="/static/images/close.png"></image>
			<uni-forms
				:rules="rules"
				ref="formObj"
				v-model="formData"
				label-width="220rpx"
				label-position="top"
			>
				<!-- 订单编号 -->
				<uni-forms-item :label="rules.orderNo.label" name="orderNo" label-position="top">
					<uni-easyinput
						v-model="formData.orderNo"
						:placeholder="rules.orderNo.rules[0].errorMessage"
					></uni-easyinput>
				</uni-forms-item>
			</uni-forms>

			<button class="btn" :loading="loading" @tap="secretKeyClick">订单核销</button>
		</view>
	</uni-popup>
</template>

<script setup>
import mFun from './m-fun/m-fun.vue';
import mOption from './m-option/m-option.vue';
import mVip from './m-vip/m-vip.vue';
import { showToastText, navigateTo } from '@/aTemp/utils/uniAppTools.js';
import { _debounce } from '@/aTemp/utils/tools.js';
import { ref } from 'vue';

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js';
const useUserMain = _useUserMain();

// 订单核销
import { _orderVerificationSheet } from '@/aTemp/apis/order.js';

// 权限
// const optionPower = [
// 	{ value: 1, text: '创建者', disable: true },
// 	{ value: 2, text: '管理员' },
// 	{ value: 3, text: '商品管理' },
// 	{ value: 4, text: '活动管理' },
// 	{ value: 0, text: '无权限' }
// ]

const module1 = {
	title: '门诊管理',
	sub: [
		{
			imgUrl: '/static/images/u-huodong.png',
			name: '活动管理',
			path: '/pages/sub2/manageActivityList/manageActivityList',
			power: [1, 2, 4]
		},
		{
			imgUrl: '/static/images/u-shangpin.png',
			name: '商品管理',
			path: '/pages/sub2/manageShopList/manageShopList',
			power: [1, 2, 3]
		},
		{
			imgUrl: '/static/images/u-fuwu.png',
			name: '服务项目',
			path: '/pages/sub2/manageServiceList/manageServiceList',
			power: [1, 2]
		},
		// {
		// 	imgUrl: '/static/images/u-anli.png',
		// 	name: '案例管理',
		// 	path: '/pages/sub2/manageCaseList/manageCaseList',
		// 	power: [1, 2]
		// },
		{
			imgUrl: '/static/images/u-lunbo.png',
			name: '轮播图管理',
			path: '/pages/sub2/manageBannerList/manageBannerList',
			power: [1, 2]
		},
		{
			imgUrl: '/static/images/u-mzxinxi.png',
			name: '门诊信息',
			path: '/pages/sub2/manageInfoInput/manageInfoInput',
			power: [1, 2]
		},
		{
			imgUrl: '/static/images/u-yisheng.png',
			name: '医生管理',
			path: '/pages/sub2/manageDoctorList/manageDoctorList',
			power: [1, 2]
		}
	]
};

const module2 = {
	title: '数据统计',
	sub: [
		{
			imgUrl: '/static/images/u-shouyi.png',
			name: '门诊收益',
			path: '/pages/sub2/storeProfit/storeProfit',
			power: [1, 2]
		},
		{
			imgUrl: '/static/images/u-huodong1.png',
			name: '活动数据',
			path: '/pages/sub2/activityData/activityData',
			power: [1, 2]
		},
		{
			imgUrl: '/static/images/u-huiyuan.png',
			name: '会员管理',
			path: '/pages/sub2/manageMemberList/manageMemberList',
			power: [1, 2]
		},
		{
			imgUrl: '/static/images/u-huiyuan.png',
			name: '预约列表',
			path: '/pages/sub1/yuyueList/yuyueList',
			power: [1, 2]
		},
		{
			imgUrl: '/static/images/u-huiyuan.png',
			name: '数据详情',
			path: '/pages/sub2/dataDetails/dataDetails',
			power: [1, 2]
		}
	]
};
const module3 = {
	title: '订单管理',
	sub: [
		{
			imgUrl: '/static/images/u-shaoma.png',
			name: '扫码核销',
			fun: true,
			power: [1, 2, 5]
		},
		{
			imgUrl: '/static/images/u-shoudong.png',
			name: '手动核销',
			fun: true,
			power: [1, 2, 5]
		},
		{
			imgUrl: '/static/images/u-dingdan.png',
			name: '全部订单',
			path: '/pages/sub2/orderList/orderList?current=0',
			power: [1, 2, 5]
		}
	]
};

const module4 = {
	title: '营销助手',
	sub: [
		{
			imgUrl: '/static/images/u-huodongmuban.png',
			name: '活动模板',
			path: '/pages/sub2/activityTemplate/activityTemplate',
			power: [1, 2, 4]
		},
		{
			imgUrl: '/static/images/u-jingmeihaibao.png',
			name: '精美海报',
			path: '/pages/sub3/posterList/posterList'
		},
		{
			imgUrl: '/static/images/u-wenanxuanfa.png',
			name: '文案宣发',
			path: '/pages/sub2/wenAnList/wenAnList'
		},
		{
			imgUrl: '/static/images/u-kepuwenzhang.png',
			name: '科普文章',
			path: '/pages/sub2/newsList/newsList'
		}
	]
};
const yxzsTap = (item, index) => {
	if (Array.isArray(item.power) && !item.power.includes(useUserMain.power)) {
		showToastText('没有权限~');
		return;
	}
	navigateTo(item.path);
};

// 表单校验
const rules = {
	orderNo: {
		rules: [{ required: true, errorMessage: '请输入订单编号' }],
		label: '订单编号'
	}
};
// 弹出层
const popup = ref(null);
// 表单数据
const formData = ref({});
// 获取表单对象
const formObj = ref(null);
// 加载中
const loading = ref(false);

// 调用核销接口
const orderVerificationSheet = orderNo => {
	_orderVerificationSheet({ orderNo })
		.then(res => {
			const { msg, data, code } = res;
			showToastText('核销成功');
		})
		.catch(err => {
			showToastText(err?.msg || '核销失败');
		});
};

const module3Fun = listIndex => {
	// 扫码核销
	if (listIndex === 0) {
		uni.scanCode({
			onlyFromCamera: true
		})
			.then(res => {
				if (res.scanType !== 'QR_CODE') {
					showToastText('请扫描核销码~');
					return;
				}
				// console.log('条码内容：' + res.result)
				// 调用订单核销接口
				orderVerificationSheet(res.result);
			})
			.catch(err => {
				showToastText(err?.msg || '核销失败');
			});
	}
	// 手动核销
	if (listIndex === 1) {
		popup.value.open();
	}
};

const secretKeyClick = _debounce(
	() => {
		formObj.value
			.validate()
			.then(formRes => {
				// 调用订单核销接口
				orderVerificationSheet(formData.value.orderNo);

				// 关闭弹出框
				popup.value.close();
				loading.value = false;
			})
			.catch(err => {
				loading.value = false;
				showToastText(err[0].errorMessage);
				console.log('表单错误信息：', err);
			});
	},
	500,
	loading
);

const module5 = {
	title: '其他选项',
	sub: [
		{
			imgUrl: '/static/images/u-yuangong.png',
			name: '员工管理',
			path: '/pages/sub2/manageStaffList/manageStaffList'
		},
		{
			imgUrl: '/static/images/u-wddingdan.png',
			name: '我的订单',
			path: '/pages/sub1/orderList/orderList'
		},
		{
			imgUrl: '/static/images/u-huiyuan.png',
			name: '我的邀请',
			path: '/pages/sub1/invitationList/invitationList'
		},
		{
			imgUrl: '/static/images/u-huiyuan.png',
			name: '我的收益',
			path: '/pages/sub1/profitList/profitList'
		},
		{
			imgUrl: '/static/images/u-qhmenzhen.png',
			name: '切换门店',
			path: '/pages/sub2/switchStore/switchStore'
		}
	]
};
</script>

<style lang="scss" scoped>
.inviteStore {
	position: fixed;
	right: 40rpx;
	bottom: 60rpx;
	z-index: 10;
	background-color: $main-color;
	color: #fff;
	box-sizing: content-box;
	font-size: 24rpx;
	line-height: 1.5em;
	border-radius: 50%;
	overflow: hidden;
	width: 100rpx;
	height: 100rpx;
	text-align: justify;
	@include mFlex;
	flex-direction: column;
}

.box {
	width: $main-width;
	margin: auto;
}
.yxzs {
	@include mFlex;
	justify-content: space-between;
	flex-wrap: wrap;
	.yxzs_item {
		height: 144rpx;
		width: 334rpx;
		flex: none;
		position: relative;
		margin-bottom: 24rpx;
		> .image {
			position: absolute;
			z-index: 1;
			width: 334rpx;
			height: 144rpx;
			left: 0;
			top: 0;
		}
		> .text {
			position: absolute;
			z-index: 2;
			left: 25rpx;
			top: 50%;
			margin-top: -20rpx;
			height: 40rpx;
			font-size: 28rpx;
			font-weight: 600;
			color: #ffffff;
			line-height: 40rpx;
		}
	}
}
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
