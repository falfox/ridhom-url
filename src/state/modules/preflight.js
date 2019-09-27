export default {
  namespaced: true,
  state: {
    longURL: null,
    error: null
  },
  mutations: {
    setLongURL(state, value) {
      state.longURL = value;
    },
    setError(state, value) {
      state.error = value;
    }
  },
  actions: {
    async redirectToLongURL({ commit, state }, router) {
      console.log(this);
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
          commit("setError", "URL is not found, or something bad happen");
        }
      } catch (e) {
        console.log(e);
        commit("setError", "URL is not found, or something bad happen");
      }
    }
  }
};
