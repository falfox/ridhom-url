import Vue from "vue";
import App from "@/App.vue";
import VueRouter from "vue-router";
import Index from "@/views/Index.vue";
import Preflight from "@/views/Preflight.vue";
import store from "./store";
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

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  if (mutation.type === "generateUrl") {
    localStorage.setItem("urls", JSON.stringify(state.urls));
  }
});
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    this.$store.commit("initializeStore");
  }
}).$mount("#app");
