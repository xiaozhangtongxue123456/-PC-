<template>
	<div class="GoodItem" v-for="item in data" :key="item.id" @click="handleClick(item.id)">
		<div class="GoodImg">
			<img :src="item.picture ? item.picture : defaultImg" alt="" />
		</div>
		<div class="GoodIfon">
			<p>{{ item.name ? item.name : "以告罄" }}</p>
			<p>￥{{ item.price }}</p>
		</div>
	</div>
</template>

<script setup>
// 引入我们没有图片的默认图片
import defaultImg from "../assets/defaultImg.jpg";
// 接受参数：参数数据
let props = defineProps({
	data: {
		type: Array,
	},
});
// // 获取路由器
import { useRouter } from "vue-router";
const Router = useRouter();
// 我们单击商品时的回调函数
const handleClick = (id) => {
	// 路由跳转
	Router.push({
		path: "GoodDetail",
		query: { id: id },
	});
};
</script>

<style lang="less" scoped>
.GoodItem {
	width: 20%;
	height: 200px;

	padding: 10px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	transition: all 0.5s;
	&:hover {
		transform: translate(0, -10px);
		box-shadow: 0, 10px 5px 5px #efefef;
	}
	.GoodImg {
		width: 100%;
		flex: 2;
		box-sizing: border-box;
		img {
			width: 100%;
			height: 120px;
		}
	}
	.GoodIfon {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		p:nth-of-type(1) {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			color: #999;
			font-size: 13px;
			margin-top: 5px;
		}
		p {
			margin: 0;
		}
		p:nth-of-type(2) {
			text-align: center;
			color: red;
		}
	}
}
</style>
