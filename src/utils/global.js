import VueLazyload from 'vue-lazyload'

import { EMPTY_IMG } from "./dom"

export default {
  install(Vue) {
    Vue.use(VueLazyload, {
      loading: EMPTY_IMG,
      error: EMPTY_IMG
    })
  }
}