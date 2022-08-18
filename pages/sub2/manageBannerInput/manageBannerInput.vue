<template>
	<view class="container">
		<uni-forms v-model="formData" label-position="top" label-width="100%">
			<uni-forms-item label="banner图" name="banner">
				<!-- 图片上传 all -->
				<htz-image-upload ratio="60%" :max="1" v-model="bannerArray" mediaType="image" @chooseSuccess="chooseSuccess" />
			</uni-forms-item>

			<uni-forms-item label="排序" name="sort">
				<uni-easyinput
					type="number"
					v-model="formData.sort"
					placeholder="请输入排序"
					placeholderStyle="color:#999999;font-size:14px;"
				/>
				<view class="blank32"></view>
			</uni-forms-item>
			<view class="blank20"></view>

			<uni-forms-item label="相关商品" name="banurl">
				<!-- 选项 -->
				<m-xiangguan-goods
					@delClick="delSelectShopList"
					v-if="selectShopListData.length > 0"
					:shopListData="selectShopListData"
				/>
				<!-- 提示 -->
				<view class="xiangguang" v-else>
					<view class="xiangguang_tips">添加相关商品</view>
					<view class="xiangguang_tips">点击banner图跳转到这个商品</view>
				</view>
				<!-- 去选择页面按钮 -->
				<view
					class="xiangguang_box1"
					v-if="selectShopQuantity > selectShopListData.length"
					@tap="
						navigateTo(
							`/pages-sub2/selectShopItem/selectShopItem?selectQuantity=${selectShopQuantity}&selectListId=${selectShoplist}`
						)
					"
				>
					<image class="image" src="/static/default/add.png" mode="aspectFill"></image>
					<view class="text">添加相关商品</view>
				</view>
			</uni-forms-item>
		</uni-forms>
		<view class="blank40"></view>
		<m-btn-fix-bottom text="保存信息" @btnClick="bannerSaveClick" />
	</view>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { _bannerSave, _bannerList } from '@/aTemp/apis/banner'
import { isVideo, queryURLparamsRegEs5 } from '@/aTemp/utils/tools'
import { navigateTo, navigateBackRefresh } from '@/aTemp/utils/uniAppTools'

// 表单数据
const formData = ref({})

// bannerID
const bannerId = ref(0)
// 页面加载
onLoad(optios => {
	bannerId.value = parseInt(optios.id)
	// 是否存在bannerId
	if (bannerId.value > 0) {
		// 拉取数据
		_bannerList({ id: bannerId.value }).then(res => {
			const { data } = res
			formData.value = { ...data }
			formData.value.banurl = '/pages-sub1/goodsInfo/goodsInfo?id=3'
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
const bannerSaveClick = () => {
	_bannerSave(formData.value).then(res => {
		// 返回上一级并且重载noload
		navigateBackRefresh({ currentIndex: prevCurrentIndex.value })
	})
}

/*
 * 图片选择，和图片裁剪功能
 *
 *
 */

// 渲染时banner列表
const bannerArray = computed(() => {
	return formData.value.banner ? [formData.value.banner] : []
})
// 图片选择接口
const chooseSuccess = res => {
	if (isVideo(res[0])) {
		formData.value.banner = res[0]
		return
	}
	// 去裁剪图片页面
	// imgUrl需要裁剪图片地址
	// ratio 比例
	// url 服务器上传地址
	uni.navigateTo({
		url: `/pages-sub2/cropper/cropper?imgUrl=${res[0]}&ratio=${5 / 3}&url=/banner/uploadimage`
	})
}

// 页面加载
onLoad(option => {
	// 注册裁剪完成事件
	uni.$on('cropper', data => {
		const imgUrl = JSON.parse(data.imgUrl)
		formData.value.banner = imgUrl.data
	})
})
// 页面卸载
onUnload(() => {
	// 卸载裁剪完成事件
	uni.$off('cropper')
})

/*
 * 选择相关商品功能
 *
 */

</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #f5f5f5;
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
