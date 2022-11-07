<template>
	<view class="container">
		<view class="title_tips">请填写以下信息</view>
		<uni-forms :rules="rules" ref="formObj" v-model="formData" label-width="240rpx">
			<!-- 就诊人 -->
			<uni-forms-item :label="rules.doctorname.label" name="doctorname">
				<uni-easyinput
					v-model="formData.doctorname"
					:inputBorder="false"
					trim
					:placeholder="rules.doctorname.rules[0].errorMessage"
				/>
			</uni-forms-item>

			<!-- 联系方式 -->
			<uni-forms-item :label="rules.doctorphone.label" name="doctorphone">
				<uni-easyinput
					v-model="formData.doctorphone"
					type="number"
					:inputBorder="false"
					trim
					:placeholder="rules.doctorphone.rules[0].errorMessage"
				/>
			</uni-forms-item>

			<!-- 就诊时间 -->
			<uni-forms-item :label="rules.doctortime.label" name="doctortime">
				<picker @change="bindPickerChange" :value="doctortimeIndex" :range="doctortimeArray" mode="multiSelector">
					<uni-easyinput
						v-model="formData.doctortime"
						:inputBorder="false"
						:placeholder="rules.doctortime.rules[0].errorMessage"
						disabled
						suffixIcon="forward"
					/>
				</picker>
			</uni-forms-item>

			<!-- 就诊项目 -->
			<view class="doctorproject">
				<view class="doctorproject_title">
					{{ rules.doctorproject.label }}
					<text>(非必填)</text>
				</view>
				<view class="doctorproject_content">
					<template v-for="(item, index) in doctorproject" :key="index">
						<view
							class="item"
							@tap="formData.doctorproject = item.text"
							:class="{ current: formData?.doctorproject === item.text }"
						>
							<image v-if="item.hot" class="hot" src="@/static/images/hot.png" mode="aspectFill"></image>
							<view class="text">{{ item.text }}</view>
						</view>
					</template>
				</view>
			</view>

			<!-- 备注 -->
			<view class="doctorproject">
				<view class="doctorproject_title">
					{{ rules.remark.label }}
					<text>(非必填)</text>
				</view>
				<view class="doctorproject_content">
					<view class="textarea" style="width: 100%;flex: none;margin-top: 30rpx;">
						<fuck-textarea v-model="formData.remark" :placeholder="rules.remark.rules[0].errorMessage"></fuck-textarea>
					</view>
				</view>
			</view>
		</uni-forms>

		<!-- 保存 -->
		<m-btn-fix-bottom :loading="btnLoading" text="立即提交" @btnClick="saveClick" />
	</view>
	
</template>

<script setup>
import { ref, computed, reactive, getCurrentInstance } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { _outpatientAppointmentMenuSave } from '@/aTemp/apis/yuyue'
import dayjs from 'dayjs'
import '@/node_modules/dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 分享 (onShareAppMessage,onShare111Timeline) 不能删,必要 https://github.com/dcloudio/uni-app/issues/3097
import useShare from '@/aTemp/mixins/useShare.js'
const shareInfo = reactive({ title: '', path: '', imageUrl: '', query: '' })
// 设置分享
useShare(shareInfo)

// 表单校验
const rules = {
	doctorname: {
		rules: [{ required: true, errorMessage: '请输入就诊人姓名' }],
		label: '就诊人'
	},
	doctorphone: {
		rules: [
			{ required: true, errorMessage: '请输入就诊人手机号' },
			{ pattern: RegExp(/^1[345789][0-9]{9}$/), errorMessage: '请输入正确的手机号' }
		],
		label: '联系方式'
	},
	doctortime: {
		rules: [{ required: true, errorMessage: '请选择就诊时间' }],
		label: '期望就诊时间'
	},
	doctorproject: {
		rules: [{ errorMessage: '请选择就诊项目' }],
		label: '就诊项目'
	},
	remark: {
		rules: [{ errorMessage: '请输入备注' }],
		label: '备注'
	}
}

const doctorproject = [
	{ text: '种植检查', hot: true },
	{ text: '标准洁牙', hot: true },
	{ text: '涂氟', hot: true },
	{ text: '十项口腔全面检查' },
	{ text: '智齿检查' },
	{ text: '龋齿检查' },
	{ text: '矫正检查' },
	{ text: '舒适洁牙' },
	{ text: '补牙' },
	{ text: '拔牙' },
	{ text: '美白' },
	{ text: '牙周治疗' },
	{ text: '根管治疗' },
	{ text: '牙体修复' },
	{ text: '活动义齿' },
	{ text: '贴面' },
	{ text: '正畸' },
	{ text: '种植' },
	{ text: '窝沟封闭' },
	{ text: '乳牙拔除' },
	{ text: '儿童补牙' },
	{ text: '儿童矫正' }
]

