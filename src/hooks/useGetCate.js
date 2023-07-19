// 引入我们所需的api

import { reactive, getCurrentInstance, onMounted } from "vue";

export default function getCategoryDate() {
	// 获取我们的api接口
	const { proxy } = getCurrentInstance();
	// 定义数据
	let categoryData = reactive({
		data: [],
		action: "",
	});
	//定义我们的获取分类的函数
	let getcateData = async () => {
		let result = await proxy.$api.getCategory();
		// 保存我们的数据
		if (result.status === 200) {
			categoryData.data = result.data.result;
			categoryData.action = result.data.result[0].id;
		}
	};
	// 执行我们的函数
	onMounted(() => {
		getcateData();
	});
	return categoryData;
}
