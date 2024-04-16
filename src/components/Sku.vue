<template>
  <div class="SkuItem">
    <div class="sku" v-for="(item, index) in goodInfo.specs" :key="item.id">
      <p>{{ item.name }}:</p>
      <!-- 我们判断一下是否有图片：有图片的，我们展示我们的图片 -->
      <div
        class="skuinfo"
        v-for="(subitem, subindex) in item.values"
        :key="subitem.name"
        @click="handleIndex(index, subindex)"
      >
        <img
          :src="subitem.picture"
          :alt="subitem.name"
          v-if="subitem.picture"
          :class="{ active: subindex === AllIndex[index] * 1 }"
        />
        <span v-else :class="{ active: subindex === AllIndex[index] }">{{
          subitem.name.slice(0, 4)
        }}</span>
      </div>
    </div>
    <!-- 商品数量 -->
    <span>数量：</span>
    <el-input-number
      v-model="count"
      :min="1"
      :max="10"
      @change="handleChange"
      style="margin-top: 20px"
    /><br />
    <!-- 点击加入购物车 -->
    <button class="addButton" @click="addShopCar">加入购物车</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
// 引入我们的仓库
import Store from "@/stores/shopCar";
const shopCarStore = Store();
// 接受父组件传递的参数
let props = defineProps({
  goodInfo: {
    type: Object,
  },
});
// 商品数量
const count = ref(1);
// 点击商品的加减好的回调函数
const handleChange = (value) => {
  //   修改数据
  count.value = value;
};
// 收集我们点击规格的index
const AllIndex = ref([]);
// 我们点击我们的规格的选项的回调函数
const handleIndex = (index, subindex) => {
  console.log(index, subindex);
  AllIndex.value[index] = subindex;
};
// 我们点击我们的加入购物车的回调函数
const addShopCar = () => {
  // 整理我们的数据
  if (AllIndex.value.length < props.goodInfo.specs.length) {
    // 说明我们还没有选完规格
    // 我们选规格：弹出提醒
    ElMessage({
      message: "请选择规格",
      type: "warning",
    });
  } else {
    // 我们选择完了规矩：我们开始整理我们的数据
    let skuIndex = AllIndex.value.reduce((init, item) => {
      return init * (item * 1 + 1);
    }, 1);
    //
    let result = "";
    props.goodInfo.skus[skuIndex - 1].specs.forEach((item) => {
      result = result + item.name + ":" + item.valueName;
    });
    let params = {
      ...props.goodInfo.skus[skuIndex - 1],
      count: count.value,
      selected: true,
      name: props.goodInfo.name,
      attrsText: result,
    };
    // 我们通知我们的仓库，我们保存我们数据

    shopCarStore.addShopCar(params);
  }
};
</script>

<style lang="less" scoped>
.SkuItem {
  width: 100%;
  .sku {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    p {
      flex: 1;
      margin: 0;
      padding: 0;
      color: #666;
      width: 40px;
      line-height: 60px;
      margin-bottom: 20px;
    }
    .skuinfo {
      flex: 5;
      display: flex;
      flex-wrap: wrap;

      img {
        padding: 5px;
        width: 60px;
        height: 60px;
        box-sizing: border-box;
        border: 1px solid #999;
        margin: 0 2px;
      }
      .active {
        border: 2px solid green;
      }
      span {
        flex: 1;
        font-size: 12px;
        text-align: center;

        border: 1px solid #999;
        padding: 0 5px;
        text-align: center;
        white-space: nowrap;
        margin: 2px;
        margin-top: 10px;
        height: 40px;
        line-height: 40px;
        text-overflow: ellipsis;
        box-sizing: border-box;
      }
    }
  }
  .addButton {
    width: 100px;
    height: 50px;
    background-color: transparent;
    border: none;
    border: 2px solid;
    margin-top: 20px;
  }
}
</style>
