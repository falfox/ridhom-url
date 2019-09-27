export default {
  namespaced: true,
  state: {
    isLoading: false,
    url: "",
    error: null
  },
  mutations: {
    changeUrl(state, value) {
      state.url = value;
    },
    setLoading(state, value) {
      state.isLoading = value;
    },
    setError(state, value) {
      state.error = value;
    }
  },
  actions: {
    async generateUrl({ commit, state }) {
      commit("setLoading", true);
      let longURL;
      try {
        if (
          state.url.startsWith("http://") ||
          state.url.startsWith("https://")
        ) {
          longURL = new URL(state.url);
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
    }
  }
};
