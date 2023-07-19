<template>
	<div class="panel">
		<!-- 标题 -->
		<div class="title">
			<h3>{{ title }}</h3>
			<p>{{ subTitle }}</p>
		</div>
		<!-- 图片部分 -->
		<div class="img-box">
			<div class="img-item" v-for="item in Data" :key="item.id" @click="handleClick(item.id)">
				<!-- 商品图片 -->
				<div class="img">
					<img alt="" v-img-lazy="item.picture" />
				</div>

				<!-- 商品信息 -->
				<div class="good-info">
					<div class="descrit">{{ item.title || item.desc }}</div>
					<div class="tip" v-if="item.alt">{{ item.alt }}</div>
					<div class="tip" v-if="item.price">￥{{ item.price }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
// 接受父组件传递的数据

let Props = defineProps({
	Data: {
		type: Array,
	},
	title: {
		type: String,
	},
	subTitle: {
		tupe: String,
	},
});
// 获取路由器
import { useRouter } from "vue-router";
const router = useRouter();
// 我们点击回调的函数
const handleClick = (id) => {
	// 我们进行路由跳转
	router.push({
		path: "/home/GoodDetail",
		query: { id },
	});
};
</script>

<style lang="less" scoped>
.panel {
	width: 100%;
	height: 300px;
	margin-top: 20px;
	box-sizing: border-box;
	border: 1px solid #efefef;
	.title {
		display: flex;
		height: 40px;
		line-height: 40px;
		padding-left: 20px;
		box-sizing: border-box;
		p {
			height: 100%;
			margin: 0;
			font-size: 13px;
			padding-left: 12px;
			color: #999;
			line-height: normal;
			padding-top: 15px;
			box-sizing: border-box;
		}
		h3 {
			margin: 0;
			height: 100%;
		}
	}
	.img-box {
		position: relative;

		width: 100%;
		height: 260px;
		box-sizing: border-box;
		display: flex;
		box-sizing: border-box;
		flex-direction: row;
		justify-content: space-between;

		transition: all 0.4s;
		.img-item {
			border: 1px solid #efefef;
			box-sizing: border-box;
			padding: 10px;
			flex: 1;
			height: 260px;
			display: flex;
			flex-direction: column;
			.good-info {
				flex: 1;
				text-align: center;
				div {
					margin-top: 10px;
				}
			}
			.img {
				flex: 2;
				height: 50%;
				img {
					display: block;
					width: 100%;
					height: 100%;
				}
			}
		}
		.img-item:hover {
			box-shadow: 0px 10px 5px 5px #efefef;
			transform: translate(0, -10px);
		}
	}
}
</style>
