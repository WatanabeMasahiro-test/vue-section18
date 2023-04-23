import { createRouter, createWebHistory } from 'vue-router'
import Comments from '@/views/CommentsView.vue'
import Login from '@/views/LoginView.vue'
import Register from '@/views/RegisterView.vue'
import store from '@/store/index'

const routes = [
    {
        path      : '/',
        name      : 'Comments',
        component : Comments,
        beforeEnter(to, from, next) {
            if (store.getters.idToken) {
                next();
            } else {
                next('/login');
            }
        },
    },
    {
        path      : '/login',
        name      : 'Login',
        component : Login,
        beforeEnter(to, from, next) {
            if (store.getters.idToken) {
                next('/');
            } else {
                next();
            }
        },
    },
    {
        path      : '/register',
        name      : 'Register',
        component : Register,
        beforeEnter(to, from, next) {
            if (store.getters.idToken) {
                next('/');
            } else {
                next();
            }
        },
    },
    {
        path      : '/:pathMatch(.*)*',
        name      : 'NotFound',
        // component : NotFound,    ⏪存在しないページへのアクセス
        redirect  : '/',
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router