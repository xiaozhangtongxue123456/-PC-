// 引入一些css变量文件
// import "./assets/main.css";
// 引入我们的所有api挂载在实例对象上
import * as API from "@/Api/request";
import { createApp, ref } from "vue";
// 引入我们的根文件
import App from "./App.vue";
// 引入我们的pinia仓库1.引入2.创建3.注册
import { createPinia } from "pinia";
const pinina = createPinia();
// 引入我们的路由器
import router from "./Router/index";
// 引入我们的element-plus库
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 引入我们图标库
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const app = createApp(App);
//引入我们的pinia持久化
import PiniaPluginPersist from "pinia-plugin-persist";
pinina.use(PiniaPluginPersist);
// 注册我们的图标组件库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 挂载我们的所有请求api
app.config.globalProperties.$api = API;
// 引入我们懒加载图片的插件
import { LazyImg } from "@/direactive/lazyimg";
app.use(LazyImg);
// 注册我们的全局组件
// app.component()
// 注册我们pinia
app.use(pinina);

// 注册我们的路由器
app.use(router);
// 注册我们的element-plus库
app.use(ElementPlus);
app.mount("#app");
