// 分类中心的仓库
// 引入pinia库的定义仓库函数
import { defineStore } from "pinia";
import { getCategory } from "@/Api/request";

// 定义我们的仓库
const cateInfo = defineStore("userInfos", {
	// 定义我们的state
	state: () => {
		// 返回值为一个对象
		return {
			// 分类信息
			categories: [],
		};
	},
	// 定义我们的actions
	actions: {
		// 保持我们的分类数据
		async getcateinfo() {
			let result = await getCategory();
			if (result.status === 200) {
				// 请求成功

				this.categories = result.data.result;
			}
		},
	},
	// 定义我们的getters
	getters: {},
});
// 暴露我们的仓库名
export default cateInfo;
