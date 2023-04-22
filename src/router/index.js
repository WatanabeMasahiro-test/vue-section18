import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    // {
    //     path      : '/:pathMatch(.*)*',
    //     name      : 'NotFound',
    //     // component : NotFound,    ⏪存在しないページへのアクセス
    //     redirect  : '/',
    // },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router