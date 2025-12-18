import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import ServicesPage from '@/components/ServicesPage.vue';
import AdminLogin from '@/components/AdminLogin.vue';
import AdminPanel from '@/components/AdminPanel.vue';

// Функция для проверки авторизации
const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/services',
    name: 'Services',
    component: ServicesPage
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPanel,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next('/admin/login');
      }
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Скролл к верху при каждом переходе
    if (savedPosition) {
      return savedPosition; // Если есть сохранённая позиция (back/forward), используй её
    } else {
      return { top: 0 }; // Иначе — всегда к верху
    }
  }
});

export default router;