import { createRouter, createWebHashHistory } from 'vue-router';
import Welcome from '@/views/Welcome.vue';
import What from '@/views/What.vue';
import Home from '@/views/Home.vue';

const routes = [
  { path: '/', component: Welcome },
  { path: '/what', component: What },
  { path: '/home', component: Home },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;