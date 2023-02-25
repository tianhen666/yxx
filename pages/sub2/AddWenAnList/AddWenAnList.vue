<template>
	<view class="box">
		<uni-forms
			:rules="rules"
			ref="formObj"
			:model="formData"
			label-position="left"
			label-width="0px"
		>
			<uni-forms-item>
				<fuck-textarea
					:border="false"
					v-model="formData.atext"
					placeholder="请输入文案内容"
					:customStyle="{ fontSize: '28rpx' }"
				></fuck-textarea>
			</uni-forms-item>
			<uni-forms-item>
				<view class="img_box">
					<view class="img_box_item">
						<uni-icons type="plusempty" size="30"></uni-icons>
					</view>
				</view>
			</uni-forms-item>
			<view class="line"></view>
			<uni-forms-item>
				<view class="fenlei_box">
					<view class="item title">分类选择:</view>
					<view class="item btn">日常分享</view>
					<view class="item btn current">技术分享</view>
					<view class="item btn">节日分享</view>
				</view>
			</uni-forms-item>
		</uni-forms>
	</view>
</template>

<script setup>
import { ref } from 'vue';
const formData = ref({});
// 获取表单对象
const formObj = ref(null);

// 表单校验
const rules = {
	imgs: {
		rules: [{ errorMessage: '请上传活动视频' }],
		label: '活动视频'
	},
	views: {
		rules: [{ errorMessage: '请输入虚拟人数' }],
		label: '虚拟人数'
	}
};
</script>

<style lang="scss" scoped>
:global(page) {
	background: #fff;
}
:global(.uni-forms .uni-forms-item) {
	padding: 0;
	margin: 0;
}
.box {
	width: $main-width;
	margin: auto;
}
.img_box {
	position: relative;
	padding: 20rpx;
	.img_box_item {
		width: 210rpx;
		height: 210rpx;
		background-color: #eee;
	}
}
.line {
	height: 1rpx;
	background-color: #ccc;
	width: 100%;
}
.fenlei_box {
	display: flex;
	align-items: center;
	padding: 20rpx;
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
		background-color: #ccc;
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
</style>
{
