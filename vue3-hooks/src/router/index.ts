import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import View from '../view/index.vue'
import Count from '../view/count/index.vue'
import CountTsx from '../view/count-tsx/index.tsx'
import FetchHooks from '../view/fetch-hooks/index.vue'
import FetchHooksTsx from '../view/fetch-hooks-tsx'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: View,
    children: [
      {
        path: '/count',
        component: Count
      },
      {
        path: '/count-tsx',
        component: CountTsx
      },
      {
        path: '/fetch-hooks',
        component: FetchHooks
      },
      {
        path: '/fetch-hooks-tsx',
        component: FetchHooksTsx
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
