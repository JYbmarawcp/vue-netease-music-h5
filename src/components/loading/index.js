import directive from './src/directive.js';
import service from './src/index.js';

export default {
  install(Vue) {
    Vue.use(directive);
    Vue.prototype.$loading = service;
  },
  directive,
  service
};
