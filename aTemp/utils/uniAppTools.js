// 提示文本弹窗
export function showToastText(title) {
	uni.showToast({
		title: title || '提示文字', //提示文字
		icon: 'none', //不显示图标
		duration: 2000 //持续时间
	})
}

// 加载中
export function showLoading(title) {
	uni.showLoading({
		title: title || '加载中'
	});

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
				reject(error)
			})
	})
}

// 上传文件
export function uploadFile(tempFilePath, url) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: url, //仅为示例，非真实的接口地址
			filePath: tempFilePath,
			name: 'file',
		}).then((uploadFileRes) => {
			const {
				data,
				statusCode
			} = uploadFileRes
			if (statusCode !== 200) {
				showToastText("图片上传失败~")
				reject(data)
			}
			resolve(data)
		}).catch(error => {
			showToastText("图片上传失败~")
			reject(error)
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

// 返回上级并重载onLoad
export function navigateBackRefresh(obj = {}, index = 1) {
	const pages = getCurrentPages()
	const beforePage = pages[pages.length - (index + 1)];
	uni.navigateBack({
		delta: index, //返回上上一级注意这里要设置为2
		success: function() {
			//console.log("返回成功!");
			beforePage.onLoad(obj);
		}
	})
}

// 跳转到非tabbar页面
export function navigateTo(path) {
	uni.navigateTo({
		url: path,
		fail: (err) => {
			uni.reLaunch({
				url: path
			})
		}
	})
}

// 跳转到tabbar页面
export function switchTab(path) {
	uni.switchTab({
		url: path,
		fail: (err) => {
			uni.reLaunch({
				url: path
			})
		}
	})
}

//  关闭当前页面跳转
export function redirectTo(path) {
	uni.redirectTo({
		url: path,
		fail: (err) => {
			uni.reLaunch({
				url: path
			})
		}
	})
}

// 后退页面
export function navigateBack(index = 1) {
	uni.navigateBack({
		delta: index
	})
}

// 拨打电话
export function makePhoneCall(phoneNumber) {
	uni.makePhoneCall({
		phoneNumber: phoneNumber
	});
}
