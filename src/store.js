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
    longURL: null,
    urlError: null
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
    setUrlError(state, value) {
      state.urlError = value;
    },
    setLongURL(state, value) {
      state.longURL = value;
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
    async redirectToLongURL({ commit, state }, router) {
      try {
        const hashid = router.params.pathMatch.replace(/\//, "");
        console.log(hashid);
        const response = await fetch("/.netlify/functions/getLongURL", {
          method: "POST",
          body: JSON.stringify({
            hashid
          })
        });

        if (response.status == 200) {
          const json = await response.json();
          commit("setLongURL", json.longURL);
          setTimeout(function() {
            window.location.assign(state.longURL);
          }, 2000);
        } else {
          commit("setUrlError", "URL is not found, or something bad happen");
        }
      } catch (e) {
        console.log(e);
        commit("setUrlError", "URL is not found, or something bad happen");
      }
    },
    initializeStore({ state }) {
      if (localStorage.getItem("urls")) {
        // Replace the state object with the stored item
        state.urls = JSON.parse(localStorage.getItem("urls"));
      }
    }
  }
});
