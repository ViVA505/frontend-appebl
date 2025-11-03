import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '@/views/Welcome.vue';

const routes = [
  { path: '/', component: Welcome },
  { path: '/what', component: () => import('@/views/What.vue') }, // Заглушка для следующей страницы
  { path: '/home', component: () => import('@/views/Home.vue') } // Заглушка для следующей страницы
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
