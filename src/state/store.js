import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules
});

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  console.log(mutation.type, mutation.payload);
  if (mutation.type === "form/generateUrl") {
    localStorage.setItem("urls", JSON.stringify(state.urls));
  }
});

for (const moduleName of Object.keys(modules)) {
  if (modules[moduleName].actions && modules[moduleName].actions.initStore) {
    store.dispatch(`${moduleName}/initStore`);
  }
}

export default store;
