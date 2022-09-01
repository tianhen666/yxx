import {
	defineConfig
} from "vite";
import uni from "@dcloudio/vite-plugin-uni";

export default defineConfig({
	build: {
		sourcemap: true,
	},
	server: {
		port: '8000',
		proxy: {
			'^/api': {
				target: 'http://192.168.5.116:8089',
				changeOrigin: true,
			}
		}
	},
	plugins: [uni()],
});
