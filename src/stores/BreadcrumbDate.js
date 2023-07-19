// 我们处理面包屑的地方
// 引入我们的仓库函数
import { defineStore } from "pinia";
// 建立我们的仓库
const breadcrumbData = defineStore("breadcrumb", {
	// 定义我们的数据
	state() {
		return {
			// 面包屑数据
			breadcrumbDatas: [],
		};
	},
	// 定义我们的action函数
	actions: {
		savebreadcrumb(value) {
			// 我们判断我们的面包屑里有没有
			if (this.breadcrumbDatas.length === 0) {
				// 我们添加我们的面包屑
				this.breadcrumbDatas.push(value);
			} else {
				// 我们寻找我们的面包屑
				const result = this.breadcrumbDatas.some((item) => {
					if (item == value) {
						return true;
					} else {
						return false;
					}
				});

				if (!result) {
					// 我们添加我们的数组
					this.breadcrumbDatas.push(value);
				} else {
					return null;
				}
			}
		},
	},
});
// 暴露我们的仓库
export default breadcrumbData;
