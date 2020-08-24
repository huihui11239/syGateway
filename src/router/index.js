import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/Login/Login.vue')
    },
    {
        path: '/home',
        name: 'Main',
        redirect: '/home',
        component: () => import('../views/Main.vue'),
        children: [
            {
                path: '/',
                name: 'Home',
                meta: {
                    title: '设备列表'
                },
                component: () => import('../views/Home/Home.vue')
            },
            {
                path: '/SystemConfig',
                name: 'SystemConfig',
                meta: {
                    title: '系统设置'
                },
                component: () => import('../views/SystemConfig/SystemConfig.vue')
            }, 
        ]
    },
    {
        path: '/test',
        name: 'Test',
        component: () => import('../views/test.vue')
    },
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
