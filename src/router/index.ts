import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/scope',
      name: 'scope',
      component: () => import('../views/ScopeView.vue')
    },{
      path: '/history',
      name: 'history',
      component: () => import('../views/HistoryView.vue')
    },
  ]
})

export default router
