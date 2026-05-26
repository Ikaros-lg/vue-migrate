export default {
  install(Vue, { store }) {
    Vue.prototype.$loading = {
      show() {
        store.dispatch('ui/showLoading')
      },
      hide() {
        store.dispatch('ui/hideLoading')
      }
    }
  }
}
