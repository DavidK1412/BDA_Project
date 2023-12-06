import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import LogIn from "../components/LogIn.vue";
import AdminView from "../views/AdminView.vue";
import EmployeeView from "../views/EmployeeView.vue";
import axios from "axios";

const routes = [
    {
        path: '/',
        name: 'home',
        component: App
    },
    {
        path: '/login',
        name: 'LogIn',
        component: LogIn,
        meta: { requiresAuth: false }
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
    let token = localStorage.getItem('token');
    if(!token) return false;

    try{
       const result = await axios.post('https://bda-project-d8ff.vercel.app/auth/verify', {"token": token});
       if (result.status === 200 || result.data) {
           return true;
       }
    } catch (e) {
        console.log(e);
        return false;
    }
}

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const auth = await ceckAuth();
        if(!auth){
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