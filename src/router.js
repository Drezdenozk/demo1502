import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

const loadView = view => () => import(`./views/${view}.vue`);

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: loadView('About'),
    },
    {
      path: '/starship/:id',
      name: 'starship',
      component: loadView('Starship'),
    },
    {
      path: '/*',
      name: 'NotFound',
      component: loadView('NotFound'),
    },
  ],
});
