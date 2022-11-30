<template>
	<uni-popup ref="popupObj" type="bottom">
		<view class="login-container">
			<view class="close" @tap.stop="closefun">
				<image class="img" src="@/static/images/close1.png" mode="aspectFill"></image>
			</view>
			<view class="login-top1">获取您的昵称，头像，手机号</view>
			<view class="login-top2">获取用户头像，昵称，手机号，主要用于向用户提供具有辨识度的用户中心页面，和订单生成</view>
			<view class="blank40"></view>
			<uni-forms :rules="rules" ref="formObj" v-model="formData" label-width="200rpx" err-show-type="toast">
				<!-- 最新版头像获取 -->
				<uni-forms-item
					:label="rules.avatar.label"
					name="avatar"
					v-if="compareVersion('9.0.0', SDKVersion) === 1 && compareVersion(SDKVersion, '2.27.0') === 1"
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

				<!-- 兼容getUserProfile -->
				<uni-forms-item
					:label="rules.avatar.label"
					name="avatar"
					v-if="compareVersion('2.27.1', SDKVersion) === 1 && compareVersion(SDKVersion, '2.10.3') === 1"
				>
					<button class="avatar" @tap.stop="getUserProfile" hover-class="avatar-button-hover">
						<image
							:src="formData.avatar || '/static/images/default_avatar.png'"
							class="image"
							mode="aspectFill"
						></image>
					</button>
				</uni-forms-item>

				<!-- 兼容getUserInfo -->
				<uni-forms-item :label="rules.avatar.label" name="avatar" v-if="compareVersion('2.9.7', SDKVersion) === 1">
					<button class="avatar" open-type="getUserInfo" @getuserinfo="getUserInfo" hover-class="avatar-button-hover">
						<image
							:src="formData.avatar || '/static/images/default_avatar.png'"
							class="image"
							mode="aspectFill"
						></image>
					</button>
				</uni-forms-item>

				<!-- 昵称 -->
				<uni-forms-item :label="rules.nickname.label" name="nickname">
					<uni-easyinput
						type="nickname"
						:inputBorder="false"
						:clearable="false"
						:placeholder="rules.nickname.rules[0].errorMessage"
						trim
						v-model="formData.nickname"
						@blur="getnickname"
					></uni-easyinput>
				</uni-forms-item>

				<!-- 勾选协议 -->
				<!-- <uni-forms-item name="isAgree" label-width="0">
					<view class="box1">
						<radio class="myradio" :checked="formData.isAgree" @tap.stop="formData.isAgree = !formData.isAgree" />
						<view class="box1_item2">
							<text @tap="formData.isAgree = !formData.isAgree">我已阅读并同意</text>
							<text class="text1" @tap="navigateTo('/pages/main/agree/agree?text=1')">《软件使用协议》</text>
							<text class="text1" @tap="navigateTo('/pages/main/agree/agree?text=2')">《隐私协议》</text>
						</view>
					</view>
				</uni-forms-item> -->
			</uni-forms>

			<view class="box2">
				<!-- v-if="!formData.avatar || !formData.nickname || !formData.isAgree" -->
				<button
					v-if="!formData.avatar || !formData.nickname"
					class="btn btnAgree"
					:loading="loading"
					@tap="saveClick"
				>
					微信授权登录
				</button>
				<button v-else open-type="getPhoneNumber" class="btn btnAgree" @getphonenumber="getphonenumber">
					微信授权登录
				</button>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
import { _wxMobile } from '@/aTemp/apis/login.js'
import { showToastText, navigateBack, showLoading, navigateTo, uploadFile } from '@/aTemp/utils/uniAppTools.js'
import { ref, onMounted } from 'vue'
import config from '@/global-config.js'
import { _debounce } from '@/aTemp/utils/tools.js'
import { compareVersion } from '@/aTemp/utils/tools.js'

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 获取小程序当前版本
const { SDKVersion } = uni.getSystemInfoSync()

const getUserProfile = () => {
	uni.getUserProfile({
		desc: '用于完善会员资料',
		success: res => {
			const { avatarUrl, nickName } = res.userInfo
			formData.value.avatar = avatarUrl
			formData.value.nickname = nickName
		}
	})
}

