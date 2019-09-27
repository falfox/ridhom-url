export default {
  namespaced: true,
  state: {
    urls: []
  },
  getters: {
    urls(state) {
      return state.urls.slice().reverse();
    }
  },
  mutations: {
    generateUrl(state, value) {
      state.urls.push(value);
    }
  },
  actions: {
    initStore({ state }) {
      if (localStorage.getItem("urls")) {
        // Replace the state object with the stored item
        state.urls = JSON.parse(localStorage.getItem("urls"));
      }
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
      }, 500);
    }
  }
};
