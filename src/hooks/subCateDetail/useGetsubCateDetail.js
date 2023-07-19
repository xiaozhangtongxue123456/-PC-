// 引入我们的请求二级具体商品的api
import { reactive } from "vue";
import { getSubCateItem } from "../../Api/request";
//获取当前的路由
import { useRoute } from "vue-router";

// 书写我们的hook函数
export default function getSubItemInfo() {
	// 获取我们当前的路由
	const Route = useRoute();

	// 我们定义我们发送请求的数据
	const getdata = async (params) => {
		// 我们发送请求
		// console.log(Route.query.id);
		// 定义我们的数据
		const subCateItem = reactive({
			data: {},
		});
		const result = await getSubCateItem(params);
		//
		// console.log(result.data);
		if (result.data.msg === "操作成功") {
			// console.log(result);
			// 我们请求成功
			subCateItem.data = result.data.result;
		}
		// console.log(subCateItem);
		return subCateItem.data;
	};
	//我们发送请求
	// onMounted(async () => {
	// 	await getdata();
	// });

	// 暴露我们数据
	return { getdata };
}
