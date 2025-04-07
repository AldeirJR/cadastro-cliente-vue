// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import FormView from './views/FormView.vue'
import ListView from './views/ListView.vue'

const routes = [
  {
    path: '/',
    name: 'Form',
    component: FormView
  },
  {
    path: '/list',
    name: 'List',
    component: ListView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
