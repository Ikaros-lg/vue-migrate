export default {
  namespaced: true,

  state: () => ({
    isLoading: false,
    toasts: []
  }),

  mutations: {
    SET_LOADING(state, val) {
      state.isLoading = val
    },
    ADD_TOAST(state, toast) {
      state.toasts.push({ id: Date.now(), ...toast })
    },
    REMOVE_TOAST(state, id) {
      state.toasts = state.toasts.filter(t => t.id !== id)
    }
  },

  actions: {
    showLoading({ commit }) {
      commit('SET_LOADING', true)
    },
    hideLoading({ commit }) {
      commit('SET_LOADING', false)
    },
    addToast({ commit, dispatch }, toast) {
      commit('ADD_TOAST', toast)
      const id = Date.now()
      setTimeout(() => commit('REMOVE_TOAST', id), toast.duration || 3000)
    }
  }
}
