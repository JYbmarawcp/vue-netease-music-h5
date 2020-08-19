import Vue from 'vue'
import App from './App.vue'
import router from './router'
import fastclick from 'fastclick'

import store from './store'
import global from './utils/global'

fastclick.attach(document.body)

Vue.config.productionTip = false
Vue.use(global)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
