// 提示文本弹窗
export function showToastText(title) {
	uni.showToast({
		title, //提示文字
		icon: 'none', //不显示图标
		duration: 2000 //持续时间
	})
}

// 选择照片
export function chooseImage(count) {
	return new Promise((resolve, reject) => {
		uni
			.chooseImage({
				count, // 选择数量
				sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['camera', 'album'], //从相册选择，拍照
			})
			.then(res => {
				resolve(res.tempFilePaths)
			})
			.catch(error => {
				// showToastText("取消选择图片")
			})
	})
}
//  获取图片信息
export function getImageInfo(path) {
	return new Promise((resolve, reject) => {
		uni.getImageInfo({
			src: path,
		}).then(image => {
			resolve(image)
		}).catch(error => {
			showToastText("获取图片失败")
		})
	})
}

//  保存图片到相册
export function saveImageToPhotosAlbum(path) {
	return new Promise((resolve, reject) => {
		uni.saveImageToPhotosAlbum({
			filePath: path,
		}).then(e => {
			resolve(e)
		}).catch(error => {
			showToastText("保存图片失败")
		})
	})
}

//图片预览
export function previewImage(imgList, index = 0) {
	return new Promise((resolve, reject) => {
		uni.previewImage({
			current: index,
			urls: imgList,
		}).then(e => {
			resolve(e)
		}).catch(error => {
			showToastText("图片预览失败")
		})
	})
}

// 确认框
export function showModal(content, title) {
	return uni.showModal({
		title: title || '提示',
		content: content || '这是一个模态弹窗',
	})
}

// 返回上一级重载onLoad
export function navigateBackRefresh(obj = {}, index = 1) {
	const pages = getCurrentPages()
	const beforePage = pages[pages.length - (index + 1)];
	uni.navigateBack({
		delta: index, //返回上上一级注意这里要设置为2
		success: function() {
			//console.log("返回成功!");
			// console.log(beforePage)
			beforePage.onLoad(obj);
		}
	})
}
// 跳转到非tabbar页面
export function navigateTo(path) {
	uni.navigateTo({
		url: path
	})
}
// 后退页面
export function navigateBack(index = 1) {
	uni.navigateBack({
		delta: index
	})
}
