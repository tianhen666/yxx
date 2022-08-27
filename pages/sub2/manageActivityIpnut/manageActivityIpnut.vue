<template>
	<view class="container">
		<view class="blank32 blank_bg_color"></view>
		<uni-forms :rules="rules" ref="formObj" :model="formData" label-position="left" label-width="220rpx">
			<!-- 活动封面图上传 -->
			<uni-forms-item :label="rules.mainPic.label" label-position="top" name="mainPic">
				<htz-image-upload :max="selectNum1" v-model="picList1" mediaType="image" @chooseSuccess="chooseSuccess1" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 开始时间 -->
			<uni-forms-item :label="rules.startDt.label" name="startDt">
				<uni-datetime-picker
					:start="Date.now()"
					:placeholder="rules.startDt.rules[0].errorMessage"
					type="datetime"
					:clearIcon="false"
					v-model="formData.startDt"
				/>
			</uni-forms-item>

			<!-- 结束时间 -->
			<uni-forms-item :label="rules.endDt.label" name="endDt">
				<uni-datetime-picker
					:start="Date.now()"
					:placeholder="rules.endDt.rules[0].errorMessage"
					type="datetime"
					:clearIcon="false"
					v-model="formData.endDt"
				/>
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 活动标题 -->
			<uni-forms-item :label="rules.title.label" name="title">
				<uni-easyinput v-model="formData.title" :placeholder="rules.title.rules[0].errorMessage" />
			</uni-forms-item>

			<!-- 活动类型 -->
			<uni-forms-item :label="rules.type.label" name="type">
				<uni-data-checkbox v-model="formData.type" :localdata="type"></uni-data-checkbox>
			</uni-forms-item>

			<!-- 活动数量 -->
			<uni-forms-item v-if="formData.type !== 0" :label="rules.quantity.label" name="quantity">
				<uni-number-box :min="1" :step="10" :max="10000" v-model="formData.quantity" />
			</uni-forms-item>

			<!-- 活动价格 -->
			<uni-forms-item v-if="formData.type !== 0" :label="type[formData.type].text + rules.price.label" name="price">
				<uni-easyinput
					type="digit"
					v-model="formData.price"
					:placeholder="rules.price.rules[0].errorMessage.replace('%', type[formData.type].text)"
				/>
			</uni-forms-item>

			<!-- 分佣价格 -->
			<uni-forms-item v-if="formData.type === 1" :label="rules.sharePrice.label" name="sharePrice">
				<uni-easyinput
					type="digit"
					v-model="formData.sharePrice"
					:placeholder="rules.sharePrice.rules[0].errorMessage"
				/>
			</uni-forms-item>

			<!-- 前端是否显示分佣价格 -->
			<uni-forms-item v-if="formData.type === 1" :label="rules.showShare.label" name="showShare">
				<switch
					color="#4b8eff"
					:checked="parseInt(formData.showShare) === 0"
					style="transform:scale(0.8)"
					@change="formData.showShare === 1 ? 0 : 1"
				/>
			</uni-forms-item>

			<!-- 拼团单独购买价 -->
			<uni-forms-item v-if="formData.type === 2" :label="rules.alonePrice.label" name="alonePrice">
				<uni-easyinput
					type="digit"
					v-model="formData.alonePrice"
					:placeholder="rules.alonePrice.rules[0].errorMessage"
				/>
			</uni-forms-item>

			<!-- 最低拼团人数 -->
			<uni-forms-item v-if="formData.type === 2" :label="rules.least.label" name="least">
				<uni-number-box :min="2" :step="1" :max="10" v-model="formData.least" />
			</uni-forms-item>

			<!-- 是否限购 -->
			<uni-forms-item label="是否限购" v-if="formData.type !== 0">
				<switch
					color="#4b8eff"
					:checked="parseInt(formData.limitCount) > 0"
					style="transform:scale(0.8)"
					@change="formData.limitCount = parseInt(formData.limitCount) > 0 ? 0 : 1"
				/>
			</uni-forms-item>

			<!-- 限购数量 -->
			<uni-forms-item
				:label="rules.limitCount.label"
				name="limitCount"
				v-if="parseInt(formData.limitCount) > 0 && formData.type !== 0"
			>
				<uni-number-box :min="1" :max="255" v-model="formData.limitCount" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 排序 -->
			<uni-forms-item :label="rules.sort.label" name="sort">
				<uni-number-box :min="1" :max="255" v-model="formData.sort" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 活动分享图 -->
			<uni-forms-item :label="rules.sharePic.label" label-position="top" name="sharePic">
				<htz-image-upload :max="selectNum2" v-model="picList2" mediaType="image" @chooseSuccess="chooseSuccess2" />
			</uni-forms-item>

			<!-- 活动海报图 -->
			<uni-forms-item :label="rules.postPic.label" label-position="top" name="postPic">
				<htz-image-upload
					:max="selectNum3"
					v-model="picList3"
					mediaType="image"
					:action="uploadimageURL3"
					@uploadSuccess="uploadSuccess3"
				/>
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 活动介绍 -->
			<uni-forms-item label-position="top" :label="rules.content.label" name="content">
				<fuck-textarea v-model="formData.content" :placeholder="rules.content.rules[0].errorMessage" />
			</uni-forms-item>

			<!-- 活动详情 -->
			<uni-forms-item label-position="top" :label="rules.details.label" name="details">
				<htz-image-upload
					:max="selectNum4"
					v-model="picList4"
					mediaType="image"
					:action="uploadimageURL4"
					@uploadSuccess="uploadSuccess4"
				/>
			</uni-forms-item>
		</uni-forms>
		<m-btn-fix-bottom :loading="loading" text="保存信息" @btnClick="saveClick" />
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { _enrollformSave, _enrollformGetinfo } from '@/aTemp/apis/activity.js'
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'
import dayjs from 'dayjs'

