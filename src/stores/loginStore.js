// 我们建立我们的登录仓库：引入我们的创建仓库的api
import { defineStore } from "pinia";
// 引入我们登录的Api
import { loginApi } from "@/Api/request";
// import loginStore from "./loginStore";

const loginStore = defineStore("login", {
  // 数据
  state: () => {
    return {
      // 是否登录
      islogin: false,
      // 用户信息
      userInfos: {},
    };
  },
  // 方法
  actions: {
    // 登录
    async login(usrInfo) {
      // 我们发送请求

      let result = await loginApi(usrInfo);
      console.log(result);
      //   保存我们的数据

      if (result.status === 200) {
        this.userInfos = result.data.result;
      }

      //   登录变成
      this.islogin = true;
    },
    // 退出登录
    loginOut() {
      // 清楚我们的信息
      (this.islogin = false), (this.userInfos = {});
    },
  },
  // 开启持久化
  persist: {
    enabled: true,
    strategies: [
      {
        // 本地存储中的键
        key: "login",
        // 使用的本地存储类型，默认使用sessionStorage
        storage: localStorage,
      },
    ],
  },
});
// const loginStore = defineStore("login", () => {
//   // 定义数据
//   const userInfo = ref({});
//   // 定义方法:登录方法
//   const login = async (info) => {
//     //   我们发送请求
//     console.log(123);
//     let result = await loginApi(info);
//     console.log(result);
//     //   保存我们的数据
//     userInfo.value = result.data.result;
//   };
//   // 返回我们的数据和方法
//   return {
//     userInfo,
//     login,
//   };
// });
export default loginStore;
