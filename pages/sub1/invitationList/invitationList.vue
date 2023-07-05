<template>
	<view>
		<!-- 背景 -->
		<view class="pageBg">
			<image class="image" src="/static/images/bg.png" mode="aspectFill"></image>
		</view>
		<!-- 标题栏 -->
		<uni-nav-bar
			@clickLeft="navigateBack"
			left-icon="left"
			title="我的邀请"
			fixed
			statusBar
			color="#ffffff"
			:border="false"
		></uni-nav-bar>

		<!-- 邀请统计 -->
		<view class="box1 box">
			<view class="box1_item">
				<view class="text">全部邀请</view>
				<view class="text_num">{{ statistics.inviteall }}人</view>
			</view>
			<view class="box1_item">
				<view class="text">本月邀请</view>
				<view class="text_num">{{ statistics.invitemonth }}人</view>
			</view>
			<view class="box1_item">
				<view class="text">今日邀请</view>
				<view class="text_num">{{ statistics.invitesky }}人</view>
			</view>
		</view>
		<view class="blank40"></view>
		<view class="blank20"></view>
		<view class="box"><m-title2 title="邀请记录"></m-title2></view>
		<view class="blank20"></view>
	</view>
	<!-- 数据列表 -->
	<view class="box2 box">
		<z-paging
			ref="pagingObj"
			v-model="dataList"
			@query="queryList"
			:fixed="false"
			:auto="false"
			min-delay="1000"
			show-loading-more-when-reload
		>
			<template v-for="(item, index) in dataList" :key="index">
				<view style="border-bottom: 1px solid #eee;padding: 30rpx 0;">
					<view class="box2_item" v-if="item?.user">
						<view class="left">
							<view class="wrapper">
								<image
									class="image"
									:src="item?.user?.avatar || '/static/images/default_avatar.png'"
									mode="aspectFill"
								></image>
								<view class="wrapper_right">
									<view class="text" style="margin-bottom: 24rpx;">
										{{
											item?.user?.remarkname ||
												item?.user?.nickname ||
												'微信用户'
										}}
									</view>
									<view
										class="text"
										style="margin-bottom: 24rpx;"
										@click="makePhoneCall(item?.user?.mobile)"
									>
										{{ item?.user?.mobile || '无手机号' }}
									</view>
									<view class="text">
										邀请时间:
										{{ dayjs(item.createDt).format('YYYY-MM-DD HH:mm:ss') }}
									</view>
								</view>
							</view>
						</view>
						<view class="right">
							<button class="mbtn" @click="popupTap(item.user)">设置</button>
						</view>
					</view>

					<view class="bottom_text">
						<view
							class="container_item_box3"
							v-if="jsonToObj(item.user['userremark']).remarks"
						>
							{{ jsonToObj(item.user['userremark']).remarks }}
						</view>
						<view
							v-if="
								jsonToObj(item.user['userremark']).sex ||
									jsonToObj(item.user['userremark']).age
							"
							class="container_item_box4"
						>
							<view class="item">
								<uni-tag
									inverted
									:text="jsonToObj(item.user['userremark']).sex"
									size="small"
									type="primary"
								/>
							</view>
							<view class="item">
								<uni-tag
									inverted
									:text="jsonToObj(item.user['userremark']).age"
									size="small"
									type="primary"
								/>
							</view>
						</view>
					</view>
				</view>
			</template>
		</z-paging>

		<!-- 弹出框 -->
		<uni-popup ref="popup" type="bottom" :safe-area="false">
			<view class="popup_box">
				<image class="close" @tap="popup.close" src="/static/images/close.png"></image>
				<uni-forms
					:rules="rules"
					ref="formObj"
					v-model="formData"
					label-width="220rpx"
					label-position="top"
				>
					<!-- 备注名 -->
					<uni-forms-item
						:label="rules.remarkname.label"
						name="remarkname"
						label-position="top"
					>
						<uni-easyinput
							v-model="formData.remarkname"
							:placeholder="rules.remarkname.rules[0].errorMessage"
						></uni-easyinput>
					</uni-forms-item>

					<!-- 性别 -->
					<uni-forms-item :label="rules.sex.label" name="sex">
						<uni-data-checkbox
							mode="tag"
							v-model="formData.sex"
							:localdata="sex"
						></uni-data-checkbox>
					</uni-forms-item>

					<!-- 年龄 -->
					<uni-forms-item :label="rules.age.label" name="age">
						<uni-data-checkbox
							mode="tag"
							v-model="formData.age"
							:localdata="age"
						></uni-data-checkbox>
					</uni-forms-item>

					<!-- 备注信息 -->
					<uni-forms-item :label="rules.remarks.label" name="remarks">
						<fuck-textarea
							v-model="formData.remarks"
							:placeholder="rules.remarks.rules[0].errorMessage"
							:maxlength="50"
						></fuck-textarea>
					</uni-forms-item>
				</uni-forms>

				<button class="btn" :loading="loading" @tap="saveClick">保存信息</button>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, nextTick } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { _userInviteGetlist, _userInviteGetinfo, _userUpdate } from '@/aTemp/apis/user.js';
import { _debounce } from '@/aTemp/utils/tools.js';
import dayjs from 'dayjs';
import { navigateBack, makePhoneCall } from '@/aTemp/utils/uniAppTools.js';

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js';
const useUserMain = _useUserMain();

