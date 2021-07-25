import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/projects',
    name: 'project',
    component: () => import(/* webpackChunkName: "projects" */ '@/views/Project.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import(/* webpackChunkName: "logout" */ '@/views/Logout.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'home',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    return store.state.token ? next() : next({ name: 'login' });
  }
  if (to.meta.requiresGuest) {
    return store.state.token ? next({ name: 'home' }) : next();
  }
  return next();
});

export default router;
