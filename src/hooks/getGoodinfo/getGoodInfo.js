// 我们写我们的得到商品信息的hook函数

// 引入我们的发送请求api
import { getGoodInfoApi } from "@/Api/request";
import { reactive } from "vue";
export default function getGoodInfo() {
	// 定义我们的数据
	let goodDetail = reactive({
		goodInfo: {},
	});
	// 抒写我们的函数
	async function getgood(id) {
		// 我们发送请求
		let result = await getGoodInfoApi(id);
		// 保存我们的数据
		if (result.data.msg === "操作成功") {
			goodDetail.goodInfo = result.data.result;
		}
	}

	return { goodDetail, getgood };
}
