import { createRouter, createWebHashHistory } from 'vue-router'

import Index from '../pages/Index.vue'
import HomeView from '../views/HomeView.vue'
import ServiceView from '../views/ServiceView.vue'
import EventView from '../views/EventView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import EventList from '../components/EventList.vue'
import DetailView from '../components/Detail.vue'

import Login from '../pages/Login.vue'
import Admin from '../pages/Admin.vue'
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: '/w/home',
            component: Index,
            children: [
                {
                    path: '/w/home',
                    name: 'home',
                    component: HomeView
                },
                {
                    path: '/w/service',
                    name: 'service',
                    component: ServiceView
                },
                {
                    path: '/w/event',
                    redirect: '/w/event-list/All',
                    name: 'event',
                    component: EventView
                },
                {
                    path: '/w/about',
                    name: 'about',
                    component: AboutView
                },
                {
                    path: '/w/contact',
                    name: 'contact',
                    component: ContactView
                },
                {
                    path: '/w/event-list/:type',
                    name: 'event-list',
                    component: EventList
                },
                {
                    path: '/w/detail/:id/:type',
                    name: 'detail',
                    component: DetailView
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/admin/:url',
            name: 'admin',
            component: Admin
        }
    ]
})

export default router
