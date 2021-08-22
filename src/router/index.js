import Vue from "vue";
import VueRouter from "vue-router";
// import path from "@/data/path";
// import roleHelper from "@/helper/role";
// import constants from "@/data/constants";
// import role from "@/data/role";

Vue.use(VueRouter)

const routes = [
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/global/pages/Register'),
        meta: {
            layout: "auth-layout",
            guestOnly: true,
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/global/pages/Login'),
        meta: {
            layout: "auth-layout",
            guestOnly: true,
        },
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/global/pages/Dashboard'),
        meta: {
            layout: "default-layout",
            authOnly: true,
        },
    },


]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

function isLoggedIn() {
    return localStorage.getItem('access_token');
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authOnly)) {
        if (!isLoggedIn()) {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.guestOnly)) {
        if (isLoggedIn()) {
            next({
                path: '/dashboard',
                query: {redirect: to.fullPath}
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
