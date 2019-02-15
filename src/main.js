import Vue from 'vue';
import Meta from 'vue-meta';
import axios from './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(Meta);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
