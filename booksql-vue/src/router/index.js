import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }, {
        path: '/book/:id',
        name: 'Book',
        component: () =>
            import ( /* webpackChunkName: "book" */ '../views/Book.vue')
    }, {
        path: '/book/:id/edit',
        name: 'Book',
        component: () =>
            import ( /* webpackChunkName: "book" */ '../views/EditBook.vue')
    }, {
        path: '/books/add',
        name: 'addBook',
        component: () =>
            import ( /* webpackChunkName: "book" */ '../views/AddBook.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router