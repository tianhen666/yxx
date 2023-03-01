<template>
	<!-- 海报编辑器 -->
	<m-poster-diy></m-poster-diy>

	<uni-popup ref="popupCategory" type="top">
		<view class="popup_box">
			<!-- 海报名称 -->
			<uni-section title="海报名称">
				<uni-easyinput
					trim="all"
					v-model="posterName"
					placeholder="请输入海报名称"
				></uni-easyinput>
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
		:widthPixels="155"
		@imgOK="createImgOk"
		@imgErr="imgErr"
		:use2D="true"
		:dirty="false"
		:LRU="true"
		customStyle="left: -9999px; top: -9999rpx;position: absolute;"
	></w-painter>
</template>

<script setup>
import mPosterDiy from '@/pages/sub3/components/m-poster-diy/m-poster-diy.vue';
import {
	_posterGetPostType,
	_posterGetPostercontent,
	_posterSavePostLog,
	_posterGetPostTypeChild
} from '@/aTemp/apis/poster.js';
import { onLoad, onShow, onReady } from '@dcloudio/uni-app';
import { ref, provide, reactive } from 'vue';
import {
	uploadFile,
	showToastText,
	navigateBack,
	getImageInfo,
	showLoading
} from '@/aTemp/utils/uniAppTools.js';
// 全局基础配置
import config from '@/global-config.js';

// 海报图片数据
const posterData = reactive({ value: {} });
provide('posterData', posterData);

// 海报其他数据(全部属性)
const posterOtherData = reactive({ value: {} });
provide('posterOtherData', posterOtherData);

// 弹窗对象
const popupCategory = ref(null);
provide('popupCategory', popupCategory);

// 判断是否添加上传海报
const posterAdd = ref(true);
provide('posterAdd', posterAdd);

// 海报名称
const posterName = ref('');
provide('posterName', posterName);

// 海报一级分类列表
const firstLevelClassList = ref([]);
// 选中的一级分类
const firstLevelClass = ref('');

// 海报二级分类列表
const secondLevelClassList = ref([]);
// 选中的二级分类
const secondLevelClass = ref('');
provide('secondLevelClass', secondLevelClass);

// 海报ID
const posterId = ref(0);
onLoad(options => {
	// 设置一级海报分类
	firstLevelClass.value = parseInt(options.parentClassId) || 0;
	// 获取全部海报分类
	posterGetPostType();

	// 设置海报ID
	posterId.value = parseInt(options.id) || 0;

	// 判断是否新增海报
	if (posterId.value) {
		// 获取海报详情
		posterGetPostercontent();
	} else {
		posterData.value = { width: '310px', height: '534px', background: '#fff', views: [] };
	}
});

// 获取海报数据
const posterGetPostercontent = () => {
	showLoading('海报数据加载中');
	_posterGetPostercontent({
		id: posterId.value
	})
		.then(async res => {
			const { code, data, msg } = res;
			// 设置二级海报id
			secondLevelClass.value = data.posterId;
			// 设置海报名称
			posterName.value = data.postercampaign || '';

			// 赋值海报其他参数
			posterOtherData.value = data;

			// 获取海报中json数据
			let getPosterData = JSON.parse(data.posterImg);
			// 判断海报中的数据是否为空
			if (!getPosterData) {
				console.log('海报信息', posterOtherData);
				console.log('海报数据json数据', getPosterData);

				const initPosterData = { width: '', height: '', background: '', views: [] };
				const getImgInfo = await getImageInfo(posterOtherData.value.posterurl);
				const { height: imgHeight, width: imgWidth, path: imgPath } = getImgInfo;

				initPosterData.height = imgHeight / (imgWidth / 310) + 'px';
				initPosterData.width = '310px';
				initPosterData.background = posterOtherData.value.posterurl;
				getPosterData = initPosterData;
			}
			// 设置海报中的json数据
			posterData.value = getPosterData;
		})
		.catch(err => {
			showToastText('此海报已被删除');
			setTimeout(() => {
				navigateBack();
			}, 500);
		});
};

// 获取分类列表
const posterGetPostType = () => {
	_posterGetPostType().then(res => {
		const { code, msg, data } = res;
		firstLevelClassList.value = data.map(item => ({ value: item.id, text: item.posterName }));

		if (!firstLevelClass.value) {
			return;
		}
		// 获取二级海报分类
		_posterGetPostTypeChild({ id: firstLevelClass.value }).then(res => {
			const { code, msg, data } = res;
			secondLevelClassList.value = data.map(item => ({
				value: item.id,
				text: item.posterName
			}));
		});
	});
};

// 更改一级分类
const firstLevelClassChange = e => {
	if (e) {
		_posterGetPostTypeChild({ id: e }).then(res => {
			const { code, msg, data } = res;
			secondLevelClassList.value = data.map(item => ({
				value: item.id,
				text: item.posterName
			}));
		});
		secondLevelClass.value = '';
	}
};

// 海报生成并且上传成功过的图片路径
const createImgPath = ref('');
// 海报是否初始化完成
const firstComplete = ref(false);
// 图片生成完成
const createImgOk = async e => {
	// 插件生成的海报内容
	console.log('海报生成的信息', e);

	// 初始化不上传封面图
	if (firstComplete.value) {
		const resUploadFile = await uploadFile(
			e.detail.path,
			config.BASE_URL + '/upload-flv/uploadimage',
			{
				baseDir: 'poster_coverImg'
			}
		);
		const { code, data, msg } = JSON.parse(resUploadFile);
		createImgPath.value = data;

		// 打印生成并且上传的封面图路径
		console.log(data);
		console.log(posterData.value);

		// 上传海报数据
		_posterSavePostLog({
			id: posterId.value,
			posterId: secondLevelClass.value,
			postercampaign: posterName.value,
			posterImg: JSON.stringify(posterData.value),
			posterurl: createImgPath.value
		})
			.then(res => {
				const { code, msg, data } = res;
				posterId.value = data.id;
				uni.hideLoading();
				showToastText('海报添加成功~');
				navigateBack();
			})
			.catch(err => {
				uni.hideLoading();
				console.log(err, '海报保存失败');
			});
	} else {
		uni.hideLoading();
		firstComplete.value = true;
	}
};

// 图片生成失败
const imgErr = e => {
	uni.hideLoading();
	showToastText('海报加载失败~');
};
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #ccc;
}
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
