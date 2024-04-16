<template>
  <div class="shopCarGoodeInfo">
    <h3>商品信息</h3>
    <!-- 表格信息 -->
    <el-table :data="goods" style="width: 100%">
      <el-table-column label="商品信息" width="580" align="center">
        <template #default="scop">
          <!-- 图片区域 -->
          <div class="goodIndo">
            <img
              :src="scop.row.picture"
              alt=""
              style="width: 100px; height: 100px"
            />
            <!-- 商品描述 -->
            <div class="goodDetails">
              <p>{{ scop.row.name }}</p>
              <p>{{ scop.row.attrsText }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="单价" width="150" align="center" />
      <el-table-column prop="count" label="数量" width="150" align="center" />
      <el-table-column
        prop="payPrice"
        label="小计"
        width="150"
        align="center"
      />
      <el-table-column
        prop="totalPayPrice"
        label="实付"
        width="150"
        align="center"
      />
    </el-table>
  </div>
</template>

<script setup>
// 接受父组件传递的数据
let shopCarGoodeInfo = defineProps({
  goods: {
    type: Array,
    default: [],
  },
});
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.shopCarGoodeInfo {
  width: 100%;
  padding: 10px;
  .el-table th.gutter {
    display: table-cell !important;
  }
  .goodIndo {
    display: flex;
    padding: 10px;
    img {
      flex: 1;
    }
    .goodDetails {
      flex: 2;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      p {
        text-align: none;
        margin-bottom: 10px;
      }
    }
  }
  h3 {
    padding-bottom: 10px;
    border-bottom: 2px solid #efefef;
  }
}
</style>
