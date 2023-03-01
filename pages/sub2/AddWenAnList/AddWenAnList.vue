<template>
	<view class="box">
		<uni-forms
			:rules="rules"
			ref="formObj"
			:model="formData"
			label-position="left"
			label-width="0px"
		>
			<uni-forms-item name="content">
				<fuck-textarea
					v-model="formData.content"
					placeholder="请输入文案内容"
					:customStyle="{ fontSize: '28rpx' }"
				></fuck-textarea>
			</uni-forms-item>
			<uni-forms-item name="icon">
				<view class="img_box">
					<view class="img_box_item" @tap="chosePoster">
						<image
							class="img"
							:src="formData.icon.url"
							v-if="formData.icon"
							mode="aspectFit"
						></image>
						<uni-icons type="plusempty" size="30" v-else></uni-icons>
					</view>
				</view>
			</uni-forms-item>
			<view class="line"></view>
			<uni-forms-item name="classify">
				<view class="fenlei_box">
					<view class="item title">分类选择:</view>
					<template v-for="item in tabListObj">
						<view
							class="item btn"
							v-if="item"
							@tap="choseClass(item)"
							:class="{ current: item.id === formData.classify }"
						>
							{{ item.classifyNmae }}
						</view>
					</template>
				</view>
			</uni-forms-item>
		</uni-forms>

		<button class="save_btn" @tap="save">立即保存</button>
	</view>

	<!-- 删除文案 -->
	<view
		class="add"
		v-if="
			(useUserMain.storeId == 1 || useUserMain.storeId == 11) &&
				useUserMain.power != -1 &&
				id != 0
		"
		@tap="storeCopyWriterDel"
	>
		<text>删除</text>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import {
	showToastText,
	showModal,
	navigateTo,
	navigateBack,
	chooseImage
} from '@/aTemp/utils/uniAppTools.js';
import {
	_storeCopyWriterGetStoreCopyWriter,
	_storeCopyWriterDel,
	_storeCopyWriterGetClassify,
	_storeCopyWriterSava
} from '@/aTemp/apis/wenan.js';
// 获取请求地址
import config from '@/global-config.js';

// 全局登录信息
import { _useUserMain } from '@/aTemp/store/userMain.js';
const useUserMain = _useUserMain();

const formData = ref({
	id: 0,
	content: '',
	icon: ''
});
// 获取表单对象
const formObj = ref(null);
const id = ref(0);

onLoad(option => {
	id.value = parseInt(option.id) || 0;
	if (id.value) {
		getData();
	}
	getlist();
});

// 原始数据tab列表
const tabListObj = ref([]);
// 获取分类列表
const getlist = () => {
	_storeCopyWriterGetClassify().then(res => {
		const { msg, data, code } = res;
		tabListObj.value = data;
	});
};

// 获取文案数据
const getData = () => {
	_storeCopyWriterGetStoreCopyWriter({ id: id.value }).then(res => {
		formData.value = res.data;
		formData.value.icon = JSON.parse(res.data.icon);
	});
};

// 表单校验
const rules = {
	classify: {
		rules: [{ errorMessage: '请选择文案分类', required: true }],
		label: '文案分类'
	},
	content: {
		rules: [{ errorMessage: '请输入文案内容', required: true }],
		label: '文案内容'
	}
};

// 表单保存
const save = () => {
	formObj.value
		.validate()
		.then(res => {
			formData.value.userId = useUserMain.userid;
			formData.value.id = id.value;
			formData.value.icon = JSON.stringify(formData.value.icon);
			_storeCopyWriterSava(formData.value).then(res => {
				navigateBack();
			});
		})
		.catch(err => {
			console.log('表单错误信息：', err);
		});
};

// 删除文案
const storeCopyWriterDel = async () => {
	const tRes = await showModal('是否确认删除?');
	if (!tRes.cancel) {
		_storeCopyWriterDel({ id: id.value }).then(res => {
			navigateBack();
		});
	}
};

