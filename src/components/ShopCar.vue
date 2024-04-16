<template>
  <div class="ShopCar">
    <el-popover
      placement="bottom"
      :width="400"
      trigger="hover"
      popper-class="style-popover"
      style="height: 400px; overflow: scroll"
    >
      <template #reference>
        <!-- 购物车图标 -->
        <el-icon size="20"><ShoppingCart /></el-icon>
      </template>
      <!-- 展示区域 -->
      <div
        class="goodItem"
        v-for="item in shopCarInfo"
        :key="item.skuId"
        :style="{ display: `flex`, height: `100px`, marginBottom: `5px` }"
      >
        <!-- 商品的图片 -->
        <img
          :src="item.picture"
          alt=""
          :style="{ width: `80px`, height: `90px` }"
        />
        <!-- 信息部分 -->
        <div :style="{ width: `180px` }">
          <p :style="{ margin: `0`, padding: `5px`, fontWeight: `700` }">
            {{ item.name }}
          </p>
          <p :style="{ margin: `0`, padding: `5px`, fontWeight: `700` }">
            {{ item.attrsText }}
          </p>
        </div>
        <!-- 价格和数量 -->
        <div :style="{ width: `80px`, textAlign: `center` }">
          <p
            class="Price"
            :style="{ color: `#c00000`, margin: `0`, padding: `5px` }"
          >
            ￥{{ item.price }}
          </p>
          <p class="Count" :style="{ marginTop: `0px`, padding: `5px` }">
            x{{ item.count }}
          </p>
        </div>
        <!-- 删除模块 -->
        <div
          :style="{ height: `100%`, lineHeight: `60px`, marginLeft: `20px` }"
          @click="handeleDetele(item)"
        >
          <el-button type="danger" :icon="Delete" circle />
        </div>
      </div>
      <!-- 结算模块 -->
      <div class="settlement">
        <h3>结算部分</h3>
        <div :style="{ height: `50px` }">
          <div
            :style="{
              display: `flex`,
              margin: `0`,
              padding: `0`,
              justifyContent: `space-between`,
            }"
          >
            <p>共计{{ allcount }}件商品</p>
            <p :style="{ marginLeft: `20px` }">
              总计<span :style="{ color: `red` }">{{
                allPrice.toFixed(2)
              }}</span
              >元
            </p>
            <!-- 按钮 -->
            <el-button :style="{ marginTop: `10px` }" @click="handlePayment"
              >去购物车结算</el-button
            >
          </div>
        </div>
      </div>
    </el-popover>
  </div>
  <!-- 购物车数量 -->
  <div class="shopCarCount">{{ shopCarInfo.length }}</div>
</template>

<script setup>
// 获取仓库中的数据
import Store from "@/stores/shopCar";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

// 创建仓库
const ShopCar = Store();
// 获取我们的数据
const { shopCarInfo } = storeToRefs(ShopCar);
// 引入我们的路由器
const Router = useRouter();
// 计算属性:总价格
const allPrice = computed(() => {
  let result = 0;
  shopCarInfo.value.forEach((item) => {
    result += item.price * item.count;
  });

  return result;
});
// 计算属性:总数量
const allcount = computed(() => {
  let result = 0;

  shopCarInfo.value.forEach((item) => {
    result += item.count;
  });
  return result;
});
// 我们点击删除的回调函数
const handeleDetele = (item) => {
  // 在仓库发起action请求
  ShopCar.deteleGooditem(item.skuId);
};
// 我们点击去结算的回调函数
const handlePayment = () => {
  // 我们要进行路由的跳转
  Router.push({
    path: "/home/payment",
  });
};
// 我们点击我们的删除按钮的回调函数
</script>

<style lang="less" scoped>
.ShopCar {
  position: absolute;
  z-index: 9999;
  top: 50px;
  right: 140px;
  :deep(.el-popover .style-popover) {
    height: 400px;
    overflow: scroll;
  }
  .priceAndCount {
    p {
      margin: 0;
      padding: 0;
    }
    .Price {
      margin: 0;
    }
  }
  .settlement {
    height: 100px;
  }
}
.shopCarCount {
  position: absolute;
  top: 43px;
  right: 130px;
  background-color: red;
  color: white;
  width: 18px;
  height: 18px;
  font-size: 10px;
  border-radius: 50%;
  text-align: center;
  line-height: 18px;
  z-index: 999;
}
</style>
