<template>
	<view class="container">
		<view class="blank32 blank_bg_color"></view>
		<uni-forms :rules="rules" ref="formObj" v-model="formData" label-position="left" label-width="220rpx">
			<!-- 案例分类 -->
			<uni-forms-item :label="rules.categoryId.label" name="categoryId">
				<uni-data-select
					v-model="formData.categoryId"
					:localdata="categoryOption"
					:placeholder="rules.categoryId.rules[0].errorMessage"
				></uni-data-select>
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 案例封面图 -->
			<uni-forms-item :label="rules.mainPic.label" label-position="top" name="mainPic">
				<htz-image-upload :max="selectNum1" v-model="picList1" mediaType="image" @chooseSuccess="chooseSuccess1" />
			</uni-forms-item>

			<!-- 案例标题 -->
			<uni-forms-item :label="rules.title.label" name="title">
				<uni-easyinput v-model="formData.title" :placeholder="rules.title.rules[0].errorMessage" />
			</uni-forms-item>

			<!-- 开始时间 -->
			<uni-forms-item :label="rules.startDt.label" name="startDt">
				<uni-datetime-picker
					:end="Date.now()"
					:placeholder="rules.startDt.rules[0].errorMessage"
					type="date"
					:clearIcon="false"
					v-model="formData.startDt"
				/>
			</uni-forms-item>

			<!-- 结束时间 -->
			<uni-forms-item :label="rules.endDt.label" name="endDt">
				<uni-datetime-picker
					:end="Date.now()"
					:placeholder="rules.endDt.rules[0].errorMessage"
					type="date"
					:clearIcon="false"
					v-model="formData.endDt"
				/>
			</uni-forms-item>

			<!-- 案例详情 -->
			<uni-forms-item :label="rules.detail.label" label-position="top" name="detail">
				<fuck-textarea :placeholder="rules.detail.rules[0].errorMessage" v-model="formData.detail" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 治疗前描述 -->
			<uni-forms-item :label="rules.beforeDesc.label" label-position="top" name="beforeDesc">
				<fuck-textarea :placeholder="rules.beforeDesc.rules[0].errorMessage" v-model="formData.beforeDesc" />
			</uni-forms-item>

			<!-- 治疗前图片 -->
			<uni-forms-item :label="rules.beforePics.label" label-position="top" name="beforePics">
				<htz-image-upload :max="selectNum3" v-model="picList3" mediaType="image" @chooseSuccess="chooseSuccess3" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 治疗后描述 -->
			<uni-forms-item :label="rules.afterDesc.label" label-position="top" name="afterDesc">
				<fuck-textarea :placeholder="rules.afterDesc.rules[0].errorMessage" v-model="formData.afterDesc" />
			</uni-forms-item>

			<!-- 治疗后图片 -->
			<uni-forms-item :label="rules.afterPics.label" label-position="top" name="afterPics">
				<htz-image-upload :max="selectNum4" v-model="picList4" mediaType="image" @chooseSuccess="chooseSuccess4" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 患者自评 -->
			<!-- <uni-forms-item :label="rules.evaluationDesc.label" label-position="top" name="evaluationDesc">
				<fuck-textarea :placeholder="rules.evaluationDesc.rules[0].errorMessage" v-model="formData.evaluationDesc" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view> -->
			
			<!-- 分享图 -->
			<uni-forms-item :label="rules.sharePic.label" label-position="top" name="sharePic">
				<htz-image-upload :max="selectNum2" v-model="picList2" mediaType="image" @chooseSuccess="chooseSuccess2" />
			</uni-forms-item>
			
		</uni-forms>
		
		<!-- 保存信息 -->
		<m-btn-fix-bottom :loading="loading" text="保存信息" @btnClick="saveClick" />
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { _storecaseSave, _storecaseGetinfo, _storecaseFlist } from '@/aTemp/apis/case'
import dayjs from 'dayjs'

// 分类数据
const categoryOption = ref([])

