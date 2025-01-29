import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '@/views/HomePage.vue';
import AccountPage from '@/views/AccountPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: HomePage,
            meta: { requiresAuth: true },
        },
        {
            path: '/account',
            component: AccountPage,
            meta: { requiresAuth: true },
        },
        {
            path: '/login',
            component: LoginPage,
        },
        {
            path: '/register',
            component: RegisterPage,
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
});


router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});


export default router