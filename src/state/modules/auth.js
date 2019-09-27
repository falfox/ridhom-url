import GoTrue from "gotrue-js";

export const auth = new GoTrue({
  APIUrl: "https://u.ridhom.dev/.netlify/identity",
  audience: "",
  setCookie: false
});

export default {
  namespaced: true,
  state: {
    currentUser: null,
    loading: true,
    loggedIn: false,
    token: null
  },
  getters: {
    loggedIn(state) {
      return !!state.currentUser;
    }
  },
  mutations: {
    SET_CURRENT_USER(state, value) {
      state.currentUser = value;
    },
    SET_LOAD(state, value) {
      state.loading = value;
    }
  },
  actions: {
    initStore({ dispatch, commit }) {
      commit("SET_LOAD", true);
      dispatch("validate");
    },
    async validate({ commit }) {
      const responseKey = getSavedState("auth.response");
      if (responseKey) {
        const user = await auth.createUser(responseKey);
        commit("SET_CURRENT_USER", user);
      }
      commit("SET_LOAD", false);
    },
    externalLogin({ state }, provider) {
      const { auth } = state;
      const url = auth.loginExternalUrl(provider);
      window.location.href = url;
    },
    logout() {
      window.localStorage.removeItem("auth.response");
      window.location.reload();
    }
  }
};

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key));
}
