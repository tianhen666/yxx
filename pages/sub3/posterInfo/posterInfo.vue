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
import { _browseInfo, _shareInfo } from '@/aTemp/apis/operate.js';
import { _wxWxqrCode } from '@/aTemp/apis/login.js';
import { _posterGetPostercontent, _posterDraftsOne } from '@/aTemp/apis/poster.js';
// base64转图片路径
import { base64ToPath } from 'image-tools';

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js';
const useUserMain = _useUserMain();

// 海报ID
const posterId = ref(0);
provide('posterId', posterId);

// 海报图片数据
const posterData = reactive({ value: {} });
provide('posterData', posterData);

// 海报其他数据(全部属性)
const posterOtherData = reactive({ value: {} });
provide('posterOtherData', posterOtherData);

// 是否门诊草稿箱
const drafts = ref(0);
provide('drafts', drafts);

onLoad(options => {
	// 是否从草稿箱进入
	drafts.value = parseInt(options.drafts) || 0;
	// 海报ID
	posterId.value = parseInt(options.id) || 0;

	// 浏览数据埋点  1/文案宣发 2/活动 3/商品 4/海报 /5科普文章
	_browseInfo({ scene: 4, sceneId: posterId.value });

	// 获取海报数据
	posterGetPostercontent();
});

// 获取海报数据
const posterGetPostercontent = async () => {
	showLoading('海报数据加载中');

	// 获取海报数据
	let res = {};
	if (drafts.value === 1) {
		// 获取门诊草稿箱中的海报
		res = await _posterDraftsOne({
			id: posterId.value
		});
	} else {
		// 获取海报数据
		res = await _posterGetPostercontent({
			id: posterId.value
		});
	}

	const { code, data, msg } = res;
	if (!data) {
		uni.hideLoading();
		showToastText('此海报已被删除');
		setTimeout(() => {
			navigateBack();
		}, 500);
		return;
	}

	// 赋值海报其他参数
	posterOtherData.value = data;
	// 获取海报中json数据
	let getPosterData = JSON.parse(data.posterImg);

	// 如果获取海报内容为空，则自动填充配置信息
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
			top: parseInt(posterData.value.height) - 85 + 'px',
			left: parseInt(posterData.value.width) - 85 + 'px',
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
		// 活动生成海报数据埋点
		_shareInfo({
			scene: 4,
			sceneId: posterId.value,
			type: 3
		});
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