// 数据ID
const dataId = ref(0)
// 表单数据
const formData = ref({
	type: 0, //活动类型默认值
	startDt: dayjs().format('YYYY-MM-DD HH:mm:ss'), //活动开始时间,默认值
	endDt: dayjs(Date.now() + 30 * 24 * 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss'), //活动结束默认值
	quantity: 1000, // 活动数量默认
	least: 2, //最低拼团人数
	showShare: 0, //是否显示分佣
	sort: 1 //排序
})
// 获取表单对象
const formObj = ref(null)
/*
	活动类型
 */
const type = [
	{
		text: '义诊',
		value: 0
	},
	{
		text: '限时',
		value: 1
	},
	{
		text: '拼团',
		value: 2
	}
]
// 页面开始加载
onLoad(optios => {
	dataId.value = parseInt(optios.id) || 0
	// 是否存在活动ID
	if (dataId.value > 0) {
		// 拉取数据
		_enrollformGetinfo({ id: dataId.value }).then(res => {
			const { data } = res
			// 数据赋值
			formData.value = data
		})
	}
})

// 表单校验
const rules = {
	mainPic: {
		rules: [{ required: true, errorMessage: '请上活动封面图' }],
		label: '活动封面图'
	},
	title: {
		rules: [{ required: true, errorMessage: '请输入活动标题' }],
		label: '活动标题'
	},
	quantity: {
		rules: [{ required: true, errorMessage: '请输入活动数量' }],
		label: '活动数量'
	},
	startDt: {
		rules: [{ required: true, errorMessage: '请输入活动开始时间' }],
		label: '开始时间'
	},
	endDt: {
		rules: [{ required: true, errorMessage: '请输入活动结束时间' }],
		label: '结束时间'
	},
	type: {
		rules: [{ required: true, errorMessage: '请输入活动类型' }],
		label: '活动类型'
	},
	price: {
		rules: [{ required: true, errorMessage: '请输入%价格' }],
		label: '价格'
	},
	sharePrice: {
		rules: [{ required: true, errorMessage: '请输入分佣金额' }],
		label: '分佣金额'
	},
	showShare: {
		rules: [{ required: true, errorMessage: '请选择是否展示分佣' }],
		label: '展示分佣'
	},
	alonePrice: {
		rules: [{ required: true, errorMessage: '请输入单独购买价格' }],
		label: '单独购买'
	},
	least: {
		rules: [{ required: true, errorMessage: '请输入成团人数' }],
		label: '成团人数'
	},
	limitCount: {
		rules: [{ required: true, errorMessage: '请输入限购数量' }],
		label: '限购数量'
	},
	sharePic: {
		rules: [{ errorMessage: '请输上传活动分享图' }],
		label: '活动分享图'
	},
	sort: {
		rules: [{ errorMessage: '请输入序号' }],
		label: '排序'
	},
	postPic: {
		rules: [{ errorMessage: '请上传活动海报图' }],
		label: '活动海报图'
	},
	content: {
		rules: [{ required: true, errorMessage: '请输入活动介绍' }],
		label: '活动介绍'
	},
	details: {
		rules: [{ required: true, errorMessage: '请上传活动详情图' }],
		label: '活动详情图'
	}
}

/*
 * 保存banenr信息功能
 * 组合式函数引入
 */
import useSaveApi from '@/aTemp/mixins/useSaveApi.js'
// 保存信息
const { saveClick, loading } = useSaveApi(formObj, formData, _enrollformSave)

/*
 * 图片选择功能
 * 组合式函数引入
 */
import useHtzImageUpload from '@/aTemp/mixins/useHtzImageUpload.js'

// 活动封面图上传
const { chooseSuccess: chooseSuccess1, picList: picList1, selectNum: selectNum1 } = useHtzImageUpload({
	ratio: 2 / 1,
	url: '/enrollform/uploadimage',
	refData: formData,
	param: 'mainPic',
	selectNum: 1
})
// 活动分享图上传
const { chooseSuccess: chooseSuccess2, picList: picList2, selectNum: selectNum2 } = useHtzImageUpload({
	ratio: 5 / 4,
	url: '/enrollform/uploadimage',
	refData: formData,
	param: 'sharePic',
	selectNum: 1
})
// 活动海报图
const {
	uploadSuccess: uploadSuccess3,
	picList: picList3,
	selectNum: selectNum3,
	uploadimageURL: uploadimageURL3
} = useHtzImageUpload({
	url: '/enrollform/uploadimage',
	refData: formData,
	param: 'postPic',
	selectNum: 1
})
// 活动详情图
const {
	uploadSuccess: uploadSuccess4,
	picList: picList4,
	selectNum: selectNum4,
	uploadimageURL: uploadimageURL4
} = useHtzImageUpload({
	url: '/enrollform/uploadimage',
	refData: formData,
	param: 'details',
	selectNum: 5
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
