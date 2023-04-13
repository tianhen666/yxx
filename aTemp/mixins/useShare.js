import {
	onShareAppMessage,
	onShareTimeline
} from "@dcloudio/uni-app";

import {
	_shareInfo
} from '@/aTemp/apis/operate.js';

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

	if (!shareInfo.scene) {
		shareInfo.scene = 0
	}
	if (!shareInfo.sceneId) {
		shareInfo.sceneId = 0
	}


	// #ifdef MP-WEIXIN
	/* 分享到聊天框 */
	onShareAppMessage(() => {
		// 分享到聊天框埋点 
		// _shareInfo({
		// 	scene: shareInfo.scene,
		// 	sceneId: shareInfo.sceneId,
		// 	type: 1
		// });

		// console.log("分享到聊天框")
		return {
			title: shareInfo.title,
			path: shareInfo.path,
			imageUrl: shareInfo.imageUrl,
		}
	})

	/* 分享到朋友圈 */
	onShareTimeline(() => {
		// 分享到朋友圈框埋点
		// _shareInfo({
		// 	scene: shareInfo.scene,
		// 	sceneId: shareInfo.sceneId,
		// 	type: 2
		// });

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