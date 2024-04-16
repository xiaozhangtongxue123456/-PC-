<template>
  <div class="login">
    <!-- 标签部分 -->
    <div class="login-title">
      <!-- log部分 -->
      <img src="../assets/images/logo.png" alt="" />
      <!-- 进入网站首页：以游客的身份 -->
      <router-link :to="{ path: '/home' }"
        >进入网站首页<span>>></span></router-link
      >
    </div>
    <!-- 主体部分 -->
    <div class="login-main">
      <!-- 登录部分 -->
      <el-card class="box-card">
        <h3>账号登录</h3>
        <!-- 登录的主题部分 -->
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="60px"
          class="demo-ruleForm"
        >
          <!-- 账号 -->
          <el-form-item label="账号" prop="account">
            <el-input v-model="ruleForm.account" autocomplete="off" />
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <!-- 同意协议 -->
          <el-form-item prop="agree">
            <el-checkbox
              label="我已同意私有条款和服务条例"
              name="agree"
              v-model="ruleForm.agree"
            />
          </el-form-item>
          <!-- 提交登录按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <!-- 底部部分 -->
    <div class="login-footer">
      <ul>
        <li>诚信经营</li>
        <li>诚信经营</li>
        <li>诚信经营</li>
        <li>诚信经营</li>
        <li>诚信经营</li>
        <li>诚信经营</li>
        <li>诚信经营</li>
        <li>诚信经营</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

// 引入el中的消息提示组件
import { ElMessage } from "element-plus";
// 引入我们的路由器
import { useRouter } from "vue-router";
// 引入我们的购物车仓库
import Store from "@/stores/shopCar";
const shopCarStore = Store();
// 引入我们的登录仓库
import loginStore from "@/stores/loginStore";
const store = loginStore();
// 获取我们的本地购物车
// const localshopCar = JSON.parse(
//   localStorage.getItem("shopCarInfo")
// ).shopCarInfo.map((item) => {
//   return {
//     skuId: item.id,
//     selected: item.selected,
//     count: item.count,
//   };
// });

// 获取我们的路由器
const router = useRouter();
// 获取我们的表单dom
const ruleFormRef = ref(null);
// 收集用户信息
const ruleForm = reactive({
  // 用户密码
  password: "",
  //   用户姓名
  account: "",
  // 是否同意
  agree: true,
});
// 定义同意协议的回调函数
const agreeCheck = (rules, value, callback) => {
  if (value) {
    callback();
  } else {
    callback(new Error("请勾选同意协议"));
  }
};
// 我们定义我们的验证规则
const rules = reactive({
  password: [
    { required: true, message: "请输入你的密码", trigger: "blur" },
    {
      min: 6,
      message: "密码不能少于6,最多为12位",
      trigger: "blur",
    },
  ],

  account: [
    {
      required: true,
      message: "请输入你的账号",
      trigger: "change",
    },
  ],
  agree: [{ validator: agreeCheck, trigger: "change" }],
});

// 我们带点击我们的登录的回调函数
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        // 我们保存数据

        await store.login(ruleForm);
        //提示登录成功
        ElMessage({
          message: "登录成功",
          type: "success",
        });
        shopCarStore.isLogin = true;
        // 我们要合并我们本地的购物车：将本地的购物车发送给后台
        // 提交成功：我们路由跳转
        router.push({
          path: "/home",
        });
      } catch (error) {}
    } else {
      // 提交失败
      ElMessage.error("登录失败");
    }
  });
};
</script>

<style lang="less" scoped>
.login-title {
  width: 100%;
  height: 100px;
  padding: 0 10%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  img {
    width: 300px;
    height: 100%;
  }
  a {
    text-align: center;
    line-height: 100px;
    span {
      color: #999;
    }
  }
}
.login-main {
  height: 500px;
  background-image: url("../assets/images/login-bg.png");
  background-repeat: no-repeat;
  position: relative;
  .box-card {
    position: absolute;
    width: 370px;
    height: 300px;
    top: 100px;
    left: 980px;
    h3 {
      padding: 0;
      margin: 0;
      text-align: center;
    }
    :deep(.el-form) {
      margin-top: 20px;
    }
    :deep(.el-button) {
      width: 280px;
      margin: 0;
    }
  }
}
.login-footer {
  text-align: center;

  ul {
    display: flex;
    width: 50%;
    margin-left: 450px;
    margin-top: 10px;
    li {
      padding: 0 10px;
      height: 30px;
      font-size: 12px;
      text-align: center;
      line-height: 30px;
      border-right: 1px solid #999;
    }
  }
}
</style>
