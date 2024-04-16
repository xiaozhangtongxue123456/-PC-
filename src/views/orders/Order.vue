<template>
  <div class="order">
    <div class="payment">
      <!-- 图标 -->
      <el-icon
        color="green"
        size="100"
        style="margin-left: 200px; margin-top: 30px"
        ><SuccessFilled
      /></el-icon>
      <!-- 提示语 -->
      <div class="tip">
        <p>订单提交成功，请尽快完成支付</p>
        <!-- 倒计时 -->
        <span>
          支付还剩&nbsp;{{ mintue }}分{{ second }}&nbsp;,超时后将取消订单
        </span>
      </div>
      <!-- 总钱数 -->
      <div class="money">
        总金额：￥<span>{{ orderInfo.payMoney }}</span>
      </div>
    </div>
    <!-- 支付方式 -->
    <el-card class="box-card">
      <h3>支付方式</h3>
      <div class="payMethods">
        <el-button
          @click="handleClickZFB"
          style="width: 200px; height: 50px; border: 1px solid #efefef"
          ><a :href="payUrl">支付宝</a></el-button
        >
        <el-button style="width: 200px; height: 50px">微信</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getOrderDetailApi } from "@/Api/request";
// 获取我们的路由跳转中我们的携带的参数
import { useRoute } from "vue-router";
const currentRoute = useRoute();
// 我们定义我们的路径
const baseUrl = "http://pcapi-xiaotuxian-front-devtest.itheima.net/";
const backUrl = "http://localhost:5173/#/home/paycallback";
const redirectUrl = encodeURIComponent(backUrl);
const payUrl = `${baseUrl}pay/aliPay?orderId=${currentRoute.query.id}&redirect=${redirectUrl}`;
// 引用我们的转化时间的函数
import getMintue from "@/hooks/useGetminte";
const { mintue, second, transformMintue } = getMintue();
let countdown = 0;
// 我们发送请求获取我们的订单数据
const orderInfo = ref({});
onMounted(async () => {
  // 发送请求：获取我们订单信息
  let result = await getOrderDetailApi(currentRoute.query.id);
  orderInfo.value = result.data.result;
  countdown = result.data.result.countdown;
  // 我们开启我们的定时器
  let timer = setInterval(() => {
    if (countdown > 0) {
      transformMintue(countdown);
      countdown--;
    } else {
      // 关闭我们的定时器
      clearInterval(timer);
    }
  }, 1000);
});
// 我们点击我们支付宝的回调函数
const handleClickZFB = () => {};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.order {
  width: 80%;
  margin-left: 10%;
  margin-top: 10px;

  .payment {
    width: 100%;
    height: 200px;
    padding: 10px;
    position: relative;
    border: 2px solid #efefef;

    .tip {
      width: 60%;
      position: absolute;
      top: 55px;
      left: 320px;
      p {
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: 700;
      }
      span {
        font-size: 14px;
        color: #999;
      }
    }
    .money {
      position: absolute;
      right: 250px;
      top: 86px;
      font-size: 14px;
      color: #999;
      span {
        color: #c00000;
        font-size: 20px;
      }
    }
  }

  .box-card {
    width: 100%;
    margin-top: 20px;
    h3 {
      padding-bottom: 10px;
      border-bottom: 2px solid #efefef;
    }
    .payMethods {
      margin-top: 10px;
    }
  }
}
</style>
