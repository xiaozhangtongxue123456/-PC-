<template>
	<div class="product">
		<div class="title">{{ itemData.name }}</div>
		<div class="productMain">
			<div class="productBigimg">
				<!-- 大图 -->
				<template v-for="(item1, index) in itemData.goods" :key="item1.id">
					<img :src="item1.picture" alt="" v-if="0 === index" />
				</template>
			</div>
			<div class="productSmallimg">
				<template v-for="(item2, index) in itemData.goods" :key="item2.id">
					<div class="small-item" v-if="0 !== index">
						<!-- 小图 -->
						<div class="samllimg">
							<img :src="item2.picture" alt="" />
						</div>
						<div class="small-des">{{ item2.desc }}</div>
						<div class="small-price">￥{{ item2.price }}</div>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup>
// 接受父组件传递的数据
defineProps({
	itemData: {
		type: Object,
	},
});
</script>

<style lang="less" scoped>
.product {
	margin-top: 20px;
	width: 100%;
	height: 500px;

	box-sizing: border-box;
	.title {
		height: 40px;
		line-height: 40px;
		font-size: 20px;
		padding-left: 20px;
		box-sizing: border-box;
		border: 2px solid #efefef;
	}
	.productMain {
		border: 1px solid #efefef;
		width: 100%;
		height: 460px;

		display: flex;
		.productBigimg {
			flex: 1;
			height: 460px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.productSmallimg {
			flex: 4;
			height: 460px;
			display: flex;
			flex-wrap: wrap;
			padding: 0 10px;

			.small-item {
				width: 24%;
				height: 48%;
				margin-right: 5px;
				box-sizing: border-box;
				margin-top: 5px;
				display: flex;
				transition: all 0.5s;
				flex-direction: column;
				border: 1px solid #efefef;
				&:hover {
					transform: translate(0, -5px);
					box-shadow: 0 10px 5px 5px #efefef;
				}
				.samllimg {
					flex: 1;
					width: 100%;
					height: 150px;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.small-des {
					padding: 5px;
					flex: 1;
					white-space: nowrap;
					/* 去除超出盒子的文本 */
					overflow: hidden;
					/* 省略超出盒子的文本 */
					text-overflow: ellipsis;
					height: 20px;
				}
				.small-price {
					flex: 1;
					padding-left: 5px;
				}
			}
		}
	}
}
</style>
