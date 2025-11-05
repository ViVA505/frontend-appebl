import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '@/views/Welcome.vue';
import What from '@/views/What.vue';
import Home from '@/views/Home.vue';

const routes = [
  { path: '/', component: Welcome },
  { path: '/what', component: What}, // Заглушка для следующей страницы
  { path: '/home', component: Home}, // Заглушка для следующей страницы
    { path: '/:pathMatch(.*)*', redirect: '/' }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
