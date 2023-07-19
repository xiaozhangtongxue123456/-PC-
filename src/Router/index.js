// 引入我们的路由器
import { createRouter, createWebHashHistory } from "vue-router";
// 引入我们的路由
import routes from "./routes";
// 创建我们的路由器
const router = createRouter({
	scrollBehavior(to, from, savedPosition) {
		// 始终滚动到顶部
		return { top: 0 };
	},
	routes: routes,
	history: createWebHashHistory(),
});
// 我们跳转路由的距顶端top为0

// 暴露我们的路由器
export default router;
