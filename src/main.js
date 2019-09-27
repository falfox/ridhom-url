import Vue from "vue";
import App from "@/App.vue";
import VueRouter from "vue-router";
import Index from "@/views/Index.vue";
import Preflight from "@/views/Preflight.vue";
import store from "./state/store";
import "@/main.css";

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: [
    { path: "/", component: Index },
    { path: "*", component: Preflight }
  ],
  mode: "history"
});

Vue.use(VueRouter);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
