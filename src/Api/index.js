// 我们重新配置我们的axios
import axios from "axios";

const requerst = axios.create({
	// 基本路径
	baseURL: import.meta.env.VITE_BASE_URL,
	// 请求时间
	timeout: 5000,
});
// 配置请求拦截器和响应拦截器
requerst.interceptors.request.use((config) => {
	return config;
});
// 相应拦截器
requerst.interceptors.response.use((res) => {
	return res;
});
// 暴露我们的请求
export default requerst;
