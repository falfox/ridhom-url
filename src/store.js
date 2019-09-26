import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    form: {
      url: "",
      error: null
    },
    urls: []
  },
  mutations: {
    changeUrl(state, value) {
      state.form.url = value;
    },
    generateUrl(state, value) {
      state.urls.push(value);
    },
    setLoading(state, value) {
      state.isLoading = value;
    },
    setError(state, value) {
      state.form.error = value;
    }
  },
  actions: {
    generateUrl({ commit, state }) {
      commit("setLoading", true);
      let longURL;
      try {
        longURL = new URL(state.form.url);
        setTimeout(function() {
          commit("setLoading", false);
          commit("generateUrl", {
            id: "test",
            longURL
          });
        }, 2000);
      } catch (e) {
        commit("setLoading", false);
        commit("setError", "URL is not valid");
      }
    },
    copyURL(context, url) {
      let element = document.querySelector(`#${url}`);
      element.setAttribute("type", "text");
      element.select();
      document.execCommand("copy");
      element.setAttribute("type", "hidden");
    }
  }
});
