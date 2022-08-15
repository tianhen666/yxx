<template>
	<view class="container">
		<uni-forms class="form" v-model="formData" label-position="left" label-width="200rpx">
			<uni-forms-item label-width="0px" label-position="top" name="pics">
				<!-- 图片上传 all视频图片，image图片，video视频 -->
				<view class="title">商品图片</view>
				<htz-image-upload :max="5" v-model="pics" mediaType="image" @chooseSuccess="chooseSuccess" />
				<view class="blank20"></view>
			</uni-forms-item>
			<view class="blank32"></view>

			<uni-forms-item label="商品标题" name="title">
				<uni-easyinput
					v-model="formData.title"
					placeholder="请输入商品标题"
					placeholderStyle="color:#999999;font-size:14px;"
				/>
			</uni-forms-item>

			<uni-forms-item label="商品原价" name="priceNormal">
				<uni-easyinput
					type="number"
					v-model="formData.priceNormal"
					placeholder="请输入商品原价"
					placeholderStyle="color:#999999;font-size:14px;"
				/>
			</uni-forms-item>

			

			<uni-forms-item label="商品促销价" name="price">
				<uni-easyinput
					type="number"
					v-model="formData.price"
					placeholder="请输入商品促销价"
					placeholderStyle="color:#999999;font-size:14px;"
				/>
			</uni-forms-item>
			
			<uni-forms-item label="商品库存" name="avaliableCount">
				<uni-number-box :step="10" :max="10000" v-model="formData.avaliableCount" />
				<view class="blank32"></view>
			</uni-forms-item>
			<view class="blank32"></view>
			
			<uni-forms-item label="推广佣金" name="sharePrice">
				<uni-easyinput
					type="number"
					v-model="formData.sharePrice"
					placeholder="请输入推广佣金"
					placeholderStyle="color:#999999;font-size:14px;"
				/>
			</uni-forms-item>

			<uni-forms-item label="是否限购">
				<switch
					color="#4b8eff"
					:checked="parseInt(formData.limitCount) > 0"
					style="transform:scale(0.8)"
					@change="formData.limitCount = parseInt(formData.limitCount) > 0 ? 0 : 1"
				/>
			</uni-forms-item>
			<uni-forms-item label="限购数量" name="limitCount" v-if="parseInt(formData.limitCount) > 0">
				<uni-easyinput
					type="number"
					v-model="formData.limitCount"
					placeholder="请输入限购数量"
					placeholderStyle="color:#999999;font-size:14px;"
				/>
				<view class="blank32"></view>
			</uni-forms-item>
			<view class="blank32"></view>

			<uni-forms-item label="使用规则" name="notice">
				<uni-easyinput
					type="textarea"
					autoHeight
					v-model="formData.notice"
					placeholder="请输入使用规则"
					placeholderStyle="color:#999999;font-size:14px;"
				/>
			</uni-forms-item>

			<uni-forms-item label="商品详情" name="detail">
				<uni-easyinput
					type="number"
					v-model="formData.sort"
					placeholder="请输入商品详情"
					placeholderStyle="color:#999999;font-size:14px;"
				/>
			</uni-forms-item>
			<uni-forms-item label="序号" name="orderNum"><uni-number-box :min="1" :max="255" v-model="formData.orderNum" /></uni-forms-item>
		</uni-forms>
		<view class="blank40"></view>
		<m-btn-fix-bottom text="保存信息" @btnClick="saveClick" />
	</view>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { _storeproductSave, _storeproductGetinfo } from '@/api/yxxApi'
import { isVideo, queryURLparamsRegEs5 } from '@/utils/index'
import { navigateTo, navigateBackRefresh } from '@/utils/uniApp'

// 表单数据
const formData = ref({
	pics: '', //商品图片地址
	avaliableCount: '100',
	title: '测试标题测试标题',
	priceNormal: '200',
	price: '100',
	sharePrice: '20',
	limitCount: '111',
	notice: '使用规则，使用规则，使用规则',
	orderNum: '2'
})

// 商品ID
const shopId = ref(0)
// 页面加载
onLoad(optios => {
	shopId.value = parseInt(optios.id)
	// 是否存在商品ID
	if (shopId.value > 0) {
		// 拉取数据
		_storeproductGetinfo({ id: shopId.value }).then(res => {
			const { data } = res
			formData.value = { ...data }
		})
	}
})

/*
 * 保存banenr信息功能
 *
 */
// 前一个页面tab索引
const prevCurrentIndex = ref(0)
onLoad(optios => {
	prevCurrentIndex.value = parseInt(optios.prevCurrentIndex)
})
// 保存信息
const saveClick = () => {
	_storeproductSave(formData.value).then(res => {
		console.log(res)
		// 返回上一级并且重载noload
		navigateBackRefresh({ currentIndex: prevCurrentIndex.value })
	})
}

/*
 * 图片选择，和图片裁剪功能
 *
 *
 */

// 图片选择接口
// 转为数组
const pics = computed(() => (formData.value.pics ? formData.value.pics.split(',') : []))

const chooseSuccess = res => {
	if (isVideo(res[0])) {
		formData.value.pics.push(res[0])
		return
	}
	// 去裁剪图片页面
	// imgUrl需要裁剪图片地址
	// ratio 比例
	// url 服务器上传地址
	uni.navigateTo({
		url: `/pages-sub2/cropper/cropper?imgUrl=${res[0]}&ratio=${1 / 1}&url=/storeproduct/uploadimage`
	})
}
// 页面加载
onLoad(option => {
	// 注册裁剪完成事件
	uni.$on('cropper', data => {
		const imgUrl = JSON.parse(data.imgUrl)
		if (!formData.value.pics) {
			formData.value.pics = imgUrl.data
		} else {
			formData.value.pics += `,${imgUrl.data}`
		}
	})
})
// 页面卸载
onUnload(() => {
	// 卸载裁剪完成事件
	uni.$off('cropper')
})
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #fff;
}

.container {
	width: 750rpx;
	.title {
		font-size: 32rpx;
		color: $uni-base-color;
		margin-bottom: 20rpx;
	}
}
:deep(.uni-forms) {
	background-color: $uni-bg-color;
	.uni-forms-item {
		margin-bottom: 0 !important;
		padding: 32rpx;
		padding-bottom: 0;
		background-color: #fff;
		&__label {
			font-size: 32rpx !important;
		}
		&__content {
			@include mFlex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
		}
	}
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
