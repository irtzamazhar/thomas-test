import { createRouter, createWebHistory } from 'vue-router'

// Route table stays modular so future pages slot in easily; dashboard is lazy-loaded
const routes = [
  {
    path: '/',
    name: 'ForeclosureDashboard',
    component: () => import('../pages/dashboard/ForeclosureDashboard.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
