<template>
	<view>
		<view class="area">
			<view @touchstart="mPosterDiyWxs.touchstart" @touchmove="mPosterDiyWxs.touchmove" class="movable">{{ a }}</view>
		</view>
	</view>
</template>
<script src="./wxs/m-poster-diy-wxs.wxs" module="mPosterDiyWxs" lang="wxs"></script>

<script>
export default {
	data() {
		return {
			a: '移动'
		}
	}
}
</script>

<style>
.area {
	position: absolute;
	width: 100%;
	height: 100%;
}
.movable {
	position: absolute;
	width: 100px;
	height: 100px;
	left: 50px;
	top: 50px;
	color: white;
	text-align: center;
	line-height: 100px;
	background-color: red;
}
</style>
