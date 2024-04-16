import { defineStore } from "pinia";
// 引入我们加入购物车和获取购物车的Api
import {
  getShopCarApi,
  addShopCarApi,
  deteleGoodItemApi,
  mergeShopCarApi,
} from "@/Api/request";
import { ElMessage } from "element-plus";
const Store = defineStore("shopCarStore", {
  // 定义我们的数据
  state: () => {
    return {
      // 购物车数据
      shopCarInfo: [],
      // 是否登录
      isLogin: false,
    };
  },
  // 定义我们的方法
  actions: {
    //添加商品的方法
    async addShopCar(params) {
      // 我们要判断一下是否是登录状态的
      if (this.isLogin) {
        // 已登录：我们通过接口
        try {
          //添加
          await addShopCarApi(params.id, params.count);
          // 添加成功
          ElMessage({
            message: "成功添加",
            type: "success",
          });
          // 获取最新数据
          let result = await getShopCarApi();
          this.shopCarInfo = result.data.result;
        } catch (error) {
          // 添加失败
          ElMessage.error("添加失败");
        }
      } else {
        // 我们未登录
        console.log(123);
        //   查看现购物车中是否有商品
        let result = this.shopCarInfo.findIndex((item) => {
          if (item.skuId === params.id) {
            return true;
          }
        });

        if (result === -1) {
          //   说明购物车中没有：我们发请求，添加我们的商品
          this.shopCarInfo.push(params);
        } else {
          //   购物车中有，我们只添加数量
          this.shopCarInfo[result].count += params.count;
        }
      }
    },
    // 删除商品的action
    async deteleGooditem(ids) {
      if (this.isLogin) {
        // 已登录:整理我们的参数
        let arrIds = [`${ids}`];
        // 发送请求
        try {
          await deteleGoodItemApi(arrIds);
          // 获取最新数据
          let result = await getShopCarApi();
          this.shopCarInfo = result.data.result;
        } catch (error) {}
      } else {
        // 未登录
        let resultIndex = this.shopCarInfo.findIndex((item) => {
          if (item.skuId === ids) {
            return true;
          }
        });
        // 我们删除数组中的元素
        this.shopCarInfo.splice(resultIndex, 1);
      }
    },
    // 修改我们商品的选中状态的：修改一个的
    editGoodStatu(items) {
      let resultIndex = this.shopCarInfo.findIndex((item) => {
        if (item.skuId === items.skuId) {
          return true;
        }
      });
      // 我们修改状态
      this.shopCarInfo[resultIndex].selected =
        !this.shopCarInfo[resultIndex].selected;
    },
    editAllGoodItem() {
      // 我们要修改全部
      this.shopCarInfo.forEach((item) => {
        item.selected = !item.selected;
      });
    },
    // 合并我们的本地的购物车数据
    async mergeShopCar(data) {
      // 发送请求
      let result = await mergeShopCarApi(data);
      console.log(result);
    },
  },

  // 持久化处理
  // 开启持久化
  persist: {
    enabled: true,
    strategies: [
      {
        // 本地存储中的键
        key: "shopCarInfo",
        // 使用的本地存储类型，默认使用sessionStorage
        storage: localStorage,
      },
    ],
  },
});
// 暴露仓库
export default Store;
