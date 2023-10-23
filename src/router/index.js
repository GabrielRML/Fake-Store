import { createRouter, createWebHistory } from 'vue-router'
import Produtos from '../views/Produtos.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/produtos',
      name: 'Produtos',
      component: Produtos
    },
    {
      path: '/',
      name: 'home',
      component: Produtos
    }
  ]
})

export default router
