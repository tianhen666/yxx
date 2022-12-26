<template>
	<view class="container">
		<view class="blank32"></view>

		<view class="box1 box">
			<view class="box1_item" v-for="(item, index) in listData" :key="index">
				<view class="box1_item_left">
					<image class="image" :src="item.avatar || '/static/images/default_avatar.png'" mode="aspectFill"></image>
				</view>
				<view class="box1_item_center">
					<view class="box1_item_center_box1">
						<text>{{ item.remarkname || item.nickname || '微信用户' }}</text>
						<text class="text" v-if="item.remarkname">{{ item.nickname || '微信用户' }}</text>
					</view>
					<view class="box1_item_center_box2">
						<uni-tag
							v-if="item.power"
							size="small"
							:inverted="true"
							:text="optionPower[item.power - 1].text"
							type="primary"
						/>
						<text class="text" v-else>暂无权限</text>
					</view>
				</view>
				<view class="box1_item_right">
					<button
						class="box1_item_right_btn"
						v-if="item.power !== 1 && (useUserMain.power === 1 || useUserMain.power === 2)"
						@tap="popupTap(item, index)"
					>
						员工设置
					</button>
				</view>
			</view>
		</view>

		<!-- 弹出框 -->
		<uni-popup ref="popup" type="center" :safe-area="false" :is-mask-click="false">
			<view class="popup_box">
				<image class="close" @tap="popupClose" src="/static/images/close.png"></image>
				<uni-forms :rules="rules" ref="formObj" v-model="formData" label-width="220rpx" label-position="top">
					<!-- 员工备注 -->
					<uni-forms-item :label="rules.remarkname.label" name="remarkname" label-position="top">
						<uni-easyinput
							v-model="formData.remarkname"
							:placeholder="rules.remarkname.rules[0].errorMessage"
						></uni-easyinput>
					</uni-forms-item>
					<!-- 权限设置 -->
					<uni-forms-item :label="rules.power.label" name="power" label-position="top">
						<uni-data-checkbox
							mode="button"
							v-model="formData.power"
							:localdata="optionPower"
							@change="setUserPower"
						></uni-data-checkbox>
					</uni-forms-item>
				</uni-forms>

				<view class="btn">
					<button class="btn_item style1" :loading="loading2" @tap="deleteClick">移除</button>
					<button class="btn_item" :loading="loading1" @tap="saveClick">保存</button>
				</view>
			</view>
		</uni-popup>

		<!-- 邀请新员工 -->
		<view class="fix">
			<view class="fix_warpper"><button class="btn" open-type="share">邀请新员工</button></view>
		</view>

		<view class="blank40"></view>
		<view class="blank40"></view>
	</view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { _debounce } from '@/aTemp/utils/tools.js'
import { _userList, _userUpdate, _userDelete, _userPower } from '@/aTemp/apis/user.js'
import { _storeGetinfo } from '@/aTemp/apis/store.js'
import { onLoad } from '@dcloudio/uni-app'
import { showToastText, showModal } from '@/aTemp/utils/uniAppTools.js'

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js'
const useUserMain = _useUserMain()

// 分享 (onShareAppMessage,onShare1111111Timeline) 不能删,必要 https://github.com/dcloudio/uni-app/issues/3097
import useShare from '@/aTemp/mixins/useShare.js'
const shareInfo = reactive({ title: '', path: '', imageUrl: '', query: '' })
// 设置分享
useShare(shareInfo)

//  设置分享参数
onLoad(options => {
	// 获取店铺信息
	_storeGetinfo().then(res => {
		const { code, msg, data } = res
		shareInfo.title = computed(() => `${useUserMain.nickname}-邀请您加入【${data.name}】`)
		shareInfo.path = computed(
			() =>
				`/pages/main/index/index?invitationCode=${useUserMain.userid}&storeId=${
					useUserMain.storeId
				}&Mscene=5&targetId=0`
		)
		shareInfo.imageUrl = `https://imgs.fenxiangzl.com/store/tooth/invitbg.png`
	})
})

// 数据列表
const listData = ref([])

// 获取用户列表
const getUserList = () => {
	_userList().then(res => {
		const { code, data, msg } = res
		listData.value = data
	})
}

onLoad(options => {
	// console.log(options)
	getUserList()
})

// 表单校验
const rules = {
	remarkname: {
		rules: [{ errorMessage: '请输入姓名备注' }],
		label: '姓名备注'
	},
	power: {
		rules: [{ required: true, errorMessage: '请选择权限信息' }],
		label: '配置权限'
	}
}
// 权限数据
const optionPower = [
	{ value: 1, text: '创建者', disable: true, des: '创建者, 拥有全部权限' },
	{ value: 2, text: '管理员', des: '管理员, 拥有全部权限' },
	{ value: 3, text: '商品管理', des: '商品管理, 拥有商品管理权限' },
	{ value: 4, text: '活动管理', des: '活动管理, 拥有活动管理权限' },
	{ value: 5, text: '订单核销', des: '订单核销, 拥有订单核销权限' },
	{ value: 0, text: '无权限', des: '没有任何权限' }
]

// 弹出层
const popup = ref(null)
// 表单数据
const formData = ref({})
// 当前修改的列表索引
const currentListDataIndex = ref('')
// 获取表单对象
const formObj = ref(null)
// 加载中1
const loading1 = ref(false)

// 弹出弹框
const popupTap = (item, index) => {
	formData.value = JSON.parse(JSON.stringify(item))
	currentListDataIndex.value = index
	popup.value.open()
}

// 关闭弹框
const popupClose = () => {
	popup.value.close()
	// 重新获取员工列表
	// getUserList()
}

// 加载中2
const loading2 = ref(false)
// 移除员工
const deleteClick = () => {
	showModal('确定移除吗？').then(res => {
		if (res.confirm) {
			loading2.value = true
			_userDelete({
				id: formData.value.id
			}).then(res => {
				// 关闭弹出框
				popup.value.close()
				loading2.value = false

				// 移除列表中的元素
				listData.value.splice(currentListDataIndex.value, 1)
			})
		}
	})
}

// 保存备注信息
const saveClick = _debounce(
	() => {
		formObj.value
			.validate()
			.then(formRes => {
				_userUpdate(formData.value).then(res => {
					listData.value[currentListDataIndex.value] = JSON.parse(JSON.stringify(formData.value))
					// 关闭弹出框
					popup.value.close()
					loading1.value = false
				})
			})
			.catch(err => {
				// console.log('表单错误信息：', err)
				loading1.value = false
				showToastText(err[0].errorMessage)
			})
	},
	500,
	loading1
)

// 修改权限
const setUserPower = e => {
	let powerId = e.detail.data.value
	_userPower({ power: powerId, userId: formData.value.id }).then(res => {
		// 修改成功重新赋值
		listData.value[currentListDataIndex.value].power = formData.value.power
	})
}
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
			border-bottom: 1px solid $uni-border-2;
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

	.fix {
		padding-top: 40rpx;
		padding-bottom: 90rpx;
		height: 92rpx;
		box-sizing: content-box;
		.fix_warpper {
			position: fixed;
			z-index: 77;
			width: 100%;
			left: 0;
			bottom: 0;
			padding-bottom: 90rpx;
			> .btn {
				width: $main-width;
				border-radius: 16rpx;
				margin: auto;
				font-size: 32rpx;
				height: 92rpx;
				line-height: 92rpx;
				color: #ffffff;
				background-color: $main-color;
			}
		}
	}
}
</style>
