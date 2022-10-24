<template>
	<view class="container">
		<view class="container_item" v-for="(item, index) in listData" :key="index" @tap="popupTap(item)">
			<view class="container_item_box">
				<!-- 头像 -->
				<view class="container_item_box_left">
					<image class="image" :src="item.avatar || '/static/images/default_avatar.png'" mode="aspectFill"></image>
				</view>

				<!-- 信息 -->
				<view class="container_item_box_center">
					<view class="name">{{ item.remarkname || item.nickname }}</view>
					<view class="mobile">{{ item.mobile }}</view>
				</view>

				<!-- 拨打电话 -->
				<view class="container_item_box_right" v-if="!activityShow">
					<view class="copy_mobile" @tap.stop.prevent="setClipboardData(item.mobile)">复制号码</view>
					<view class="call" @tap.stop.prevent="makePhoneCall(item.mobile)">
						<image class="image" src="/static/images/phone.png" mode="heightFix"></image>
					</view>
				</view>
			</view>
			<view class="blank32"></view>

			<!-- 活动数据分析页面显示 -->
			<view class="container_item_box2" v-if="activityShow">
				<view class="Invited item">邀请人：{{ item.ynickname }}</view>
				<view class="views item">浏览次数：{{ item.views }}</view>
				<view class="join item" v-if="item.participate === 1">已参与</view>
				<view class="unJoin item" v-else>未参与</view>
			</view>

			<!-- 会员管理页面显示 -->
			<view class="container_item_box2" v-if="!activityShow">
				<view class="source item">来源：{{ scene[item.scene] || '无' }}</view>
				<view class="Invited item">邀请人：{{ item.yname || item.rname || '无' }}</view>
				<view class="Invited item" v-if="item.ytime">{{ dayjs(item.ytime).format('YYYY年M月D日') }}</view>
			</view>
			<view class="blank32"></view>
			<view v-if="!activityShow" class="container_item_box3">
				{{ jsonToObj(item['userremark']).remarks || '点击添加备注信息' }}
			</view>
			<view
				v-if="!activityShow && (jsonToObj(item['userremark']).sex || jsonToObj(item['userremark']).age)"
				class="container_item_box4"
			>
				<view class="item"><uni-tag :text="jsonToObj(item['userremark']).sex" size="small" type="primary" /></view>
				<view class="item"><uni-tag :text="jsonToObj(item['userremark']).age" size="small" type="primary" /></view>
			</view>
		</view>
	</view>

	<!-- 弹出框 -->
	<uni-popup ref="popup" type="bottom" :safe-area="false">
		<view class="popup_box">
			<image class="close" @tap="popup.close" src="/static/images/close.png"></image>
			<uni-forms :rules="rules" ref="formObj" v-model="formData" label-width="220rpx" label-position="top">
				<!-- 备注名 -->
				<uni-forms-item :label="rules.remarkname.label" name="remarkname" label-position="top">
					<uni-easyinput
						v-model="formData.remarkname"
						:placeholder="rules.remarkname.rules[0].errorMessage"
					></uni-easyinput>
				</uni-forms-item>

				<!-- 性别 -->
				<uni-forms-item :label="rules.sex.label" name="sex">
					<uni-data-checkbox mode="tag" v-model="formData.sex" :localdata="sex"></uni-data-checkbox>
				</uni-forms-item>

				<!-- 年龄 -->
				<uni-forms-item :label="rules.age.label" name="age">
					<uni-data-checkbox mode="tag" v-model="formData.age" :localdata="age"></uni-data-checkbox>
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
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { _debounce } from '@/aTemp/utils/tools.js'
import { makePhoneCall, setClipboardData } from '@/aTemp/utils/uniAppTools.js'
import { _userUpdate } from '@/aTemp/apis/user.js'
const scene = ['直接邀请', '活动邀请', '商品邀请', '服务邀请', '海报邀请', '其他邀请']
const props = defineProps({
	activityShow: {
		type: Boolean,
		default: false
	},
	listData: {
		request: true,
		type: Array,
		default: () => []
	}
})

