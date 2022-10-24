<template>
	<view class="container">
		<view class="blank20 blank_bg_color"></view>
		<uni-forms :rules="rules" ref="formObj" v-model="formData" label-width="240rpx">
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
			<view class="tips">昵称限制2-32个字符，一个汉字2个字符</view>
			
		</uni-forms>

		<!-- 保存 -->
		<m-btn-fix-bottom :loading="loading" text="保存信息" @btnClick="saveClick" />
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import config from '@/global-config.js'
import { _userUpdate } from '@/aTemp/apis/user.js'
import { showToastText,navigateBack,uploadFile } from '@/aTemp/utils/uniAppTools'
import { _debounce } from '@/aTemp/utils/tools.js'


// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 表单校验
const rules = {
	avatar: {
		rules: [{ required: true, errorMessage: '请上传微信头像' }],
		label: '微信头像'
	},
	nickname: {
		rules: [{ required: true, errorMessage: '请输入微信昵称' }],
		label: '微信昵称'
	}
}

// 表单数据
const formData = ref({
	avatar: useUserMain.avatar,
	nickname: useUserMain.nickname,
	id: useUserMain.userid
})
// 获取表单对象
const formObj = ref(null)

// 页面加载
onLoad(optios => {})

// 获取头像
const onChooseAvatar = async e => {
	const avatarUrl = e.detail.avatarUrl
	const resUploadFile = await uploadFile(avatarUrl, config.BASE_URL + '/enrollform/uploadimage', { baseDir: 'avatar' })
	const { code, data, msg } = JSON.parse(resUploadFile)
	formData.value.avatar = data
}


/*
 * 保存
 */
const loading = ref(false)
const saveClick = _debounce(
	() => {
		formObj.value
			.validate()
			.then(formRes => {
				// 保存信息接口
				_userUpdate(formData.value).then(res => {
					loading.value = false
					useUserMain.$patch({ avatar: formData.value.avatar, nickname: formData.value.nickname })
					showToastText('提交成功~')
					// 返回上一级
					navigateBack()
				}).catch(err=>{
					loading.value = false
				})
			})
			.catch(err => {
				loading.value = false
				showToastText(err[0].errorMessage)
				console.log('表单错误信息：', err)
			})
	},
	1000,
	loading
)
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
	width: 750rpx;
}
</style>
