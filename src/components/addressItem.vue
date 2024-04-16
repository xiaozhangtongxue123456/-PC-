<template>
  <div class="addressItem">
    <p><span>收货人:</span>&nbsp;{{ addressitem?.receiver }}</p>
    <p><span>联系电话:</span>&nbsp;{{ addressitem?.contact }}</p>
    <p><span>收货地址:</span>&nbsp;{{ addressitem?.fullLocation }}</p>
  </div>
</template>

<script setup>
// 接受父组件传递是否可以展示切换组件的数据
let props = defineProps({
  addressitem: {
    type: Object,
  },
});
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.addressItem {
  width: 100%;
  height: 150px;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid #efefef;
  margin-bottom: 10px;

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
</style>
