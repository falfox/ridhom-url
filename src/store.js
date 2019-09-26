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
    },
    initializeStore(state) {
      if (localStorage.getItem("urls")) {
        // Replace the state object with the stored item
        state.urls = JSON.parse(localStorage.getItem("urls"));
      }
    }
  },
  actions: {
    async generateUrl({ commit, state }) {
      commit("setLoading", true);
      let longURL;
      try {
        if (
          state.form.url.startsWith("http://") ||
          state.form.url.startsWith("https://")
        ) {
          longURL = new URL(state.form.url);
          const response = await fetch("/.netlify/functions/generateUrl", {
            method: "POST",
            body: JSON.stringify({
              longURL
            })
          });
          const json = await response.json();
          commit("generateUrl", json);
        } else {
          commit("setError", "Please include http:// or https:// protocol");
        }
      } catch (e) {
        commit("setError", "URL is not valid, or something bad happen");
      }
      commit("setLoading", false);
    },
    copyURL(context, url) {
      const element = document.querySelector(`[data-url="${url}"]`);
      element.setAttribute("type", "text");
      element.select();
      document.execCommand("copy");
      element.setAttribute("type", "hidden");
      const svg = document.querySelector(`[data-svg="${url}"]`);
      svg.setAttribute("opacity", 1);
      setTimeout(function() {
        svg.setAttribute("opacity", 0.3);
      }, 2000);
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
    }
  }
});
