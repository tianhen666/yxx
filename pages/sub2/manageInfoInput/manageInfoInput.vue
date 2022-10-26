<template>
	<view class="container">
		<view class="blank32 blank_bg_color"></view>
		<uni-forms :rules="rules" ref="formObj" v-model="formData" label-position="left" label-width="220rpx">
			<!-- 门诊标识 -->
			<uni-forms-item :label="rules.icon.label" label-position="top" name="icon">
				<htz-image-upload :max="selectNum1" v-model="picList1" mediaType="image" @chooseSuccess="chooseSuccess1" />
			</uni-forms-item>

			<!-- 门诊名称 -->
			<uni-forms-item :label="rules.name.label" name="name">
				<uni-easyinput v-model="formData.name" :placeholder="rules.name.rules[0].errorMessage" />
			</uni-forms-item>

			<!-- 门诊联系电话 -->
			<uni-forms-item :label="rules.mobile.label" name="mobile">
				<uni-easyinput type="number" v-model="formData.mobile" :placeholder="rules.mobile.rules[0].errorMessage" />
			</uni-forms-item>

			<!-- 营业时间 -->
			<uni-forms-item :label="rules.businessDt.label" label-position="top" name="businessDt">
				<view class="input_item">
					<!-- 开始时间 -->
					<picker mode="time" :value="businessDt[0]" @change="businessDt0Change">
						<uni-easyinput disabled :value="businessDt[0]" placeholder="开始时间" />
					</picker>
					<view class="center">----</view>
					<!-- 结束时间 -->
					<picker mode="time" :value="businessDt[1]" @change="businessDt1Change">
						<uni-easyinput disabled :value="businessDt[1]" placeholder="结束时间" />
					</picker>
				</view>
			</uni-forms-item>

			<!-- 客服微信 -->
			<uni-forms-item :label="rules.customer.label" label-position="top" name="customer">
				<htz-image-upload :max="selectNum2" v-model="picList2" mediaType="image" @chooseSuccess="chooseSuccess2" />
			</uni-forms-item>

			<!-- 所在区域 -->
			<uni-forms-item :label="rules.address.label" name="address">
				<uni-easyinput
					v-model="formData.address"
					@focus="MchooseLocation"
					@clear="MchooseLocation"
					:placeholder="rules.address.rules[0].errorMessage"
				/>
			</uni-forms-item>

			<!-- 详情地址 -->
			<uni-forms-item :label="rules.addressDetail.label" name="addressDetail">
				<uni-easyinput
					v-model="formData.addressDetail"
					@focus="MchooseLocation"
					@clear="MchooseLocation"
					:placeholder="rules.addressDetail.rules[0].errorMessage"
				/>
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 门诊介绍 -->
			<uni-forms-item :label="rules.descData.label" label-position="top" name="descData">
				<fuck-textarea :placeholder="rules.descData.rules[0].errorMessage" v-model="formData.descData" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 门头照片 -->
			<uni-forms-item :label="rules.pics.label" label-position="top" name="pics">
				<htz-image-upload :max="selectNum5" v-model="picList5" mediaType="image" @chooseSuccess="chooseSuccess5" />
			</uni-forms-item>

			<!-- 店内环境图 -->
			<uni-forms-item :label="rules.innerPics.label" label-position="top" name="innerPics">
				<htz-image-upload :max="selectNum4" v-model="picList4" mediaType="image" @chooseSuccess="chooseSuccess4" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 店铺分享图 -->
			<uni-forms-item :label="rules.sharePic.label" label-position="top" name="sharePic">
				<htz-image-upload :max="selectNum3" v-model="picList3" mediaType="image" @chooseSuccess="chooseSuccess3" />
			</uni-forms-item>
		</uni-forms>

		<!-- 保存信息 -->
		<m-btn-fix-bottom :loading="btnLoading" text="保存信息" @btnClick="saveClick" />
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { _storeSave, _storeGetinfo } from '@/aTemp/apis/store.js'
import { chooseLocation } from '@/aTemp/utils/uniAppTools.js'
// 表单数据
const formData = ref({
	businessDt: '08:00,18:00'
})
// 获取表单对象
const formObj = ref(null)
// 加载中
const loading = ref(true)

// 页面开始加载
onLoad(optios => {
	// 拉取数据
	_storeGetinfo().then(res => {
		const { data } = res
		// 数据赋值
		formData.value = data || {}

		// 如果为空设置为默认值
		if (!formData.value.businessDt) {
			formData.value.businessDt = '08:00,23:00'
		}
		// 加载结束
		loading.value = false
	})
})

