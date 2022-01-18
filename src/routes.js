import { createWebHistory, createRouter } from "vue-router";
import Home from './components/Home.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import Add from './components/Add.vue'
import Update from './components/Update.vue'

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/signup", name: "Signup", component: Signup },
    { path: "/login", name: "Login", component: Login },
    { path: "/add", name: "Add", component: Add },
    { path: "/update/:id", name: "Update", component: Update },
]

const router = createRouter({ history: createWebHistory(), routes });

export default router;