<template>
	<view class="container">
		<view class="blank20 blank_bg_color"></view>
		<uni-forms
			:rules="rules"
			ref="formObj"
			v-model="formData"
			err-show-type="toast"
			label-width="240rpx"
		>
			<!-- 头像 -->
			<!-- 最新板写法 -->
			<uni-forms-item
				:label="rules.avatar.label"
				name="avatar"
				v-if="compareVersion(SDKVersion, '2.27.0') === 1"
			>
				<button
					open-type="chooseAvatar"
					class="avatar"
					@chooseavatar="onChooseAvatar"
					hover-class="avatar-button-hover"
				>
					<image
						:src="formData.avatar || '/static/images/default_avatar.png'"
						class="image"
						mode="aspectFill"
					></image>
				</button>
			</uni-forms-item>

			<!-- 头像 -->
			<!-- 兼容getUserProfile -->
			<uni-forms-item
				:label="rules.avatar.label"
				name="avatar"
				v-else-if="compareVersion(SDKVersion, '2.10.3') === 1"
			>
				<button class="avatar" @tap.stop="getUserProfile" hover-class="avatar-button-hover">
					<image
						:src="formData.avatar || '/static/images/default_avatar.png'"
						class="image"
						mode="aspectFill"
					></image>
				</button>
			</uni-forms-item>

			<!-- 头像 -->
			<!-- 兼容getUserInfo -->
			<uni-forms-item
				:label="rules.avatar.label"
				name="avatar"
				v-else-if="compareVersion(SDKVersion, '0.0.1') === 1"
			>
				<button class="avatar" @tap.stop="getUserInfo" hover-class="avatar-button-hover">
					<image
						:src="formData.avatar || '/static/images/default_avatar.png'"
						class="image"
						mode="aspectFill"
					></image>
				</button>
			</uni-forms-item>
			<view class="tips">点击图片，上传微信头像</view>

			<!-- 昵称 -->
			<uni-forms-item :label="rules.nickname.label" name="nickname">
				<uni-easyinput
					type="nickname"
					:inputBorder="false"
					:clearable="false"
					trim
					v-model="formData.nickname"
					@blur="getnickname"
				></uni-easyinput>
			</uni-forms-item>
			<view class="tips">昵称限制2-32个字符，一个汉字2个字符</view>

			<!-- 手机号 -->
			<uni-forms-item :label="rules.mobile.label" name="mobile">
				<view class="m-forms-item-box">
					<text>{{ formData.mobile }}</text>
					<button open-type="getPhoneNumber" @getphonenumber="getphonenumber" class="btn">
						授权手机号
					</button>
				</view>
			</uni-forms-item>
			<view class="tips">点击右侧按钮授权手机号</view>
		</uni-forms>

		<!-- 保存 -->
		<m-btn-fix-bottom :loading="loading" text="保存信息" @btnClick="saveClick" />
	</view>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import config from '@/global-config.js';
import { _userUpdate } from '@/aTemp/apis/user.js';
import { showToastText, navigateBack, uploadFile, showLoading } from '@/aTemp/utils/uniAppTools';
import { _debounce, compareVersion } from '@/aTemp/utils/tools.js';
import { _wxMobile } from '@/aTemp/apis/login.js';
// 页面对象实例
const instance = getCurrentInstance();

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js';
const useUserMain = _useUserMain();

// 获取小程序当前版本
const { SDKVersion } = uni.getSystemInfoSync();

// 表单校验
const rules = {
	avatar: {
		rules: [{ required: true, errorMessage: '请上传微信头像' }],
		label: '微信头像'
	},
	nickname: {
		rules: [{ required: true, errorMessage: '请输入微信昵称' }],
		label: '微信昵称'
	},
	mobile: {
		rules: [{ required: true, errorMessage: '请输入手机号' }],
		label: '手机号'
	}
};

// 表单数据
const formData = ref({
	avatar: useUserMain.avatar,
	nickname: useUserMain.nickname,
	mobile: useUserMain.mobile,
	id: useUserMain.userid
});
// 获取表单对象
const formObj = ref(null);

// 页面加载
onLoad(optios => {});

// 获取头像
const onChooseAvatar = async e => {
	const avatarUrl = e.detail.avatarUrl;
	const resUploadFile = await uploadFile(avatarUrl, config.BASE_URL + '/upload-flv/uploadimage', {
		baseDir: 'avatar'
	});
	const { code, data, msg } = JSON.parse(resUploadFile);
	formData.value.avatar = data;
};

// 名称输入框失去焦点重新设置需要提交的名称
const getnickname = e => {
	formData.value.nickname = e.detail.value;
};
/*
 * 保存
 */
const loading = ref(false);
const saveClick = _debounce(
	() => {
		formObj.value
			.validate()
			.then(formRes => {
				// 保存信息接口
				_userUpdate(formData.value)
					.then(res => {
						loading.value = false;
						useUserMain.$patch({
							avatar: formData.value.avatar,
							nickname: formData.value.nickname
						});
						showToastText('提交成功~');
						// 返回上一级
						navigateBack();
					})
					.catch(err => {
						loading.value = false;
					});
			})
			.catch(err => {
				loading.value = false;
				showToastText(err[0].errorMessage);
				console.log('表单错误信息：', err);
			});
	},
	1000,
	loading
);

// 获取手机号事件
const getphonenumber = val => {
	// 加载中
	showLoading();
	// 获取code
	const { code } = val.detail;

	if (code) {
		_wxMobile({ code: code }).then(res => {
			const { msg, data, code } = res;
			if (data) {
				useUserMain.$patch({ mobile: data });
				formData.value.mobile = data;
			}
			uni.hideLoading();
		});
	} else {
		showToastText('已拒绝获取手机号');
	}
};

// 兼容版本写法 第二版
const getUserProfile = () => {
	uni.getUserProfile({
		desc: '用于完善会员资料',
		success: res => {
			const { avatarUrl, nickName } = res.userInfo;
			formData.value.avatar = avatarUrl;
			formData.value.nickname = nickName;
		}
	});
};

// 兼容版本写法 第一版
const getUserInfo = e => {
	const { avatarUrl, nickName } = e.detail.userInfo;
	formData.value.avatar = avatarUrl;
	formData.value.nickname = nickName;
};
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #fff;
}
:deep(.uni-forms-item) {
	border-bottom: 1px solid #ededed;
	margin: 0 32rpx;
	padding: 0;
	background-color: #fff;
	height: 100rpx;
	.uni-forms-item__label {
		font-size: 28rpx !important;
	}
	.uni-easyinput__content {
		text-align: right;
	}
}
.avatar {
	font-size: 0;
	text-align: right;
	background-color: #fff;
	padding: 0;
	margin: 0;
	&::after {
		border: none;
	}
	.image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		display: inline-block !important;
	}
}
.tips {
	margin: 0 32rpx;
	padding: 22rpx 0;
	font-size: 26rpx;
	color: #999;
}
.container {
	width: 750rpx;
}
.m-forms-item-box {
	display: flex;
	align-items: center;
	justify-content: space-between;
	.btn {
		background-color: $main-color;
		color: #fff;
		font-size: 24rpx;
		margin: 0;
	}
}
</style>