// 表单校验
const rules = {
	icon: {
		rules: [{ required: true, errorMessage: '上传门诊标识' }],
		label: '门诊标识'
	},
	name: {
		rules: [{ required: true, errorMessage: '请输入门诊名称' }],
		label: '门诊名称'
	},
	mobile: {
		rules: [{ required: true, errorMessage: '请输入联系电话' }],
		label: '联系电话'
	},
	businessDt: {
		rules: [{ required: true, errorMessage: '请输入营业时间' }],
		label: '营业时间'
	},
	address: {
		rules: [{ required: true, errorMessage: '请输入所在区域' }],
		label: '所在区域'
	},
	addressDetail: {
		rules: [{ required: true, errorMessage: '请输入详情地址' }],
		label: '详情地址'
	},
	sharePic: {
		rules: [{ errorMessage: '请上传店铺分享图' }],
		label: '店铺分享图'
	},
	descData: {
		rules: [{ required: true, errorMessage: '请选择门诊介绍' }],
		label: '门诊介绍'
	},
	customer: {
		rules: [{ errorMessage: '请上传客服微信' }],
		label: '客服微信'
	},
	pics: {
		rules: [{ required: true, errorMessage: '请上传门头照片' }],
		label: '门头照片'
	},
	innerPics: {
		rules: [{ required: true, errorMessage: '请上传店内环境图' }],
		label: '店内环境图'
	}
}

/*
 * 营业时间修改
 */
// 营业时间
const businessDt = computed(() => (formData.value.businessDt ? formData.value.businessDt.split(',') : []))
const businessDt0Change = e => {
	formData.value.businessDt = `${e.detail.value},${businessDt.value[1] || ''}`
}
const businessDt1Change = e => {
	formData.value.businessDt = `${businessDt.value[0] || ''},${e.detail.value}`
}

/*
 * 选择地址
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

/*
 * 保存banenr信息功能
 * 组合式函数引入
 */
import useSaveApi from '@/aTemp/mixins/useSaveApi.js'
const { saveClick, btnLoading } = useSaveApi(formObj, formData, _storeSave)

/*
 * 图片选择功能
 * 组合式函数引入
 */
import useHtzImageUpload from '@/aTemp/mixins/useHtzImageUpload.js'

// 门诊标识上传
const { chooseSuccess: chooseSuccess1, picList: picList1, selectNum: selectNum1 } = useHtzImageUpload({
	ratio: 1 / 1,
	url: '/upload-flv/uploadimage',
	refData: formData,
	param: 'icon',
	selectNum: 1,
	baseDir: 'store_logo'
})

// 客服微信图片上传
const { chooseSuccess: chooseSuccess2, picList: picList2, selectNum: selectNum2 } = useHtzImageUpload({
	ratio: 1 / 1,
	url: '/upload-flv/uploadimage',
	refData: formData,
	param: 'customer',
	selectNum: 1,
	baseDir: 'store_kfwx'
})

// 客服微信图片上传
const { chooseSuccess: chooseSuccess3, picList: picList3, selectNum: selectNum3 } = useHtzImageUpload({
	ratio: 5 / 4,
	url: '/upload-flv/uploadimage',
	refData: formData,
	param: 'sharePic',
	selectNum: 1,
	baseDir: 'store'
})

// 店内环境图上传
const { chooseSuccess: chooseSuccess4, picList: picList4, selectNum: selectNum4 } = useHtzImageUpload({
	ratio: 5 / 3,
	url: '/upload-flv/uploadimage',
	refData: formData,
	param: 'innerPics',
	selectNum: 8,
	baseDir: 'store'
})

// 店内环境图上传
const { chooseSuccess: chooseSuccess5, picList: picList5, selectNum: selectNum5 } = useHtzImageUpload({
	ratio: 4 / 3,
	url: '/upload-flv/uploadimage',
	refData: formData,
	param: 'pics',
	selectNum: 1,
	baseDir: 'store'
})
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #fff;
}
.container {
	width: 750rpx;
}
.input_item {
	@include mFlex;
	font-size: 32rpx;
	color: #606266;
	> .center {
		width: 160rpx;
		flex: none;
		text-align: center;
	}
	:deep(.is-disabled) {
		background-color: #fff !important;
		color: #606266 !important;
	}
}
</style>
