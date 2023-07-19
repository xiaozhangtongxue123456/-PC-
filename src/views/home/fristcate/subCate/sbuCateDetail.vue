<template>
	<div class="subCate">
		<!-- 标签页 -->
		<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
			<el-tab-pane label="最新商品" name="first"></el-tab-pane>
			<el-tab-pane label="最高人气" name="second"></el-tab-pane>
			<el-tab-pane label="评论最多" name="third"></el-tab-pane>
		</el-tabs>
		<!-- 展示我们的组件 -->
		<div class="subCateItem" v-infinite-scroll="loadMore" infinite-scroll-distance="50" :infinite-scroll-immediate="false" :infinite-scroll-disabled="!totalPages">
			<GoodItem :data="data.goodItemInfo.items"></GoodItem>
			<!-- 数据请求完毕 -->
			<h1 v-if="isshow">亲，数据请求</h1>
		</div>
	</div>
</template>

<script setup>
// 我们定义触底加载的回调函数
const loadMore = async () => {
	// 判断是否还有数据
	console.log(1);

	if (totalPages) {
		console.log(totalPages);
		// 我要请求数据
		// console.log(2);
		params.page += 1;
		let result = await getdata(params);
		console.log(data.goodItemInfo.items, result.items);
		// 我们整理数据
		data.goodItemInfo.items = [...data.goodItemInfo.items, ...result.items];
	} else {
		// 数据加载完毕：关闭我们的加载
		isshow.value = true;
	}
};
// 我们点击tabs栏的回调函数
const handleClick = async (pane, env) => {
	// console.log(123456);
	// console.log(123);
	// 页面数归一
	params.page = 1;
	if (pane.props.label === "最新商品") {
		// 整理数据
		params.sortField = "publishTime";
	} else if (pane.props.label === "最高人气") {
		// 整理数据
		params.sortField = "orderNum";
	} else {
		// 整理数据
		params.sortField = "evaluateNum";
	}
	// 发送请求，获取数据
	data.goodItemInfo = await getdata(params);
};
// 引入我们获取详细信息的api
import { computed, onMounted, reactive, ref, watch } from "vue";
// 获取当前路由
import { useRoute } from "vue-router";
// 引入我们的商品个体
import GoodItem from "@/components/GoodItem.vue";
const Route = useRoute();
// 整理我们的参数
let params = reactive({
	categoryId: Route.query.id,
	page: 1,
	pageSize: 20,
	sortField: "publishTime",
	// 商品id
	// CategoryId: Route.query.id,
	// // 当前页数
	// page: 1,
	// // 每一页的大小
	// pageSize: 20,
	// // 排选字段
	// sortField: "publishTime",
});
// 计算属性
const totalPages = computed(() => {
	if (data.goodItemInfo) {
		if (params.page < data.goodItemInfo.pages) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
});
// 是否展示我们的到底
const isshow = ref(false);
// 引入我们获取数据api:
import getSubItemInfo from "@/hooks/subCateDetail/useGetsubCateDetail";
// 获取我们的数据
// let SubItemInfo = getSubItemInfo(params);
// 结构赋值我们的初始数据和方法
let { getdata } = getSubItemInfo();
// 定义我们的数据容器
let data = reactive({
	goodItemInfo: [],
});
// 在onmounted（）中发送请求
onMounted(async () => {
	data.goodItemInfo = await getdata(params);
});

// 我们结构赋值
// let { data } = SubItemInfo.subCateItem;
// console.log("@", data);
// console.log(getSubItemInfo(params));
// console.log("@", SubItemInfo);
// 定义当前是第几个页面
const activeName = ref("first");
</script>

<style lang="less" scoped>
.subCate {
	width: 80%;
	margin: 0 10%;

	margin-top: 20px;
	.subCate-title {
		height: 60px;
	}
	.demo-tabs > .el-tabs__content {
		padding: 32px;
		color: #6b778c;
		font-size: 32px;
		font-weight: 900;
	}
	.subCateItem {
		display: flex;
		flex-wrap: wrap;
		border: 2px solid #efefef;
		border-bottom: none;
		padding: 10px;
		overflow: auto;
		height: 400px;
	}
}
</style>
