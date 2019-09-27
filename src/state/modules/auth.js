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
    token: null,
    auth
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
    TOGGLE_LOAD(state) {
      state.loading = !state.loading;
    }
  },
  actions: {
    initStore({ dispatch }) {
      dispatch("validate");
    },
    async validate({ commit }) {
      const responseKey = getSavedState("auth.response");
      if (responseKey) {
        const user = await auth.createUser(responseKey);
        commit("SET_CURRENT_USER", user);
      }
      commit("TOGGLE_LOAD");
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
