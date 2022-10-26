<template>
	<view class="container">
		<view class="blank32 blank_bg_color"></view>
		<uni-forms :rules="rules" ref="formObj" v-model="formData" label-position="left" label-width="220rpx">
			<!-- 服务banner图 -->
			<uni-forms-item :label="rules.pic.label" label-position="top" name="pic">
				<htz-image-upload :max="selectNum1" v-model="picList1" mediaType="image" @chooseSuccess="chooseSuccess1" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 服务名称 -->
			<uni-forms-item :label="rules.title.label" name="title" label-position="top">
				<uni-easyinput v-model="formData.title" :placeholder="rules.title.rules[0].errorMessage" />
			</uni-forms-item>

			<!-- 服务介绍 -->
			<uni-forms-item :label="rules.descData.label" label-position="top" name="descData">
				<fuck-textarea height="200px" :placeholder="rules.descData.rules[0].errorMessage" v-model="formData.descData" />
			</uni-forms-item>

			<!-- 服务详情图 -->
			<uni-forms-item :label="rules.details.label" label-position="top" name="details">
				<htz-image-upload
					:max="selectNum3"
					v-model="picList3"
					mediaType="image"
					:action="uploadimageURL3"
					:formData="{ baseDir: baseDir3 }"
					@uploadSuccess="uploadSuccess3"
				/>
			</uni-forms-item>

			<!-- 首页背景图 -->
			<uni-forms-item :label="rules.background.label" label-position="top" name="background">
				<htz-image-upload
					:max="selectNum4"
					v-model="picList4"
					mediaType="image"
					:action="uploadimageURL4"
					:formData="{ baseDir: baseDir4 }"
					@uploadSuccess="uploadSuccess4"
				/>
			</uni-forms-item>

			<!-- 首页特点 -->
			<uni-forms-item :label="rules.peculiarity.label" name="peculiarity" label-position="top">
				<uni-easyinput v-model="formData.peculiarity" :placeholder="rules.peculiarity.rules[0].errorMessage" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 相关商品 -->
			<uni-forms-item label-position="top" :label="rules.productId.label" name="productId">
				<!-- 相关商品列表 -->
				<m-xiangguan-goods />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 分享图 -->
			<uni-forms-item :label="rules.sharePic.label" label-position="top" name="sharePic">
				<htz-image-upload :max="selectNum2" v-model="picList2" mediaType="image" @chooseSuccess="chooseSuccess2" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 排序 -->
			<uni-forms-item :label="rules.weight.label" name="weight">
				<uni-number-box :min="1" :max="255" v-model="formData.weight" />
			</uni-forms-item>
		</uni-forms>

		<!-- 保存信息 -->
		<m-btn-fix-bottom :loading="loading" text="保存信息" @btnClick="saveClick" />
	</view>
</template>

<script setup>
import { ref, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { _serveSave, _serveGetinfo } from '@/aTemp/apis/service'
import { _storeSelectShop } from '@/aTemp/store/storeSelectShop.js'
import { storeToRefs } from 'pinia'
// 商品选择的列表
const storeSelectShop = _storeSelectShop()
// 选着数量,选中列表ID,选中列表数据
const { selectQuantity, selectListId, selectListData } = storeToRefs(storeSelectShop)
// 重置数据
storeSelectShop.$reset()
// 设置可选择数量
selectQuantity.value = 5
// 监听选中的商品ID变化
watch(selectListId.value, (newValue, oldValue) => {
	formData.value.productId = newValue.join(',')
})

// 数据ID
const dataId = ref(0)
// 表单数据
const formData = ref({})
// 获取表单对象
const formObj = ref(null)

// 页面开始加载
onLoad(optios => {
	dataId.value = parseInt(optios.id) || 0
	// 是否存在商品ID
	if (dataId.value > 0) {
		// 拉取数据
		_serveGetinfo({ id: dataId.value }).then(res => {
			const { data } = res

			// 初始化选中商品的数据
			if (Array.isArray(data.productList)) {
				// 图片列表转为数组
				data.productList = data.productList.map((item, index, arr) => {
					// 图片转数组
					;(item.pics = item.pics ? item.pics.split(',') : []),
						// 选中的商品赋值
						selectListId.value.push(item.id + '')
					selectListData.value[`id_${item.id}`] = item
					return item
				})
			}

			// 过滤不用上传数据
			delete data.productList

			// 数据赋值
			formData.value = data
		})
	}
})

// 表单校验
const rules = {
	pic: {
		rules: [{ required: true, errorMessage: '请上传服务banner图' }],
		label: '服务banner图'
	},
	title: {
		rules: [{ required: true, errorMessage: '请输入服务名称' }],
		label: '服务名称'
	},
	descData: {
		rules: [{ required: true, errorMessage: '请输入服务描述' }],
		label: '服务描述'
	},
	details: {
		rules: [{ required: true, errorMessage: '请上传服务详情图' }],
		label: '服务详情图'
	},
	weight: {
		rules: [{ errorMessage: '请输入序号' }],
		label: '排序'
	},
	sharePic: {
		rules: [{ errorMessage: '请上传分享图' }],
		label: '分享图'
	},
	productId: {
		rules: [{ errorMessage: '请选择管理商品' }],
		label: '相关商品'
	},
	background: {
		rules: [{ required: true, errorMessage: '请上传首页背景图' }],
		label: '首页背景图'
	},
	peculiarity: {
		rules: [{ required: true, errorMessage: '请输入首页特点' }, { maxLength: 10, errorMessage: '长度不能超过10' }],
		label: '首页特点'
	}
}

/*
 * 保存banenr信息功能
 * 组合式函数引入
 */
import useSaveApi from '@/aTemp/mixins/useSaveApi.js'
const { saveClick, loading } = useSaveApi(formObj, formData, _serveSave)

/*
 * 图片选择功能
 * 组合式函数引入
 */
import useHtzImageUpload from '@/aTemp/mixins/useHtzImageUpload.js'

// 主图片上传
const { chooseSuccess: chooseSuccess1, picList: picList1, selectNum: selectNum1 } = useHtzImageUpload({
	ratio: 2 / 1,
	url: '/upload-flv/uploadimage',
	refData: formData,
	param: 'pic',
	selectNum: 1,
	baseDir: 'service'
})

// 分享图片上传
const { chooseSuccess: chooseSuccess2, picList: picList2, selectNum: selectNum2 } = useHtzImageUpload({
	ratio: 5 / 4,
	url: '/upload-flv/uploadimage',
	refData: formData,
	param: 'sharePic',
	selectNum: 1,
	baseDir: 'service'
})

// 服务详情图片上传
const {
	uploadSuccess: uploadSuccess3,
	picList: picList3,
	selectNum: selectNum3,
	uploadimageURL: uploadimageURL3,
	baseDir: baseDir3
} = useHtzImageUpload({
	url: '/upload-flv/uploadimage',
	refData: formData,
	param: 'details',
	selectNum: 5,
	baseDir: 'service'
})

// 首页背景图上传
const {
	uploadSuccess: uploadSuccess4,
	picList: picList4,
	selectNum: selectNum4,
	uploadimageURL: uploadimageURL4,
	baseDir: baseDir4
} = useHtzImageUpload({
	url: '/upload-flv/uploadimage',
	refData: formData,
	param: 'background',
	selectNum: 1,
	baseDir: 'service'
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
