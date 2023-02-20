<template>
	<view class="page_top"><view class="page_top_text">入驻牙小新</view></view>
	<view class="container">
		<view class="tips_top">请填写入驻信息</view>
		<uni-forms :rules="rules" ref="formObj" v-model="formData" label-position="left" label-width="220rpx">
			<!-- 门诊名称 -->
			<uni-forms-item :label="rules.name.label" label-position="top" name="name">
				<uni-easyinput v-model="formData.name" :placeholder="rules.name.rules[0].errorMessage" />
			</uni-forms-item>

			<!-- 联系人 -->
			<uni-forms-item :label="rules.contactName.label" label-position="top" name="contactName">
				<uni-easyinput v-model="formData.contactName" :placeholder="rules.contactName.rules[0].errorMessage" />
			</uni-forms-item>

			<!-- 联系电话 -->
			<uni-forms-item :label="rules.mobile.label" label-position="top" name="mobile">
				<uni-easyinput v-model="formData.mobile" :placeholder="rules.mobile.rules[0].errorMessage" />
			</uni-forms-item>

			<!-- 所在区域 -->
			<uni-forms-item :label="rules.address.label" label-position="top" name="address">
				<uni-easyinput
					v-model="formData.address"
					:placeholder="rules.address.rules[0].errorMessage"
					@focus="MchooseLocation"
					@clear="MchooseLocation"
				/>
			</uni-forms-item>

			<!-- 详情地址 -->
			<uni-forms-item :label="rules.addressDetail.label" label-position="top" name="addressDetail">
				<uni-easyinput
					v-model="formData.addressDetail"
					:placeholder="rules.addressDetail.rules[0].errorMessage"
					@focus="MchooseLocation"
					@clear="MchooseLocation"
				/>
			</uni-forms-item>

			<!-- 是否有独立小程序 -->
			<uni-forms-item :label="'是否有独立小程序'" label-width="320rpx">
				<switch
					color="#4b8eff"
					:checked="formData.independent"
					style="transform:scale(0.8)"
					@change="formData.independent = !formData.independent"
				/>
			</uni-forms-item>

			<!-- 小程appid -->
			<uni-forms-item :label="rules.appid.label" label-position="top" name="appid" v-if="formData.independent">
				<uni-easyinput v-model="formData.appid" :placeholder="rules.appid.rules[0].errorMessage" />
			</uni-forms-item>

			<!-- 小程序秘钥secret -->
			<uni-forms-item
				:label="rules.secret.label"
				label-position="top"
				name="secret"
				label-width="420rpx"
				v-if="formData.independent"
			>
				<uni-easyinput v-model="formData.secret" :placeholder="rules.secret.rules[0].errorMessage" />
			</uni-forms-item>
		</uni-forms>

		<!-- 协议 -->
		<view class="box1">
			<radio class="myradio" :checked="isAgree" @click="isAgree = !isAgree" />
			<view class="box1_item2">
				<text @tap="isAgree = !isAgree">我已阅读并同意</text>
				<text class="text1" @tap="navigateTo('/pages/main/agree/agree')">《用户隐私协议》</text>
			</view>
		</view>

		<!-- 提交按钮 -->
		<button :loading="loading" class="btn" @tap="btnClick">确认入驻</button>

		<view class="blank40"></view>
	</view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { navigateTo, showToastText, chooseLocation, reLaunch } from '@/aTemp/utils/uniAppTools.js'
import { _debounce } from '@/aTemp/utils/tools.js'
import { _storeSaveStore } from '@/aTemp/apis/store.js'
import dayjs from 'dayjs'

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 分享 (onShareAppMessage,onShare123Timeline) 不能删,必要 https://github.com/dcloudio/uni-app/issues/3097
import useShare from '@/aTemp/mixins/useShare.js'
const shareInfo = reactive({ title: '', path: '', imageUrl: '', query: '' })
// 设置分享
useShare(shareInfo)
// 设置页面分享参数
shareInfo.title = computed(() => `${useUserMain.nickname}-邀请您开通入驻牙小新`)
// 分享图片
shareInfo.imageUrl = `https://imgs.lechiwl.com/store/tooth/vipshare.png`

