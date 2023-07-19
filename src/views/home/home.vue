<template>
	<div class="common-layout">
		<!-- 头部导航栏 -->
		<HeaderTop />
		<el-container>
			<!-- 头部区域 -->
			<el-header class="headerNav">
				<Header />
			</el-header>
			<!-- 中心区域 -->
			<el-main
				><!-- 首页的二级路由 -->
				<!-- 面包屑部分 -->
				<Breadcrumb></Breadcrumb>
				<!-- 首页的二级路由 -->
				<router-view></router-view
			></el-main>
			<!-- 底部区域 -->
			<el-footer><FooterNav></FooterNav></el-footer>
			<Footerbox></Footerbox>
		</el-container>
	</div>
</template>

<script setup>
// 引入我们的头部导航栏组件
import HeaderTop from "@/components/header-nav.vue";
// 引入我们的头部部分
import Header from "@/components/header.vue";
// 引入我们的尾部导航栏
import FooterNav from "@/components/footer-nav.vue";
// 引入我们的底部组件
import Footerbox from "@/components/footer.vue";
// 引入我们面包屑组件
import Breadcrumb from "@/components/Breadcrumb.vue";
</script>

<style lang="less" scoped>
.common-layout {
	:deep(.el-footer) {
		height: 250px;
		padding: 0;
	}
	:deep(.el-header) {
		height: 120px;
		padding: 0;
	}
	.headerNav {
		position: sticky;
		top: 0px;
		z-index: 999;
		border-bottom: 1px solid #efefef;
		background-color: #efefef;
	}
}
</style>
