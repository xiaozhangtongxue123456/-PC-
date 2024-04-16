// 我们将秒数转化为分数的函数

import { ref } from "vue";

export default function getMintue() {
  // 定义我们的数据
  // 定义我们们的分
  let mintue = ref(0);
  // 定义我们的秒
  let second = ref(0);

  // 定义我们的函数
  function transformMintue(seconds) {
    // 将秒转化为分
    mintue.value = parseInt(seconds / 60);
    // 将剩余的秒进行保存
    second.value = seconds % 60;
  }
  return {
    mintue,
    second,
    transformMintue,
  };
}
