<template>
	<uni-list>
		<uni-list-item v-for="(item, index) in listData" :key="index">
			<template v-slot:body>
				<uni-easyinput
					v-model="item.name"
					ref="refInputs"
					trim="all"
					:clearable="false"
					:inputBorder="!item.disabled"
					:disabled="item.disabled"
					:focus="!item.disabled"
				></uni-easyinput>
			</template>
			<template v-slot:footer>
				<view class="btn">
					<view class="btn_item style1" v-if="item.disabled" @tap="enable(item, index)">编辑</view>
					<view class="btn_item style3" v-if="item.disabled" @tap="mDelete(item, index)">删除</view>
					<view class="btn_item style2" v-if="!item.disabled">上移</view>
					<view class="btn_item style2" v-if="!item.disabled">下移</view>
					<view class="btn_item style1" v-if="!item.disabled" @tap="mSave([item, index])">保存</view>
				</view>
			</template>
		</uni-list-item>
	</uni-list>

	<m-btn-fix-bottom text="添加分类" @btnClick="addCategoryList" />
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { _storecaseFlist, _storecaseFdelete, _storecaseFsave } from '@/aTemp/apis/case'
import { showToastText, showModal } from '@/aTemp/utils/uniAppTools.js'
import { _debounce } from '@/aTemp/utils/tools.js'

// 获取 input 对象
const refInputs = ref([])

// 数据列表
const listData = ref([])

const getListData = data => {
	/***
	 * @description: 拉取数据列表
	 */

	_storecaseFlist(data).then(res => {
		const { code, data, msg } = res
		// 拉取数据并赋值
		listData.value = data.map((item, index, arr) => {
			item.disabled = true
			return item
		})
	})
}

onLoad(option => {
	/***
	 * @description: 页面加载
	 */

	// 拉取商品列表
	getListData()
})

const enable = (item, index) => {
	/***
	 * @description: 启用当前编辑选项
	 * @param {*}
	 * item  当前数据
	 * index 当前数据索引
	 */

	item.disabled = false
}

const mSave = _debounce(([item, index]) => {
	/***
	 * @description: 保存分类
	 */
	if (!item.name) {
		showToastText('分类名称不能为空')
		return
	}
	_storecaseFsave(item).then(res => {
		item.disabled = true
	})
}, 100)

const moveUp = () => {
	/***
	 * @description: 上移
	 */
}

const moveDown = () => {
	/***
	 * @description: 下移
	 */
}

const mDelete = (item, index) => {
	/***
	 * @description: 删除
	 */
	showModal('是否删除？').then(res => {
		if (res.confirm) {
			_storecaseFdelete({ id: item.id }).then(res => {
				listData.value.splice(index, 1)
			})
		}
	})
}

const addCategoryList = () => {
	/***
	 * @description: 新增分类
	 */

	listData.value.push({
		name: '',
		disabled: false
	})
}
</script>

<style lang="scss" scoped>
:deep(.is-disabled) {
	background-color: #fff !important;
	color: #606266 !important;
}
.btn {
	flex: none;
	width: 360rpx;
	overflow: hidden;
	@include mFlex;
	justify-content: flex-end;
	> .btn_item {
		flex: none;
		padding: 13rpx 25rpx;
		display: inline-block;
		text-align: center;
		border-radius: 100rpx;
		font-size: 26rpx;
		margin-right: 20rpx;
		&:last-child {
			margin-right: 0;
		}
	}
	> .style1 {
		background-color: $main-color;
		color: #ffffff;
	}
	> .style2 {
		color: $uni-secondary-color;
		border: 1px solid $uni-border-3;
	}
	> .style3 {
		background-color: $sub-color;
		color: #ffffff;
	}
}
</style>
