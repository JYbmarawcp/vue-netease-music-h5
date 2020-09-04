import Vue from 'vue'
import Vuex from 'vuex'
import musicModule from './modules/music'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    music: musicModule
  },
  plugins: debug ? [createLogger()] : []
})
