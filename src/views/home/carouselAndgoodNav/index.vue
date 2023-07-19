<template>
	<div class="category">
		<!-- 轮播图部分 -->
		<div class="swiper">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="item in carouseldata.data" :key="item.id"><img :src="item.imgUrl" alt="" /></div>
			</div>
			<!-- 如果需要分页器 -->
			<div class="swiper-pagination"></div>

			<!-- 如果需要导航按钮 -->
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>

			<!-- 如果需要滚动条 -->
			<div class="swiper-scrollbar"></div>
		</div>
		<!-- 商品导航部分 -->
		<div class="goodsNav">
			<div class="listNav">
				<!-- 一级导航栏 -->
				<div v-for="item in catestore.categories" :key="item.id">
					<router-link :to="{ path: '/' }">{{ item.name }}<span>></span></router-link>
					<!-- 二级标签 -->
					<div class="subNav">
						<h1>今日推荐</h1>
						<div class="sublist">
							<div v-for="subNav in item.goods" :key="subNav.id">
								<!-- 图片部分 -->
								<img :src="subNav.picture" alt="" />
								<!-- 文字部分 -->
								<div>
									<!-- 名称 -->
									<p>{{ subNav.name }}</p>
									<!-- 描述 -->
									<p>{{ subNav.desc }}</p>
									<!-- 价格 -->
									<p style="color: red">价格：￥{{ subNav.price }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--  面板组件:人气推荐-->
		<Panel :Data="HotData.hotDate" title="人气推荐" subTitle="好多商品" />
		<!-- 新鲜好物 -->
		<Panel :Data="NewData.data" title="新鲜好物" subTitle="大牌推荐" />
		<!-- 产品列表 -->
		<Product v-for="item in catestore.categories" :key="item.id" :itemData="item"> </Product>
	</div>
</template>

<script setup>
// 引入我们的产品列表区域
import Product from "./product/product.vue";
// 引入我们的面板组件
import Panel from "./panel/Panel.vue";
// 引入获取人气好物的数据的函数
import getHotDate from "@/hooks/useGethotDate";
let HotData = getHotDate();
// 引入我们获取新鲜好物的数据
import getNewDate from "@/hooks/useGetNewData";
let NewData = getNewDate();
// 获取我们的轮播图的数据
import getcarouselData from "@/hooks/useGetcarousel";
import { nextTick, onMounted } from "vue";
// 引入我们的swpier模块
import Swiper, { Pagination, Navigation, Autoplay } from "swiper"; // js 模块
import "swiper/swiper-bundle.css"; // css 模块
Swiper.use([Pagination, Navigation, Autoplay]);
let carouseldata = getcarouselData("1");
// 引入我们的分类仓库
import cateInfo from "@/stores/cateinfo";

const catestore = cateInfo();
catestore.getcateinfo();
// 初始化我们的轮播图
onMounted(() => {
	// 获取我们的分类数据
	catestore.getcateinfo();
});
nextTick(() => {
	// 轮播图的初始化
	const swiper = new Swiper(".swiper", {
		// direction: 'vertical',
		loop: true,
		centeredSlides: true,
		// 如果需要分页器
		pagination: {
			el: ".swiper-pagination",
			clickable: true, // 允许分页点击跳转
		},
		// 自动轮播
		// autoplay: {
		// 	delay: 2000,
		// 	disableOnInteraction: false,
		// },
		//导航小点
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
});
</script>

<style lang="less" scoped>
.category {
	width: 80%;
	margin-left: 10%;

	position: relative;
	.listNav {
		display: flex;
		padding: 0;
		margin: 0;
		width: 250px;
		height: 476px;
		background-color: #111;
		opacity: 0.8;

		position: absolute;
		top: 0;
		left: 0;
		z-index: 99;
		flex-direction: column;
		& > div {
			opacity: 1;
			.subNav {
				position: absolute;
				top: 0;
				left: 250px;
				width: 900px;
				height: 476px;
				visibility: hidden;
				box-sizing: border-box;
				background-color: #fff;

				z-index: 100;

				h1 {
					opacity: 1 !important;
					margin: 0;
					height: 50px;
					line-height: 50px;
					font-weight: 500;
					color: #000;
					padding-left: 20px;
					border-bottom: 1px solid #111;
				}
				& .sublist {
					display: flex;
					flex-wrap: wrap;
					& > div {
						width: 30%;
						height: 130px;
						background-color: #efefef;
						margin-top: 10px;
						margin-left: 20px;
						display: flex;
						color: #000;
						opacity: 1;
						img {
							display: block;
							width: 50%;
							height: 100%;
						}
						div {
							display: flex;
							flex-direction: column;
							p {
								line-height: normal;
								padding: 5px;
								flex: 1;
								height: 33%;
								margin: 0;
								font-size: 12px;
							}
						}
					}
				}
			}
			a {
				width: 100%;
				color: #fff;
				display: flex;
				justify-content: space-between;
				span {
					margin-right: 20px;
				}
			}
			color: #fff;
			display: flex;
			justify-content: space-between;
			padding-left: 40px;
			flex: 1;
			line-height: 52px;
		}
		& > div:hover {
			background-color: #7fffd4;
			.subNav {
				visibility: visible;
				opacity: 1;
				z-index: 999;
			}
			a {
				color: #111;
			}
		}
	}
	.swiper {
		width: 100%;
		height: 100%;
		margin-top: 20px;
		img {
			width: 100%;
		}
	}
}
</style>
