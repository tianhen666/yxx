<template>
	<view class="container">
		<view class="blank32 blank_bg_color"></view>
		<uni-forms :rules="rules" ref="formObj" v-model="formData" label-position="left" label-width="220rpx">
			<!-- 商品轮播图 -->
			<uni-forms-item :label="rules.pics.label" label-position="top" name="pics">
				<!-- 图片上传 all视频图片，image图片，video视频 -->
				<htz-image-upload :max="selectNum1" v-model="picList1" mediaType="image" @chooseSuccess="chooseSuccess1" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 商品标题 -->
			<uni-forms-item :label="rules.title.label" name="title">
				<uni-easyinput v-model="formData.title" :placeholder="rules.title.rules[0].errorMessage" />
			</uni-forms-item>

			<!-- 商品价格 -->
			<uni-forms-item :label="rules.price.label" name="price">
				<uni-easyinput type="digit" v-model="formData.price" :placeholder="rules.price.rules[0].errorMessage" />
			</uni-forms-item>

			<!-- 商品原价 -->
			<uni-forms-item :label="rules.priceNormal.label" name="priceNormal">
				<uni-easyinput
					type="digit"
					v-model="formData.priceNormal"
					:placeholder="rules.priceNormal.rules[0].errorMessage"
				/>
			</uni-forms-item>

			<!-- 商品库存 -->
			<uni-forms-item :label="rules.avaliableCount.label" name="avaliableCount">
				<uni-number-box :min="1" :step="10" :max="10000" v-model="formData.avaliableCount" />
			</uni-forms-item>

			<!-- 是否限购 -->
			<uni-forms-item label="是否限购">
				<switch
					color="#4b8eff"
					:checked="parseInt(formData.limitCount) > 0"
					style="transform:scale(0.8)"
					@change="formData.limitCount = parseInt(formData.limitCount) > 0 ? 0 : 1"
				/>
			</uni-forms-item>

			<!-- 限购数量 -->
			<uni-forms-item :label="rules.limitCount.label" name="limitCount" v-if="parseInt(formData.limitCount) > 0">
				<uni-number-box :min="1" :max="255" v-model="formData.limitCount" />
			</uni-forms-item>

			<!-- 排序 -->
			<uni-forms-item :label="rules.orderNum.label" name="orderNum">
				<uni-number-box :min="1" :max="255" v-model="formData.orderNum" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 商品分享金额 -->
			<uni-forms-item :label="rules.sharePrice.label" name="sharePrice">
				<uni-easyinput
					type="digit"
					v-model="formData.sharePrice"
					:placeholder="rules.sharePrice.rules[0].errorMessage"
				/>
			</uni-forms-item>

			<!-- 商品分享图 -->
			<uni-forms-item :label="rules.sharePic.label" label-position="top" name="sharePic">
				<htz-image-upload :max="selectNum2" v-model="picList2" mediaType="image" @chooseSuccess="chooseSuccess2" />
			</uni-forms-item>

			<!-- 海报图 -->
			<uni-forms-item :label="rules.postPic.label" label-position="top" name="postPic">
				<htz-image-upload
					:max="selectNum4"
					v-model="picList4"
					mediaType="image"
					:action="uploadimageURL4"
					:formData="{ baseDir: baseDir4 }"
					@uploadSuccess="uploadSuccess4"
				/>
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 商品介绍 -->
			<uni-forms-item :label="rules.descData.label" label-position="top" name="descData">
				<fuck-textarea :placeholder="rules.descData.rules[0].errorMessage" v-model="formData.descData" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 商品详情图 -->
			<uni-forms-item :label="rules.detail.label" label-position="top" name="detail">
				<htz-image-upload
					:max="selectNum3"
					v-model="picList3"
					mediaType="image"
					:formData="{ baseDir: baseDir3 }"
					:action="uploadimageURL3"
					@uploadSuccess="uploadSuccess3"
				/>
			</uni-forms-item>
		</uni-forms>

		<!-- 保存信息 -->
		<m-btn-fix-bottom :loading="loading" text="保存信息" @btnClick="saveClick" />
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
		rules: [{ required: true, errorMessage: '请上传商品轮播图' }],
		label: '商品轮播图'
	},
	title: {
		rules: [{ required: true, errorMessage: '请输入商品标题' }],
		label: '商品标题'
	},
	price: {
		rules: [
			{ required: true, errorMessage: '请输入商品价格' },
			{
				validateFunction: function(rule, value, data, callback) {
					if (parseFloat(value) <= 0) {
						callback('商品价格, 需要大于零')
					}
					return true
				}
			}
		],
		label: '商品价格'
	},
	priceNormal: {
		rules: [
			{ errorMessage: '请输入商品原价' },
			{
				validateFunction: function(rule, value, data, callback) {
					if (parseFloat(value) < parseFloat(data.price)) {
						callback('商品原价，不能小于出售价')
					}
					return true
				}
			}
		],
		label: '商品原价'
	},
	avaliableCount: {
		rules: [{ required: true, errorMessage: '请输入商品库存' }],
		label: '商品库存'
	},
	sharePrice: {
		rules: [
			{ errorMessage: '请输入分享佣金' },
			{
				validateFunction: function(rule, value, data, callback) {
					if (parseFloat(value) <= 0) {
						callback('分佣需要大于零')
					}
					if (parseFloat(value) > parseFloat(data.price) * 0.3) {
						callback('分佣价格不能高于商品价格的30%')
					}

					return true
				}
			}
		],
		label: '分享佣金'
	},
	sharePic: {
		rules: [{ errorMessage: '请上传商品分享图' }],
		label: '分享图'
	},
	postPic: {
		rules: [{ errorMessage: '请上传海报图' }],
		label: '海报图'
	},
	limitCount: {
		rules: [{ required: true, errorMessage: '请输入限购数量' }],
		label: '限购数量'
	},
	orderNum: {
		rules: [{ errorMessage: '请输入排序' }],
		label: '排序'
	},
	descData: {
		rules: [{ required: true, errorMessage: '请输入商品介绍' }],
		label: '商品介绍'
	},
	detail: {
		rules: [{ errorMessage: '请上传商品详情图' }],
		label: '商品详情图'
	}
}

