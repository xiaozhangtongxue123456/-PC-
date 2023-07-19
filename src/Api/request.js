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
