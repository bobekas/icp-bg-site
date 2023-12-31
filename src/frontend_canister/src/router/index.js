import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import DAO from '../views/DAO.vue';
import Library from '../views/Library.vue';
import Wallet from '../views/Wallet.vue';
import NotFound from '../views/NotFound.vue';
import { useAuthStore } from '../store/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dao',
    name: 'DAO',
    component: DAO,
  },
  {
    path: '/library',
    name: 'Library',
    component: Library,
  },
  {
    path: '/account',
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();

      if (!authStore.isReady) {
        await authStore.init();
      }

      if (!authStore.isAuthenticated) {
        next('/');
      } else {
        next();
      }
    },
    children: [
      {
        path: '/account/wallet',
        name: 'Wallet',
        component: Wallet,
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*', // Catch-all route
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;