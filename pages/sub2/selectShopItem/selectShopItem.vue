<template>
	<m-shop-list selectOption :selectListId="selectListId" :listData="listData" @selectClick="selectClick" />
	<m-btn-fix-bottom
		v-if="listData.length > 0"
		:text="`${selectListId.length > 0 ? '确认选择 ' + selectListId.length + '件 商品' : '不选择商品'}`"
		@btnClick="confirmSelection"
	/>
	<m-btn-fix-bottom v-else :text="`添加商品`" @btnClick="navigateTo('/pages-sub2/manageShopInput/manageShopInput')" />
</template>

<script setup>
import { ref, reactive, toRaw,computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { navigateTo, navigateBack } from '@/aTemp/utils/uniAppTools.js'
// 选着数量
const selectQuantity = ref(1)
// 选中列表ID
const selectListId = ref([])
// 选中列表数据
const selectListData = reactive({})
// 商品列表
const listData = reactive([
	{
		id: 1,
		title: '1测试标题测试标题测试标题测试标题测试标题测试标题',
		desc: '商品描述测试标题测试标题测试标题测试标题测试标题测试标题测试标题',
		time: '2022.08.18-2022.08.28',
		img: '/static/default/banner.png',
		price: 5980,
		originalPrice: 2980,
		jion: 99,
		type: '拼团'
	},
	{
		id: 2,
		title: '2测试标题测试标题测试标题测试标题测试标题测试标题',
		desc: '商品描述测试标题测试标题测试标题测试标题测试标题测试标题测试标题',
		time: '2022.08.18-2022.08.28',
		img: '/static/default/banner.png',
		price: 5980,
		originalPrice: 2980,
		jion: 99,
		type: '拼团'
	},
	{
		id: 3,
		title: '3测试标题测试标题测试标题测试标题测试标题测试标题',
		desc: '商品描述测试标题测试标题测试标题测试标题测试标题测试标题测试标题',
		time: '2022.08.18-2022.08.28',
		img: '/static/default/banner.png',
		price: 5980,
		originalPrice: 2980,
		jion: 99,
		type: '拼团'
	}
])


// 选中事件
const selectClick = item => {
	const index = selectListId.value.indexOf(item.id+'')
	if (index != -1) {
		selectListId.value.splice(index, 1)
		delete selectListData[`id_${item.id}`]
	} else {
		// 如果设定数量selectQuantit小于等于选中列表selectListId数量
		if (selectQuantity.value <= selectListId.value.length) {
			const resShift = selectListId.value.shift()
			delete selectListData[`id_${resShift}`]
		}
		selectListId.value.push(item.id+'')
		selectListData[`id_${item.id}`] = item
	}
}
// 确认选择
const confirmSelection = () => {
	const rawSelectListId = toRaw(selectListId.value)
	const rawSelectListData = toRaw(selectListData)

	// 触发全局事件
	uni.$emit('shopSelection', { selectListId: rawSelectListId, selectListData: rawSelectListData })
	navigateBack()
}

onLoad(option => {
	selectQuantity.value = parseInt(option.selectQuantity) || 1
	selectListId.value = option?.selectListId.split(',') || []
})
</script>

<style lang="scss" scoped></style>