// 数据ID
const dataId = ref(0)
// 表单数据
const formData = ref({
	startDt: dayjs(Date.now() - 30 * 24 * 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss'), //开始时间,默认值
	endDt: dayjs().format('YYYY-MM-DD HH:mm:ss') //结束时间默认值
})
// 获取表单对象
const formObj = ref(null)

// 页面开始加载
onLoad(async optios => {
	dataId.value = parseInt(optios.id) || 0

	// 获取案例分类
	await _storecaseFlist().then(res => {
		const { data } = res
		if (Array.isArray(data)) {
			data.forEach((item, index, array) => {
				categoryOption.value.push({
					value: item.id,
					text: item.name
				})
			})
		}
	})

	// 是否存在数据ID
	if (dataId.value > 0) {
		// 拉取数据
		_storecaseGetinfo({ id: dataId.value }).then(res => {
			const { data } = res
			// 数据赋值
			formData.value = data
		})
	}
})

// 表单校验
const rules = {
	title: {
		rules: [{ required: true, errorMessage: '请输入案例标题' }],
		label: '案例标题'
	},
	startDt: {
		rules: [{ required: true, errorMessage: '请输入治疗开始时间' }],
		label: '开始时间'
	},
	mainPic: {
		rules: [{ required: true, errorMessage: '请上传案例封面图' }],
		label: '案例封面图'
	},
	endDt: {
		rules: [{ required: true, errorMessage: '请输入治疗结束时间' }],
		label: '结束时间'
	},
	detail: {
		rules: [{ required: true, errorMessage: '请输入案例详情' }],
		label: '案例详情'
	},
	sharePic: {
		rules: [{ errorMessage: '请上传分享图' }],
		label: '分享图'
	},
	categoryId: {
		rules: [{ required: true, errorMessage: '请选择案例分类' }],
		label: '案例分类'
	},
	beforePics: {
		rules: [{ required: true, errorMessage: '请上传治疗前图片' }],
		label: '治疗前图片'
	},
	beforeDesc: {
		rules: [{ required: true, errorMessage: '请输入治疗前描述' }],
		label: '治疗前描述'
	},
	afterPics: {
		rules: [{ required: true, errorMessage: '请上传治疗后图片' }],
		label: '治疗后图片'
	},
	afterDesc: {
		rules: [{ required: true, errorMessage: '请输入治疗后描述' }],
		label: '治疗后描述'
	},
	// evaluationDesc: {
	// 	rules: [{ errorMessage: '请输入患者自评' }],
	// 	label: '患者自评'
	// }
}

/*
 * 保存banenr信息功能
 * 组合式函数引入
 */
import useSaveApi from '@/aTemp/mixins/useSaveApi.js'
const { saveClick, loading } = useSaveApi(formObj, formData, _storecaseSave)

/*
 * 图片选择功能
 * 组合式函数引入
 */
import useHtzImageUpload from '@/aTemp/mixins/useHtzImageUpload.js'

// 案例封面图片上传
const { chooseSuccess: chooseSuccess1, picList: picList1, selectNum: selectNum1 } = useHtzImageUpload({
	ratio: 2 / 1,
	url: '/enrollform/uploadimage',
	refData: formData,
	param: 'mainPic',
	selectNum: 1,
	baseDir: 'case'
})

// 分享图片上传
const { chooseSuccess: chooseSuccess2, picList: picList2, selectNum: selectNum2 } = useHtzImageUpload({
	ratio: 5 / 4,
	url: '/enrollform/uploadimage',
	refData: formData,
	param: 'sharePic',
	selectNum: 1,
	baseDir: 'case'
})

// 案例治疗前图片上传
const { chooseSuccess: chooseSuccess3, picList: picList3, selectNum: selectNum3 } = useHtzImageUpload({
	ratio: 5 / 3,
	url: '/enrollform/uploadimage',
	refData: formData,
	param: 'beforePics',
	selectNum: 5,
	baseDir: 'case'
})

// 案例治疗后图片上传
const { chooseSuccess: chooseSuccess4, picList: picList4, selectNum: selectNum4 } = useHtzImageUpload({
	ratio: 5 / 3,
	url: '/enrollform/uploadimage',
	refData: formData,
	param: 'afterPics',
	selectNum: 5,
	baseDir: 'case'
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
