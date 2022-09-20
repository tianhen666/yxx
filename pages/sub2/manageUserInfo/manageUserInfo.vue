<template>
	<view class="container">
		<view class="blank20 blank_bg_color"></view>
		<uni-forms :rules="rules" ref="formObj" v-model="formData" label-width="140rpx">
			<!-- 头像 -->
			<uni-forms-item :label="rules.avatar.label" name="avatar">
				<button
					open-type="chooseAvatar"
					class="avatar"
					@chooseavatar="onChooseAvatar"
					hover-class="avatar-button-hover"
				>
					<image src="/static/images/default_avatar.png" class="image" mode="aspectFill"></image>
				</button>
			</uni-forms-item>
			<view class="tips">点击图片，可以更换头像</view>
			
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
		</uni-forms>
		<view class="tips">昵称限制2-32个字符，一个汉字2个字符</view>

		<!-- 保存 -->
		<m-btn-fix-bottom :loading="loading" text="保存信息" @btnClick="saveClick" />
	</view>
</template>

<script setup>
import { ref, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 表单校验
const rules = {
	avatar: {
		rules: [{ required: true, errorMessage: '请上传头像' }],
		label: '头像'
	},
	nickname: {
		rules: [{ required: true, errorMessage: '请输入昵称' }],
		label: '昵称'
	}
}

// 表单数据
const formData = ref({})
// 获取表单对象
const formObj = ref(null)

// 页面加载
onLoad(optios => {})

// 获取头像
const onChooseAvatar = e => {
	const avatarUrl = e.detail.avatarUrl
}
/*
 * 保存banenr信息功能
 * 组合式函数引入
 */
// import useSaveApi from '@/aTemp/mixins/useSaveApi.js'
// const { saveClick, loading } = useSaveApi(formObj, formData, _bannerSave)
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
