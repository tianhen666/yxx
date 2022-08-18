<template>
	<view class="container">
		<view class="blank32 blank_bg_color"></view>
		<uni-forms :rules="rules" ref="formObj" v-model="formData" label-position="left" label-width="200rpx">
			<uni-forms-item :label="rules.pics.label" label-position="top" name="pics">
				<!-- 图片上传 all视频图片，image图片，video视频 -->
				<htz-image-upload :max="selectNum" v-model="pics" mediaType="image" @chooseSuccess="chooseSuccess" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<uni-forms-item :label="rules.title.label" name="title">
				<uni-easyinput v-model="formData.title" :placeholder="rules.title.rules[0].errorMessage" />
			</uni-forms-item>

			<uni-forms-item :label="rules.price.label" name="price">
				<uni-easyinput type="digit" v-model="formData.price" :placeholder="rules.price.rules[0].errorMessage" />
			</uni-forms-item>

			<uni-forms-item :label="rules.priceNormal.label" name="priceNormal">
				<uni-easyinput
					type="digit"
					v-model="formData.priceNormal"
					:placeholder="rules.priceNormal.rules[0].errorMessage"
				/>
			</uni-forms-item>
			<uni-forms-item :label="rules.avaliableCount.label" name="avaliableCount">
				<uni-number-box :min="1" :step="10" :max="10000" v-model="formData.avaliableCount" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<uni-forms-item :label="rules.sharePrice.label" name="sharePrice">
				<uni-easyinput
					type="digit"
					v-model="formData.sharePrice"
					:placeholder="rules.sharePrice.rules[0].errorMessage"
				/>
			</uni-forms-item>

			<uni-forms-item label="限购">
				<switch
					color="#4b8eff"
					:checked="parseInt(formData.limitCount) > 0"
					style="transform:scale(0.8)"
					@change="formData.limitCount = parseInt(formData.limitCount) > 0 ? 0 : 1"
				/>
			</uni-forms-item>
			<uni-forms-item :label="rules.limitCount.label" name="limitCount" v-if="parseInt(formData.limitCount) > 0">
				<uni-number-box :min="1" :max="255" v-model="formData.limitCount" />
			</uni-forms-item>

			<uni-forms-item :label="rules.orderNum.label" name="orderNum">
				<uni-number-box :min="1" :max="255" v-model="formData.orderNum" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<uni-forms-item :label="rules.notice.label" label-position="top" name="notice">
				<uni-easyinput
					type="textarea"
					:cursor-spacing="80"
					autoHeight
					v-model="formData.notice"
					:placeholder="rules.notice.rules[0].errorMessage"
				/>
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>
			<uni-forms-item :label="rules.detail.label" label-position="top" name="detail">
				<mp-html :content="formData.detail" />
			</uni-forms-item>
		</uni-forms>
		<m-btn-fix-bottom text="保存信息" @btnClick="saveClick" />
	</view>
</template>

<script setup>
import { computed, ref, watch, toRef, toRaw } from 'vue'
import { onLoad, onUnload, onShow } from '@dcloudio/uni-app'
import { _storeproductSave, _storeproductGetinfo } from '@/aTemp/apis/shop'
import { isVideo } from '@/aTemp/utils/tools'

// 商品ID
const shopId = ref(0)
// 表单数据
const formData = ref({})
// 获取表单对象
const formObj = ref(null)

// 页面开始加载
onLoad(optios => {
	shopId.value = parseInt(optios.id) || 0
	// 是否存在商品ID
	if (shopId.value > 0) {
		// 拉取数据
		_storeproductGetinfo({ id: shopId.value }).then(res => {
			const { data } = res
			// 数据赋值
			formData.value = data
		})
	}
})

// 表单校验
const rules = {
	pics: {
		rules: [{ required: true, errorMessage: '请上传商品图片' }],
		label: '商品图片'
	},
	title: {
		rules: [{ required: true, errorMessage: '请输入商品标题' }],
		label: '商品标题'
	},
	price: {
		rules: [{ required: true, errorMessage: '请输入商品价格' }],
		label: '商品价格'
	},
	priceNormal: {
		rules: [{ errorMessage: '请输入商品原价' }],
		label: '商品原价'
	},
	avaliableCount: {
		rules: [{ required: true, errorMessage: '请输入商品库存' }],
		label: '商品库存'
	},
	sharePrice: {
		rules: [{ errorMessage: '请输入推广佣金' }],
		label: '推广佣金'
	},
	limitCount: {
		rules: [{ errorMessage: '请输入限购数量' }],
		label: '限购数量'
	},
	orderNum: {
		rules: [{ errorMessage: '请输入排序' }],
		label: '排序'
	},
	notice: {
		rules: [{ required: true, errorMessage: '请输入使用规则' }],
		label: '使用规则'
	},
	detail: {
		rules: [{ errorMessage: '请输入商品详情' }],
		label: '商品详情'
	}
}

/*
 * 保存banenr信息功能
 */
import useSaveApi from '@/aTemp/mixins/useSaveApi.js'
// 组合式函数引入
const { saveClick } = useSaveApi(formObj, formData, _storeproductSave)

/*
 * 图片选择功能
 */
import useHtzImageUpload from '@/aTemp/mixins/useHtzImageUpload.js'
// 组合式函数引入
const { chooseSuccess, pics, selectNum } = useHtzImageUpload(1 / 1, '/storeproduct/uploadimage', formData, 'pics', 5)
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #fff;
}
.container {
	width: 750rpx;
}
</style>
