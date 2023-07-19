import { getCurrentInstance, onMounted, reactive, watch, onUpdated } from "vue";
import { useRoute } from "vue-router";

export default function getfristCateData() {
	// 我们获取我们的当前的路由，拿到我们的路由跳转的一级id值
	let fristroute = useRoute();
	// 定义数据
	const subcateData = reactive({
		data: [],
		fristId: fristroute.query.fristId,
	});

	// 获取我们的this
	const { proxy } = getCurrentInstance();
	// 定义函数：返送请求
	const fun = async () => {
		const result = await proxy.$api.getsubcateData(fristroute.query.fristId);
		if (result.status === 200) {
			// 保存我们的数据
			subcateData.data = result.data.result.children;
		}
	};
	// 我们要监视我们这个fristid的变化
	watch(
		() => subcateData.fristId,
		() => {
			fun();
		}
	);
	// 更新
	onUpdated(() => {
		console.log(fristroute.query.fristId);
		subcateData.fristId = fristroute.query.fristId;
	});
	// 发送请求
	onMounted(() => {
		fun();
	});
	// 返回值
	return subcateData;
}
