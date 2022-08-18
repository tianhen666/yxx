<template>
	<view class="container">
		<view class="blank32 blank_bg_color"></view>
		<uni-forms :rules="rules" ref="formObj" :model="formData" label-position="left" label-width="200rpx">
			<uni-forms-item :label="rules.mainPic.label" label-position="top" name="mainPic">
				<!-- 图片上传 all视频图片，image图片，video视频 -->
				<htz-image-upload
					ratio="50%"
					:max="selectNum"
					v-model="pics"
					mediaType="image"
					@chooseSuccess="chooseSuccess"
				/>
			</uni-forms-item>
			<view class="blank32 blank_bg_color"></view>

			<uni-forms-item :label="rules.title.label" name="title">
				<uni-easyinput v-model="formData.title" :placeholder="rules.title.rules[0].errorMessage" />
			</uni-forms-item>

			<uni-forms-item :label="rules.startDt.label" name="startDt">
				<uni-datetime-picker
					:start="Date.now()"
					:placeholder="rules.startDt.rules[0].errorMessage"
					type="datetime"
					:clearIcon="false"
					v-model="formData.startDt"
				/>
			</uni-forms-item>

			<uni-forms-item :label="rules.endDt.label" name="endDt">
				<uni-datetime-picker
					:start="Date.now()"
					:placeholder="rules.endDt.rules[0].errorMessage"
					type="datetime"
					:clearIcon="false"
					v-model="formData.endDt"
				/>
			</uni-forms-item>

			<uni-forms-item :label="rules.type.label" name="type">
				<uni-data-checkbox v-model="formData.type" :localdata="type"></uni-data-checkbox>
			</uni-forms-item>

			<view class="blank32 blank_bg_color"></view>
			<uni-forms-item label="相关商品" name="banurl" label-position="top">
				<!-- 选项 -->
				<m-xiangguan-goods
					@delClick="delSelectShopListclick"
					v-if="selectShopListData.length > 0"
					:shopListData="selectShopListData"
				/>
				<!-- 提示 -->
				<view class="xiangguang" v-else><view class="xiangguang_tips">添加相关商品</view></view>
				<!-- 去选择页面按钮 -->
				<view
					class="xiangguang_box1"
					v-if="selectShopQuantity > selectShopListData.length"
					@tap="
						navigateTo(
							`/pages/sub2/selectShopItem/selectShopItem?selectQuantity=${selectShopQuantity}&selectListId=${selectShoplist}`
						)
					"
				>
					<image class="image" src="/static/default/add.png" mode="aspectFill"></image>
					<view class="text">添加相关商品</view>
				</view>
			</uni-forms-item>
		</uni-forms>
		<m-btn-fix-bottom text="保存信息" @btnClick="saveClick" />
	</view>
</template>

<script setup>
import { computed, ref, watch, toRef, toRaw } from 'vue'
import { onLoad, onUnload, onShow } from '@dcloudio/uni-app'
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
	productId: 13 // 测试商品ID
})
// 获取表单对象
const formObj = ref(null)
/* 
	活动类型
 */
const type = [
	{
		text: '秒杀',
		value: 0
	},
	{
		text: '团购',
		value: 1
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
	}
}

/*
 * 保存banenr信息功能
 */
import useSaveApi from '@/aTemp/mixins/useSaveApi.js'
// 组合式函数引入
const { saveClick } = useSaveApi(formObj, formData, _enrollformSave)

/*
 * 图片选择功能
 */
import useHtzImageUpload from '@/aTemp/mixins/useHtzImageUpload.js'
// 组合式函数引入
const { chooseSuccess, pics, selectNum } = useHtzImageUpload(2 / 1, '/enrollform/uploadimage', formData, 'mainPic', 1)

/*
 * 选择相关商品
 */
import useSelectShop from '@/aTemp/mixins/useSelectShop.js'
// 组合式函数引入
const { selectShopQuantity, selectShopListData } = useSelectShop(formData)
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #fff;
}
.container {
	width: 750rpx;
}

.xiangguang {
	text-align: center;
	&_tips {
		color: $text-color-grey;
		margin-bottom: 15rpx;
	}
}
.xiangguang_box1 {
	@include mFlex;
	margin-top: 52rpx;
	> .image {
		width: 40rpx;
		height: 40rpx;
	}
	> .text {
		color: $main-color;
		margin-left: 15rpx;
	}
}
</style>
