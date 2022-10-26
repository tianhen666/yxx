<template>
	<view class="container">
		<uni-forms :rules="rules" ref="formObj" :model="formData" label-position="left" label-width="240rpx">
			<!-- 活动类型 -->
			<view class="uni-forms-item-wrapper1">
				<!-- <uni-forms-item :label="rules.type.label" name="type" label-position="top">
					<uni-data-checkbox v-model="formData.type" :localdata="type"></uni-data-checkbox>
				</uni-forms-item> -->
				<view class="type_title">活动类型</view>
				<view class="type_name">
					<view class="type_name_item" v-for="(item, index) in type" :key="index" @tap="formData.type = index">
						<view class="text1">
							{{ `类型${index === 0 ? '一' : index === 1 ? '二' : index === 2 ? '三' : index === 3 ? '四' : ''}` }}
						</view>
						<view class="text2" :class="{ current: formData.type === index }">{{ item.text }}</view>
					</view>
				</view>

				<view class="type_tips">
					{{
						formData.type === 0
							? '创建【无金额】活动，适用线下义诊，免费参与等活动'
							: formData.type === 1
							? '创建【限时】类活动，可设置参与金额及分销佣金'
							: formData.type === 2
							? '创建【限量秒杀】类活动，适用福利，名额少的活动'
							: formData.type === 3
							? '创建【拼团】类活动，邀约多人购买，抱团享受最大福利'
							: ''
					}}
				</view>
			</view>

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

			<!-- 活动数量 -->
			<uni-forms-item v-if="formData.type !== 0" :label="rules.quantity.label" name="quantity">
				<uni-number-box :min="1" :step="10" :max="10000" v-model="formData.quantity" />
			</uni-forms-item>

			<!-- 活动价格 -->
			<uni-forms-item v-if="formData.type !== 0" :label="type[formData.type].text + rules.price.label" name="price">
				<uni-easyinput type="digit" v-model="formData.price" :placeholder="rules.price.rules[0].errorMessage" />
			</uni-forms-item>

			<!-- 原价 -->
			<uni-forms-item
				v-if="formData.type === 1 || formData.type === 2"
				:label="rules.alonePrice.label"
				name="alonePrice"
			>
				<uni-easyinput
					type="digit"
					v-model="formData.alonePrice"
					:placeholder="rules.alonePrice.rules[0].errorMessage"
				/>
			</uni-forms-item>

			<!-- 分佣价格 -->
			<uni-forms-item
				v-if="formData.type === 1 || formData.type === 2"
				:label="rules.sharePrice.label"
				name="sharePrice"
			>
				<uni-easyinput
					type="digit"
					v-model="formData.sharePrice"
					:placeholder="rules.sharePrice.rules[0].errorMessage"
				/>
			</uni-forms-item>

			<!-- 前端是否显示分佣价格 -->
			<uni-forms-item v-if="formData.type === 1 || formData.type === 2" :label="rules.showShare.label" name="showShare">
				<switch
					color="#4b8eff"
					:checked="parseInt(formData.showShare) === 0"
					style="transform:scale(0.8)"
					@change="formData.showShare = Math.abs(parseInt(formData.showShare) - 1)"
				/>
				<view class="tips">
					<text>开启选项，前端显示分佣金额\n关闭选项，前端不显示分佣金额</text>
				</view>
			</uni-forms-item>
			
			<!-- 分佣方式 -->
			<uni-forms-item v-if="formData.type === 1 || formData.type === 2" :label="rules.sharePriceType.label" name="sharePriceType">
				<switch
					color="#4b8eff"
					:checked="parseInt(formData.sharePriceType) === 0"
					style="transform:scale(0.8)"
					@change="formData.sharePriceType = Math.abs(parseInt(formData.sharePriceType) - 1)"
				/>
				<view class="tips">
					<text>开启选项，分佣给第一邀请人\n关闭选项，分佣给最新邀请人</text>
				</view>
			</uni-forms-item>

			<!-- 最低拼团人数 -->
			<uni-forms-item v-if="formData.type === 3" :label="rules.least.label" name="least">
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
				<view class="tips">
					<text>开启选项，输入限购数量\n关闭选项，不限购</text>
				</view>
			</uni-forms-item>

			<!-- 限购数量 -->
			<uni-forms-item
				:label="rules.limitCount.label"
				name="limitCount"
				v-if="parseInt(formData.limitCount) > 0 && formData.type !== 0"
			>
				<uni-number-box :min="1" :max="255" v-model="formData.limitCount" />
			</uni-forms-item>

			<!-- 虚拟人数 -->
			<uni-forms-item :label="rules.views.label" name="views">
				<uni-number-box :min="0" :max="255" v-model="formData.views" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 活动分享图 -->
			<!-- 	<uni-forms-item :label="rules.sharePic.label" label-position="top" name="sharePic">
				<htz-image-upload :max="selectNum2" v-model="picList2" mediaType="image" @chooseSuccess="chooseSuccess2" />
			</uni-forms-item> -->

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
					:formData="{ baseDir: baseDir4 }"
					@uploadSuccess="uploadSuccess4"
				/>
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 活动海报图 -->
			<uni-forms-item :label="rules.postPic.label" label-position="top" name="postPic">
				<htz-image-upload
					:max="selectNum3"
					v-model="picList3"
					mediaType="image"
					:action="uploadimageURL3"
					:formData="{ baseDir: baseDir3 }"
					@uploadSuccess="uploadSuccess3"
				/>
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<!-- 排序 -->
			<uni-forms-item :label="rules.sort.label" name="sort">
				<uni-number-box :min="1" :max="255" v-model="formData.sort" />
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>
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
	limitCount: 1, //默认限购1
	price: 0, // 价格
	showShare: 1, //是否显示分佣
	least: 2, //最低拼团人数
	sort: 1 //排序
})
// 获取表单对象
const formObj = ref(null)
/*
	活动类型
 */
