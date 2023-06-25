<template>
	<view>
		<view class="mStatus">
			{{
				downState == 1
					? '未下载'
					: downState == 2
					? '下载中'
					: downState == 3
					? '下载完成'
					: downState == 4
					? '下载失败'
					: ''
			}}
		</view>

		<button class="mybutton botton1" @tap="downVideo">重新下载</button>
	</view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { showLoading, showToastText } from '@/aTemp/utils/uniAppTools.js';
import { ref } from 'vue';

// 下载路径
const mVideoUrl = ref('');
// 是否下载状态
const downState = ref(1); // 1未下载,2下载中,3下载完成,4下载失败

onLoad(options => {
	const { videoUrl } = options;
	mVideoUrl.value = videoUrl;

	if (mVideoUrl.value) {
		// 开始下载视频
		downVideo();
	}
});

const downVideo = async () => {
	try {
		downState.value = 2;
		showLoading('视频正在下载中...');
		const downRes = await uni.downloadFile({
			url: mVideoUrl.value
		});
		const saveRes = await uni.saveVideoToPhotosAlbum({
			filePath: downRes.tempFilePath
		});
		showToastText('视频已经保存到相册');

		downState.value = 3;
	} catch (e) {
		console.log(e);
		downState.value = 4;
	} finally {
		setTimeout(() => {
			uni.hideLoading();
		}, 2000);
	}
};
</script>

<style lang="scss" scoped>
.mStatus {
	margin-top: 100rpx;
	text-align: center;
}
.mybutton {
	background: $main-color;
	color: #fff;
	margin-top: 100rpx;
	width: 500rpx;
}
.botton1 {
	background: $sub-color;
}
</style>
