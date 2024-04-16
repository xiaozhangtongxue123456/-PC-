<template>
  <div class="header">
    <!-- 图片 -->
    <div class="img-log">
      <img src="@/assets/images/logo.png" alt="" />
    </div>
    <!-- 列表 -->
    <ul class="lists">
      <li
        v-for="item in categoryDate.data"
        :key="item.id"
        @click="saveBreadcub(item)"
        :class="{ action: categoryDate.action === item.id }"
      >
        <router-link
          :to="{ path: '/home/fristcate', query: { fristId: item.id } }"
          >{{ item.name }}</router-link
        >
      </li>
    </ul>
    <!-- 搜索框 -->
    <div class="serach-box">
      <input
        type="text"
        placeholder="请输入关键字"
        style="border-radius: 10px; padding: 5px"
      />
      <button>搜索</button>
    </div>
    <!-- 购物车模块 -->
    <ShopCar />
  </div>
</template>

<script setup>
// 我们获取我们分类的数据
import getCategoryDate from "@/hooks/useGetCate";
let categoryDate = getCategoryDate();
// 获取我们的面包屑仓库
import breadcrumbData from "@/stores/BreadcrumbDate";
// 引入我们的购物车模块
import ShopCar from "@/components/ShopCar.vue";

let breadcrumbDatas = breadcrumbData();
// 我们点击我们的一级分类的导航栏
const saveBreadcub = (value) => {
  // 我们链接仓库中的actions函数
  breadcrumbDatas.savebreadcrumb(value);
  // 我们改变高亮效果
  categoryDate.action = value.id;
};
</script>

<style lang="less" scoped>
.header {
  .lists {
    .action {
      border-bottom: 2px solid #c00000;
      color: #fff;
    }
  }
  .serach-box {
    width: 300px;
    height: 30px;
    position: absolute;
    top: 47px;
    right: 100px;
    input {
      height: 30px;
      box-sizing: border-box;
      outline: none;
      padding: 0;
      padding: 1px 2px;
      vertical-align: middle;
    }
    button {
      width: 60px;
      box-sizing: border-box;
      height: 30px;
      border: none;
    }
  }
  width: 100%;
  display: flex;
  height: 100%;
  position: relative;
  .img-log {
    height: 100px;
    position: relative;
    img {
      position: absolute;
      top: 10px;
      left: 100px;
      width: 300px;
      height: 100px;
    }
  }
  ul {
    position: absolute;
    top: 28px;
    left: 400px;
    line-height: 50px;
    height: 50px;
    display: flex;
    text-align: center;
    li {
      font-size: 16px;
      font-weight: 700;
      padding: 0 20px;
    }
  }
}
</style>
