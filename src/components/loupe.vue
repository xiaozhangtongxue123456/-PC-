<template>
	<div class="BigGlass" :style="{ backgroundImage: url(BigImg) }">
		<!-- 放大镜组件 -->
	</div>
</template>

<script setup>
// 接受我们的图片
defineProps({
	BigImg: String,
});
const img = BigImg;
</script>

<style lang="less" scoped>
.BigGlass {
	position: absolute;
	width: 470px;
	height: 390px;
	// background-color: red;
	left: 470px;
	top: 5px;
}
</style>
