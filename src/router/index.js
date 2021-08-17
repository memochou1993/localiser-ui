import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';
import {
  Role,
} from '@/constants';

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: {
      name: 'project.index',
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/projects',
    name: 'project.index',
    component: () => import(/* webpackChunkName: "projectIndex" */ '@/views/ProjectIndex.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/projects/:projectId',
    alias: '/projects/:projectId/keys',
    name: 'project.show',
    component: () => import(/* webpackChunkName: "projectShow" */ '@/views/ProjectShow.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/settings',
    component: () => import(/* webpackChunkName: "userSetting" */ '@/views/UserSetting.vue'),
    children: [
      {
        path: 'profile',
        alias: '',
        name: 'user.profile',
        component: () => import(/* webpackChunkName: "userSettingProfile" */ '@/views/UserSettingProfile.vue'),
      },
      {
        path: 'security',
        name: 'user.security',
        component: () => import(/* webpackChunkName: "userSettingSecurity" */ '@/views/UserSettingSecurity.vue'),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/projects/:projectId',
    component: () => import(/* webpackChunkName: "projectSetting" */ '@/views/ProjectSetting.vue'),
    children: [
      {
        path: 'settings',
        name: 'project.profile',
        component: () => import(/* webpackChunkName: "projectSettingProfile" */ '@/views/ProjectSettingProfile.vue'),
      },
      {
        path: 'members',
        name: 'project.users',
        component: () => import(/* webpackChunkName: "projectSettingUser" */ '@/views/ProjectSettingUser.vue'),
      },
      {
        path: 'languages',
        name: 'project.languages',
        component: () => import(/* webpackChunkName: "projectSettingLanguage" */ '@/views/ProjectSettingLanguage.vue'),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/system',
    component: () => import(/* webpackChunkName: "systemSetting" */ '@/views/SystemSetting.vue'),
    children: [
      {
        path: 'users',
        alias: '',
        name: 'system.users',
        component: () => import(/* webpackChunkName: "systemSettingUser" */ '@/views/SystemSettingUser.vue'),
      },
    ],
    meta: {
      requiresAuth: true,
      requiresRoleCode: Role.Admin,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    meta: {
      requiresGuest: true,
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

router.beforeEach(async (to, from, next) => {
  if (store.getters.isAuthenticated && !store.state.user) {
    try {
      await store.dispatch('fetchMe');
    } catch (e) {
      console.debug(e);
      await store.dispatch('reset');
    }
  }
  if (to.meta.requiresRoleCode) {
    return store.state.user?.role.code === to.meta.requiresRoleCode ? next() : next({ name: 'login' });
  }
  if (to.meta.requiresAuth) {
    return store.state.token ? next() : next({ name: 'login' });
  }
  if (to.meta.requiresGuest) {
    return store.state.token ? next({ name: 'home' }) : next();
  }
  return next();
});

export default router;
