// 我们的地址的仓库
import { defineStore } from "pinia";
// 创建我们的仓库
const addressStore = defineStore("addressStore", {
  state: () => {
    return {
      // 地址信息
      addressInfo: [],
    };
  },
  // actions信息
  actions: {},
});
// 暴露仓库
export default addressStore;
