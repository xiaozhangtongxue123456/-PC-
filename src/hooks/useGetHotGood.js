import { reactive } from "vue";
// 引入我们的请求api
import { getHotGoodApi } from "@/Api/request";
export default function getHotGood() {
	// 我们定义我们的数据
	const hotGood = reactive({
		dayHotGoodData: [],
		weekHotGoodData: [],
	});
	// 我们定义我们的函数
	const getHotGoodData = async function (id, type, limit) {
		// 我们发送请求
		let result = await getHotGoodApi(id, type, limit);
		if (type === 1) {
			// 24小时热门榜
			hotGood.dayHotGoodData = result.data.result;
		} else {
			hotGood.weekHotGoodData = result.data.result;
		}
	};
	// 返回我们数据跟方法
	return { hotGood, getHotGoodData };
}
