import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login'
import Register from './views/register'
import Index from './views/index'
import Wrong from './views/wrong'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    //mode:'hash',
    base: process.env.BASE_URL,//平时在localhost自测使用
    //base:'/guess/',//打包build到tomcat上时使用
    routes: [{
            path: '/',
            name: 'login',
            component: Login,
        meta: {
            title: 'Login'
        }

    },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                title: 'Register'
            }

        },
        {
            path: '/',
            name: 'index',
            component: Index,
       /*     meta: {
                requireAuth: true
            }*/
            meta: {
                title: 'Guess!'
            }

        },
        {
            path: '*',
            name: 'wrong',
            component: Wrong,
            meta: {
                title: 'Guess!'
            }

        }
    ]
})

// 验证 token，存在才跳转
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
    if (to.meta.requireAuth) {
        if (token) {
            next()
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next()
    }
})

export default router
