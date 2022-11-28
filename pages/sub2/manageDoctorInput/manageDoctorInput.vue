<template>
	<view class="container">
		<uni-forms :rules="rules" ref="formObj" v-model="formData" label-position="left" label-width="220rpx">
			<view class="blank32 blank_bg_color"></view>

			<!-- 医生姓名 -->
			<uni-forms-item :label="rules.name.label" name="name">
				<uni-easyinput v-model="formData.name" :placeholder="rules.name.rules[0].errorMessage" />
			</uni-forms-item>

			<!-- 医生照片 -->
			<uni-forms-item :label="rules.avatar.label" name="avatar" label-position="top">
				<htz-image-upload :max="selectNum1" v-model="picList1" mediaType="image" @chooseSuccess="chooseSuccess1" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 医生职务 -->
			<uni-forms-item :label="rules.post.label" name="post">
				<uni-easyinput v-model="formData.post" :placeholder="rules.post.rules[0].errorMessage" />
			</uni-forms-item>

			<!-- 医生简介 -->
			<uni-forms-item :label="rules.descData.label" name="descData" label-position="top">
				<fuck-textarea v-model="formData.descData" :placeholder="rules.descData.rules[0].errorMessage"/>
			</uni-forms-item>

			<!-- 医生详情 -->
			<uni-forms-item :label="rules.detail.label" name="detail" label-position="top">
				<htz-image-upload
					:max="selectNum2"
					v-model="picList2"
					mediaType="image"
					:formData="{baseDir:baseDir2}"
					:action="uploadimageURL2"
					@uploadSuccess="uploadSuccess2"
					
				/>
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 排序 -->
			<uni-forms-item :label="rules.sort.label" name="sort">
				<uni-number-box :min="1" :max="255" v-model="formData.sort" />
			</uni-forms-item>
		</uni-forms>

		<!-- 保存 -->
		<m-btn-fix-bottom :loading="loading" text="立即提交" @btnClick="saveClick" />
	</view>
</template>

<script setup>
import { toRefs, ref, watch } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { _storedoctorSave, _storedoctorGetinfo } from '@/aTemp/apis/doctor.js'

// 表单校验
const rules = {
	name: {
		rules: [{ required: true, errorMessage: '请输入医生姓名' }],
		label: '医生姓名'
	},
	avatar: {
		rules: [{ required: true, errorMessage: '请上传医生照片' }],
		label: '医生照片'
	},
	post: {
		rules: [{ required: true, errorMessage: '请输入医生职务' }],
		label: '医生职务'
	},
	descData: {
		rules: [{ required: true, errorMessage: '请输入医生简介' }],
		label: '医生简介'
	},
	detail: {
		rules: [{ errorMessage: '请输入医生简介' }],
		label: '医生详情'
	},
	sort: {
		rules: [{ required: true, errorMessage: '请输入序号' }],
		label: '排序'
	}
}

// 数据ID
const dataId = ref(0)
// 表单数据
const formData = ref({})
// 获取表单对象
const formObj = ref(null)

// 页面加载
onLoad(optios => {
	dataId.value = parseInt(optios.id)
	// 是否存在dataId
	if (dataId.value > 0) {
		// 拉取数据
		_storedoctorGetinfo({ id: dataId.value }).then(res => {
			const { data } = res
			formData.value = data
		})
	}
})

/*
 * 保存信息功能
 * 组合式函数引入
 */
import useSaveApi from '@/aTemp/mixins/useSaveApi.js'
const { saveClick, loading } = useSaveApi(formObj, formData, _storedoctorSave)

/*
 * 图片选择功能
 * 组合式函数引入
 */
import useHtzImageUpload from '@/aTemp/mixins/useHtzImageUpload.js'

// 医生图片上传
const { chooseSuccess: chooseSuccess1, picList: picList1, selectNum: selectNum1 } = useHtzImageUpload({
	ratio: 1,
	url: '/upload-flv/uploadimage',
	refData: formData,
	param: 'avatar',
	selectNum: 5,
	baseDir: 'doctor'
})

// 详情图片上传
const {
	uploadSuccess: uploadSuccess2,
	picList: picList2,
	selectNum: selectNum2,
	uploadimageURL: uploadimageURL2,
	baseDir: baseDir2
} = useHtzImageUpload({
	url: '/upload-flv/uploadimage',
	refData: formData,
	param: 'detail',
	selectNum: 4,
	baseDir: 'doctor'
})
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #fff;
}
.container {
	width: 750rpx;
}
</style>
