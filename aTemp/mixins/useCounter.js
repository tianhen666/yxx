import {
	ref,
	computed
} from "vue";
// 所有引入只会创建一次
const count1 = ref(1);
export default function() {
	const count2 = ref(1);
	const double = computed(() => count2.value * 2)

	function increment() {
		count1.value++;
		count2.value++;
	}
	return {
		count1,
		count2,
		double,
		increment
	}
}
