// 引入我们重新写的axios
import requerst from "@/Api/index";
// 获取我们的分类的数据
export const getCategory = () => {
  return requerst({
    url: "/home/category/head",
    method: "GET",
  });
};
// 获取我们轮播图的数据
export const getlunboData = (value) => {
  return requerst({
    url: "/home/banner",
    method: "get",
    query: {
      distributionSite: value,
    },
  });
};
// 获取我们的人气好物的数据
export const getHotData = () => {
  return requerst({
    url: "/home/hot",
    method: "get",
  });
};
// 获取我们的新鲜好物
export const getNewData = () => {
  return requerst({
    url: "/home/new",
    method: "get",
  });
};
// 获取我们的二级分类的数据
export const getsubcateData = (id) => {
  return requerst({
    url: "/category",
    params: {
      id: id,
    },
    method: "GET",
  });
};
// 获取我们的二级商品的具体商品
export const getSubCateItem = (data) => {
  return requerst({
    url: "/category/goods/temporary",
    method: "POST",
    data,
  });
};
// 获取商品的详细信息
export const getGoodInfoApi = (id) => {
  return requerst({
    url: "/goods",
    method: "GET",
    params: {
      id: id,
    },
  });
};
// 获取我们的热门数据
export const getHotGoodApi = (id, type, limit) => {
  return requerst({
    url: "/goods/hot",
    method: "GET",
    params: {
      id,
      type,
      limit,
    },
  });
};
// 我们登录的api
export const loginApi = ({ account, password }) => {
  return requerst({
    url: "/login",
    method: "post",
    data: {
      account,
      password,
    },
  });
};
// 添加我们购物车的Api
export const addShopCarApi = (skuId, count) => {
  return requerst({
    url: "/member/cart",
    method: "post",
    data: {
      skuId: skuId,
      count: count,
    },
  });
};
// 我们删除我们的购物车商品的Api
export const deteleGoodItemApi = (ids) => {
  return requerst({
    url: "/member/cart",
    method: "DELETE",
    data: {
      ids,
    },
  });
};
// 获取我们的购物车列表
export const getShopCarApi = () => {
  return requerst({
    url: "/member/cart",
    method: "get",
  });
};
// 合并本地购物车的Api
export const mergeShopCarApi = (data) => {
  return requerst({
    url: "/member/cart/merge",
    method: "post",
    data,
  });
};
// 获取我们的订单的信息的Api
export const getOrderInfoApi = () => {
  return requerst({
    url: "/member/order/pre",
    method: "get",
  });
};
// 生成订单编号的Api
export const getOrderCodeApi = ({ goods, addressId }) => {
  return requerst({
    url: "/member/order",
    method: "post",
    data: {
      deliveryTimeType: 1,
      payType: 1,
      payChannel: 1,
      buyerMessage: "",
      goods,
      addressId,
    },
  });
};
// 获取订单详情的Api
export const getOrderDetailApi = (id) => {
  return requerst({
    url: `/member/order/${id}`,
    method: "get",
  });
};
