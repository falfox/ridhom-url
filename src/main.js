import Vue from "vue";
import App from "@/App.vue";
import VueRouter from "vue-router";
import "@/main.css";
import store from "./state/store";
import router from "./routes";

Vue.config.productionTip = false;
Vue.use(VueRouter);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
