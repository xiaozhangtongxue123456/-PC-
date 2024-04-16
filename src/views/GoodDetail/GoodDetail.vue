<template>
  <div class="GoodDetail">
    <!-- 图片展示区 -->
    <div class="GoodInfo">
      <!-- 图片模块 -->
      <div class="GoodImg">
        <div class="BigImg">
          <!-- {{ goodDetail.goodInfo.mainPictures[0] }} -->
          <img :src="defaultImg" />
          <!-- <div class="mask" ref="masks" :style="{ top: mousepoint.top, left: mousepoint.left }"></div> -->
        </div>
        <div class="SmallImg">
          <ul>
            <li
              v-for="(item, index) in goodDetail.goodInfo.mainPictures"
              :key="item"
              :class="{ active: index == higtactive }"
              @click="handleHightLigth(index)"
            >
              <img :src="item" alt="" />
            </li>
          </ul>
        </div>
        <!-- 放大镜组件 -->
        <!-- <BigGlass :BigImg="defaultImg" /> -->
      </div>
      <!-- 评价模块 -->
      <div class="GoodEvaluate">
        <ul>
          <li class="evaluateItem">
            <p>销售人气</p>
            <p>{{ goodDetail.goodInfo.salesCount }}</p>
            <p>
              <el-icon color="green"><Flag /></el-icon>销售人气
            </p>
          </li>
          <li class="evaluateItem">
            <p>商品评价</p>
            <p>{{ goodDetail.goodInfo.commentCount }}</p>
            <p>
              <el-icon color="green"><Message /></el-icon>商品评价
            </p>
          </li>
          <li class="evaluateItem">
            <p>收藏人气</p>
            <p>{{ goodDetail.goodInfo.collectCount }}</p>
            <p>
              <el-icon color="green"><StarFilled /></el-icon>收藏人气
            </p>
          </li>
          <li class="evaluateItem">
            <p>品牌信息</p>
            <!-- <p>{{ goodDetail.goodInfo.brand.name ? goodDetail.goodInfo.brand.name : "" }}</p> -->
            <p>
              <el-icon color="green"><Goods /></el-icon>品牌主页
            </p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 商品购买信息 -->
    <div class="Goodshow">
      <!-- 商品名字 -->
      <p class="good-name">{{ goodDetail.goodInfo.name }}</p>
      <p class="good-des">{{ goodDetail.goodInfo.desc }}</p>
      <p class="good-price">
        ￥{{ goodDetail.goodInfo.price
        }}<span>￥{{ goodDetail.goodInfo.oldPrice }}</span>
      </p>
      <div class="good-server">
        <div class="good-promoter">五折出售</div>
        <div class="good-promoter">大甩卖</div>
      </div>
      <!-- sku组件 -->
      <sku :goodInfo="goodDetail.goodInfo" />
    </div>
  </div>
  <!-- 商品介绍区 -->
  <div class="detail">
    <div class="good-introduce" v-if="goodDetail.goodInfo.details?.properties">
      <h1>商品详情</h1>
      <ul>
        <li
          v-for="item in goodDetail.goodInfo.details.properties"
          :key="item.name"
        >
          <span>{{ item.name }}:</span><span>{{ item.value }}</span>
        </li>
      </ul>
      <!-- 图片展示 -->
      <img
        :src="item"
        alt=""
        v-for="item in goodDetail.goodInfo.details.pictures"
        :key="item"
        style="width: 100%"
      />
    </div>
    <div></div>
    <!-- 日热门榜 -->
    <div class="hot-img">
      <hotItem title="24小时热榜" :hotItem="hotGood.dayHotGoodData" />
      <!-- 周热门榜 -->
      <hotItem title="周热榜" :hotItem="hotGood.weekHotGoodData" />
    </div>
  </div>
</template>

<script setup>
// 获取我们的路由
import { nextTick, onMounted, reactive, ref, isReactive } from "vue";
import { useRoute } from "vue-router";
// 引入我们的热品模块
import hotItem from "@/components/hotitem.vue";
// 引入我们获取商品个体信息的api
import getGoodInfo from "@/hooks/getGoodinfo/getGoodInfo";
const { goodDetail, getgood } = getGoodInfo();
// 引入我们的获取热门数据的api
import getHotGood from "@/hooks/useGetHotGood";
const { getHotGoodData, hotGood } = getHotGood();
// 引入我们的放大镜组件
import BigGlass from "@/components/loupe.vue";
// 引入我们的sku组件
import Sku from "@/components/Sku.vue";
let defaultImg = ref("");
// 定义鼠标数据
const mousepoint = reactive({
  top: 0,
  left: 0,
});
// 获取我们的遮罩层dom
const masks = ref(null);

