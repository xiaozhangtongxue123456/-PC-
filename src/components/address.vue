<template>
  <div class="address">
    <h3>收货地址</h3>
    <div class="addressInfo">
      <div class="address-detail">
        <p class="addressName">
          <span>收货人:</span>&nbsp;{{ defaultAddress?.receiver }}
        </p>
        <p class="addressPhone">
          <span>联系电话:</span>&nbsp;{{ defaultAddress?.contact }}
        </p>
        <p class="addressItem">
          <span>收货地址:</span>&nbsp;{{ defaultAddress?.fullLocation }}
        </p>
      </div>
      <div class="addressAddorChange">
        <el-button
          size="large"
          :plain="true"
          color="#fff"
          style="color: black; border: 1px solid black"
          @click="
            () => {
              checkdialogFormVisible = true;
            }
          "
          >切换地址</el-button
        >
        <el-button
          size="large"
          color="#fff"
          style="color: black; border: 1px solid black"
          >添加地址</el-button
        >
      </div>
    </div>
  </div>
  <!-- 切换和添加地址栏 -->
  <el-dialog
    v-model="checkdialogFormVisible"
    title="切换地址"
    center
    width="30%"
  >
    <!-- 地址展示区域 -->
    <AddressItem
      v-for="(item, index) in userAddresses"
      :key="item.id"
      :addressitem="item"
      @click="handleClickaddress(index)"
      :class="{ active: addressIndex === index }"
    />
    <!-- 确定和取消模块 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="checkdialogFormVisible = false" style="width: 120px"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="handleconfirm"
          style="width: 120px"
          color="green"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AddressItem from "@/components/addressItem.vue";
// 定义我们的是否可见：切换地址栏
const checkdialogFormVisible = ref(false);

// 接受我们的地址信息
let porps = defineProps({
  userAddresses: {
    type: Array,
    default: [],
  },
});

// 我们定义我们的默认地址
let defaultAddress = ref({});

onMounted(() => {
  defaultAddress.value = porps.userAddresses.find((item) => {
    if (item.isDefault == 0) {
      return true;
    }
  });
});
const addressIndex = ref(-1);
// 我们点击切换地址中我们的地址
const handleClickaddress = (index) => {
  addressIndex.value = index;
};
// 我们点击我们切换地址的确定的回调函数
const handleconfirm = () => {
  // 改变默认地址：我们应该
  defaultAddress.value = porps.userAddresses[addressIndex.value];
  // 关闭我们的对话框
  checkdialogFormVisible.value = false;
};
</script>

<style lang="less" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.address {
  width: 100%;
  padding: 10px;
  h3 {
    border-bottom: 2px solid #efefef;
    padding-bottom: 10px;
  }
  .addressInfo {
    margin-top: 10px;
    padding: 10px;
    display: flex;
    height: 150px;
    box-sizing: border-box;
    border: 2px solid #efefef;

    .address-detail {
      flex: 1;
      display: flex;
      flex-direction: column;
      p {
        margin-left: 20px;
        margin-top: 20px;
        font-size: 13px;
        span {
          color: #999;
          font-size: 13px;
          margin-right: 10px;
        }
      }
    }
    .addressAddorChange {
      flex: 1;
      text-align: center;
      line-height: 120px;
      .el-button--large {
        width: 120px;
      }
    }
  }
}
* {
  margin: 0;
  padding: 0;
}
.active {
  background-color: rgba(127, 255, 170, 0.3);
}
</style>
