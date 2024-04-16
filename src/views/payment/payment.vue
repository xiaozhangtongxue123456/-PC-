<template>
  <div class="payment">
    <!-- 购物车列表 -->
    <div class="payment-list" v-if="shopCarInfo.length !== 0">
      <el-table
        :data="shopCarInfo"
        style="width: 100%"
        ref="multipleTableRef"
        border
        :style="{ marginTop: `10px` }"
        @select="handleSelectionChange"
        @select-all="handleAllSelection"
      >
        <!-- 全选按钮 -->
        <el-table-column
          type="selection"
          width="120"
          label="全选"
          align="center"
        >
        </el-table-column>
        <!-- 商品信息 -->
        <el-table-column
          label="商品信息"
          width="280"
          prop="name"
          align="center"
        >
          <template #default="scope">
            <!-- 图片 -->
            <img :src="scope.row.picture" alt="" class="img" />
            <!-- 信息 -->
            <span class="span">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <!-- 商品单价 -->
        <el-table-column
          property="price"
          label="商品单价"
          width="200"
          align="center"
        />
        <!-- 商品数量 -->
        <el-table-column
          label="商品数量"
          show-overflow-tooltip
          width="220"
          align="center"
        >
          <template #default="scope">
            <!-- 我们这里直接就修改了仓库：v-model：其实是个语法糖 -->
            <el-input-number v-model="scope.row.count" :min="1" :max="10" />
          </template>
        </el-table-column>
        <!-- 小计 -->
        <el-table-column label="小计" width="200" align="center">
          <template #default="scope">
            <span :style="{ color: `#c00000` }">
              ￥{{ (scope.row.count * scope.row.price).toFixed(2) }}</span
            >
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" width="200" align="center">
          <!-- 删除按钮 -->
          <template #default="scope">
            <el-button
              type="danger"
              :icon="Delete"
              circle
              @click="handleDetele(scope.row.skuId)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 没有商品的页面 -->
    <div class="NotHasGood" v-else>
      <el-button type="primary" class="goHome" size="large" @click="GoHome"
        >随便逛逛</el-button
      >
    </div>
    <!-- 购物车结算 -->
    <div class="payment-count">
      <!-- 共计商品数 -->
      <p>共计{{ shopCarInfo.length }}件商品,已选中了{{ selectNum }}件商品</p>
      <!-- 总钱数 -->
      <p>商品总钱数:￥{{ allGoodPrince.toFixed(2) }}</p>
      <!-- 结算按钮 -->
      <el-button
        type="success"
        :style="{ marginTop: `10px` }"
        size="large"
        @click="sendSettlement"
        >结算</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { ElTable } from "element-plus";
// 获取仓库的数据
import ShopCart from "../../stores/shopCar";
import { storeToRefs } from "pinia";
import { Delete } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { computed, ref, onMounted } from "vue";
const Router = useRouter();
// 获取我们的仓库
const shopCartStore = ShopCart();
// 获取我们仓库的数据
const { shopCarInfo } = storeToRefs(shopCartStore);
// 点击我们随便逛逛的回调函数
const GoHome = () => {
  // 跳转到首页
  Router.push({
    path: "/home",
  });
};
// 计算属性
// 总价格
const allGoodPrince = computed(() => {
  return shopCarInfo.value.reduce((initPrice, item) => {
    if (item.selected) {
      return initPrice + item.count * item.price;
    } else {
      return initPrice;
    }
  }, 0);
});
// 已被选中的状态的个数
const selectNum = computed(() => {
  let num = 0;
  shopCarInfo.value.forEach((item) => {
    if (item.selected) {
      num++;
    }
  });
  return num;
});
// 我们点击我们删除的回调函数
const handleDetele = (id) => {
  shopCartStore.deteleGooditem(id);
};
// 我们点击我们的全选的回调函数
const handleSelectionChange = (value, row) => {
  //   我们对传递的对象取反:我们通知我们的仓库
  shopCartStore.editGoodStatu(row);
};
// 我们判断是否可以被选中：获取我们表格dom
const multipleTableRef = ref(null);
// 我们手动全选的回调函数
const handleAllSelection = () => {
  // 告诉仓库修改全部的状态
  shopCartStore.editAllGoodItem();
  // 我们修改全部状态
  multipleTableRef.value.toggleAllSelection();
};
// 我们点击我们跳转到我们的结算页面中
const sendSettlement = () => {
  // 我们进行路由跳转：到结算页面中
  Router.push({
    path: "/home/settlement",
  });
};
onMounted(async () => {
  // 我们根据我们的状态：改变我们选择的状态
  for (let i = 0; i < shopCarInfo.value.length; i++) {
    if (shopCarInfo.value[i].selected) {
      multipleTableRef.value.toggleRowSelection(shopCarInfo.value[i]);
    }
  }
});
</script>

<style lang="less" scoped>
.payment {
  width: 80%;
  margin: 0 10%;
  .img {
    width: 100px;
    height: 100%;
    vertical-align: middle;
    margin-right: 10px;
  }
  .span {
    width: 100px;
    display: inline-block;
    vertical-align: middle;
  }
  .NotHasGood {
    height: 500px;
    background-image: url("../../assets//images/a044524615e3512bd9e44bd840774bfb_512_512.jpg!bg");
    background-repeat: no-repeat;
    background-position: center;
    background-color: #f6f6f6;
    position: relative;
    .goHome {
      position: absolute;
      top: 90%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .payment-count {
    height: 60px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
