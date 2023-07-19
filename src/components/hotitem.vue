<template>
	<div class="hotItem">
		<div class="hot-title">{{ title }}</div>
		<div class="itemInfo" v-for="item in hotItem" :key="item.id">
			<img :src="item.picture" alt="" />
			<p class="itemDesc">{{ item.desc }}</p>
			<p class="itemName">{{ item.name }}</p>
			<p class="itemPrice" style="color: #c00000">￥{{ item.price }}</p>
		</div>
	</div>
</template>

<script setup>
// 接受我们的数据
defineProps({
	hotItem: {
		type: Array,
	},
	title: String,
});
</script>

<style lang="less" scoped>
.hotItem {
	width: 100%;
	.hot-title {
		width: 100%;
		height: 60px;
		text-align: center;
		line-height: 60px;
		color: white;
		background-color: orange;
	}
	.itemInfo {
		padding: 10px;
		width: 100%;
		margin-bottom: 10px;
		box-sizing: border-box;
		img {
			width: 100%;
		}
		p {
			text-align: center;
			margin: 0;
			padding: 0;
			height: 40px;
			line-height: 40px;
			white-space: nowrap;
			font-size: 14px;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}
</style>
