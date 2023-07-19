<template>
	<div class="GoodDetail">
		<div class="GoodInfo">
			<!-- 图片模块 -->
			<div class="GoodImg">
				<div class="BigImg">123</div>
				<div class="SmallImg">123</div>
			</div>
			<!-- 评价模块 -->
			<div class="GoodEvaluate">
				<ul>
					<li class="evaluateItem">
						<p>销售人气</p>
						<p>{{ goodDetail.goodInfo.salesCount }}</p>
						<p>
							<el-icon color="green"><Flag /></el-icon>销售人气
						</p>
					</li>
					<li class="evaluateItem">
						<p>商品评价</p>
						<p>{{ goodDetail.goodInfo.commentCount }}</p>
						<p>
							<el-icon color="green"><Message /></el-icon>商品评价
						</p>
					</li>
					<li class="evaluateItem">
						<p>收藏人气</p>
						<p>{{ goodDetail.goodInfo.collectCount }}</p>
						<p>
							<el-icon color="green"><StarFilled /></el-icon>收藏人气
						</p>
					</li>
					<li class="evaluateItem">
						<p>品牌信息</p>
						<!-- <p>{{ goodDetail.goodInfo.brand.name ? goodDetail.goodInfo.brand.name : "" }}</p> -->
						<p>
							<el-icon color="green"><Goods /></el-icon>品牌主页
						</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="Goodshow">
			<!-- 商品名字 -->
			<p class="good-name">{{ goodDetail.goodInfo.name }}</p>
			<p class="good-des">{{ goodDetail.goodInfo.desc }}</p>
			<p class="good-price">
				￥{{ goodDetail.goodInfo.price }}<span>￥{{ goodDetail.goodInfo.oldPrice }}</span>
			</p>
			<div class="good-server">
				<div class="good-promoter"></div>
			</div>
		</div>
	</div>
	<!-- 商品介绍区 -->
	<div class="detail">
		<div class="good-introduce" v-if="goodDetail.goodInfo.details?.properties">
			<h1>商品详情</h1>
			<ul>
				<li v-for="item in goodDetail.goodInfo.details.properties" :key="item.name">
					<span>{{ item.name }}:</span><span>{{ item.value }}</span>
				</li>
			</ul>
			<!-- 图片展示 -->
			<img :src="item" alt="" v-for="item in goodDetail.goodInfo.details.pictures" :key="item" style="width: 100%" />
		</div>
		<div class="hot-img"><hotItem title="24小时热榜" :hotItem="goodDetail.goodInfo.hotByDay" /></div>
	</div>
</template>

<script setup>
// 获取我们的路由
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
// 引入我们的热品模块
import hotItem from "@/components/hotitem.vue";
// 引入我们获取商品个体信息的api
import getGoodInfo from "@/hooks/getGoodinfo/getGoodInfo";
const { goodDetail, getgood } = getGoodInfo();
const route = useRoute();
// 定义我们数据
// const data = reactive({
// 	// 商品个体信息
// 	goodInfo: {},
// });
// 发送我们请求
onMounted(() => {
	// 获取我们的商品个体信息
	// console.log(route.query.id);
	getgood(route.query.id);
});
</script>

<style lang="less" scoped>
.GoodDetail {
	width: 80%;
	margin: 0 10%;
	display: flex;
	margin-top: 10px;
	.GoodInfo {
		flex: 1;
		.GoodImg {
			display: flex;
			background-color: red;
			height: 350px;
			.BigImg {
				flex: 4;
			}
			.SmallImg {
				flex: 1;
			}
		}
		.GoodEvaluate {
			width: 100%;
			height: 80px;

			ul {
				width: 100%;
				height: 100%;
				display: flex;
				margin: 0;
				padding: 0;
				justify-content: space-between;
				li {
					width: 22%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 10px;
					box-sizing: border-box;
					border-right: 2px solid #efefef;
					p {
						margin: 0;
						text-align: center;
						font-size: 13px;
						i {
							vertical-align: middle;
							margin-right: 1px;
						}
					}
					p:nth-of-type(2) {
						color: red;
						font-size: 13px;
					}
					p:nth-of-type(1) {
						color: #666;
					}
				}
			}
		}
	}

	.Goodshow {
		flex: 1;
		padding-left: 10px;
		box-sizing: border-box;
		p {
			margin: 0;
			padding: 0;
		}
		.good-name {
			font-size: 22px;
			font-weight: 700;
		}
		.good-des {
			margin-top: 10px;
			font-size: 12px;
			color: #999;
		}
		.good-price {
			padding-top: 10px;
			color: #c00000;
			font-size: 20px;
			font-weight: 700;
			span {
				color: #999;
				text-decoration: line-through;
				font-size: 12px;
				padding-left: 10px;
			}
		}
		.good-server {
			width: 100%;
			height: 120px;
		}
	}
}
.detail {
	width: 80%;
	display: flex;
	margin: 0 10%;
	.good-introduce {
		flex: 4;

		margin-top: 20px;
		h1 {
			margin: 0;
			padding: 0;
			height: 60px;
			line-height: 60px;
			border-bottom: 1px solid #efefef;
			box-sizing: border-box;
			padding-left: 10px;
		}
		ul {
			margin: 0;
			padding: 0;
			display: flex;
			flex-wrap: wrap;
			li {
				width: 50%;
				font-size: 14px;

				display: flex;
				span {
					padding: 10px 10px;
				}
				span:nth-of-type(1) {
					color: #999;
				}
			}
			li:nth-last-of-type(1) {
				width: 100%;
				display: flex;
			}
		}
	}
	.hot-img {
		flex: 1;
		padding: 10px;
		box-sizing: border-box;
	}
}
</style>
