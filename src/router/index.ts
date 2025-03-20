import {createRouter, createWebHistory} from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes: any[] = [
    {
        path: '/',
        name: '',
        redirect: 'database-connection',
        // @ts-ignore
        component: () => import('@/view/index/index.vue'),
        children: [
            {
                path: '/database-connection',
                name: 'database-connection',
                // @ts-ignore
                component: () => import('@/view/codegenerator/database-connection/index.vue')
            },
            {
                path: '/code-generator-params',
                name: 'code-generator-params',
                // @ts-ignore
                component: () => import('@/view/codegenerator/code-generator-params/index.vue')
            },
            {
                path: '/code-generator',
                name: 'code-generator',
                // @ts-ignore
                component: () => import('@/view/codegenerator/code-generator/index.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return {left: 0, top: 0}
    }
})
// @ts-ignore
router.beforeEach((to, _from) => {
    NProgress.start()
})

router.afterEach(() => {
    NProgress.done()
})
export default router
