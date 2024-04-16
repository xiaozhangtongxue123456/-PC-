<template>
  <div class="footer-nav">
    <!-- 客户服务 -->
    <div>
      <!-- 标题 -->
      <h3>客户服务</h3>
      <!-- 二维码 -->
      <div class="codeimg">
        <img src="@/assets/90f53edd83586822c1e7f70e69881f6d.jpg" alt="" />
        <img src="@/assets/5e1dbdb2fcd70978ebc71bc45851a3b8.jpg" alt="" />
      </div>
    </div>
    <!-- 关注我们 -->
    <div>
      <!-- 标题 -->
      <h3>关注我们</h3>
      <!-- 二维码 -->
      <div class="codeimg">
        <i class="iconfont icon-weixin"></i>
        <i class="iconfont icon-weibo1"></i>
      </div>
    </div>
    <!-- 下载App -->
    <div>
      <h3>下载APP</h3>
      <div class="codeimg">
        <div><img src="@/assets/images/qrcode.jpg" alt="" /></div>
        <div class="loadApp">
          <p>扫描二维码</p>
          <p>立即下载App</p>
          <button>立即下载App</button>
        </div>
      </div>
    </div>
    <!-- 联系电话 -->
    <div>
      <h3>联系电话</h3>
      <div
        style="width: 100%; height: 80px; text-align: center; line-height: 80px"
      >
        400-1122-4546454
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.footer-nav {
  width: 100%;
  height: 100%;
  background-color: #efefef;
  display: flex;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  flex-direction: row;
  box-sizing: border-box;
  justify-content: space-evenly;
  & > div {
    margin-top: 30px;
    display: flex;
    border-right: 2px solid #efefef;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    width: 20%;
    height: 80%;
    h3 {
      height: 40px;
      box-sizing: border-box;
      text-align: center;
      margin: 0;
    }
    .codeimg {
      display: flex;
      justify-content: space-around;
      img {
        width: 80px;
        height: 80px;
      }
      :deep(.icon-weixin:before) {
        display: block;
        font-size: 80px;
      }
      :deep(.icon-weibo1:before) {
        display: block;
        font-size: 80px;
      }
      & > div {
        width: 100px;
        height: 80px;
        border: 1px solid #efefef;
        img {
          width: 80px;
          height: 80px;
          margin-top: 10px;
          margin-left: 10px;
        }
      }
      & .phone {
        width: 80px !important;
        height: 80px !important;
      }
      & .loadApp {
        font-size: 12px;
        padding: 5px 5px 0;
        box-sizing: border-box;
        text-align: center;
        margin-top: 2px;

        p {
          margin: 0;
          color: #2b4b6b;
        }
        button {
          font-size: 10px;
          width: 100%;
          height: 30px;
          margin-top: 10px;
          border: none;
          color: #fff;
          background-color: aquamarine;
        }
      }
    }
  }
}
</style>
