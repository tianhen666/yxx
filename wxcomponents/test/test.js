// test/test.js
Component({
	observers: {
		"name": function(newVal, oldVal) {
			console.log("监听name", newVal)
			// this.setData(newVal)
		},
		"flag": function(newVal, oldVal) {
			console.log("监听flag的变化",newVal)
		},
		"**": function(newVal, oldVal) {
			console.log("监听所有数据的变化", newVal)
			debugger
			// this.setData({
			// 	...newVal
			// })
			// this.setData(newVal)
		}
	},
	properties: {
		name: {
			type: Object,
		},
		flag: {
			type: String
		}
	},
})
