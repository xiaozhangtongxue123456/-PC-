<template>
	<div class="main">
		<h2>{{ data.name }}</h2>
		<div class="item-show">
			<div class="item" v-for="item in data.goods" :key="item.id">
				<div class="itemImg">
					<img :src="item.picture" :alt="item.desc" />
				</div>
				<div class="itemInfo">
					<p>{{ item.name }}</p>
					<p>￥{{ item.price }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
// 接受父组件传递的数据
const props = defineProps({
	data: {},
});
</script>

<style lang="less" scoped>
.main {
	height: 300px;

	margin-top: 10px;
	padding: 10px;
	box-sizing: border-box;
	h2 {
		height: 30px;
		line-height: 30px;
		text-align: center;
		padding: 0;

		margin: 0;
		box-sizing: border-box;
	}
	.item-show {
		height: calc(100% - 30px);

		display: flex;
		& .item:hover {
			box-shadow: 0 10px 5px 5px #efefef;
			transform: translate(0, -10px);
		}
		.item {
			width: 24%;
			display: flex;
			flex-direction: column;
			padding: 10px;
			box-sizing: border-box;
			align-content: center;
			translate: all 1s;
			.itemImg {
				flex: 2;
				width: 100%;
				height: 100px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.itemInfo {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				p {
					margin: 0;
					padding: 5px;
					box-sizing: border-box;
					font-size: 14px;
				}
			}
		}
	}
}
</style>