const getUserInfo = e => {
	const { avatarUrl, nickName } = e.detail.userInfo
	formData.value.avatar = avatarUrl
	formData.value.nickname = nickName
}

// 获取表单对象
const formObj = ref(null)
// 表单数据
const formData = ref({
	avatar: useUserMain.avatar,
	nickname: useUserMain.nickname,
	isAgree:false
})

// 表单校验
const rules = {
	avatar: {
		rules: [{ required: true, errorMessage: '请上传微信头像' }],
		label: '微信头像'
	},
	nickname: {
		rules: [{ required: true, errorMessage: '请输入微信昵称' }, { maxLength: 10, errorMessage: '请输入2-10字的中文' }],
		label: '微信昵称'
	},
	isAgree: {
		rules: [{ range: [true], errorMessage: '请勾选协议' }],
		label: '协议'
	}
}

/**
 * 弹出层控制
 * */
const popupObj = ref(null)
// 表单弹出
const popupfun = () => {
	popupObj.value.open()
}
// 表单关闭
const closefun = () => {
	popupObj.value.close()
}

defineExpose({
	popupfun,
	closefun
})

// dom加载完毕执行
onMounted(() => {
	if (!useUserMain.isLogin) {
		popupfun()
	}
})

// 获取头像
const onChooseAvatar = async e => {
	const avatarUrl = e.detail.avatarUrl
	const resUploadFile = await uploadFile(avatarUrl, config.BASE_URL + '/upload-flv/uploadimage', { baseDir: 'avatar' })
	const { code, data, msg } = JSON.parse(resUploadFile)
	formData.value.avatar = data
}

// 名称输入框失去焦点重新设置需要提交的名称
const getnickname = e => {
	formData.value.nickname = e.detail.value
}

// 获取手机号事件
const getphonenumber = val => {
	// console.log(val)
	// 加载中
	showLoading()

	// 获取code
	const { code } = val.detail

	if (code) {
		_wxMobile({ code: code, avatar: formData.value.avatar, nickname: formData.value.nickname }).then(res => {
			const { msg, data, code } = res
			if (data) {
				useUserMain.$patch({ mobile: data, avatar: formData.value.avatar, nickname: formData.value.nickname })
			}
			uni.hideLoading()
			closefun()
		})
	} else {
		showToastText('已拒绝授权登录')
	}
}

/*
 * 表单校验
 */
const loading = ref(false)
const saveClick = _debounce(
	() => {
		formObj.value
			.validate()
			.then(formRes => {
				loading.value = false
				console.log(formRes)
			})
			.catch(err => {
				loading.value = false
				console.log('表单错误信息：', err)
			})
	},
	1000,
	loading
)
</script>

<style lang="scss">
.login-container {
	background-color: #fff;
	padding: 48rpx 32rpx;
	overflow: hidden;
	border-radius: 16rpx 16rpx 0 0;
	position: relative;
}
.login-top1 {
	font-weight: bold;
	font-size: 30rpx;
}
.login-top2 {
	font-size: 26rpx;
	color: #aaa;
	line-height: 1.6;
	margin-top: 20rpx;
}

.avatar {
	font-size: 0;
	text-align: right;
	background-color: #fff;
	padding: 0 10px;
	margin: 0;
	&::after {
		border: none;
	}
	.image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
		display: inline-block !important;
	}
}
.box1 {
	color: $text-color-grey;
	@include mFlex;
	justify-content: flex-start;
	font-size: 26rpx;
	margin-top: 30rpx;
	.myradio {
		transform: scale(0.6);
	}
	&_item2 {
		padding-left: 4rpx;
		.text1 {
			color: $main-color;
		}
	}
}

.box2 {
	margin-top: 30rpx;
	.btn {
		font-size: 32rpx;
		color: #fff;
		background-color: #ccc;
		text-align: center;
		line-height: 2.5;
		margin-left: auto;
		margin-right: auto;
		overflow: hidden;
		padding-left: 14px;
		padding-right: 14px;
		border-radius: 5px;
	}
	.btnAgree {
		background-color: $main-color;
	}
}

.close {
	position: absolute;
	top: 30rpx;
	right: 30rpx;
	.img {
		width: 35rpx;
		height: 35rpx;
	}
}
</style>
