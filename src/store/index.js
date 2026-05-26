import Vue from 'vue'
import Vuex from 'vuex'
import ui from './modules/ui'
import library from './modules/library'
import player from './modules/player'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
    library,
    player
  }
})
