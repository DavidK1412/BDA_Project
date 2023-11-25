import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import LogIn from "../components/LogIn.vue";
import AdminView from "../views/AdminView.vue";
import EmployeeView from "../views/EmployeeView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: App
    },
    {
        path: '/login',
        name: 'LogIn',
        component: LogIn
    },
    {
        path: "/admin",
        name: "AdminView",
        meta: { requiresAuth: true },
        component: AdminView
    },
    {
        path: "/dashboard",
        name: "EmployeeView",
        meta: { requiresAuth: true },
        component: EmployeeView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

async function ceckAuth(){
    const token = localStorage.getItem('token');
    if(!token) return false;
    return true;
}

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if(!await ceckAuth()){
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }else{
            next();
        }
    } else {
        next();
    }
})

export default router;