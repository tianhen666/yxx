<template>
	<view class="container">
		<view class="blank32"></view>
		<view class="box1 box">
			<view class="box1_item" v-for="(item, index) in listData" :key="index" @tap="popupTap(item)">
				<view class="box1_item_left">
					<image class="image" src="/static/default/tup4.jpg" mode="aspectFill"></image>
				</view>
				<view class="box1_item_center">
					<view class="box1_item_center_box1">
						<text>{{ item.remarkName || item.name }}</text>
						<text class="text" v-if="item.remarkName">{{ item.name }}</text>
					</view>
					<view class="box1_item_center_box2">
						<uni-tag
							v-if="item.power.length > 0"
							v-for="(sub, index) in item.power"
							:key="index"
							size="small"
							:inverted="true"
							:text="optionPower[sub].text"
							type="primary"
						/>
						<text class="text" v-else>暂无权限</text>
					</view>
				</view>
				<view class="box1_item_right"><button class="box1_item_right_btn">员工设置</button></view>
			</view>
		</view>

		<!-- 弹出框 -->
		<uni-popup ref="popup" type="center" :safe-area="false" :is-mask-click="false">
			<view class="popup_box">
				<image class="close" @tap="popup.close" src="/static/default/close.png"></image>
				<uni-forms :rules="rules" ref="formObj" v-model="formData" label-width="220rpx" label-position="top">
					<!-- 员工备注 -->
					<uni-forms-item :label="rules.remarkName.label" name="remarkName" label-position="top">
						<uni-easyinput
							v-model="formData.remarkName"
							:placeholder="rules.remarkName.rules[0].errorMessage"
						></uni-easyinput>
					</uni-forms-item>
					<!-- 权限设置 -->
					<uni-forms-item :label="rules.power.label" name="power" label-position="top">
						<uni-data-checkbox
							multiple
							mode="button"
							v-model="formData.power"
							:localdata="optionPower"
						></uni-data-checkbox>
					</uni-forms-item>
				</uni-forms>

				<view class="btn">
					<button class="btn_item style1" :loading="loading2" @tap="deleteClick">移除</button>
					<button class="btn_item" :loading="loading1" @tap="saveClick">保存</button>
				</view>
			</view>
		</uni-popup>
		<view class="blank40"></view>
		<view class="blank40"></view>
		<view class="blank40"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { _debounce } from '@/aTemp/utils/tools.js'
import { _userList } from '@/aTemp/apis/user.js'
import { onLoad } from '@dcloudio/uni-app'

// 获取用户列表
const getUserList = () => {
	_userList().then(res => {})
}

onLoad(options => {
	console.log(options)
	getUserList()
})
// 数据列表
const listData = ref([
	{
		power: [],
		name: '天痕',
		remarkName: '姓名一'
	},
	{
		power: [],
		name: '天痕',
		remarkName: '姓名一'
	},
	{
		power: [],
		name: '天痕',
		remarkName: '姓名一'
	},
	{
		power: [],
		name: '天痕',
		remarkName: '姓名一'
	}
])

// 表单校验
const rules = {
	remarkName: {
		rules: [{ required: true, errorMessage: '请输入姓名备注' }],
		label: '姓名备注'
	},
	power: {
		rules: [{ required: true, errorMessage: '请选择权限信息' }],
		label: '配置权限'
	}
}
// 权限数据
const optionPower = [{ value: 0, text: '篮球' }, { value: 1, text: '足球' }, { value: 2, text: '游泳' }]

// 弹出层
const popup = ref(null)
// 表单数据
const formData = ref({})
// 获取表单对象
const formObj = ref(null)
// 加载中1
const loading1 = ref(false)
// 加载中2
const loading2 = ref(false)

const popupTap = item => {
	formData.value = item
	popup.value.open()
}

const deleteClick = _debounce(
	() => {
		// _apiSave(dataObj.value).then(res => {
		// 	loading.value = false
		// })
		// 关闭弹出框
		popup.value.close()
		loading2.value = false
	},
	500,
	loading2
)
const saveClick = _debounce(
	() => {
		formObj.value
			.validate()
			.then(formRes => {
				// _apiSave(dataObj.value).then(res => {
				// 	loading.value = false
				// })
				// 关闭弹出框
				popup.value.close()
				loading1.value = false
			})
			.catch(err => {
				loading1.value = false
				showToastText(err[0].errorMessage)
				console.log('表单错误信息：', err)
			})
	},
	500,
	loading1
)
</script>

<style lang="scss" scoped>
.container {
	.box {
		padding: $padding;
		background-color: #ffffff;
		width: $main-width;
		margin: auto;
		border-radius: 16rpx;
	}
	.box1 {
		&_item {
			@include mFlex;
			justify-content: space-between;
			padding-bottom: 32rpx;
			margin-bottom: 32rpx;
			border-bottom: 1px solid $uni-border-3;
			&:last-child {
				border: none;
				margin-bottom: 0;
				padding-bottom: 0;
			}
			&_left {
				float: none;
				.image {
					height: 90rpx;
					width: 90rpx;
					border-radius: 50%;
				}
			}
			&_center {
				flex: auto;
				padding-left: 20rpx;
				&_box1 {
					font-size: 32rpx;
					.text {
						font-size: 25rpx;
						color: #999;
						padding-left: 10rpx;
					}
				}
				&_box2 {
					margin-top: 20rpx;
					:deep(.uni-tag) {
						margin-right: 10rpx;
					}
					.text {
						color: #999;
						font-size: 26rpx;
					}
				}
			}
			&_right {
				flex: none;
				&_btn {
					font-size: 24rpx;
					color: #ffffff;
					background-color: $main-color;
					line-height: 2.4;
				}
			}
		}
	}

	.popup_box {
		position: relative;
		background-color: #fff;
		overflow: hidden;
		border-radius: 16rpx;
		width: 750rpx * 0.8;
		margin: auto;
		.btn {
			@include mFlex;
			justify-content: space-between;
			margin: 32rpx;
			margin-top: 10rpx;
			&_item {
				margin: 0;
				font-size: 30rpx;
				line-height: 2.2;
				color: #fff;
				background-color: $main-color;
				width: 240rpx;
			}
			> .style1 {
				background-color: $sub-color;
			}
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
}
</style>
