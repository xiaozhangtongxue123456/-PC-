import { getCurrentInstance, onMounted, reactive } from "vue";

// 获取我们新鲜好物的数据
export default function getNewDate() {
	const { proxy } = getCurrentInstance();
	// 准备数据
	let NewDate = reactive({
		data: [],
	});
	// 书写我们的函数
	const getNewDates = async function () {
		// 发送请求
		let result = await proxy.$api.getNewData();
		if (result.status === 200) {
			// 保存数据
			NewDate.data = result.data.result;
		}
	};
	// 调用我们的函数
	onMounted(() => {
		getNewDates();
	});
	// 返回我们的数据
	return NewDate;
}
