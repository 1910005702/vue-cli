import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
import menu from './modules/menu'
Vue.use(Vuex)
export default new Vuex.Store({
  getters,
  modules: {
    menu,
  }
})
