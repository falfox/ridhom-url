import VueRouter from "vue-router";
import Index from "@/views/Index.vue";
import Preflight from "@/views/Preflight.vue";
import querystring from "querystring";
import store from "./state/store";

const router = new VueRouter({
  routes: [
    { path: "/", component: Index },
    { path: "*", component: Preflight }
  ],
  mode: "history"
});

router.beforeEach(async (to, from, next) => {
  if (to.hash && to.hash.startsWith("#access_token")) {
    try {
      const hash = to.hash.replace(/#/, "");
      const query = querystring.parse(hash);
      window.localStorage.setItem("auth.response", JSON.stringify(query));
      store.dispatch("initStore");
      next({ path: "/" });
    } catch (e) {
      console.log(e);
    }
  }
  next();
});

export default router;
