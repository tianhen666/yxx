<template>
	<!-- 商品列表 -->
	<m-shop-list selectOption :selectListId="selectListId" :listData="listData" @selectClick="selectClick" />

	<!-- 返回上一页 -->
	<m-btn-fix-bottom
		v-if="listData.length > 0"
		:text="`${selectListId.length > 0 ? '确认选择商品(' + selectListId.length + ')' : '不选择商品'}`"
		@btnClick="confirmSelection"
	/>

	<!-- 去商品管理页面 -->
	<m-btn-fix-bottom
		v-else
		:text="`去上架商品`"
		@btnClick="navigateTo('/pages/sub2/manageShopList/manageShopList?currentIndex=1')"
	/>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { navigateTo, navigateBack } from '@/aTemp/utils/uniAppTools.js'
import { _storeproductGetlist } from '@/aTemp/apis/shop.js'
import { _storeSelectShop } from '@/aTemp/store/storeSelectShop.js'

// 商品列表
const listData = ref([])

// 拉取商品列表数据
const getListData = data => {
	_storeproductGetlist(data).then(res => {
		const { code, data, msg } = res
		// 将返回数据中的商品图片转化为数组
		listData.value = data.map((item, index, arr) => {
			item.pics = item.pics ? item.pics.split(',') : []
			return item
		})
	})
}

/* 页面显示 */
onShow(options => {
	getListData({ status: 0 })
})

// 商品选择的列表
const storeSelectShop = toRefs(_storeSelectShop())
// 选着数量,选中列表ID,选中列表数据
const { selectQuantity, selectListId, selectListData } = storeSelectShop

// 选中事件
const selectClick = item => {
	const index = selectListId.value.indexOf(item.id + '')
	if (index != -1) {
		selectListId.value.splice(index, 1)
		delete selectListData.value[`id_${item.id}`]
	} else {
		// 如果设定数量selectQuantit小于等于选中列表selectListId.value数量
		if (selectQuantity.value <= selectListId.value.length) {
			const resShift = selectListId.value.shift()
			delete selectListData.value[`id_${resShift}`]
		}
		selectListId.value.push(item.id + '')
		selectListData.value[`id_${item.id}`] = item
	}
}

// 确认选择
const confirmSelection = () => {
	navigateBack()
}
</script>

<style lang="scss" scoped></style>
