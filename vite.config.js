import {
	defineConfig
} from "vite";
import uni from "@dcloudio/vite-plugin-uni";
// 全局基础配置
import config from './global-config.js'

export default defineConfig({
	build: {
		sourcemap: true,
	},
	server: {
		port: '8000',
		proxy: {
			'^/api': {
				target: config.BASE_URL,
				changeOrigin: true,
			}
		}
	},
	plugins: [uni()],
});
