import VueLazyload from 'vue-lazyload'

import { EMPTY_IMG } from "./dom"
import * as utils from "./index"
export default {
  install (Vue) {
    const requireComponent = require.context(
      "@/base",
      true,
      /[a-z0-9]+\.(jsx?|vue)$/i,
    )
    //批量注册组件
    requireComponent.keys().forEach(fileName => {
      const componentConfig = requireComponent(fileName)
      const componentName = componentConfig.default.name
      if (componentName) {
        Vue.component(componentName, componentConfig.default || componentConfig)
      }
    })

    Vue.prototype.$utils = utils

    Vue.use(VueLazyload, {
      loading: EMPTY_IMG,
      error: EMPTY_IMG
    })
  }
}