<template>
	<view class="container">
		<uni-forms :rules="rules" ref="formObj" v-model="formData" label-width="200rpx" err-show-type="toast">
			<!-- 头像 -->
			<uni-forms-item :label="rules.avatar.label" name="avatar">
				<button
					open-type="chooseAvatar"
					class="avatar"
					@chooseavatar="onChooseAvatar"
					hover-class="avatar-button-hover"
				>
					<image :src="formData.avatar || '/static/images/default_avatar.png'" class="image" mode="aspectFill"></image>
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
				></uni-easyinput>
			</uni-forms-item>
			<view class="tips">点击输入框，输入微信昵称</view>

			<uni-forms-item name="isAgree" label-width="0">
				<!-- 协议 -->
				<view class="box1">
					<radio class="myradio" :checked="formData.isAgree" @click="formData.isAgree = !formData.isAgree" />
					<view class="box1_item2">
						<text @tap="formData.isAgree = !formData.isAgree">我已阅读并同意</text>
						<text class="text1" @tap="navigateTo('/pages/main/agree/agree')">《用户隐私协议》</text>
					</view>
				</view>
			</uni-forms-item>
		</uni-forms>

		<view class="box2">
			<button
				v-if="!formData.avatar || !formData.nickname || !formData.isAgree"
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
</template>

<script setup>
import { _wxMobile } from '@/aTemp/apis/login.js'
import { showToastText, navigateBack, showLoading, navigateTo, uploadFile } from '@/aTemp/utils/uniAppTools.js'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import config from '@/global-config.js'
import { _debounce } from '@/aTemp/utils/tools.js'

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 获取表单对象
const formObj = ref(null)
// 表单数据
const formData = ref({
	avatar: useUserMain.avatar,
	nickname: useUserMain.nickname,
	isAgree: false
})

// 表单校验
const rules = {
	avatar: {
		rules: [{ required: true, errorMessage: '请上传微信头像' }],
		label: '微信头像'
	},
	nickname: {
		rules: [
			{ required: true, errorMessage: '请输入微信昵称' },
			{ pattern: RegExp(/^[\u4e00-\u9fa5]{2,10}$/), errorMessage: '请输入2-10字的中文' }
		],
		label: '微信昵称'
	},
	isAgree: {
		rules: [{ range: [true], errorMessage: '请勾选协议' }],
		label: '协议'
	}
}

onLoad(options => {})

// 获取头像
const onChooseAvatar = async e => {
	const avatarUrl = e.detail.avatarUrl
	const resUploadFile = await uploadFile(avatarUrl, config.BASE_URL + '/enrollform/uploadimage', { baseDir: 'avatar' })
	const { code, data, msg } = JSON.parse(resUploadFile)
	formData.value.avatar = data
}

// 获取手机号事件
const getphonenumber = val => {
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
			setTimeout(() => {
				uni.hideLoading()
				navigateBack()
			}, 500)
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

<style lang="scss" scoped>
:global(page) {
	background-color: #fff !important;
}
:deep(.uni-forms-item) {
	border-bottom: 1px solid #ededed;
	margin: 0 32rpx;
	padding: 0;
	background-color: #fff;
	height: 100rpx;
	&:last-of-type {
		border: none;
	}
	.uni-forms-item__label {
		font-size: 28rpx !important;
	}
	.uni-forms-item__error {
	}
	.uni-easyinput__content {
		text-align: right;
	}
}
:deep(.fix .fix_warpper) {
	position: relative !important;
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
	width: 100%;

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
		padding: 0 32rpx;
		margin-top: 20rpx;
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
}
</style>
