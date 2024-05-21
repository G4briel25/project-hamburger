import { createRouter, createWebHistory } from 'vue-router';
import Pedidos from '../views/Pedidos.vue';
import Home from '@/views/Home.vue';

const lazyLoad = (view) => import(`../views/${view}.vue`);

const router = createRouter({
  history: createWebHistory('#'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: lazyLoad('Home')
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: lazyLoad('Pedidos')
    },
    {
      path: '/:pathMatch(.*)',
      component: lazyLoad('PaginaNaoEcontrada'),
    }
  ]
})

export default router
