<template>
  <div class="settlement">
    <!-- 收货地址 -->
    <Address :userAddresses="orderInfo?.userAddresses" />
    <!-- 商品信息 -->
    <shopCarGoodInfo :goods="orderInfo?.goods" />
    <!-- 配送时间 -->
    <div class="deliveryTime">
      <h3>配送时间</h3>
      <div class="deliverMethods">
        <el-button class="button-style" color="#fff"
          >无限送货时间:周一到周日</el-button
        >
        <el-button class="button-style" color="#fff"
          >工作日送货:周一到周五</el-button
        >
        <el-button class="button-style" color="#fff"
          >双休日、假期:星期六-星期日</el-button
        >
      </div>
    </div>
    <!-- 支付方面 -->
    <div class="payModel">
      <h3>支付方式</h3>
      <div class="payMethods">
        <el-button class="button-style" color="#fff">在线支付</el-button>
        <el-button class="button-style" color="#fff">货到付款</el-button>
        <span>货到付款需付5元手续费</span>
      </div>
    </div>
    <!-- 金额明细 -->
    <div class="AmountDetails">
      <h3>金额明细</h3>
      <div class="Amountbox">
        <p>
          商品数量:<span>{{ orderInfo?.summary?.goodsCount }}</span>
        </p>
        <p>
          商品总价:<span>￥{{ orderInfo?.summary?.totalPrice }}</span>
        </p>
        <p>
          运费:<span>￥{{ orderInfo?.summary?.postFee }}</span>
        </p>
        <p>
          应付金额:<span>￥{{ orderInfo?.summary?.totalPayPrice }}</span>
        </p>
      </div>
      <!-- 提交订单 -->
      <div class="submit">
        <el-button
          style="width: 200px; height: 50px"
          plain
          color="green"
          @click="submitOrder"
          >提交订单</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
// 引入我们的地址组件
import Address from "@/components/address.vue";
// 引入我们的商品信息组件
import shopCarGoodInfo from "@/components/shopCarGoodInfo.vue";
// 引入我们获取订单信息的Api
import { getOrderInfoApi, getOrderCodeApi } from "@/Api/request";
import { ref, onMounted } from "vue";
// 引入我们的路由器
import { useRouter } from "vue-router";
const Router = useRouter();
// 定义我们的数据
const orderInfo = ref({});
// 挂载完毕
onMounted(async () => {
  let result = await getOrderInfoApi();
  console.log(result);
  orderInfo.value = result?.data.result;
});
// 我们点击我们的提交订单的回调函数
const submitOrder = () => {
  // 整理参数
  let params = {
    // 商品
    goods: orderInfo.value.goods.map((item) => {
      return {
        skuId: item.skuId,
        count: item.count,
      };
    }),
    //  收货地址
    addressId: orderInfo.value.userAddresses.find((item) => {
      if (item.isDefault === 0) {
        return true;
      }
    }).id,
  };
  // 发送请求生成订单编码
  getOrderCodeApi(params).then((res) => {
    // 进行路由跳转:并且携带参数
    Router.push({
      path: "orders",
      query: {
        id: res.data.result.id,
      },
    });
  });
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.button-style {
  width: 300px;
  height: 60px;
  margin-top: 20px;
  margin-bottom: 10px;
  border: 1px solid #999;
}
.settlement {
  width: 80%;
  margin-left: 10%;
  .deliveryTime {
    padding-left: 10px;
    width: 100%;

    h3 {
      border-bottom: 2px solid #efefef;
      padding-bottom: 10px;
    }
  }
  .payModel {
    padding-left: 10px;
    width: 100%;
    .payMethods {
      span {
        color: #999;
        font-size: 13px;
        margin-left: 10px;
        display: inline-block;
        vertical-align: middle;
      }
    }
    h3 {
      border-bottom: 2px solid #efefef;
      padding-bottom: 10px;
    }
  }
  .AmountDetails {
    padding-left: 10px;
    width: 100%;
    height: 500px;
    position: relative;
    h3 {
      border-bottom: 2px solid #efefef;
      padding-bottom: 10px;
    }
    .Amountbox {
      width: 400px;
      position: absolute;
      right: 0;
      bottom: 70px;
      height: 200px;

      display: flex;
      flex-direction: column;
      p {
        flex: 1;
        padding: 10px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        span {
          margin-right: 20px;
        }
      }
    }
    .submit {
      position: absolute;
      right: 20px;
      bottom: 0;
      margin-top: 10px;
    }
  }
}
</style>