// 选择分类
const choseClass = item => {
	formData.value.classify = item.id;
};

// 选择海报
import { _useStoreWenAn } from '@/aTemp/store/storeWenAn.js';
const useStoreWenAn = _useStoreWenAn();

// 选择完成后海报变化监听
useStoreWenAn.$subscribe((mutation, state) => {
	if (!state.isChosePoster && state.posterCover) {
		formData.value.icon = { id: state.posterID, url: state.posterCover, type: 'poster' };
		console.log(formData.value.icon);
	}
});

// 选择海报或者自定义图片
const chosePoster = async () => {
	try {
		const choseIndex = await uni.showActionSheet({
			itemList: ['海报图片', '自定义图片']
		});

		if (choseIndex.tapIndex + 1 === 1) {
			useStoreWenAn.$patch({ isChosePoster: true });
			navigateTo('/pages/sub3/posterList/posterList');
		} else if (choseIndex.tapIndex + 1 === 2) {
			// 选择图片
			const imgUrl = await chooseImage(1);

			// 获取图片大小
			const info = await uni.getImageInfo({
				src: imgUrl[0]
			});
			// 获取图片体积
			const { size } = await uni.getFileInfo({
				filePath: imgUrl[0]
			});

			if (info.height / info.width > 2.58) {
				showToastText('图片尺寸比例超过100:258，请调整后上传');
			} else if (size / (1024 * 1024) > 2) {
				showToastText('海报体积超过2M，请调整后上传');
			} else {
				uni.uploadFile({
					url: config.BASE_URL + '/upload-flv/uploadimage',
					filePath: imgUrl[0],
					name: 'file',
					formData: { baseDir: 'wenAn' },
					success: uploadFileRes => {
						const { data } = JSON.parse(uploadFileRes.data);
						formData.value.icon = { id: 0, url: data, type: 'custom' };
					}
				});
			}
		}
	} catch (e) {
		console.log(e);
	}
};
</script>

<style lang="scss" scoped>
:global(page) {
	background: #fff;
}
:global(.uni-forms .uni-forms-item) {
	padding: 0px;
}
:global(.uni-forms .uni-forms-item__label) {
	font-size: 0px !important;
	height: 0px !important;
	padding: 0px !important;
}
.save_btn {
	background-color: $main-color;
	color: #fff;
	margin-top: 50rpx;
	font-size: 26rpx;
	line-height: 3;
}
.box {
	width: $main-width;
	margin: auto;
}
.img_box {
	position: relative;
	.img_box_item {
		width: 350rpx;
		height: 623rpx;
		display: flex;
		border: 1px dotted #eee;
		justify-content: center;
		align-items: center;
		background-color: #eee;
		.img {
			width: 100%;
			height: 100%;
		}
	}
}
.line {
	height: 1rpx;
	background-color: #e5e5e5;
	width: 100%;
}
.fenlei_box {
	display: flex;
	align-items: center;
	font-size: 24rpx;
	.title {
		margin-right: 30rpx;
		font-size: 28rpx;
	}
	.btn {
		width: 140rpx;
		height: 50rpx;
		line-height: 50rpx;
		color: #333;
		background-color: #eee;
		text-align: center;
		border-radius: 10rpx;
		margin-right: 20rpx;
	}
	.btn:last-child {
		margin-right: 0;
	}
	.current {
		background-color: $main-color;
		color: #fff;
	}
}
.add {
	position: fixed;
	right: 40rpx;
	bottom: 60rpx;
	z-index: 10;
	background-color: red;
	color: #fff;
	box-sizing: content-box;
	font-size: 24rpx;
	line-height: 1.5em;
	border-radius: 50%;
	overflow: hidden;
	width: 100rpx;
	height: 100rpx;
	text-align: justify;
	@include mFlex;
	flex-direction: column;
}
</style>