// 我们定义鼠标移动的回调函数
const mouseMove = (e) => {
  // 保存我们的数据
  // console.log(e.offsetX, e.offsetY, masks.value.offsetHeight);
  // 使我们的遮罩层位置发生改变

  mousepoint.top = e.offsetY - masks.value.offsetHeight / 2 + "px";
  mousepoint.left = e.offsetX - masks.value.offsetWidth / 2 + "px";
};
// 高亮效果
let higtactive = ref(0);
const route = useRoute();
// 我们定义我们的小图的回调函数
const handleHightLigth = (index) => {
  // 改变高亮效果
  higtactive.value = index;
  // 改变大图
  defaultImg = goodDetail.goodInfo.mainPictures[index];
};

// 发送我们请求
onMounted(async () => {
  // 获取我们的商品个体信息
  // console.log(route.query.id);
  await getgood(route.query.id);
  // 获取我们的热门商品的函数:日数据
  await getHotGoodData(route.query.id, 1, 6);
  // 获取我们的热门商品的函数:周数据数据
  await getHotGoodData(route.query.id, 2, 6);
  // console.log(hotGood);
  // console.log(goodDetail.goodInfo);
  defaultImg.value = goodDetail.goodInfo.mainPictures[0];
});
</script>

<style lang="less" scoped>
.GoodDetail {
  width: 80%;
  margin: 0 10%;
  display: flex;
  margin-top: 10px;
  .GoodInfo {
    flex: 1;
    .GoodImg {
      display: flex;
      position: relative;

      height: 400px;
      .BigImg {
        flex: 4;

        box-sizing: border-box;
        position: relative;
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 50%;
          background-color: black;
          opacity: 0.5;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      .SmallImg {
        flex: 1;
        height: 100%;

        ul {
          height: 400px;
          width: 100%;
          display: flex;
          flex-direction: column;
          margin: 0;
          padding: 0;
          justify-content: space-between;
          .active {
            border: 1px solid green;
          }
          li {
            width: 100%;
            flex: 1;
            box-sizing: border-box;
            padding: 5px;
            text-align: center;

            img {
              width: 90%;
              height: 60px;
              margin-top: 5px;
            }
          }
        }
      }
    }
    .GoodEvaluate {
      width: 100%;
      height: 80px;

      ul {
        width: 100%;
        height: 100%;
        display: flex;
        margin: 0;
        padding: 0;
        justify-content: space-between;
        li {
          width: 22%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 10px;
          box-sizing: border-box;
          border-right: 2px solid #efefef;
          p {
            margin: 0;
            text-align: center;
            font-size: 13px;
            i {
              vertical-align: middle;
              margin-right: 1px;
            }
          }
          p:nth-of-type(2) {
            color: red;
            font-size: 13px;
          }
          p:nth-of-type(1) {
            color: #666;
          }
        }
      }
    }
  }

  .Goodshow {
    flex: 1;
    padding-left: 10px;
    box-sizing: border-box;
    p {
      margin: 0;
      padding: 0;
    }
    .good-name {
      font-size: 22px;
      font-weight: 700;
    }
    .good-des {
      margin-top: 10px;
      font-size: 12px;
      color: #999;
    }
    .good-price {
      padding-top: 10px;
      color: #c00000;
      font-size: 20px;
      font-weight: 700;
      span {
        color: #999;
        text-decoration: line-through;
        font-size: 12px;
        padding-left: 10px;
      }
    }
    .good-server {
      width: 100%;
      height: 120px;

      .good-promoter {
        width: 100%;
        height: 60px;
        color: #666;
        line-height: 60px;
      }
    }
  }
}
.detail {
  width: 80%;
  display: flex;
  margin: 0 10%;
  .good-introduce {
    flex: 4;
    margin-top: 10px;
    h1 {
      margin: 0;
      padding: 0;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #441c1c;
      box-sizing: border-box;
    }
    ul {
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 50%;
        font-size: 14px;

        display: flex;
        span {
          padding: 10px 10px;
        }
        span:nth-of-type(1) {
          color: #999;
        }
      }
      li:nth-last-of-type(1) {
        width: 100%;
        display: flex;
      }
    }
  }
  .hot-img {
    width: 200px;
    flex: 1;
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>
