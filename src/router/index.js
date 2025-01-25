import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '@/views/HomePage.vue';
import AccountPage from '@/views/AccountPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage,
        },
        {
            path: '/account',
            name: 'Account',
            component: AccountPage,
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginPage,
        },
        {
            path: '/register',
            name: 'Register',
            component: RegisterPage,
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
});
