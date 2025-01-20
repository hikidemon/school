import { ROUTE_NAMES } from '@/common/constants'
import { createRouter, createWebHistory } from 'vue-router'

import UiKit from '@/pages/UiKit/UiKit.vue'
import AuthPage from '@/pages/AuthPage/AuthPage.vue'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage.vue'
import AllPage from '@/pages/AuthPage/AllPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/ui',
      name: ROUTE_NAMES.UiKit,
      component: () => UiKit,
    },

    {
      path: '/auth',
      name: ROUTE_NAMES.AuthPage,
      component: () => AllPage,
    },

    { path: '/:pathMatch(.*)*', component: async () => await NotFoundPage },
  ],
})

export default router
