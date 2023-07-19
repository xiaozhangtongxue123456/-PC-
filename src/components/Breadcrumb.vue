<template>
	<div class="Breadcrumb">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="item in breadcrumbDatas.breadcrumbDatas" :key="item.id"
				><router-link :to="{ path: '/home/fristcate', query: { fristId: item.id } }">{{ item.name }}</router-link></el-breadcrumb-item
			>
		</el-breadcrumb>
	</div>
</template>

<script setup>
// 获取我们的面包屑仓库
import breadcrumbData from "@/stores/BreadcrumbDate";
let breadcrumbDatas = breadcrumbData();
</script>

<style lang="less" scoped>
.Breadcrumb {
	width: 80%;
	margin-left: 10%;
}
</style>
