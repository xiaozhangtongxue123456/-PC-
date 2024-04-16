<template>
  <div class="headers">
    <!-- 这里我们是多模板渲染 ：未登录-->
    <ul v-if="!userInfo?.islogin">
      <li>
        <router-link :to="{ path: '/' }">请登录</router-link>
      </li>
      <li><router-link :to="{ path: '/' }">注册</router-link></li>

      <!-- <li>{{ 123 }}</li>
			<li>退出登录</li> -->

      <li>帮助中心</li>
      <li>关于我们</li>
    </ul>
    <!-- 已登录 -->
    <ul v-else>
      <li>
        <img :src="userInfo.userInfos.avatar" alt="" />{{
          userInfo.userInfos.nickname
        }}
      </li>
      <li>
        <el-popconfirm
          width="220"
          confirm-button-text="确定"
          cancel-button-text="取消"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="请问确定退出吗？"
          @confirm="determine"
        >
          <template #reference> 退出登录 </template>
        </el-popconfirm>
      </li>
      <li>我的订单</li>
      <li>会员中心</li>
    </ul>
  </div>
</template>

<script setup>
// 我们获取我们的本地的存储的信息
const userInfo = JSON.parse(localStorage.getItem("login"));
// 获取我们的用户仓库数据
import loginStore from "@/stores/loginStore";
let LoginStore = loginStore();
// 引入我们的购物车仓库
import Store from "@/stores/shopCar";
const shopCarStore = Store();
// 获取我们的路由
import { useRouter } from "vue-router";
const Router = useRouter();
// 我们定义点击确定的回调函数函数
const determine = () => {
  // 清除用户信息
  LoginStore.loginOut();
  // 清除我们的购物车信息
  shopCarStore.shopCarInfo = [];
  shopCarStore.isLogin = false;
  // 我们路由跳转
  Router.push({
    path: "/",
  });
};
</script>

<style lang="less" scoped>
a {
  list-style: none;
  text-decoration: none;
  color: #fff;
}
.headers {
  height: 40px;
  width: 100%;
  background-color: #000;
  display: flex;
  flex-direction: row-reverse;
  color: #fff;
  ul {
    display: flex;
    padding: 0;
    margin: 0;
    margin-right: 120px;
    height: 40px;
    li {
      font-size: 14px;
      height: 50%;
      margin-top: 10px;
      padding: 0 15px;
      text-align: center;
      list-style: none;
      border-right: 1px solid #efefef;
      img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        border-radius: 50%;
        vertical-align: middle;
      }
      & li:hover {
        color: green;
      }
    }
  }
}
</style>
