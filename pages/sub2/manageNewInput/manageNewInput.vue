<template>
	<view class="container">
		<uni-forms :rules="rules" ref="formObj" v-model="formData" label-width="220rpx">
			<!-- 封面图 -->
			<uni-forms-item :label="rules.thumbUrl.label" name="thumbUrl" label-position="top">
				<htz-image-upload :max="selectNum1" v-model="picList1" mediaType="image" @chooseSuccess="chooseSuccess1" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 标题 -->
			<uni-forms-item :label="rules.title.label" name="title">
				<uni-easyinput v-model="formData.title" :placeholder="rules.title.rules[0].errorMessage" />
			</uni-forms-item>
			<!-- 简介 -->
			<uni-forms-item :label="rules.digest.label" name="digest" label-position="top">
				<fuck-textarea v-model="formData.digest" :placeholder="rules.digest.rules[0].errorMessage" />
			</uni-forms-item>
			<!-- 标签 -->
			<uni-forms-item :label="rules.classify.label" name="classify">
				<!-- <uni-easyinput v-model="formData.classify" :placeholder="rules.classify.rules[0].errorMessage" /> -->
				<uni-data-select v-model="value" :localdata="range" @change="change"></uni-data-select>
			</uni-forms-item>
			<!-- 内容 -->
			<uni-forms-item :label="rules.content.label" name="content" label-position="top">
				<!-- <fuck-textarea v-model="formData.content" :placeholder="rules.content.rules[0].errorMessage" /> -->
				<view class="articleCentent"><mp-html :content="formData.content" /></view>
				<button class="btn" @tap.stop="mpTap">编辑文章内容</button>
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
import { _freePublishSavaFree, _freePublishGetInfo } from '@/aTemp/apis/wx'
import { _storeSelectShop } from '@/aTemp/store/storeSelectShop.js'
import { storeToRefs } from 'pinia'
import { navigateTo } from '@/aTemp/utils/uniAppTools.js'
import dayjs from 'dayjs'

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

const value = ref('')
const range = ref([{ value: '鸭鸭课堂', text: '鸭鸭课堂' }, { value: '公益活动', text: '公益活动' }])
const change = e => {
	formData.value.classify = e
}
// 表单校验
const rules = {
	classify: {
		rules: [{ required: true, errorMessage: '请输入标签' }],
		label: '标签'
	},
	productId: {
		rules: [{ errorMessage: '请选择相关商品' }],
		label: '相关商品'
	},
	content: {
		rules: [{ required: true, errorMessage: '请输入文章内容' }],
		label: '文章内容'
	},
	digest: {
		rules: [{ required: true, errorMessage: '请输入文章简介' }],
		label: '简介'
	},
	thumbUrl: {
		rules: [{ required: true, errorMessage: '请输入文章封面图' }],
		label: '封面图'
	},
	title: {
		rules: [{ required: true, errorMessage: '请输入文章标题' }],
		label: '标题'
	}
}

// 数据ID
const dataId = ref(0)
// 表单数据
const formData = ref({ id: 0, createDt: '' })
// 获取表单对象
const formObj = ref(null)

// 页面加载
onLoad(optios => {
	console.log(optios)
	if (optios.articleCentent) {
		formData.value.content = uni.getStorageSync('artcleCentent')
		return
	}

	dataId.value = parseInt(optios.id)
	// 是否存在dataId
	if (dataId.value > 0) {
		// 拉取数据
		_freePublishGetInfo({ freeId: dataId.value }).then(res => {
			try {
				const { data } = res

				// 设置当前的标签
				value.value = data.classify

				if (Array.isArray(data.storeProductList)) {
					// 初始化选择的商品
					data.storeProductList = data.storeProductList.map((item, index, arr) => {
						// 图片转数组
						;(item.pics = item.pics ? item.pics.split(',') : []),
							// 选中的商品赋值
							selectListId.value.push(item.id + '')
						selectListData.value[`id_${item.id}`] = item
						return item
					})
				}

				// 过滤不用上传数据
				delete data.storeProductList

				// 数据赋值
				formData.value = data
			} catch (e) {
				console.log(e)
			}
		})
	}
})

/*
 * 保存banenr信息功能
 * 组合式函数引入
 */
import useSaveApi from '@/aTemp/mixins/useSaveApi.js'
const { saveClick, loading } = useSaveApi(formObj, formData, _freePublishSavaFree)

/*
 * 图片选择功能
 * 组合式函数引入
 */
import useHtzImageUpload from '@/aTemp/mixins/useHtzImageUpload.js'

// 图片上传
const { chooseSuccess: chooseSuccess1, picList: picList1, selectNum: selectNum1 } = useHtzImageUpload({
	ratio: 4 / 3,
	url: '/upload-flv/uploadimage',
	refData: formData,
	param: 'thumbUrl',
	selectNum: 1,
	baseDir: 'thumbUrl'
})

/* 
 去编辑富文本
 */
const mpTap = () => {
	// 设置设置缓存内容
	uni.setStorageSync('artcleCentent', formData.value.content)
	navigateTo('/pages/sub2/editor/editor')
}
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #fff;
}
.container {
	width: 750rpx;
}
.tips {
	color: #999;
	font-size: 26rpx;
	padding-top: 20rpx;
	line-height: 1.6;
}
.articleCentent {
	max-height: 500rpx;
	position: relative;
	overflow: hidden;
}
.btn {
	line-height: 1;
	color: #000;
	background-color: $main-color;
	width: 200rpx;
	padding: 10rpx 0;
	font-size: 26rpx;
	margin-left: 0;
	margin-top: 20rpx;
}
</style>
