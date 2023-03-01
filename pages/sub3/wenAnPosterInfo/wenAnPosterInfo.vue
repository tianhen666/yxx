<template>
	<w-painter
		:palette="posterData.value"
		@imgOK="createImgOk"
		@imgErr="imgErr"
		:use2D="true"
		:dirty="false"
		:LRU="false"
		:scaleRatio="2"
		customStyle="left: -9999px;top: -9999px;position: absolute;"
	></w-painter>
	<m-poster-diy></m-poster-diy>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref, provide, reactive } from 'vue';
import mPosterDiy from '@/pages/sub3/components/m-poster-diy/m-poster-diy.vue';
import {
	showLoading,
	saveImageToPhotosAlbum,
	previewImage,
	showToastText,
	getImageInfo,
	navigateBack
} from '@/aTemp/utils/uniAppTools.js';
import { _wxWxqrCode } from '@/aTemp/apis/login.js';
import { _posterGetPostercontent, _posterDraftsOne } from '@/aTemp/apis/poster.js';
// base64转图片路径
import { base64ToPath } from 'image-tools';

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js';
const useUserMain = _useUserMain();

// 海报图片数据
const posterData = reactive({ value: {} });
provide('posterData', posterData);

// 海报其他数据(全部属性)
const posterOtherData = reactive({ value: {} });
provide('posterOtherData', posterOtherData);

// 文案进入
const wenAn = ref(true);
provide('wenAn', wenAn);

onLoad(options => {
	// 获取海报数据
	posterGetPostercontent();
});

import { _useStoreWenAn } from '@/aTemp/store/storeWenAn.js';
const useStoreWenAn = _useStoreWenAn();
// 获取海报数据
const posterGetPostercontent = async () => {
	showLoading('海报数据加载中');
	const initPosterData = { width: '', height: '', background: '', views: [] };
	const getImgInfo = await getImageInfo(useStoreWenAn.posterCover);
	const { height: imgHeight, width: imgWidth, path: imgPath } = getImgInfo;

	initPosterData.height = imgHeight / (imgWidth / 310) + 'px';
	initPosterData.width = '310px';
	initPosterData.background = useStoreWenAn.posterCover;

	// 设置海报中的json数据
	posterData.value = initPosterData;

	// 获取邀请码
	const wxWxqrCode = await _wxWxqrCode({
		page: 'pages/main/index/index',
		scene: `i=${useUserMain.userid}&sd=${useUserMain.storeId}&s=4&t=${
			posterOtherData.value.id
		}`,
		width: 430
	});

	// 邀请码base64转成图片
	const codeImgPath = await base64ToPath('data:image/png;base64,' + wxWxqrCode.data);

	// 添加二维码
	posterData.value.views.push({
		css: {
			top: parseInt(posterData.value.height) - 75 + 'px',
			left: parseInt(posterData.value.width) - 75 + 'px',
			width: '65px',
			height: '65px'
		},
		id: 'code',
		type: 'image',
		url: codeImgPath
	});
	posterData.value.code = posterData.value.views.length - 1;
};

// 海报是否初始化完成
const firstComplete = ref(false);
// 图片生成完成
const createImgOk = e => {
	console.log(e.detail.path);

	if (firstComplete.value) {
		saveImageToPhotosAlbum(e.detail.path).then(() => {
			uni.hideLoading();
			previewImage([e.detail.path]);
		});
	} else {
		firstComplete.value = true;
		uni.hideLoading();
	}
};

// 图片生成失败
const imgErr = e => {
	uni.hideLoading();
	showToastText('海报加载失败~');
};
</script>
<style scoped>
:global(page) {
	background-color: #ccc;
}
</style>