// 分享到聊天框
shareInfo.path = computed(
	() =>
		`/pages/main/index/index?invitationCode=${useUserMain.userid}&storeId=${useUserMain.storeId}&Mscene=6&targetId=0`
)

// 表单数据
const formData = ref({})
// 获取表单对象
const formObj = ref(null)
// 加载中
const loading = ref(false)
// 是否同意协议
const isAgree = ref(false)

// 表单校验
const rules = {
	name: {
		rules: [
			{ required: true, errorMessage: '请输入门诊名称' },
			{ pattern: RegExp(/^[\u4e00-\u9fa5(，。《》（）【】{}！,.\-!)]{2,16}$/), errorMessage: '请输入2-16字的中文' }
		],
		label: '门诊名称'
	},
	mobile: {
		rules: [{ required: true, errorMessage: '请输入负责人联系电话' }],
		label: '联系电话'
	},
	contactName: {
		rules: [
			{ required: true, errorMessage: '请输入负责人姓名' },
			{ pattern: RegExp(/^[\u4e00-\u9fa5]{2,6}$/), errorMessage: '请输入2-6字的中文' }
		],
		label: '联系人'
	},
	address: {
		rules: [{ required: true, errorMessage: '请输入所在区域' }],
		label: '所在区域'
	},
	addressDetail: {
		rules: [{ required: true, errorMessage: '请输入详情地址' }],
		label: '详情地址'
	},
	appid: {
		rules: [
			{ required: true, errorMessage: '请输入小程序AppId' },
			{ pattern: RegExp(/^[a-z\d]{18}$/), errorMessage: '请输入正确的小程序AppId' }
		],
		label: '小程序AppId'
	},
	secret: {
		rules: [
			{ required: true, errorMessage: '请输入小程序秘钥secret' },
			{ pattern: RegExp(/^[a-z\d]{32}$/), errorMessage: '请输入正确的小程序秘钥secret' }
		],
		label: '小程序秘钥secret'
	}
}

/*
 * 选择门诊地址
 *
 */
const MchooseLocation = () => {
	if (!formData.value.address || !formData.value.addressDetail) {
		chooseLocation().then(res => {
			// console.log(res)
			const { name, address, latitude, longitude } = res
			formData.value.address = address
			formData.value.addressDetail = name
			formData.value.lat = latitude
			formData.value.lng = longitude
		})
	}
}

// 保存函数 防抖
const btnClick = _debounce(
	() => {
		formObj.value
			.validate()
			.then(formRes => {
				if (!isAgree.value) {
					showToastText('请点击同意用户协议~')
					loading.value = false
					return
				}
				// 添加到期时间
				formData.value.expireDt = dayjs()
					.add(1, 'year')
					.format('YYYY-MM-DD[T]HH:mm:ss')
					
				// 保存信息接口
				_storeSaveStore(formData.value)
					.then(res => {
						loading.value = false
						showToastText('店铺创建成功,请联系客服')
						setTimeout(() => {
							reLaunch('/pages/main/index/index')
						}, 1000)
					})
					.catch(err => {
						showToastText(err.msg || '店铺入驻失败，请联系管理员')
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

<style scoped lang="scss">
.page_top {
	background-color: $main-color;
	padding: 80rpx 0 140rpx;
	.page_top_text {
		font-size: 45rpx;
		font-weight: bold;
		text-align: center;
		color: #fff;
	}
}
.container {
	width: $main-width;
	margin: auto;
	background-color: #fff;
	border-radius: 16rpx;
	overflow: hidden;
	margin-top: -80rpx;
	.tips_top {
		color: #999;
		font-size: 28rpx;
		padding: 40rpx 32rpx 0;
	}

	.box1 {
		color: $text-color-grey;
		@include mFlex;
		justify-content: flex-start;
		font-size: 26rpx;
		margin: 10rpx 32rpx 10rpx;
		.myradio {
			transform: scale(0.5);
		}
		&_item2 {
			padding-left: 4rpx;
			.text1 {
				color: $main-color;
			}
		}
	}

	.btn {
		margin: 0 32rpx;
		border-radius: 16rpx;
		font-size: 34rpx;
		font-weight: bold;
		height: 100rpx;
		line-height: 100rpx;
		color: #ffffff;
		background-color: $main-color;
		&:after {
			border: none;
		}
	}
}
</style>
