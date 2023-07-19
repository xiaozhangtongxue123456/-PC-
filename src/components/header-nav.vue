<template>
	<div class="headers">
		<ul>
			<li>
				<router-link :to="{ path: '/' }">请登录</router-link>
			</li>
			<li><router-link :to="{ path: '/' }">注册</router-link></li>

			<!-- <li>{{ 123 }}</li>
			<li>退出登录</li> -->

			<li>帮助中心</li>
			<li>关于我们</li>
		</ul>
	</div>
</template>

<script setup></script>

<style lang="less" scoped>
a {
	list-style: none;
	text-decoration: none;
	color: #fff;
}
.headers {
	height: 60px;
	width: 100%;
	background-color: #000;
	display: flex;
	flex-direction: row-reverse;
	color: #fff;
	ul {
		display: flex;
		margin-right: 120px;
		li {
			font-size: 14px;
			padding: 0 15px;
			text-align: center;
			line-height: 28px;
			list-style: none;
			border-right: 1px solid #efefef;
		}
	}
}
</style>