const jsonToObj = str => {
	try {
		return JSON.parse(str) || {}
	} catch (e) {
		return {}
	}
}

// 弹出层
const popup = ref(null)
// 表单数据
const formData = ref({})
// 获取表单对象
const formObj = ref(null)
const sex = [
	{
		text: '女性',
		value: '女性'
	},
	{
		text: '男性',
		value: '男性'
	}
]
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
]

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
}

// 当前编辑的对象
let pupItem = {}

// 弹出模态框
const popupTap = item => {
	// 保存当前编辑的对象
	pupItem = item
	// 赋值表单数据
	formData.value = {
		id: item['id'],
		remarkname: item['remarkname'],
		sex: jsonToObj(item['userremark'])['sex'],
		age: jsonToObj(item['userremark'])['age'],
		remarks: jsonToObj(item['userremark'])['remarks']
	}
	popup.value.open()
}
const loading = ref(false)
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
				}

				// console.log(pupItem)

				_userUpdate({
					id: formData.value['id'],
					remarkname: formData.value['remarkname'],
					userremark: JSON.stringify(remarks)
				}).then(res => {
					// 修改成功重新赋值当前修改对象
					pupItem['remarkname'] = formData.value['remarkname']
					pupItem['userremark'] = JSON.stringify(remarks)

					// 加载结束
					loading.value = false
				})
				// 关闭弹出框
				popup.value.close()
				loading.value = false
			})
			.catch(err => {
				loading.value = false
				showToastText(err[0].errorMessage)
				console.log('表单错误信息：', err)
			})
	},
	500,
	loading
)
</script>

<style scoped lang="scss">
.container {
	background-color: #fff;
	.container_item {
		margin-bottom: 32rpx;
		border-bottom: 1px solid $uni-border-2;
		&:last-child {
			margin-bottom: 0;
			padding-bottom: 0;
			border: none;
		}
		&_box {
			@include mFlex;
			justify-content: space-between;

			&_left {
				width: 80rpx;
				height: 80rpx;
				flex: none;
				> .image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			&_center {
				margin: 0 20rpx;
				flex: auto;
				.name {
					font-size: 28rpx;
				}
				.mobile {
					margin-top: 25rpx;
					font-size: 26rpx;
					color: #999;
				}
			}

			&_right {
				flex: none;
				width: 220rpx;
				@include mFlex;
				justify-content: space-between;
				.copy_mobile {
					border: 1px solid $main-color;
					color: $main-color;
					font-weight: bold;
					font-size: 25rpx;
					border-radius: 16rpx;
					padding: 0 20rpx;
					height: 55rpx;
					@include mFlex;
				}
				.call {
					border: 1px solid $main-color;
					border-radius: 16rpx;
					padding: 0 4rpx;
					height: 55rpx;
					@include mFlex;
					> .image {
						width: 30rpx;
						height: 38rpx;
					}
				}
			}
		}

		&_box2 {
			@include mFlex;
			justify-content: flex-start;
			> .item {
				padding: 8rpx 12rpx;
				font-size: 24rpx;
				border-radius: 6rpx;
				margin-right: 20rpx;
				color: #999999;
				background-color: #f0f0f0;
				&:last-child {
					margin-right: 0;
				}
			}
			.Invited {
				/* 	color: #fff;
				background-color: #1890ff; */
			}
			.views {
				/* color: #fff;
				background-color: #9a60b4; */
			}
			.join {
				color: #fff;
				background-color: #9a60b4;
			}
			.unJoin {
				color: #fff;
				background-color: #ee6666;
			}
		}

		&_box3 {
			padding-bottom: 32rpx;
			font-size: 26rpx;
			color: $main-color;
			@include singleLineTextOverHidden;
		}

		&_box4 {
			padding-bottom: 32rpx;
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
