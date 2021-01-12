import Vue from "vue";
import App from "./App.vue";


// 非生产模式下开启调试工具,因不是Vue的脚手架创建的项目,此功能需手动设置
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
Vue.config.productionTip = isDebug_mode;

new Vue({
  // comments: {
  //   "content-element": Content,
  //   "button-element": Button
  // },
  // router,
  render: (h) => h(App),
}).$mount("#app");
