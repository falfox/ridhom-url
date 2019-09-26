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
    urls: [],
    longUrl: null
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
    },
    setLongUrl(state, value) {
      state.longUrl = value;
    }
  },
  actions: {
    async generateUrl({ commit, state }) {
      commit("setLoading", true);
      let longURL;
      try {
        longURL = new URL(state.form.url);
        const response = await fetch("/.netlify/functions/generateUrl", {
          method: "POST",
          body: JSON.stringify({
            longURL
          })
        });
        const json = await response.json();
        commit("setLoading", false);
        commit("generateUrl", json);
      } catch (e) {
        commit("setLoading", false);
        commit("setError", "URL is not valid, or something bad happen");
      }
    },
    copyURL(context, url) {
      let element = document.querySelector(`#${url}`);
      element.setAttribute("type", "text");
      element.select();
      document.execCommand("copy");
      element.setAttribute("type", "hidden");
    },
    async redirectToLongURL({ commit }, router) {
      try {
        const hashid = router.params.pathMatch.replace(/\//, "");
        console.log(hashid);
        // const response = await fetch("/.netlify/functions/getLongURL", {
        //   method: "POST",
        //   body: ""
        // });
        // const json = await response.json();
        // commit("generateUrl", json.longURL);
      } catch (e) {
        console.log(e);
        commit("setError", "URL is not valid, or something bad happen");
      }
    }
  }
});