/*
 * 保存banenr信息功能
 */
import useSaveApi from '@/aTemp/mixins/useSaveApi.js'
// 组合式函数引入
const { saveClick, loading } = useSaveApi(formObj, formData, _storeproductSave)

/*
 * 图片选择功能
 * 组合式函数引入
 */
import useHtzImageUpload from '@/aTemp/mixins/useHtzImageUpload.js'

// 商品图片上传 裁剪
const { chooseSuccess: chooseSuccess1, picList: picList1, selectNum: selectNum1 } = useHtzImageUpload({
	ratio: 1 / 1,
	url: '/enrollform/uploadimage',
	refData: formData,
	param: 'pics',
	selectNum: 5,
	baseDir: 'shop'
})

// 分享图片上传 裁剪
const { chooseSuccess: chooseSuccess2, picList: picList2, selectNum: selectNum2 } = useHtzImageUpload({
	ratio: 5 / 4,
	url: '/enrollform/uploadimage',
	refData: formData,
	param: 'sharePic',
	selectNum: 1,
	baseDir: 'shop'
})

// 商品详情图片上传
const {
	uploadSuccess: uploadSuccess3,
	picList: picList3,
	selectNum: selectNum3,
	uploadimageURL: uploadimageURL3,
	baseDir: baseDir3
} = useHtzImageUpload({
	url: '/enrollform/uploadimage',
	refData: formData,
	param: 'detail',
	selectNum: 5,
	baseDir: 'shop'
})

// 海报图片上传
const {
	uploadSuccess: uploadSuccess4,
	picList: picList4,
	selectNum: selectNum4,
	uploadimageURL: uploadimageURL4,
	baseDir: baseDir4
} = useHtzImageUpload({
	url: '/enrollform/uploadimage',
	refData: formData,
	param: 'postPic',
	selectNum: 1,
	baseDir: 'shop'
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
