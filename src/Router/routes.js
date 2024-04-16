// 建立我们的路由
const routes = [
  //开始设置一级路由
  // 登录页面
  {
    path: "/",
    name: "登录页面",
    component: () => import("@/views/login.vue"),
  },
  // 首页页面
  {
    path: "/home",
    name: "首页",
    component: () => import("@/views/home/home.vue"),
    children: [
      {
        path: "",
        name: "分类页面",
        component: () => import("@/views/home/carouselAndgoodNav/index.vue"),
      },
      {
        path: "fristcate",
        component: () => import("../views/home/fristcate/frisrCate.vue"),
      },
      {
        path: "subCateDetail",
        name: "二级分类",
        component: () =>
          import("../views/home/fristcate/subCate/sbuCateDetail.vue"),
      },
      // 详情页的展示
      {
        path: "GoodDetail",
        name: "商品详情页",
        component: () => import("../views/GoodDetail/GoodDetail.vue"),
      },
      // 支付页面
      {
        path: "payment",
        name: "支付页面",
        component: () => import("../views/payment/payment.vue"),
      },
      // 结算页面
      {
        path: "settlement",
        name: "结算页面",
        component: () => import("@/views/settlement/settlement.vue"),
      },
      // 订单页面
      {
        path: "orders",
        name: "订单页面",
        component: () => import("@/views/orders/Order.vue"),
      },
      {
        path: "paycallback",
        component: () => import("@/views/paycallBack/paycallback.vue"),
      },
    ],
  },
];
// 暴露我们的路由
export default routes;