// 弹出层
const popup = ref(null);
// 表单数据
const formData = ref({});
// 获取表单对象
const formObj = ref(null);
const sex = [
	{
		text: '女性',
		value: '女性'
	},
	{
		text: '男性',
		value: '男性'
	}
];
const age = [
	{
		text: '18岁以下',
		value: '18岁以下'
	},
	{
		text: '18岁-25岁',
		value: '18岁-25岁'
	},
	{
		text: '26岁-35岁',
		value: '26岁-35岁'
	},
	{
		text: '36岁-45岁',
		value: '36岁-45岁'
	},
	{
		text: '46岁-60岁',
		value: '46岁-60岁'
	},
	{
		text: '60岁以上',
		value: '60岁以上'
	}
];

// 表单校验
const rules = {
	remarkname: {
		rules: [{ errorMessage: '请输入备注名' }],
		label: '备注名'
	},
	sex: {
		rules: [{ errorMessage: '请选择性别' }],
		label: '性别'
	},
	age: {
		rules: [{ errorMessage: '请选择年龄' }],
		label: '年龄'
	},
	remarks: {
		rules: [{ errorMessage: '请输入备注信息' }],
		label: '备注信息'
	}
};

// 当前编辑的对象
let pupItem = {};
const jsonToObj = str => {
	try {
		return JSON.parse(str) || {};
	} catch (e) {
		return {};
	}
};
// 弹出模态框
const popupTap = item => {
	// 保存当前编辑的对象
	pupItem = item;
	// 赋值表单数据
	formData.value = {
		id: item['id'],
		remarkname: item['remarkname'],
		sex: jsonToObj(item['userremark'])['sex'],
		age: jsonToObj(item['userremark'])['age'],
		remarks: jsonToObj(item['userremark'])['remarks']
	};
	popup.value.open();
};

const loading = ref(false);
// 保存函数 防抖
const saveClick = _debounce(
	() => {
		formObj.value
			.validate()
			.then(formRes => {
				const remarks = {
					sex: formData.value['sex'],
					age: formData.value['age'],
					remarks: formData.value['remarks']
				};

				// console.log(pupItem)

				_userUpdate({
					id: formData.value['id'],
					remarkname: formData.value['remarkname'],
					userremark: JSON.stringify(remarks)
				}).then(res => {
					// 修改成功重新赋值当前修改对象
					pupItem['remarkname'] = formData.value['remarkname'];
					pupItem['userremark'] = JSON.stringify(remarks);

					// 加载结束
					loading.value = false;
				});
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

// 数据列表
const dataList = ref([]);
// 当前选择的索引
const tabIndex = ref(0);
// 插件对象
const pagingObj = ref(null);
// 邀请统计
const statistics = ref({});

// 页面加载
onLoad(async options => {
	// 等待onLaunch中放行后执行
	const { proxy } = getCurrentInstance();
	await proxy.$onLaunched;

	// 数据加载
	nextTick(() => {
		pagingObj.value.reload(true);
		userInviteGetinfo();
	});
});

// 获取个人邀请统计数据
const userInviteGetinfo = () => {
	_userInviteGetinfo().then(res => {
		const { msg, data, code } = res;
		statistics.value = data;
	});
};

// 获取个人邀请列表
const queryList = (pageNo, pageSize) => {
	const params = {
		pageNum: pageNo,
		pageSize: pageSize
	};
	_userInviteGetlist(params)
		.then(res => {
			// 列表赋值
			pagingObj.value.complete(res.data);
		})
		.catch(res => {
			pagingObj.value.complete(false);
		});
};
</script>

<style lang="scss" scoped>
.box {
	width: $main-width;
	margin: auto;
	position: relative;
	z-index: 2;
}
.box1 {
	background-color: #fff;
	padding: $padding;
	border-radius: 16rpx;
	@include mFlex;
	justify-content: space-between;
	padding-bottom: 40rpx;
	color: #333;
	font-size: 28rpx;
	.box1_item {
		width: 33.3%;
		flex: none;
		overflow: hidden;
		text-align: center;
		> .text {
			margin-bottom: 30rpx;
		}
	}
}

.box2 {
	background-color: #ffffff;
	padding: $padding;
	border-radius: 16rpx;
	height: #{calc(100vh - 300px)};
	box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
	.box2_item {
		@include mFlex;
		justify-content: space-between;
		text-align: center;
		font-size: 28rpx;
		&:last-of-type {
			border: none;
		}
		.left {
			width: 72%;
			flex: none;
			overflow: hidden;
			> .wrapper {
				@include mFlex;
				justify-content: left;
				> .image {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					flex: none;
				}
				.wrapper_right {
					flex: auto;
					> .text {
						flex: auto;
						margin-left: 30rpx;
						color: $text-color-grey;
						@include singleLineTextOverHidden;
						font-size: 26rpx;
						text-align: left;
					}
				}
			}
		}
		.right {
			flex: none;
			overflow: hidden;
			> .mbtn {
				background-color: $main-color;
				color: #fff;
				font-size: 24rpx;
				line-height: 2;
			}
		}
	}

	.bottom_text {
		padding-left: 100rpx;
		.container_item_box3 {
			margin-top: 30rpx;
			font-size: 26rpx;
			color: $main-color;
			@include singleLineTextOverHidden;
		}
		.container_item_box4 {
			padding-top: 24rpx;
			@include mFlex;
			justify-content: flex-start;
			> .item {
				margin-right: 20rpx;
				&:last-child {
					margin-right: 0;
				}
			}
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
	margin-bottom: 90rpx;
	.btn {
		margin: 32rpx;
		margin-top: 0;
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
