<template>
	<view class="container">
		<view
			class="fuck-textarea-edit-content"
			:class="{ hidden: EditMode, border: border }"
			:style="getStyle"
			@tap="TapView"
		>
			<text v-if="Content">{{ Content }}</text>
			<view class="fuck-textarea-edit-placeholder" v-else>{{ placeholder }}</view>
		</view>
		<textarea
			class="fuck-textarea-edit-content"
			:cursor-spacing="80"
			:class="{ hidden: !EditMode, border1: border }"
			:style="getStyle"
			:value="val"
			:maxlength="maxlength == '' ? -1 : maxlength"
			:show-confirm-bar="false"
			:disabled="disabled"
			:focus="EditMode"
			@blur="EditBlur"
			@input="handleInput"
		/>
		<view class="inputlength" v-if="maxlength != '' && maxlength >= 0">
			<text class="current">{{ CurrentLength }}</text>
			<text style="margin: 0 6rpx;">/</text>
			<text>{{ maxlength }}</text>
		</view>
	</view>
</template>

<script>
export default {
	name: 'FuckTextarea',
	props: {
		modelValue: {
			type: String,
			default: ''
		},
		width: {
			type: String,
			default: 'calc(100% - 0rpx)'
		},
		height: {
			type: String,
			default: '200rpx'
		},
		disabled: {
			type: Boolean,
			default: false
		},
		border: {
			type: Boolean,
			default: true
		},
		customStyle: {
			type: Object,
			default() {
				return {}
			}
		},
		value: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
		maxlength: {
			type: [Number, String],
			default: -1
		}
	},
	emits: ['update:modelValue'],
	data() {
		return {
			val: '',
			Content: '',
			EditMode: false,
			ShowBorder: true
		}
	},
	computed: {
		CurrentLength() {
			return this.Content.length
		},
		getStyle() {
			let style = {
				minHeight: `${this.height}`,
				height: `${this.height}`,
				width: `${this.width}`
			}
			style.pointerEvents = this.disabled ? 'none' : 'auto'
			style = Object.assign(style, this.customStyle)
			return style
		}
	},
	watch: {
		value(newVal) {
			this.val = newVal
			this.Content = newVal
		},
		modelValue(newVal) {
			this.val = newVal
			this.Content = newVal
		}
	},
	methods: {
		/**
		 * 初始化变量值
		 */
		init() {
			if (this.value || this.value === 0) {
				this.val = this.value
			} else if (this.modelValue || this.modelValue === 0) {
				this.val = this.modelValue
			} else {
				this.val = null
			}
		},
		TapView() {
			this.EditMode = true
		},
		EditBlur(e) {
			this.EditMode = false
			this.Content = e.target.value
		},
		handleInput(e) {
			this.$emit('input', e.target.value)
			this.$emit('update:modelValue', e.target.value)
		}
	},
	created() {
		this.init()
	}
}
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	flex: 1;
	overflow: hidden;
}
.hidden {
	display: none;
}

.fuck-textarea-edit-content {
	color: #333;
	padding: 20rpx;
	font-size: 28rpx;
	line-height: 1.6em;
	white-space: pre-wrap;
	text-align: justify;
	text-justify: inter-ideograph;
	overflow-y: scroll;
	border-radius: 4px;
	// 处理border动画刚开始显示黑色的问题
	border-color: #fff;
	transition-property: border-color;
	transition-duration: 0.3s;
}

.fuck-textarea-edit-content.border {
	border: 1px solid #e5e5e5;
}
.fuck-textarea-edit-content.border1 {
	border: 1px solid #2979ff;
}

.fuck-textarea-edit-placeholder {
	font-size: 26rpx;
	color: #999999;
}

.inputlength {
	font-size: 26rpx;
	padding: 10rpx;
	text-align: right;
	color: #000000;
}

.inputlength .current {
	color: #999999;
}
</style>
