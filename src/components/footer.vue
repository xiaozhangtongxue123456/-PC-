<template>
	<div class="footerBox">
		<div class="main">
			<div class="main-top">
				<div>价格亲民</div>
				<div>物流快捷</div>
				<div>品质新鲜</div>
			</div>
			<ul class="main-footer">
				<li>联系我们</li>
				<li>质量保证</li>
				<li>质量保证</li>
				<li>质量保证</li>
				<li>质量保证</li>
				<li>质量保证</li>
			</ul>
			<div class="address">安徽省阜阳市颍东区插花镇成功居委会</div>
		</div>
	</div>
</template>

<script setup></script>

<style lang="less" scoped>
.footerBox {
	width: 100%;
	height: 300px;
	background-color: #111;

	.main {
		padding: 0 10%;
		height: 300px;
		width: 80%;
		.address {
			text-align: center;
			color: #fff;
			font-size: 12px;
		}
		.main-top {
			height: 150px;
			display: flex;
			border-bottom: 1px solid #efefef;
			box-sizing: border-box;
			& > div {
				flex: 1;
				height: 100%;
				color: #fff;
				text-align: center;
				line-height: 150px;
				font-size: 28px;
			}
		}
		.main-footer {
			margin-top: 30px;
			text-align: center;
			padding-left: 400px;
			font-size: 12px;
			display: flex;
			width: 80%;
			color: #efefef;
			li {
				padding: 0 10px;
				border-right: 1px solid #efefef;
			}
		}
	}
}
</style>
