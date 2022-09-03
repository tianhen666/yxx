import {
	onShareAppMessage,
	onShareTimeline
} from "@dcloudio/uni-app";

export default function(shareInfo) {
	// console.log(shareInfo)
	// 如果为空设置默认值
	if (!shareInfo.title) {
		shareInfo.title = ''
	}
	if (!shareInfo.path) {
		shareInfo.path = `/pages/main/index/index`
	}
	if (!shareInfo.imageUrl) {
		shareInfo.imageUrl = 'https://imgs.ledianduo.com/tooth/activity/0e5d2c8c-5a95-4daf-817e-feb6686e2e4b.jpg'
	}


	// #ifdef MP-WEIXIN
	/* 分享到聊天框 */
	onShareAppMessage(() => {
		// console.log("分享到聊天框")
		return {
			title: shareInfo.title,
			path: shareInfo.path,
			imageUrl: shareInfo.imageUrl,
		}
	})

	/* 分享到朋友圈 */
	onShareTimeline(() => {
		// console.log("分享到朋友圈")
		// console.log(shareInfo.query)
		return {
			query: shareInfo.query,
			title: shareInfo.title,
			imageUrl: shareInfo.imageUrl,
		}
	})
	// #endif
}
