import { _wxMobile } from '@/aTemp/apis/index.js'

const getphonenumber = res1 => {
	const { detail } = res1
	_wxMobile({ code: detail.code }).then(res2 => {
		console.log(res2)
	})
}

// <button @getphonenumber="getphonenumber" open-type="getPhoneNumber">获取手机号</button>