// 表单数据
const formData = ref({})
// 获取表单对象
const formObj = ref(null)


// 页面加载
onLoad(async optios => {
	// 等待onLaunch中放行后执行
	const { proxy } = getCurrentInstance()
	await proxy.$onLaunched

	// 设置页面分享参数
	shareInfo.title = computed(() => `${useUserMain.nickname} - 邀请您，填写预约信息`)
	// 分享图片
	shareInfo.imageUrl = `https://imgs.fenxiangzl.com/store/tooth/invitbg.png`

	// 分享到聊天框用到
	shareInfo.path = computed(
		() =>
			`/pages/main/index/index?invitationCode=${useUserMain.userid}&storeId=${useUserMain.storeId}&Mscene=7&targetId=0`
	)

	// 设置填表人
	formData.value.userid = computed(() => useUserMain.userid)

	// 判断24小时内是否提交过表单
	const yuyue = uni.getStorageSync('yuyue')
	if (Date.now() - (yuyue || 0) <= 24 * 60 * 60 * 1000) {
		uni.showModal({
			title: '提示',
			content: '已经预约成功！',
			showCancel:false,
			success: function (res) {
				if (res.confirm) {
					navigateBack()
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}
})

// 选择时间
const doctortimeIndex = ref([0, 0])
const time1 = dayjs().add(1, 'day')
const time2 = dayjs().add(2, 'day')
const time3 = dayjs().add(3, 'day')
const time4 = dayjs().add(4, 'day')
const time5 = dayjs().add(5, 'day')
const time6 = dayjs().add(6, 'day')
const time7 = dayjs().add(7, 'day')
const doctortimeArray = [
	[
		time1.format('YYYY-MM-DD [星期]dd'),
		time2.format('YYYY-MM-DD [星期]dd'),
		time3.format('YYYY-MM-DD [星期]dd'),
		time4.format('YYYY-MM-DD [星期]dd'),
		time5.format('YYYY-MM-DD [星期]dd'),
		time6.format('YYYY-MM-DD [星期]dd'),
		time7.format('YYYY-MM-DD [星期]dd')
	],
	['上午', '下午']
]

// 预约时间
formData.value.doctortime = computed(
	() => doctortimeArray[0][doctortimeIndex.value[0]] + ' ' + doctortimeArray[1][doctortimeIndex.value[1]]
)

const bindPickerChange = e => {
	doctortimeIndex.value = e.detail.value
}

/*
 * 请求后端保存接口
 */
import { _debounce } from '@/aTemp/utils/tools.js'
import { navigateBack, showToastText } from '@/aTemp/utils/uniAppTools'
const btnLoading = ref(false)
const saveClick = _debounce(
	() => {
		formObj.value
			.validate()
			.then(formRes => {
				// 保存信息接口
				_outpatientAppointmentMenuSave(formData.value).then(res => {
					btnLoading.value = false
					// 返回上一级并且重载noload
					navigateBack()
					showToastText('提交成功~')
					uni.setStorageSync('yuyue', Date.now() + 24 * 60 * 60 * 1000)
				})
			})
			.catch(err => {
				btnLoading.value = false
				console.log('表单错误信息：', err)
				showToastText(err[0].errorMessage)
			})
	},
	1000,
	btnLoading
)
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #fff;
}
:deep(.uni-forms-item) {
	margin: 0 32rpx;
	padding: 16rpx 0;
	border-bottom: 1px solid #f0f0f0;
	.uni-easyinput__content {
		text-align: right;
	}
}
:deep(.is-disabled) {
	background-color: #fff !important;
}
:deep(.uniui-forward) {
	font-size: 36rpx !important;
}
:deep(.is-disabled) {
	color: #333;
}
:deep(.uni-forms-item__error) {
	bottom: -7px;
	right: 0;
	top: auto;
	left: auto;
}

.container {
	width: 750rpx;
	.title_tips {
		background-color: #f7f7f7;
		padding: 32rpx 32rpx;
		font-size: 26rpx;
		color: #999;
	}
	.doctorproject {
		margin: 0 32rpx;
		padding-top: 40rpx;
		.doctorproject_title {
			color: #666;
			font-size: 28rpx;
			text {
				font-size: 26rpx;
				color: #aaa;
				padding-left: 10rpx;
			}
		}
		.doctorproject_content {
			@include mFlex;
			flex-wrap: wrap;
			justify-content: flex-start;
			.item {
				padding: 18rpx 30rpx;
				font-size: 28rpx;
				background-color: #efefef;
				margin-right: 20rpx;
				border-radius: 8rpx;
				margin-top: 30rpx;
				@include mFlex;
				.hot {
					width: 36rpx;
					height: 36rpx;
					margin-right: 14rpx;
				}
			}
			.current {
				background-color: $main-color;
				color: #fff;
			}
		}
	}
}
</style>
