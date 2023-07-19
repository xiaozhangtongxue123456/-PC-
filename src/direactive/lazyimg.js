// 我们设计一个全局指令
import { useIntersectionObserver } from "@vueuse/core";

// 我们暴露我们的插件
export const LazyImg = {
	install(app) {
		app.directive("img-lazy", {
			// 我们只关注我们这个时期的
			mounted(el, binging) {
				// 监视我们的元素
				const { stop } = useIntersectionObserver(el, ([{ isIntersecting }], observerElement) => {
					if (isIntersecting) {
						el.src = binging.value;
						stop();
					}
				});
			},
		});
	},
};
