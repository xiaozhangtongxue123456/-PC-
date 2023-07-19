<template>
	<div class="subcatousel">
		<el-carousel :interval="4000" type="card" height="400px">
			<el-carousel-item v-for="item in subCarouselData.subData" :key="item.id"><img :src="item.imgUrl" alt="" /> </el-carousel-item>
		</el-carousel>
	</div>
</template>

<script setup>
// 接受父组件传递的轮播图参数
defineProps({
	subCarouselData: {
		type: Array,
	},
});
</script>

<style lang="less" scoped>
.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
	background-color: #d3dce6;
}
</style>
