<template>
	<view class="">
		{{posterData.value}}
		{{refresh}}
	</view>
	<!-- 海报编辑器 -->
	<m-poster-diy></m-poster-diy>
	
	<uni-popup ref="popupCategory" type="top">
		<view class="popup_box">
			<!-- 海报名称 -->
			<uni-section title="海报名称">
				<uni-easyinput trim="all" v-model="posterName" placeholder="请输入海报名称"></uni-easyinput>
			</uni-section>

			<!-- 海报一级分类 -->
			<uni-section title="一级分类">
				<uni-data-select
					v-model="firstLevelClass"
					placeholder="请选择一级分类"
					:localdata="firstLevelClassList"
					@change="firstLevelClassChange"
				></uni-data-select>
			</uni-section>

			<!-- 海报二级分类 -->
			<uni-section title="二级分类">
				<uni-data-select
					v-model="secondLevelClass"
					placeholder="请选择二级分类"
					:localdata="secondLevelClassList"
				></uni-data-select>
			</uni-section>

			<button class="btn" @tap.stop="popupCategory.close()">确定</button>
		</view>
	</uni-popup>
	
	<!-- 海报生成插件 -->
	<w-painter
		:palette="posterData.value"
		@imgOK="createImgOk"
		@imgErr="imgErr"
		:use2D="true"
		:dirty="false"
		:LRU="false"
		:refresh="refresh"
		customStyle="left: -9999px; top: -9999rpx;position: absolute;"
	></w-painter>
</template>

<script setup>
import mPosterDiy from '@/pages/sub3/components/m-poster-diy/m-poster-diy.vue'
import { _posterGetIdPostAll } from '@/aTemp/apis/poster.js'
import { onLoad, onShow, onReady } from '@dcloudio/uni-app'
import { ref, provide, reactive } from 'vue'
import { uploadFile } from '@/aTemp/utils/uniAppTools.js'
import { _posterSavePostLog } from '@/aTemp/apis/poster.js'
// 全局基础配置
import config from '@/global-config.js'

// 刷新
const refresh = ref('')
provide('refresh', refresh)

// 海报图片数据
const posterData = reactive({
	value: {
		width: '310px',
		height: '534px',
		background: '#eeeeee',
		views: []
	}
})
provide('posterData', posterData)

// 海报其他数据(全部属性)
const posterOtherData = reactive({ value: {} })
provide('posterOtherData', posterOtherData)

// 弹窗对象
const popupCategory = ref(null)
provide('popupCategory', popupCategory)

// 添加海报
const posterAdd = ref(true)
provide('posterAdd', posterAdd)

// 海报名称
const posterName = ref('测试海报')
provide('posterName', posterName)

// 海报一级分类列表
const firstLevelClassList = ref([])
// 选中的一级分类
const firstLevelClass = ref(1)

// 海报二级分类列表
const secondLevelClassList = ref([])
// 选中的二级分类
const secondLevelClass = ref(5)
provide('secondLevelClass', secondLevelClass)

// 节点未加载完成
onLoad(options => {
	// 获取一级分类
	posterGetIdPostAll(0)
})

// 节点加载完成
onReady(e => {
	// popupCategory.value.open()
})

// 获取分类列表
const posterGetIdPostAll = id => {
	_posterGetIdPostAll({ id: id }).then(res => {
		const { code, msg, data } = res
		if (id == 0) {
			firstLevelClassList.value = data.map(item => ({ value: item.id, text: item.posterName }))
		} else {
			secondLevelClassList.value = data.map(item => ({ value: item.id, text: item.posterName }))
		}
	})
}

// 更改一级分类
const firstLevelClassChange = e => {
	if (e) {
		posterGetIdPostAll(e)
		secondLevelClass.value = ''
	}
}

const createImgPath = ref('')
provide('createImgPath', createImgPath)

const mPosterId = ref('')
// 图片生成完成
const createImgOk = async e => {
	// 初始化不上传封面图
	if (refresh.value) {
		const resUploadFile = await uploadFile(e.detail.path, config.BASE_URL + '/upload-flv/uploadimage', {
			baseDir: 'poster_coverImg'
		})
		const { code, data, msg } = JSON.parse(resUploadFile)
		createImgPath.value = data

		// 打印生成并且上传的封面图
		console.log(data)

		_posterSavePostLog({
			id: mPosterId.value,
			posterId: secondLevelClass.value,
			postercampaign: posterName.value,
			posterimg: JSON.stringify(posterData.value),
			posterurl: createImgPath.value
		})
			.then(res => {
				const { code, msg, data } = res
				mPosterId.value = data.id
				uni.hideLoading()
			})
			.catch(err => {
				uni.hideLoading()
				console.log('海报保存失败')
			})
	} else {
		// 插件生成的海报内容
		console.log('海报生成的信息', e)
	}
}

// 图片生成失败
const imgErr = e => {
	uni.hideLoading()
	showToastText('海报加载失败~')
}
</script>

<style lang="scss" scoped>
.popup_box {
	background-color: #fff;
	width: 550rpx;
	border-radius: 16rpx;
	padding: 0 32rpx 32rpx;
	margin: 100rpx auto 0;
	.btn {
		margin-top: 32rpx;
		color: #fff;
		background-color: $main-color;
		font-size: 28rpx;
		line-height: 2.2;
	}
}
</style>
