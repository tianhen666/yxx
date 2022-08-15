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
				<view class="blank32"></view>
			</uni-forms-item>
		</uni-forms>
		<view class="blank40"></view>
		<m-btn-fix-bottom text="保存信息" @btnClick="bannerSaveClick" />
	</view>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { _bannerSave, _bannerList } from '@/api/yxxApi'
import { isVideo,queryURLparamsRegEs5 } from '@/utils/index'
import { navigateTo, navigateBackRefresh } from '@/utils/uniApp'

// 表单数据
const formData = ref({
	banner: '' //图片地址
})

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
// 可以选择的数量
const selectShopQuantity = ref(1)
// 选中的列表数据
const selectShopListData = ref([])
watch(formData, (now, prev) => {
	const shopUrlObj = queryURLparamsRegEs5(now.banurl)
	setTimeout(() => {
		console.log(shopUrlObj.id)
		selectShopListData.value.push({
			id: 1,
			title: '1测试标题测试标题测试标题测试标题测试标题测试标题',
			desc: '商品描述测试标题测试标题测试标题测试标题测试标题测试标题测试标题',
			time: '2022.08.18-2022.08.28',
			img: '/static/default/banner.png',
			price: 5980,
			originalPrice: 2980,
			jion: 99,
			type: '拼团'
		})
	}, 5000)
})

// 选中的列表ID
const selectShoplist = computed(() => {
	const list = selectShopListData.value.map(item => item.id + '')
	return list
})

// 删除事件
const delSelectShopList = index => {
	selectShopListData.value.splice(index, 1)
}
// 页面加载
onLoad(option => {
	// 注册商品选择完成事件
	uni.$on('shopSelection', data => {
		const { selectListId, selectListData } = data
		// 选择完毕后，获取已有的列表ID和新选择的列表ID交集
		const newList = selectListId.filter(item => {
			return selectShoplist.value.indexOf(item) > -1
		})
		// 遍历已有数据列表判断是否需要添加新的数据列表
		selectShopListData.value.forEach((item, index) => {
			if (newList.includes(item.id + '')) {
				console.log('tt_', selectListData.hasOwnProperty('id_' + item.id))
				if (selectListData.hasOwnProperty('id_' + item.id)) {
					//pass
				} else {
					selectListData['id_' + item.id] = item
				}
			}
		})
		selectShopListData.value = Object.values(selectListData)

		// 设置表单数据
		formData.value.banurl = `/pages-sub1/goodsInfo/goodsInfo?id=${selectShopListData.value[0].id}`
	})
})
// 页面卸载
onUnload(() => {
	// 卸载商品选择完成事件
	uni.$off('shopSelection')
})
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #f5f5f5;
}
.container {
	width: 750rpx;
}
:deep(.uni-forms) {
	.uni-forms-item {
		margin-bottom: 0 !important;
		padding: 32rpx;
		padding-bottom: 0;
		background-color: #fff;
		&__label {
			font-size: 32rpx !important;
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
