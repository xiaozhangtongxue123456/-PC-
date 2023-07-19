import { getCurrentInstance, onMounted, reactive } from "vue";

// 引入我们所用的api
export default function getcarouselData(value) {
	// 获取我们的实例对象
	const { proxy } = getCurrentInstance();
	// 初始化数据
	let carouselData = reactive({
		// 首页轮播图数据
		data: [],
		// 二级轮播图数据
		subData: [],
	});
	// 定义发请请求的函数
	const getData = async () => {
		let result = await proxy.$api.getlunboData(value);

		if (result.status === 200) {
			// 请求成功:保存数据
			if (value === "1") {
				carouselData.data = result.data.result;
			} else {
				carouselData.subData = result.data.result;
			}
		}
	};
	// 在挂载完了，我们发请请求
	onMounted(() => {
		getData();
	});
	return carouselData;
}
