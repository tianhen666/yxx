import {
	defineStore
} from 'pinia';

export const useMainStore = defineStore('main', {
	state: () => ({
		
	}),
	actions: {
		increment() {
			this.count++;
		},
	},
});
