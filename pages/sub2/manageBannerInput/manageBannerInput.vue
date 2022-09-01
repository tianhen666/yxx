<template>
	<view class="container">
		<uni-forms :rules="rules" ref="formObj" v-model="formData" label-width="220rpx">
			<!-- banner图 -->
			<uni-forms-item :label="rules.banner.label" name="banner" label-position="top">
				<!-- 图片上传 all -->
				<htz-image-upload :max="selectNum1" v-model="picList1" mediaType="image" @chooseSuccess="chooseSuccess1" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 排序 -->
			<uni-forms-item :label="rules.sort.label" name="sort">
				<uni-number-box :min="1" :max="255" v-model="formData.sort" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 相关商品 -->
			<uni-forms-item :label="rules.productId.label" name="productId" label-position="top">
				<m-xiangguan-goods />
			</uni-forms-item>
		</uni-forms>

		<!-- 保存 -->
		<m-btn-fix-bottom :loading="loading" text="保存信息" @btnClick="saveClick" />
	</view>
</template>

<script setup>
import { ref, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { _bannerSave, _bannerInfo } from '@/aTemp/apis/banner'
import { _storeSelectShop } from '@/aTemp/store/storeSelectShop.js'
import { storeToRefs } from 'pinia'
// 商品选择的列表
const storeSelectShop = _storeSelectShop()
// 选着数量,选中列表ID,选中列表数据
const { selectQuantity, selectListId, selectListData } = storeToRefs(storeSelectShop)
// 重置数据
storeSelectShop.$reset()
// 设置可选择数量
selectQuantity.value = 1
// 监听选中的商品ID变化
watch(selectListId.value, (newValue, oldValue) => {
	formData.value.productId = newValue.join(',')
})

// 表单校验
const rules = {
	banner: {
		rules: [{ required: true, errorMessage: '请上传banner图' }],
		label: 'banner图'
	},
	sort: {
		rules: [{ required: true, errorMessage: '请输入序号' }],
		label: '排序'
	},
	productId: {
		rules: [{ errorMessage: '请选择相关商品' }],
		label: '相关商品'
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
		_bannerInfo({ id: dataId.value }).then(res => {
			const { data } = res
			if (Array.isArray(data.productList)) {
				// 初始化选择的商品
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

/*
 * 保存banenr信息功能
 * 组合式函数引入
 */
import useSaveApi from '@/aTemp/mixins/useSaveApi.js'
const { saveClick, loading } = useSaveApi(formObj, formData, _bannerSave)

/*
 * 图片选择功能
 * 组合式函数引入
 */
import useHtzImageUpload from '@/aTemp/mixins/useHtzImageUpload.js'

// 图片上传
const { chooseSuccess: chooseSuccess1, picList: picList1, selectNum: selectNum1 } = useHtzImageUpload({
	ratio: 2 / 1,
	url: '/serve/uploadimage',
	refData: formData,
	param: 'banner',
	selectNum: 1
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
