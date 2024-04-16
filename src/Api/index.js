// 我们重新配置我们的axios
import axios from "axios";
// 引入我们element中的组件
import { ElMessage } from "element-plus";

// 引入我们的路由器
import router from "@/Router/index";
// 引入我们的仓库
import loginStore from "@/stores/loginStore";

const requerst = axios.create({
  // 基本路径
  baseURL: import.meta.env.VITE_BASE_URL,
  // 请求时间import loginStore from './../stores/loginStore';

  timeout: 5000,
});
// 配置请求拦截器和响应拦截器
requerst.interceptors.request.use((config) => {
  // 获取我们的token
  let token =
    JSON.parse(localStorage.getItem("login"))?.userInfos.token || false;
  if (token) {
    // 如果我们有token，我们要在每次请求中加上token
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// 相应拦截器
requerst.interceptors.response.use(
  (res) => {
    return res;
  }
  // (e) => {
  //   const Store = loginStore();
  //   console.log(e);
  //   // 我们来检测我们的token失效的：我们的token有时效性，
  //   if (e.response?.status == 401) {
  //     // 给出提示
  //     ElMessage.error(e.response.data.message);
  //     // 清楚token值
  //     Store.loginOut();
  //     // 跳转到登录页面

  //     router.push({
  //       path: "/",
  //     });
  //   }
  // }
);
// 暴露我们的请求
export default requerst;
