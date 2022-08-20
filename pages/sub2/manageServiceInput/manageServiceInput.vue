<template>
	<view class="container">
		<view class="blank32 blank_bg_color"></view>
		<uni-forms :rules="rules" ref="formObj" v-model="formData" label-position="left" label-width="220rpx">
			<!-- 服务封面图 -->
			<uni-forms-item :label="rules.pic.label" label-position="top" name="pic">
				<htz-image-upload :max="selectNum1" v-model="picList1" mediaType="image" @chooseSuccess="chooseSuccess1" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 服务名称 -->
			<uni-forms-item :label="rules.title.label" name="title">
				<uni-easyinput v-model="formData.title" :placeholder="rules.title.rules[0].errorMessage" />
			</uni-forms-item>

			<!-- 排序 -->
			<uni-forms-item :label="rules.weight.label" name="weight">
				<uni-number-box :min="1" :max="255" v-model="formData.weight" />
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

			<!-- 服务介绍 -->
			<uni-forms-item :label="rules.descData.label" label-position="top" name="descData">
				<uni-easyinput
					type="textarea"
					:cursor-spacing="80"
					autoHeight
					v-model="formData.descData"
					:placeholder="rules.descData.rules[0].errorMessage"
				/>
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 服务详情图 -->
			<uni-forms-item :label="rules.details.label" label-position="top" name="details">
				<htz-image-upload
					:max="selectNum3"
					v-model="picList3"
					mediaType="image"
					:action="uploadimageURL3"
					@uploadSuccess="uploadSuccess3"
				/>
			</uni-forms-item>
		</uni-forms>

		<!-- 保存信息 -->
		<m-btn-fix-bottom text="保存信息" @btnClick="saveClick" />
	</view>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { _serveSave, _serveGetinfo } from '@/aTemp/apis/service'
import { _storeSelectShop } from '@/aTemp/store/storeSelectShop.js'

// 商品选择的列表
const storeSelectShop = _storeSelectShop()
// 选着数量,选中列表ID,选中列表数据
const { selectQuantity, selectListId } = toRefs(storeSelectShop)
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
			// 数据赋值
			formData.value = data
			
			// 初始化选择的商品
			selectListId.value.push(...formData.value.banurl.split(','))
		})
	}
})

// 表单校验
const rules = {
	pic: {
		rules: [{ required: true, errorMessage: '请上传服务封面图' }],
		label: '服务封面图'
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
		rules: [{ required: true, errorMessage: '请输入服务详情' }],
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
	}
}

/*
 * 保存banenr信息功能
 * 组合式函数引入
 */
import useSaveApi from '@/aTemp/mixins/useSaveApi.js'
const { saveClick } = useSaveApi(formObj, formData, _serveSave)

/*
 * 图片选择功能
 * 组合式函数引入
 */
import useHtzImageUpload from '@/aTemp/mixins/useHtzImageUpload.js'

// 商品图片上传
const { chooseSuccess: chooseSuccess1, picList: picList1, selectNum: selectNum1 } = useHtzImageUpload({
	ratio: 2 / 1,
	url: '/serve/uploadimage',
	refData: formData,
	param: 'pic',
	selectNum: 1
})

// 分享图片上传
const { chooseSuccess: chooseSuccess2, picList: picList2, selectNum: selectNum2 } = useHtzImageUpload({
	ratio: 5 / 4,
	url: '/serve/uploadimage',
	refData: formData,
	param: 'sharePic',
	selectNum: 1
})

// 商品详情图片上传
const {
	uploadSuccess: uploadSuccess3,
	picList: picList3,
	selectNum: selectNum3,
	uploadimageURL: uploadimageURL3
} = useHtzImageUpload({
	url: '/storeproduct/uploadimage',
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
