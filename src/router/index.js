import { createRouter, createWebHistory } from 'vue-router';
import Pedidos from '@/views/Pedidos.vue';
import Home from '@/views/Home.vue';
import PaginaNaoEcontrada from '@/views/PaginaNaoEcontrada.vue';

// const lazyLoad = (view) => import(`../views/${view}.vue`);

const router = createRouter({
  history: createWebHistory('#'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: Pedidos
    },
    {
      path: '/:pathMatch(.*)',
      component: PaginaNaoEcontrada,
    }
  ]
})

export default router
