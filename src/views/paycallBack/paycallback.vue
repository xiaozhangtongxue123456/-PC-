<template>
  <div class="payment">
    <div class="rigthAndWrong">
      <!-- 对错 -->
      <el-icon color="green" size="100" v-if="payResult"
        ><CircleCheck
      /></el-icon>
      <el-icon color="red" size="100" v-else> <CircleClose /></el-icon>
    </div>
    <h3 v-if="payResult">支付成功</h3>
    <h3 v-else>支付失败</h3>
    <p>我们将尽快给您发货，请保持手机的畅通</p>
    <div>
      <p>支付方式：支付宝</p>
      <p>支付金额：{{ orderInfo?.payMoney?.toFixed(2) }}元</p>
    </div>
  </div>
</template>

<script setup>
// 获取我们的路由跳转的参数
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getOrderDetailApi } from "@/Api/request";
const Route = useRoute();
const payResult = ref(Route.query.payResult === "true");
// 获取我们的订单的情况
const orderInfo = ref();
onMounted(async () => {
  // 获取我们的订单的情况
  let result = await getOrderDetailApi(Route.query.orderId);
  orderInfo.value = result.data.result;
});
</script>

<style lang="less" scoped>
.payment {
  width: 80%;
  margin-left: 10%;
  background-color: #efefef;

  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .rigthAndWrong {
    margin-top: -200px;
  }
  h3 {
    margin: 0;
    padding: 0;
  }
}
</style>
