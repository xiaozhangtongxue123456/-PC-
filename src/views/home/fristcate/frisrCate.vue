<template>
	<div class="fristCate">
		<!-- 轮播图部分 -->
		<subcarousel :subCarouselData="subCarouselData"></subcarousel>
		<!-- 二级分类的显示 -->
		<!-- 总分类的显示 -->
		<div class="allCategory">
			<h2>总分类</h2>

			<div class="cateItem">
				<div v-for="item in subCateDate.data" :key="item.id">
					<router-link :to="{ path: '/home/subCateDetail', query: { id: item.id } }">
						<img :src="item.picture" alt="" />
						<div class="itemName">{{ item.name }}</div>
					</router-link>
				</div>
			</div>
		</div>
		<!-- 一级分类的二级路由的展示区 -->

		<subCate v-for="item in subCateDate.data" :key="item.id" :data="item"></subCate>
	</div>
</template>

<script setup>
// 引入我们获取一级分类的数据
import getfristCateData from "../../../hooks/useGetfristCate";
// 获取我们的数据
const subCateDate = getfristCateData();
// 获取我们的二级分类的轮播图
import getcarouselData from "@/hooks/useGetcarousel";
const subCarouselData = getcarouselData("2");
// 引入我们的二级轮播图的组件
import subcarousel from "@/components/subcarousel.vue";
// 引入我们的二级分类的主体组件
import subCate from "./subCate/subCate.vue";
</script>

<style lang="less" scoped>
.fristCate {
	width: 80%;
	margin-left: 10%;
	margin-top: 20px;
	.allCategory {
		width: 100%;
		height: 230px;

		margin-top: 20px;
		h2 {
			height: 30px;
			margin: 0;
			line-height: 30px;
			text-align: center;
		}
		.cateItem {
			height: calc(100% - 30px);
			width: 100%;
			display: flex;
			padding: 10px;
			box-sizing: border-box;
			& > div {
				width: 24%;
				height: 100%;

				a {
					text-decoration: none;
					display: flex;
					flex-direction: column;
					width: 100%;
					height: 100%;
					img {
						flex: 2;
						height: 80%;
					}
					.itemName {
						flex: 1;
						line-height: 40px;
						text-align: center;
					}
				}
			}
		}
	}
}
</style>
