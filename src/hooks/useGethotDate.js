import { getCurrentInstance, onMounted, reactive } from "vue";

// 获取我们的人气数据
export default function getHotDate() {
	// 获取我们的this
	const { proxy } = getCurrentInstance();
	// 初始化数据
	let HotData = reactive({
		hotDate: [],
	});
	// 我们发送请求获取数据
	let fun = async () => {
		let result = await proxy.$api.getHotData();
		if (result.status === 200) {
			// 保存我们的数据
			HotData.hotDate = result.data.result;
		}
	};
	onMounted(() => {
		fun();
	});
	// 返回我们的数据
	return HotData;
}