const type = [
	{
		text: '免费引流',
		value: 0
	},
	{
		text: '爆款活动',
		value: 1
	},
	{
		text: '限量秒杀',
		value: 2
	}
]
/*
 {
 	text: '拼团活动',
 	value: 3
 }
 */
// 页面开始加载
onLoad(optios => {
	dataId.value = parseInt(optios.id) || 0
	// 是否存在活动ID
	if (dataId.value > 0) {
		// 拉取数据
		_enrollformGetinfo({ id: dataId.value }).then(res => {
			const { data } = res
			// 数据赋值
			formData.value = data.getinfo
		})
	}
})

// 表单校验
const rules = {
	views: {
		rules: [{ errorMessage: '请输入虚拟人数' }],
		label: '虚拟人数'
	},
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
		rules: [
			{ required: true, errorMessage: '请输入价格' },
			{
				validateFunction: function(rule, value, data, callback) {
					if (parseFloat(value) <= 0) {
						callback('价格需要大于零')
					}
					return true
				}
			}
		],
		label: '价格'
	},
	alonePrice: {
		rules: [
			{ errorMessage: '请输入原价' },
			{
				validateFunction: function(rule, value, data, callback) {
					if (parseFloat(value) <= 0) {
						callback('原价需要大于零')
					}
					return true
				}
			}
		],
		label: '原价'
	},
	sharePrice: {
		rules: [
			{ errorMessage: '请输入分佣金额' },
			{
				validateFunction: function(rule, value, data, callback) {
					if (parseFloat(value) < 0) {
						callback('分佣金额不能小于0')
					}
					if (parseFloat(value) > parseFloat(data.price) * 0.3) {
						callback('分佣价格不能高于活动价格的30%')
					}

					return true
				}
			}
		],
		label: '分佣金额'
	},
	showShare: {
		rules: [{ required: true, errorMessage: '请选择是否展示分佣' }],
		label: '展示分佣'
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
		rules: [{ errorMessage: '请上传活动详情图' }],
		label: '活动详情图'
	},
	sharePriceType: {
		rules: [{ required: true, errorMessage: '请选择分佣方式' }],
		label: '分佣方式'
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

// 活动封面图上传  裁剪
const { chooseSuccess: chooseSuccess1, picList: picList1, selectNum: selectNum1 } = useHtzImageUpload({
	ratio: 5 / 4,
	url: '/upload-flv/uploadimage',
	refData: formData,
	param: 'mainPic',
	selectNum: 1,
	baseDir: 'active'
})

/*
 * 用主图代替
 * 分享图
 */
// const { chooseSuccess: chooseSuccess2, picList: picList2, selectNum: selectNum2 } = useHtzImageUpload({
// 	ratio: 5 / 4,
// 	url: '/upload-flv/uploadimage',
// 	refData: formData,
// 	param: 'sharePic',
// 	selectNum: 1,
// 	baseDir: 'active'
// })

// 活动海报图
const {
	uploadSuccess: uploadSuccess3,
	picList: picList3,
	selectNum: selectNum3,
	uploadimageURL: uploadimageURL3,
	baseDir: baseDir3
} = useHtzImageUpload({
	url: '/upload-flv/uploadimage',
	refData: formData,
	param: 'postPic',
	selectNum: 1,
	baseDir: 'active'
})

// 活动详情图
const {
	uploadSuccess: uploadSuccess4,
	picList: picList4,
	selectNum: selectNum4,
	uploadimageURL: uploadimageURL4,
	baseDir: baseDir4
} = useHtzImageUpload({
	url: '/upload-flv/uploadimage',
	refData: formData,
	param: 'details',
	selectNum: 5,
	baseDir: 'active'
})
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #fff;
}
.container {
	width: 750rpx;
}
.uni-forms-item-wrapper1 {
	overflow: hidden;
	background-image: linear-gradient(to right bottom, #4b8eff, #1a46ff);
	.type_title {
		color: #fff;
		font-size: 40rpx;
		text-align: center;
		padding: 60rpx 32rpx 40rpx;
		font-weight: bold;
	}
	.type_name {
		@include mFlex;
		justify-content: space-between;
		padding: 0 32rpx;
		.type_name_item {
			width: 25%;
			flex: none;
			text-align: center;
			.text1 {
				color: #fff;
				padding-bottom: 15rpx;
				font-size: 28rpx;
			}
			.text2 {
				border-radius: 100px;
				background-image: linear-gradient(to right bottom, #4a8ef9, #1a46ff);
				font-size: 28rpx;
				font-weight: bold;
				color: #fff;
				padding: 18rpx 0;
				box-shadow: 5rpx 5rpx 10rpx black;
			}
			.current {
				background-image: linear-gradient(to right bottom, #efd8a2, #fdaf6d);
			}
		}
	}
	.type_tips {
		padding: 32rpx 32rpx 32rpx;
		color: #fff;
		font-size: 26rpx;
	}
}
.tips{
		color:#999;
		font-size: 26rpx;
		padding-top: 20rpx;
		line-height: 1.6;
	}
</style>
